import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Clock, AlertTriangle, Heart, Globe, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const CrisisHelp = () => {
  const [userLocation, setUserLocation] = useState<string>('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    // Get user's location for localized resources
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use reverse geocoding API
          // For demo purposes, we'll simulate location detection
          setUserLocation('United States');
        },
        (error) => {
          console.log('Location access denied');
          setUserLocation('Global');
        }
      );
    }
  }, []);

  const emergencyContacts = [
    {
      name: "Befrienders Kenya",
      number: "0722 178 177",
      description: "Emotional support and suicide prevention",
      availability: "24/7",
      country: "Kenya",
      type: "phone"
    },
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "Free, confidential support 24/7",
      availability: "24/7",
      country: "United States",
      type: "phone"
    },
    {
      name: "Crisis Text Line",
      number: "741741",
      description: "Text HOME to 741741",
      availability: "24/7",
      country: "United States",
      type: "text"
    },
    {
      name: "Samaritans",
      number: "116 123",
      description: "Free support for anyone in distress",
      availability: "24/7",
      country: "United Kingdom",
      type: "phone"
    },
    {
      name: "Lifeline Australia",
      number: "13 11 14",
      description: "Crisis support and suicide prevention",
      availability: "24/7",
      country: "Australia",
      type: "phone"
    },
    {
      name: "Canada Suicide Prevention Service",
      number: "1-833-456-4566",
      description: "24/7 support in English and French",
      availability: "24/7",
      country: "Canada",
      type: "phone"
    },
    {
      name: "SANE Australia",
      number: "1800 187 263",
      description: "Mental health support and information",
      availability: "10am-10pm AEST",
      country: "Australia",
      type: "phone"
    },
    {
      name: "Crisis Line (South Africa)",
      number: "0800 567 567",
      description: "24-hour crisis counseling",
      availability: "24/7",
      country: "South Africa",
      type: "phone"
    }
  ];

  const crisisSteps = [
    {
      step: 1,
      title: "Ensure Immediate Safety",
      description: "If you or someone else is in immediate danger, call emergency services (911, 999, etc.) right away.",
      icon: AlertTriangle,
      color: "bg-red-500"
    },
    {
      step: 2,
      title: "Reach Out for Support",
      description: "Contact a crisis hotline, trusted friend, family member, or mental health professional.",
      icon: Phone,
      color: "bg-blue-500"
    },
    {
      step: 3,
      title: "Remove Harmful Items",
      description: "If possible, remove or secure any items that could be used for self-harm.",
      icon: Heart,
      color: "bg-green-500"
    },
    {
      step: 4,
      title: "Stay Connected",
      description: "Don't isolate yourself. Stay with someone you trust or in a safe public place.",
      icon: MessageCircle,
      color: "bg-purple-500"
    },
    {
      step: 5,
      title: "Follow Up",
      description: "After the immediate crisis, follow up with professional help and create a safety plan.",
      icon: Clock,
      color: "bg-orange-500"
    }
  ];

  const localResources = [
    {
      name: "Community Mental Health Centers",
      description: "Local mental health services and support groups",
      contact: "Search online or call 211 for local resources",
      link: "https://www.samhsa.gov/find-help/national-helpline"
    },
    {
      name: "Hospital Emergency Rooms",
      description: "24/7 emergency mental health services",
      contact: "Visit nearest emergency room",
      link: null
    },
    {
      name: "Mobile Crisis Teams",
      description: "Mental health professionals who come to you",
      contact: "Available in many communities - call 211",
      link: "https://www.nami.org/help"
    },
    {
      name: "Peer Support Groups",
      description: "Connect with others who understand your experience",
      contact: "NAMI, DBSA, and other organizations offer groups",
      link: "https://www.nami.org/Support-Education/Support-Groups"
    }
  ];

  const mentalHealthVideos = [
    {
      title: "What to Do in a Mental Health Crisis",
      description: "Practical steps for managing mental health emergencies",
      url: "https://www.youtube.com/watch?v=WcSUs9iZv-g",
      duration: "8 min"
    },
    {
      title: "Suicide Prevention: How to Help Someone",
      description: "Learn warning signs and how to support someone in crisis",
      url: "https://www.youtube.com/watch?v=2X4qySqsYP8",
      duration: "12 min"
    },
    {
      title: "Coping with Suicidal Thoughts",
      description: "Strategies for managing difficult thoughts and feelings",
      url: "https://www.youtube.com/watch?v=45Q4ZbcvKaI",
      duration: "15 min"
    },
    {
      title: "Mental Health First Aid",
      description: "Basic skills for helping someone experiencing a mental health crisis",
      url: "https://www.youtube.com/watch?v=3T3oj8Dw8ks",
      duration: "10 min"
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Emergency Banner */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-red-500 text-white rounded-2xl p-8 mb-8 text-center"
        >
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">NEED IMMEDIATE HELP?</h1>
          <p className="text-xl mb-6">
            If you're in crisis or having thoughts of self-harm, please reach out immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:988"
              className="bg-white text-red-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call 988 (US)
            </a>
            <a
              href="sms:741741"
              className="bg-white text-red-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Text 741741
            </a>
            <a
              href="tel:911"
              className="bg-yellow-400 text-red-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Emergency: 911
            </a>
          </div>
        </motion.div>

        {/* Location-Based Resources */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <MapPin className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Crisis Resources {userLocation && `for ${userLocation}`}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {contact.type === 'phone' ? (
                    <Phone className="h-6 w-6 text-green-500 mr-2" />
                  ) : (
                    <MessageCircle className="h-6 w-6 text-blue-500 mr-2" />
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {contact.country}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {contact.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {contact.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {contact.number}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {contact.availability}
                  </span>
                </div>
                
                <a
                  href={contact.type === 'phone' ? `tel:${contact.number}` : `sms:${contact.number}`}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {contact.type === 'phone' ? 'Call Now' : 'Text Now'}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What to Do in Crisis */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            What to Do in a Crisis
          </h2>
          
          <div className="space-y-4">
            {crisisSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start">
                  <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Step {step.step}: {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Educational Videos */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => toggleSection('videos')}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Crisis Support Videos
            </h2>
            {expandedSection === 'videos' ? (
              <ChevronUp className="h-6 w-6 text-gray-500" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'videos' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {mentalHealthVideos.map((video, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Duration: {video.duration}
                    </span>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      Watch Video
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Local Resources */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <button
            onClick={() => toggleSection('local')}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Local Mental Health Resources
            </h2>
            {expandedSection === 'local' ? (
              <ChevronUp className="h-6 w-6 text-gray-500" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'local' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {localResources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {resource.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {resource.description}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                    {resource.contact}
                  </p>
                  {resource.link && (
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                      Learn More
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* International Resources */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Globe className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              International Crisis Resources
            </h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For crisis resources in other countries, visit:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://findahelpline.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Find a Helpline
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Global directory of crisis helplines
                </p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </a>
            
            <a
              href="https://www.iasp.info/resources/Crisis_Centres/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  IASP Crisis Centres
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  International Association for Suicide Prevention
                </p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </a>
            
            <a
              href="https://www.befrienders.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Befrienders Worldwide
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Global network of emotional support centers
                </p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </a>
            
            <a
              href="https://www.opencounseling.com/suicide-hotlines"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  International Suicide Hotlines
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Comprehensive list by country
                </p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CrisisHelp;