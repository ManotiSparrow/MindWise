import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader, ExternalLink, Phone } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  hasLinks?: boolean;
  links?: Array<{ text: string; url: string; type?: 'crisis' | 'video' | 'article' }>;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to provide mental health support and information. I can help answer questions about anxiety, depression, therapy, self-care, and more. What would you like to know about? 💙",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mentalHealthResponses = {
    // Crisis and Emergency
    'crisis': {
      text: "I'm concerned about you. If you're in immediate danger, please call emergency services (911) right away. For crisis support, you can reach out to these resources:",
      links: [
        { text: "Call 988 - Suicide & Crisis Lifeline", url: "tel:988", type: "crisis" },
        { text: "Text HOME to 741741 - Crisis Text Line", url: "sms:741741", type: "crisis" },
        { text: "Crisis Resources Page", url: "/crisis", type: "article" }
      ]
    },
    'suicide': {
      text: "I'm really glad you reached out. Your life has value and meaning. Please know that suicidal thoughts are a symptom of pain, not a character flaw. Help is available right now:",
      links: [
        { text: "Call 988 - Suicide & Crisis Lifeline (24/7)", url: "tel:988", type: "crisis" },
        { text: "Text HOME to 741741", url: "sms:741741", type: "crisis" },
        { text: "Understanding Suicidal Thoughts", url: "https://www.youtube.com/watch?v=WcSUs9iZv-g", type: "video" }
      ]
    },
    'self harm': {
      text: "I'm concerned about you and want you to know that you're not alone. Self-harm is often a way of coping with emotional pain, but there are healthier alternatives. Please reach out for support:",
      links: [
        { text: "Crisis Text Line: Text HOME to 741741", url: "sms:741741", type: "crisis" },
        { text: "Self-Injury Outreach & Support", url: "https://sioutreach.org/", type: "article" },
        { text: "Alternatives to Self-Harm", url: "https://www.youtube.com/watch?v=6tZOgAnyVqE", type: "video" }
      ]
    },
    'emergency': {
      text: "If this is a mental health emergency, please don't wait. Get help immediately:",
      links: [
        { text: "Call 911 for immediate emergency", url: "tel:911", type: "crisis" },
        { text: "Call 988 - Crisis Lifeline", url: "tel:988", type: "crisis" },
        { text: "Go to nearest emergency room", url: "/crisis", type: "article" }
      ]
    },

    // Anxiety Related
    'anxiety': {
      text: "Anxiety is one of the most common mental health conditions, and it's very treatable. It involves excessive worry that interferes with daily life. You're not alone in this - millions of people experience anxiety. Here are some resources:",
      links: [
        { text: "Understanding Anxiety Disorders", url: "https://adaa.org/understanding-anxiety", type: "article" },
        { text: "Anxiety Coping Techniques", url: "https://www.youtube.com/watch?v=WWloIAQpMcQ", type: "video" },
        { text: "Find Anxiety Treatment", url: "https://www.psychologytoday.com/us/therapists", type: "article" }
      ]
    },
    'panic attack': {
      text: "Panic attacks are intense but not dangerous. Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Focus on slow, deep breathing. You will get through this. 🌸",
      links: [
        { text: "Panic Attack Breathing Exercise", url: "https://www.youtube.com/watch?v=tEmt1Znux58", type: "video" },
        { text: "Understanding Panic Disorder", url: "https://www.nimh.nih.gov/health/topics/panic-disorder", type: "article" },
        { text: "Grounding Techniques Guide", url: "https://www.healthline.com/health/grounding-techniques", type: "article" }
      ]
    },
    'worried': {
      text: "Worry is a normal human emotion, but when it becomes excessive, it can be overwhelming. Remember that most of what we worry about never actually happens. You have the strength to handle whatever comes your way. 💪",
      links: [
        { text: "How to Stop Worrying", url: "https://www.youtube.com/watch?v=k5RH3BdXDOY", type: "video" },
        { text: "Worry Management Techniques", url: "https://www.apa.org/topics/stress/manage", type: "article" }
      ]
    },
    'social anxiety': {
      text: "Social anxiety is very common and treatable. It's the fear of being judged by others, but remember - most people are focused on themselves, not judging you. You deserve to feel comfortable in social situations.",
      links: [
        { text: "Social Anxiety Disorder Info", url: "https://adaa.org/understanding-anxiety/social-anxiety-disorder", type: "article" },
        { text: "Overcoming Social Anxiety", url: "https://www.youtube.com/watch?v=o268qbb_0BM", type: "video" }
      ]
    },

    // Depression Related
    'depression': {
      text: "Depression is a serious but very treatable condition. It's not a sign of weakness - it's a medical condition that affects millions of people. You deserve support and care. Recovery is possible, and you don't have to face this alone. 🌅",
      links: [
        { text: "Understanding Depression", url: "https://www.nimh.nih.gov/health/topics/depression", type: "article" },
        { text: "Depression: What You Need to Know", url: "https://www.youtube.com/watch?v=z-IR48Mb3W0", type: "video" },
        { text: "Find Depression Treatment", url: "https://www.samhsa.gov/find-help/national-helpline", type: "article" }
      ]
    },
    'sad': {
      text: "Feeling sad is a normal part of being human. It's okay to not be okay sometimes. If sadness persists and interferes with your daily life, it might be helpful to talk to someone. Your feelings are valid, and support is available. 🤗",
      links: [
        { text: "When Sadness Becomes Depression", url: "https://www.youtube.com/watch?v=eQNw2FBdpyE", type: "video" },
        { text: "Coping with Sadness", url: "https://www.mentalhealth.gov/basics/what-is-mental-health", type: "article" }
      ]
    },
    'hopeless': {
      text: "Feeling hopeless is incredibly painful, but these feelings are temporary. You matter, and your life has value. Even when it doesn't feel like it, there are people who care about you. Please reach out for support - you don't have to carry this alone. 🌟",
      links: [
        { text: "Crisis Support: Call 988", url: "tel:988", type: "crisis" },
        { text: "Finding Hope in Dark Times", url: "https://www.youtube.com/watch?v=78I9dTB9vqM", type: "video" },
        { text: "Depression Support Groups", url: "https://www.nami.org/Support-Education/Support-Groups", type: "article" }
      ]
    },
    'lonely': {
      text: "Loneliness is more common than you might think, especially in today's world. You're not alone in feeling alone. Connection is a basic human need, and there are ways to build meaningful relationships. You deserve companionship and love. 💝",
      links: [
        { text: "Overcoming Loneliness", url: "https://www.youtube.com/watch?v=_0hxl03JoA0", type: "video" },
        { text: "Building Social Connections", url: "https://www.psychologytoday.com/us/blog/click-here-happiness/201812/how-make-friends-adult", type: "article" }
      ]
    },

    // Stress Related
    'stress': {
      text: "Stress is our body's natural response to challenges, but chronic stress can impact our health. The good news is that stress is manageable with the right tools and techniques. You have the power to reduce stress in your life. 🧘‍♀️",
      links: [
        { text: "Stress Management Techniques", url: "https://www.youtube.com/watch?v=6p_yaNFSYao", type: "video" },
        { text: "APA Stress Management Guide", url: "https://www.apa.org/topics/stress/manage", type: "article" },
        { text: "Mindfulness for Stress", url: "https://www.headspace.com/stress", type: "article" }
      ]
    },
    'overwhelmed': {
      text: "Feeling overwhelmed is a sign that you're carrying too much. It's okay to take a step back, breathe, and break things down into smaller, manageable pieces. You don't have to do everything at once. Be gentle with yourself. 🌿",
      links: [
        { text: "Managing Overwhelm", url: "https://www.youtube.com/watch?v=8jPQjjsBbIc", type: "video" },
        { text: "Breaking Down Big Tasks", url: "https://www.mindtools.com/pages/article/newHTE_07.htm", type: "article" }
      ]
    },
    'burnout': {
      text: "Burnout is a state of physical and emotional exhaustion. It's your body and mind telling you that you need rest and recovery. Recognizing burnout is the first step to healing. You deserve to feel energized and passionate again. 🔥",
      links: [
        { text: "Understanding Burnout", url: "https://www.youtube.com/watch?v=jqONINYBq6s", type: "video" },
        { text: "Burnout Recovery Guide", url: "https://www.helpguide.org/articles/stress/burnout-prevention-and-recovery.htm", type: "article" }
      ]
    },

    // Therapy and Treatment
    'therapy': {
      text: "Therapy is one of the most effective treatments for mental health concerns. It provides a safe space to explore your thoughts and feelings with a trained professional. Seeking therapy is a sign of strength, not weakness. 🌱",
      links: [
        { text: "What to Expect in Therapy", url: "https://www.youtube.com/watch?v=TlUEkRGhKoc", type: "video" },
        { text: "Find a Therapist", url: "https://www.psychologytoday.com/us/therapists", type: "article" },
        { text: "Types of Therapy", url: "https://www.apa.org/topics/psychotherapy/approaches", type: "article" }
      ]
    },
    'therapist': {
      text: "Finding the right therapist is important for your healing journey. It's okay to 'shop around' until you find someone you connect with. A good therapeutic relationship is built on trust, understanding, and mutual respect. 🤝",
      links: [
        { text: "How to Choose a Therapist", url: "https://www.youtube.com/watch?v=KqUOjcs7kEE", type: "video" },
        { text: "Psychology Today Therapist Directory", url: "https://www.psychologytoday.com/us/therapists", type: "article" },
        { text: "Questions to Ask a Potential Therapist", url: "https://www.apa.org/topics/psychotherapy/understanding", type: "article" }
      ]
    },
    'medication': {
      text: "Mental health medications can be very effective when used appropriately. They work best when combined with therapy and lifestyle changes. Any medication decisions should always be made with a qualified healthcare provider. 💊",
      links: [
        { text: "Mental Health Medications", url: "https://www.nimh.nih.gov/health/topics/mental-health-medications", type: "article" },
        { text: "Understanding Antidepressants", url: "https://www.youtube.com/watch?v=OmK8lDNvvS0", type: "video" }
      ]
    },
    'counseling': {
      text: "Counseling provides a supportive environment to work through challenges and develop coping strategies. It's a collaborative process where you and your counselor work together toward your goals. You deserve this support. 🌈",
      links: [
        { text: "Benefits of Counseling", url: "https://www.youtube.com/watch?v=epRvfxkBHBo", type: "video" },
        { text: "SAMHSA Treatment Locator", url: "https://www.samhsa.gov/find-help/national-helpline", type: "article" }
      ]
    },

    // Self-Care and Coping
    'self care': {
      text: "Self-care isn't selfish - it's essential for your mental health and well-being. It's about taking intentional actions to care for your physical, mental, and emotional health. You deserve to prioritize yourself. 🌺",
      links: [
        { text: "Self-Care Ideas and Tips", url: "https://www.youtube.com/watch?v=w0iVTQS8ftg", type: "video" },
        { text: "Mental Health Self-Care", url: "https://www.mentalhealth.gov/basics/what-is-mental-health", type: "article" },
        { text: "Creating a Self-Care Plan", url: "https://www.psychologytoday.com/us/blog/click-here-happiness/201812/self-care-12-ways-take-better-care-yourself", type: "article" }
      ]
    },
    'coping': {
      text: "Developing healthy coping strategies is crucial for managing life's challenges. Everyone copes differently, and it's about finding what works best for you. You're stronger than you know, and you can learn to navigate difficult times. 💪",
      links: [
        { text: "Healthy Coping Strategies", url: "https://www.youtube.com/watch?v=LO1mTELoj6o", type: "video" },
        { text: "Coping Skills Toolbox", url: "https://www.therapistaid.com/therapy-guide/coping-skills-for-adults", type: "article" }
      ]
    },
    'mindfulness': {
      text: "Mindfulness is about being present in the moment without judgment. It's a powerful tool for reducing anxiety, depression, and stress. Even a few minutes of mindfulness practice can make a difference. 🧘",
      links: [
        { text: "Mindfulness Meditation Guide", url: "https://www.youtube.com/watch?v=ZToicYcHIOU", type: "video" },
        { text: "Mindfulness for Mental Health", url: "https://www.health.harvard.edu/blog/mindfulness-meditation-may-ease-anxiety-mental-stress-201401086967", type: "article" },
        { text: "Free Mindfulness Apps", url: "https://www.headspace.com/", type: "article" }
      ]
    },
    'meditation': {
      text: "Meditation is a practice that can help calm your mind and reduce stress. You don't need to be perfect at it - even a few minutes can be beneficial. Be patient and kind with yourself as you learn. 🕯️",
      links: [
        { text: "Meditation for Beginners", url: "https://www.youtube.com/watch?v=rqoxYKtEWEc", type: "video" },
        { text: "Benefits of Meditation", url: "https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858", type: "article" }
      ]
    },

    // Sleep and Health
    'sleep': {
      text: "Sleep is crucial for mental health. Poor sleep can worsen anxiety and depression, while good sleep supports emotional regulation and cognitive function. You deserve restful, restorative sleep. 😴",
      links: [
        { text: "Sleep and Mental Health", url: "https://www.youtube.com/watch?v=5MuIMqhT8DM", type: "video" },
        { text: "Sleep Foundation Mental Health", url: "https://www.sleepfoundation.org/mental-health", type: "article" },
        { text: "Sleep Hygiene Tips", url: "https://www.cdc.gov/sleep/about_sleep/sleep_hygiene.html", type: "article" }
      ]
    },
    'insomnia': {
      text: "Insomnia can be frustrating and exhausting. It's often connected to stress, anxiety, or other factors. Good sleep hygiene and relaxation techniques can help. If it persists, consider talking to a healthcare provider. 🌙",
      links: [
        { text: "Overcoming Insomnia", url: "https://www.youtube.com/watch?v=nm1TxQj9IsQ", type: "video" },
        { text: "Insomnia Treatment", url: "https://www.sleepfoundation.org/insomnia/treatment", type: "article" }
      ]
    },

    // Relationships
    'relationship': {
      text: "Healthy relationships are vital for mental well-being. They're built on mutual respect, trust, and communication. You deserve relationships that support and uplift you. It's okay to set boundaries and prioritize your well-being. 💕",
      links: [
        { text: "Building Healthy Relationships", url: "https://www.youtube.com/watch?v=NhyfBi-Ad4c", type: "video" },
        { text: "Relationship Mental Health", url: "https://www.psychologytoday.com/us/basics/relationships", type: "article" }
      ]
    },
    'boundaries': {
      text: "Setting boundaries is an act of self-care and self-respect. Healthy boundaries protect your mental health and help you maintain better relationships. You have the right to say no and protect your energy. 🛡️",
      links: [
        { text: "Setting Healthy Boundaries", url: "https://www.youtube.com/watch?v=5S6IKU2DZNc", type: "video" },
        { text: "Boundary Setting Guide", url: "https://www.psychologytoday.com/us/blog/click-here-happiness/201709/how-set-healthy-boundaries", type: "article" }
      ]
    },

    // Specific Conditions
    'bipolar': {
      text: "Bipolar disorder involves mood episodes that range from depression to mania or hypomania. With proper treatment and support, people with bipolar disorder can live full, productive lives. You're not defined by your diagnosis. 🌈",
      links: [
        { text: "Understanding Bipolar Disorder", url: "https://www.youtube.com/watch?v=rAZ8KzAy2bw", type: "video" },
        { text: "NAMI Bipolar Disorder", url: "https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Bipolar-Disorder", type: "article" },
        { text: "International Bipolar Foundation", url: "https://ibpf.org/", type: "article" }
      ]
    },
    'adhd': {
      text: "ADHD affects attention, hyperactivity, and impulsivity. It's a neurodevelopmental condition that can be effectively managed with the right strategies and support. Your brain works differently, and that's okay. 🧠",
      links: [
        { text: "ADHD in Adults", url: "https://www.youtube.com/watch?v=yoX0vEDn5a4", type: "video" },
        { text: "CHADD ADHD Resources", url: "https://chadd.org/", type: "article" },
        { text: "CDC ADHD Information", url: "https://www.cdc.gov/ncbddd/adhd/", type: "article" }
      ]
    },
    'ptsd': {
      text: "PTSD can develop after experiencing or witnessing a traumatic event. It's a normal response to abnormal circumstances. Healing is possible with proper support and treatment. You're brave for seeking help. 🌟",
      links: [
        { text: "Understanding PTSD", url: "https://www.youtube.com/watch?v=S_4mvsxjD9w", type: "video" },
        { text: "PTSD National Center", url: "https://www.ptsd.va.gov/understand/what/index.asp", type: "article" },
        { text: "PTSD Alliance", url: "https://www.ptsdalliance.org/", type: "article" }
      ]
    },
    'trauma': {
      text: "Trauma is an emotional response to a deeply distressing event. It's important to know that trauma responses are normal reactions to abnormal situations. Healing takes time, and you deserve support throughout your journey. 🌱",
      links: [
        { text: "Trauma and Recovery", url: "https://www.youtube.com/watch?v=DxIDKZHW3-E", type: "video" },
        { text: "SAMHSA Trauma Resources", url: "https://www.samhsa.gov/trauma-informed-care", type: "article" }
      ]
    },
    'eating disorder': {
      text: "Eating disorders are serious mental health conditions that affect people of all ages, genders, and backgrounds. Recovery is possible with proper treatment and support. You deserve to have a healthy relationship with food and your body. 🌸",
      links: [
        { text: "Understanding Eating Disorders", url: "https://www.youtube.com/watch?v=vAo8_xQvO9s", type: "video" },
        { text: "National Eating Disorders Association", url: "https://www.nationaleatingdisorders.org/", type: "article" },
        { text: "NIMH Eating Disorders", url: "https://www.nimh.nih.gov/health/topics/eating-disorders", type: "article" }
      ]
    },

    // Motivational and Support
    'motivation': {
      text: "Motivation can be hard to find when you're struggling, and that's completely normal. Remember that small steps count, and you don't have to feel motivated to take action. You're doing better than you think. 🌟",
      links: [
        { text: "Finding Motivation When Depressed", url: "https://www.youtube.com/watch?v=Lp7E973zozc", type: "video" },
        { text: "Building Motivation", url: "https://www.psychologytoday.com/us/blog/click-here-happiness/201803/how-get-motivated-when-youre-depressed", type: "article" }
      ]
    },
    'hope': {
      text: "Hope can feel distant when you're in pain, but it's always there, even when you can't see it. Every day you choose to keep going is an act of courage. Your story isn't over, and better days are ahead. 🌅",
      links: [
        { text: "Finding Hope in Dark Times", url: "https://www.youtube.com/watch?v=78I9dTB9vqM", type: "video" },
        { text: "Building Hope and Resilience", url: "https://www.apa.org/topics/resilience", type: "article" }
      ]
    },
    'support': {
      text: "Everyone needs support, and asking for help is a sign of strength, not weakness. You don't have to face your challenges alone. There are people who care about you and want to help. 🤗",
      links: [
        { text: "Building Support Networks", url: "https://www.youtube.com/watch?v=F2hc2FLOdhI", type: "video" },
        { text: "NAMI Support Groups", url: "https://www.nami.org/Support-Education/Support-Groups", type: "article" },
        { text: "Crisis Support: Call 988", url: "tel:988", type: "crisis" }
      ]
    },

    // Greetings and General
    'hello': "Hello! I'm so glad you're here. It takes courage to reach out, and I want you to know that you're not alone. I'm here to provide support, information, and resources about mental health. How can I help you today? 💙",
    'hi': "Hi there! Welcome to this safe space. I'm here to listen and provide mental health support and information. What's on your mind today? 🌟",
    'hey': "Hey! Thanks for reaching out. I'm here to help with any mental health questions or concerns you might have. You've taken a brave step by being here. How are you feeling today? 🤗",
    'how are you': "Thank you for asking! I'm here and ready to support you. More importantly, how are YOU doing today? Your feelings and experiences matter. 💝",
    'thank you': "You're so welcome! Remember, seeking help and information about mental health is a sign of strength. I'm proud of you for taking care of yourself. Take care! 🌈",
    'thanks': "You're very welcome! I'm here whenever you need support or information. Remember, you're stronger than you know, and you deserve all the care and support in the world. 💪"
  };

  const getResponse = (input: string): { text: string; links?: Array<{ text: string; url: string; type?: string }> } => {
    const lowerInput = input.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(mentalHealthResponses)) {
      if (lowerInput.includes(key)) {
        if (typeof response === 'string') {
          return { text: response };
        } else {
          return response;
        }
      }
    }
    
    // Default supportive response
    return {
      text: "I hear you, and I want you to know that reaching out takes courage. While I can provide general mental health information and support, I encourage you to speak with a qualified mental health professional for personalized care. You deserve support, and help is available. Is there a specific mental health topic you'd like to learn more about? 💙",
      links: [
        { text: "Find a Therapist Near You", url: "https://www.psychologytoday.com/us/therapists", type: "article" },
        { text: "Crisis Support: Call 988", url: "tel:988", type: "crisis" },
        { text: "Mental Health Resources", url: "/education", type: "article" }
      ]
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        hasLinks: !!response.links,
        links: response.links
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const renderLinks = (links: Array<{ text: string; url: string; type?: string }>) => {
    return (
      <div className="mt-3 space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : '_self'}
            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mr-2 mb-2 ${
              link.type === 'crisis' 
                ? 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
                : link.type === 'video'
                ? 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800'
            }`}
          >
            {link.type === 'crisis' && <Phone className="h-4 w-4 mr-1" />}
            {link.type === 'video' && <ExternalLink className="h-4 w-4 mr-1" />}
            {link.type === 'article' && <ExternalLink className="h-4 w-4 mr-1" />}
            {link.text}
          </a>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mental Health Support Chat
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get instant support and answers to your mental health questions
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-[600px] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.isUser ? 'bg-blue-500' : 'bg-green-500'}`}>
                    {message.isUser ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    {message.hasLinks && message.links && !message.isUser && (
                      <div className="mt-2">
                        {renderLinks(message.links)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-700">
                    <Loader className="h-4 w-4 animate-spin text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg"
        >
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Important:</strong> This chatbot provides general information and support, 
            but it's not a substitute for professional mental health care. If you\'re experiencing 
            a crisis or need immediate help, please contact a mental health professional or 
            emergency services.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Chatbot;