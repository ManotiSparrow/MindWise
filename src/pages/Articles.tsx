import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock, User, ArrowRight, Filter } from 'lucide-react';

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', count: 35 },
    { id: 'anxiety', name: 'Anxiety', count: 8 },
    { id: 'depression', name: 'Depression', count: 7 },
    { id: 'therapy', name: 'Therapy', count: 6 },
    { id: 'self-care', name: 'Self-Care', count: 5 },
    { id: 'relationships', name: 'Relationships', count: 4 },
    { id: 'stress', name: 'Stress', count: 3 },
    { id: 'trauma', name: 'Trauma', count: 2 }
  ];

  const internalArticles = [
    {
      id: 1,
      title: "What to Expect in Your First Therapy Session",
      summary: "A comprehensive guide to help you prepare for and understand what happens during your first therapy appointment.",
      category: "therapy",
      readTime: "6 min read",
      author: "Dr. Sarah Johnson",
      image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: "Starting therapy can feel overwhelming, but knowing what to expect can help ease your anxiety...",
      isInternal: true
    },
    {
      id: 2,
      title: "Understanding Panic Attacks: Signs and Coping Strategies",
      summary: "Learn to recognize panic attack symptoms and discover evidence-based techniques to manage them effectively.",
      category: "anxiety",
      readTime: "8 min read",
      author: "Dr. Michael Chen",
      image: "https://images.pexels.com/photos/3807629/pexels-photo-3807629.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: "Panic attacks can be frightening experiences, but understanding them is the first step to managing them...",
      isInternal: true
    },
    {
      id: 3,
      title: "Mental Health in Men: Breaking the Stigma",
      summary: "Exploring the unique challenges men face in seeking mental health support and how to overcome barriers.",
      category: "depression",
      readTime: "7 min read",
      author: "Dr. Alex Rodriguez",
      image: "https://images.pexels.com/photos/1415276/pexels-photo-1415276.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: "Men often face unique challenges when it comes to mental health, including societal expectations...",
      isInternal: true
    },
    {
      id: 4,
      title: "Building Resilience: A Daily Practice Guide",
      summary: "Practical strategies and daily habits to build psychological resilience and improve mental well-being.",
      category: "self-care",
      readTime: "5 min read",
      author: "Dr. Emily Thompson",
      image: "https://images.pexels.com/photos/2416472/pexels-photo-2416472.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: "Resilience is not something you're born with – it's a skill that can be developed...",
      isInternal: true
    },
    {
      id: 5,
      title: "The Science of Mindfulness and Mental Health",
      summary: "Discover how mindfulness practices can transform your mental health based on latest research findings.",
      category: "self-care",
      readTime: "9 min read",
      author: "Dr. Lisa Wang",
      image: "https://images.pexels.com/photos/1472887/pexels-photo-1472887.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: "Mindfulness has been shown to have profound effects on mental health and well-being...",
      isInternal: true
    },
    {
      id: 6,
      title: "Healthy Boundaries in Relationships",
      summary: "Learn how to establish and maintain healthy boundaries to protect your mental health in relationships.",
      category: "relationships",
      readTime: "6 min read",
      author: "Dr. Maria Garcia",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: "Healthy boundaries are essential for maintaining your mental health and well-being...",
      isInternal: true
    },
    {
      id: 7,
      title: "Coping with Seasonal Affective Disorder",
      summary: "Understanding SAD and practical strategies to manage seasonal depression symptoms.",
      category: "depression",
      readTime: "7 min read",
      author: "Dr. Jennifer Lee",
      image: "https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: "Seasonal Affective Disorder affects millions of people during darker months...",
      isInternal: true
    },
    {
      id: 8,
      title: "Managing Work-Related Stress and Burnout",
      summary: "Identify signs of workplace burnout and learn effective strategies for managing professional stress.",
      category: "stress",
      readTime: "8 min read",
      author: "Dr. Robert Kim",
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: "Work-related stress has become increasingly common in today's fast-paced world...",
      isInternal: true
    }
  ];

  const externalArticles = [
    {
      id: 9,
      title: "Depression: What You Need to Know",
      summary: "Comprehensive information about depression symptoms, causes, and treatment options from NIMH.",
      category: "depression",
      readTime: "10 min read",
      source: "NIMH",
      url: "https://www.nimh.nih.gov/health/topics/depression",
      image: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 10,
      title: "Anxiety Disorders: Types and Treatments",
      summary: "Detailed guide to understanding different anxiety disorders and available treatment approaches.",
      category: "anxiety",
      readTime: "12 min read",
      source: "ADAA",
      url: "https://adaa.org/understanding-anxiety",
      image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 11,
      title: "Managing Stress at Work",
      summary: "Practical strategies for managing workplace stress and maintaining work-life balance.",
      category: "stress",
      readTime: "8 min read",
      source: "APA",
      url: "https://www.apa.org/topics/stress",
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 12,
      title: "Self-Care Strategies for Mental Health",
      summary: "Evidence-based self-care practices that can improve your mental health and well-being.",
      category: "self-care",
      readTime: "7 min read",
      source: "MentalHealth.gov",
      url: "https://www.mentalhealth.gov/basics/what-is-mental-health",
      image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 13,
      title: "PTSD: National Center for PTSD",
      summary: "Comprehensive resource for understanding post-traumatic stress disorder and treatment options.",
      category: "trauma",
      readTime: "15 min read",
      source: "VA.gov",
      url: "https://www.ptsd.va.gov/understand/what/index.asp",
      image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 14,
      title: "Bipolar Disorder Guide",
      summary: "Understanding bipolar disorder symptoms, diagnosis, and treatment from NAMI.",
      category: "depression",
      readTime: "11 min read",
      source: "NAMI",
      url: "https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Bipolar-Disorder",
      image: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 15,
      title: "Finding Mental Health Treatment",
      summary: "Step-by-step guide to finding and accessing mental health treatment and support services.",
      category: "therapy",
      readTime: "9 min read",
      source: "SAMHSA",
      url: "https://www.samhsa.gov/find-help/national-helpline",
      image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 16,
      title: "Panic Disorder Information",
      summary: "Detailed information about panic disorder, symptoms, and evidence-based treatments.",
      category: "anxiety",
      readTime: "8 min read",
      source: "NIMH",
      url: "https://www.nimh.nih.gov/health/topics/panic-disorder",
      image: "https://images.pexels.com/photos/3807629/pexels-photo-3807629.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 17,
      title: "Social Anxiety Disorder",
      summary: "Understanding social anxiety disorder and effective treatment approaches.",
      category: "anxiety",
      readTime: "10 min read",
      source: "ADAA",
      url: "https://adaa.org/understanding-anxiety/social-anxiety-disorder",
      image: "https://images.pexels.com/photos/3807629/pexels-photo-3807629.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 18,
      title: "Eating Disorders Information",
      summary: "Comprehensive guide to understanding eating disorders and recovery resources.",
      category: "therapy",
      readTime: "12 min read",
      source: "NEDA",
      url: "https://www.nationaleatingdisorders.org/learn",
      image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 19,
      title: "ADHD in Adults",
      summary: "Understanding adult ADHD symptoms, diagnosis, and treatment options.",
      category: "therapy",
      readTime: "9 min read",
      source: "CHADD",
      url: "https://chadd.org/about-adhd/overview/",
      image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 20,
      title: "Substance Use and Mental Health",
      summary: "Understanding the connection between substance use and mental health conditions.",
      category: "therapy",
      readTime: "11 min read",
      source: "SAMHSA",
      url: "https://www.samhsa.gov/find-help/disorders",
      image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 21,
      title: "Mindfulness and Mental Health",
      summary: "Research-backed information on how mindfulness practices support mental wellness.",
      category: "self-care",
      readTime: "8 min read",
      source: "Harvard Health",
      url: "https://www.health.harvard.edu/blog/mindfulness-meditation-may-ease-anxiety-mental-stress-201401086967",
      image: "https://images.pexels.com/photos/1472887/pexels-photo-1472887.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 22,
      title: "Sleep and Mental Health",
      summary: "Understanding the crucial connection between sleep quality and mental health.",
      category: "self-care",
      readTime: "7 min read",
      source: "Sleep Foundation",
      url: "https://www.sleepfoundation.org/mental-health",
      image: "https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 23,
      title: "Relationship and Mental Health",
      summary: "How healthy relationships support mental wellness and recovery.",
      category: "relationships",
      readTime: "9 min read",
      source: "Psychology Today",
      url: "https://www.psychologytoday.com/us/basics/relationships",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 24,
      title: "Grief and Loss Support",
      summary: "Understanding the grieving process and finding support during difficult times.",
      category: "therapy",
      readTime: "10 min read",
      source: "APA",
      url: "https://www.apa.org/topics/grief",
      image: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 25,
      title: "Teen Mental Health Resources",
      summary: "Mental health information and resources specifically for teenagers and young adults.",
      category: "anxiety",
      readTime: "8 min read",
      source: "NAMI",
      url: "https://www.nami.org/Your-Journey/Kids-Teens-and-Young-Adults",
      image: "https://images.pexels.com/photos/3807629/pexels-photo-3807629.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 26,
      title: "Workplace Mental Health",
      summary: "Creating mentally healthy workplaces and supporting employee wellbeing.",
      category: "stress",
      readTime: "11 min read",
      source: "WHO",
      url: "https://www.who.int/news-room/fact-sheets/detail/mental-disorders",
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    },
    {
      id: 27,
      title: "Trauma-Informed Care",
      summary: "Understanding trauma-informed approaches to mental health care and healing.",
      category: "trauma",
      readTime: "13 min read",
      source: "SAMHSA",
      url: "https://www.samhsa.gov/trauma-informed-care",
      image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800",
      isInternal: false
    }
  ];

  const allArticles = [...internalArticles, ...externalArticles];

  const filteredArticles = selectedCategory === 'all' 
    ? allArticles 
    : allArticles.filter(article => article.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Articles Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our collection of mental health articles, resources, and expert insights 
            to support your journey to better mental wellness.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter by Category</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    article.isInternal 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {article.isInternal ? 'Internal' : 'External'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium capitalize">
                    {article.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {article.isInternal ? article.author : article.source}
                  </div>
                </div>
                
                {article.isInternal ? (
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    Read on {article.source}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No articles found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Articles;