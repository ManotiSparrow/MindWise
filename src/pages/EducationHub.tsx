import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Play, HelpCircle } from 'lucide-react';

const EducationHub = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const topics = [
    {
      id: 'depression',
      title: 'Depression',
      description: 'Understanding major depressive disorder, its symptoms, and treatment options.',
      color: 'bg-blue-500',
      faqs: [
        {
          question: 'What are the main symptoms of depression?',
          answer: 'Common symptoms include persistent sadness, loss of interest in activities, changes in sleep and appetite, fatigue, difficulty concentrating, and thoughts of worthlessness or guilt. These symptoms must persist for at least two weeks and significantly impact daily functioning.'
        },
        {
          question: 'How is depression diagnosed?',
          answer: 'Depression is diagnosed through clinical interviews, symptom assessments, and sometimes psychological testing by qualified mental health professionals. There is no single test for depression - diagnosis is based on symptoms, duration, and impact on functioning.'
        },
        {
          question: 'What treatments are available for depression?',
          answer: 'Treatment options include psychotherapy (like CBT, IPT), medication (antidepressants), lifestyle changes (exercise, sleep hygiene), and in severe cases, other interventions like ECT. Most effective treatment plans combine multiple approaches.'
        },
        {
          question: 'Can depression be prevented?',
          answer: 'While not all depression can be prevented, maintaining good mental health practices like regular exercise, healthy relationships, stress management, and seeking help early can reduce risk and severity.'
        }
      ],
      videoId: 'z-IR48Mb3W0',
      externalLinks: [
        { title: 'WHO Depression Fact Sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/depression' },
        { title: 'NAMI Depression Guide', url: 'https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Depression' },
        { title: 'NIMH Depression Information', url: 'https://www.nimh.nih.gov/health/topics/depression' },
        { title: 'Depression and Bipolar Support Alliance', url: 'https://www.dbsalliance.org/education/depression/' }
      ]
    },
    {
      id: 'anxiety',
      title: 'Anxiety',
      description: 'Learn about anxiety disorders, panic attacks, and effective coping strategies.',
      color: 'bg-green-500',
      faqs: [
        {
          question: 'What is the difference between normal anxiety and an anxiety disorder?',
          answer: 'Normal anxiety is temporary and situational, while anxiety disorders involve persistent, excessive worry that interferes with daily functioning for at least 6 months. Anxiety disorders are more intense, frequent, and disproportionate to the actual threat.'
        },
        {
          question: 'What are common types of anxiety disorders?',
          answer: 'Common types include generalized anxiety disorder (GAD), panic disorder, social anxiety disorder, specific phobias, agoraphobia, and separation anxiety disorder. Each has distinct symptoms and triggers.'
        },
        {
          question: 'How can I manage anxiety symptoms?',
          answer: 'Strategies include deep breathing exercises, progressive muscle relaxation, mindfulness meditation, regular exercise, limiting caffeine, maintaining a routine, and seeking professional help when needed. Cognitive-behavioral techniques are particularly effective.'
        },
        {
          question: 'What should I do during a panic attack?',
          answer: 'Use grounding techniques like the 5-4-3-2-1 method, practice slow deep breathing, remind yourself it will pass, and avoid fighting the feelings. Having a panic attack plan prepared in advance can be very helpful.'
        }
      ],
      videoId: 'WWloIAQpMcQ',
      externalLinks: [
        { title: 'Anxiety and Depression Association', url: 'https://adaa.org/understanding-anxiety' },
        { title: 'NIMH Anxiety Disorders', url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders' },
        { title: 'Social Anxiety Disorder Resources', url: 'https://adaa.org/understanding-anxiety/social-anxiety-disorder' },
        { title: 'Panic Disorder Information', url: 'https://www.nimh.nih.gov/health/topics/panic-disorder' }
      ]
    },
    {
      id: 'trauma',
      title: 'Trauma & PTSD',
      description: 'Understanding trauma responses, PTSD symptoms, and healing approaches.',
      color: 'bg-purple-500',
      faqs: [
        {
          question: 'What is trauma?',
          answer: 'Trauma is an emotional response to a deeply distressing or disturbing event that overwhelms an individual\'s ability to cope. It can result from single incidents or repeated experiences and affects people differently.'
        },
        {
          question: 'What are symptoms of PTSD?',
          answer: 'PTSD symptoms include intrusive memories (flashbacks, nightmares), avoidance of trauma reminders, negative changes in thinking and mood, and changes in physical and emotional reactions (hypervigilance, exaggerated startle response).'
        },
        {
          question: 'How is trauma treated?',
          answer: 'Evidence-based treatments include trauma-focused therapy (EMDR, CPT, PE), cognitive behavioral therapy, medication for symptoms, and complementary approaches like mindfulness and yoga. Treatment should be individualized.'
        },
        {
          question: 'Can trauma be healed?',
          answer: 'Yes, trauma can be healed with appropriate treatment and support. While the memories may remain, their emotional impact can be significantly reduced, and people can learn to live fulfilling lives after trauma.'
        }
      ],
      videoId: 'S_4mvsxjD9w',
      externalLinks: [
        { title: 'PTSD Alliance', url: 'https://www.ptsdalliance.org/' },
        { title: 'SAMHSA Trauma Resources', url: 'https://www.samhsa.gov/trauma-informed-care' },
        { title: 'National Center for PTSD', url: 'https://www.ptsd.va.gov/' },
        { title: 'International Society for Traumatic Stress Studies', url: 'https://istss.org/' }
      ]
    },
    {
      id: 'bipolar',
      title: 'Bipolar Disorder',
      description: 'Understanding mood episodes, triggers, and long-term management strategies.',
      color: 'bg-yellow-500',
      faqs: [
        {
          question: 'What is bipolar disorder?',
          answer: 'Bipolar disorder is a mental health condition characterized by extreme mood swings including emotional highs (mania or hypomania) and lows (depression). These mood episodes significantly impact functioning and relationships.'
        },
        {
          question: 'What are the types of bipolar disorder?',
          answer: 'Main types include Bipolar I (full manic episodes), Bipolar II (hypomanic and major depressive episodes), Cyclothymic disorder (numerous periods of hypomanic and depressive symptoms), and other specified bipolar disorders.'
        },
        {
          question: 'How is bipolar disorder managed?',
          answer: 'Management typically involves mood stabilizing medications, psychotherapy (especially psychoeducation and CBT), lifestyle modifications, stress management, and consistent monitoring by healthcare providers. Treatment is usually lifelong.'
        },
        {
          question: 'What triggers bipolar episodes?',
          answer: 'Common triggers include stress, sleep disruption, substance use, medication changes, seasonal changes, and major life events. Identifying personal triggers is important for prevention and management.'
        }
      ],
      videoId: 'rAZ8KzAy2bw',
      externalLinks: [
        { title: 'International Bipolar Foundation', url: 'https://ibpf.org/' },
        { title: 'NAMI Bipolar Disorder', url: 'https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Bipolar-Disorder' },
        { title: 'Depression and Bipolar Support Alliance', url: 'https://www.dbsalliance.org/' },
        { title: 'NIMH Bipolar Disorder', url: 'https://www.nimh.nih.gov/health/topics/bipolar-disorder' }
      ]
    },
    {
      id: 'adhd',
      title: 'ADHD',
      description: 'Information about attention-deficit/hyperactivity disorder across all ages.',
      color: 'bg-orange-500',
      faqs: [
        {
          question: 'What are the main symptoms of ADHD?',
          answer: 'ADHD symptoms include inattention (difficulty focusing, forgetfulness, disorganization), hyperactivity (restlessness, excessive talking), and impulsivity (interrupting, difficulty waiting) that interfere with functioning or development.'
        },
        {
          question: 'Is ADHD only a childhood disorder?',
          answer: 'No, ADHD can persist into adulthood. Many adults are diagnosed later in life after recognizing symptoms. Adult ADHD may present differently, with less hyperactivity but continued attention and executive function challenges.'
        },
        {
          question: 'What treatments are available for ADHD?',
          answer: 'Treatment options include behavioral therapy, medication (stimulants and non-stimulants), lifestyle modifications (exercise, sleep, nutrition), educational accommodations, and skills training for organization and time management.'
        },
        {
          question: 'How is ADHD diagnosed?',
          answer: 'ADHD diagnosis involves comprehensive evaluation including clinical interviews, symptom rating scales, medical examination, and sometimes psychological testing. Symptoms must be present in multiple settings and cause significant impairment.'
        }
      ],
      videoId: 'yoX0vEDn5a4',
      externalLinks: [
        { title: 'CHADD ADHD Resources', url: 'https://chadd.org/' },
        { title: 'CDC ADHD Information', url: 'https://www.cdc.gov/ncbddd/adhd/' },
        { title: 'ADHD Foundation', url: 'https://www.adhdfoundation.org.uk/' },
        { title: 'Adult ADHD Self-Report Scale', url: 'https://www.hcp.med.harvard.edu/ncs/asrs.php' }
      ]
    },
    {
      id: 'eating-disorders',
      title: 'Eating Disorders',
      description: 'Understanding different types of eating disorders and recovery approaches.',
      color: 'bg-pink-500',
      faqs: [
        {
          question: 'What are common types of eating disorders?',
          answer: 'Common types include anorexia nervosa (restriction leading to low weight), bulimia nervosa (binge-purge cycles), binge eating disorder (recurrent binge episodes), and other specified feeding or eating disorders (OSFED).'
        },
        {
          question: 'What causes eating disorders?',
          answer: 'Eating disorders result from a complex interaction of genetic, biological, psychological, and sociocultural factors. Risk factors include genetics, personality traits, trauma, dieting, and cultural pressures around body image.'
        },
        {
          question: 'How are eating disorders treated?',
          answer: 'Treatment typically involves a multidisciplinary approach including psychotherapy (FBT, CBT, DBT), nutritional counseling, medical monitoring, and sometimes medication. Early intervention improves outcomes significantly.'
        },
        {
          question: 'Can eating disorders be fully recovered from?',
          answer: 'Yes, full recovery from eating disorders is possible with appropriate treatment and support. Recovery is a process that involves both physical and psychological healing, and many people go on to live healthy, fulfilling lives.'
        }
      ],
      videoId: 'vAo8_xQvO9s',
      externalLinks: [
        { title: 'National Eating Disorders Association', url: 'https://www.nationaleatingdisorders.org/' },
        { title: 'NIMH Eating Disorders', url: 'https://www.nimh.nih.gov/health/topics/eating-disorders' },
        { title: 'Beat Eating Disorders', url: 'https://www.beateatingdisorders.org.uk/' },
        { title: 'Academy for Eating Disorders', url: 'https://www.aedweb.org/' }
      ]
    },
    {
      id: 'substance-use',
      title: 'Substance Use Disorders',
      description: 'Understanding addiction, dual diagnosis, and recovery resources.',
      color: 'bg-red-500',
      faqs: [
        {
          question: 'What is a substance use disorder?',
          answer: 'A substance use disorder is a medical condition characterized by the inability to control use of substances despite harmful consequences. It involves changes in brain circuits related to reward, stress, and self-control.'
        },
        {
          question: 'How are substance use disorders related to mental health?',
          answer: 'Substance use disorders often co-occur with mental health conditions (dual diagnosis). Substances may be used to self-medicate mental health symptoms, or substance use may trigger or worsen mental health conditions.'
        },
        {
          question: 'What treatment options are available?',
          answer: 'Treatment may include detoxification, behavioral therapy, medication-assisted treatment, support groups (AA, NA), residential treatment, and integrated treatment for co-occurring mental health conditions.'
        },
        {
          question: 'Is addiction a choice or a disease?',
          answer: 'Addiction is recognized as a chronic medical disease. While initial substance use may involve choice, addiction involves brain changes that make it extremely difficult to stop without professional help and support.'
        }
      ],
      videoId: 'b2emgrRRT18',
      externalLinks: [
        { title: 'SAMHSA National Helpline', url: 'https://www.samhsa.gov/find-help/national-helpline' },
        { title: 'National Institute on Drug Abuse', url: 'https://www.drugabuse.gov/' },
        { title: 'Alcoholics Anonymous', url: 'https://www.aa.org/' },
        { title: 'Narcotics Anonymous', url: 'https://www.na.org/' }
      ]
    }
  ];

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Education Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive resources and information about mental health conditions, 
            treatments, and coping strategies.
          </p>
        </motion.div>

        <div className="space-y-6">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${topic.color}`} />
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {topic.description}
                    </p>
                  </div>
                </div>
                {expandedTopic === topic.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {expandedTopic === topic.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6 space-y-8">
                    {/* FAQs Section */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Frequently Asked Questions
                      </h4>
                      <div className="space-y-4">
                        {topic.faqs.map((faq, faqIndex) => (
                          <div key={faqIndex} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                              {faq.question}
                            </h5>
                            <p className="text-gray-600 dark:text-gray-300">
                              {faq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Video Section */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Play className="h-5 w-5 mr-2" />
                        Educational Video
                      </h4>
                      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${topic.videoId}`}
                          title={`${topic.title} Educational Video`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>

                    {/* External Links */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <ExternalLink className="h-5 w-5 mr-2" />
                        Additional Resources
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {topic.externalLinks.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                          >
                            <span className="text-gray-900 dark:text-white font-medium">
                              {link.title}
                            </span>
                            <ExternalLink className="h-4 w-4 text-gray-500" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EducationHub;