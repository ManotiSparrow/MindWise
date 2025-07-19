import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, FileText, MessageCircle, AlertTriangle, Book, ExternalLink } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';

const Search = () => {
  const { searchTerm, setSearchTerm, searchResults, setSearchResults } = useSearch();
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for search - in a real app, this would come from a database
  const searchableContent = [
    // FAQ content
    {
      id: 1,
      type: 'faq',
      title: 'What is anxiety?',
      content: 'Anxiety is a natural response to stress, but when it becomes overwhelming, it can interfere with daily life. Common symptoms include excessive worry, restlessness, and physical symptoms like rapid heartbeat.',
      category: 'anxiety',
      url: '/education'
    },
    {
      id: 2,
      type: 'faq',
      title: 'How to deal with panic attacks?',
      content: 'Panic attacks can be frightening but are not dangerous. Try the 5-4-3-2-1 grounding technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.',
      category: 'anxiety',
      url: '/chatbot'
    },
    {
      id: 3,
      type: 'faq',
      title: 'What are symptoms of depression?',
      content: 'Common symptoms include persistent sadness, loss of interest in activities, changes in sleep and appetite, fatigue, difficulty concentrating, and thoughts of worthlessness or guilt.',
      category: 'depression',
      url: '/education'
    },
    {
      id: 4,
      type: 'faq',
      title: 'How to find a therapist?',
      content: 'You can search through your insurance provider, ask for referrals from your doctor, or use online directories. It\'s okay to try a few therapists to find the right fit.',
      category: 'therapy',
      url: '/chatbot'
    },
    {
      id: 5,
      type: 'faq',
      title: 'What is self-care?',
      content: 'Self-care is essential for mental health. This includes getting enough sleep, eating well, exercising, connecting with others, and doing activities you enjoy.',
      category: 'self-care',
      url: '/chatbot'
    },
    
    // Article content
    {
      id: 6,
      type: 'article',
      title: 'What to Expect in Your First Therapy Session',
      content: 'A comprehensive guide to help you prepare for and understand what happens during your first therapy appointment.',
      category: 'therapy',
      url: '/articles'
    },
    {
      id: 7,
      type: 'article',
      title: 'Understanding Panic Attacks: Signs and Coping Strategies',
      content: 'Learn to recognize panic attack symptoms and discover evidence-based techniques to manage them effectively.',
      category: 'anxiety',
      url: '/articles'
    },
    {
      id: 8,
      type: 'article',
      title: 'Mental Health in Men: Breaking the Stigma',
      content: 'Exploring the unique challenges men face in seeking mental health support and how to overcome barriers.',
      category: 'depression',
      url: '/articles'
    },
    {
      id: 9,
      type: 'article',
      title: 'Building Resilience: A Daily Practice Guide',
      content: 'Practical strategies and daily habits to build psychological resilience and improve mental well-being.',
      category: 'self-care',
      url: '/articles'
    },
    
    // Crisis resources
    {
      id: 10,
      type: 'crisis',
      title: 'National Suicide Prevention Lifeline',
      content: 'Free, confidential support 24/7. Call 988 for immediate crisis support.',
      category: 'crisis',
      url: '/crisis'
    },
    {
      id: 11,
      type: 'crisis',
      title: 'Crisis Text Line',
      content: 'Text HOME to 741741 for free, 24/7 crisis support via text message.',
      category: 'crisis',
      url: '/crisis'
    },
    {
      id: 12,
      type: 'crisis',
      title: 'Emergency Mental Health Services',
      content: 'If you\'re in immediate danger, call 911 or go to your nearest emergency room.',
      category: 'crisis',
      url: '/crisis'
    },
    
    // Education content
    {
      id: 13,
      type: 'education',
      title: 'Depression Overview',
      content: 'Understanding major depressive disorder, its symptoms, and treatment options.',
      category: 'depression',
      url: '/education'
    },
    {
      id: 14,
      type: 'education',
      title: 'Anxiety Disorders',
      content: 'Learn about anxiety disorders, panic attacks, and effective coping strategies.',
      category: 'anxiety',
      url: '/education'
    },
    {
      id: 15,
      type: 'education',
      title: 'Trauma and PTSD',
      content: 'Understanding trauma responses, PTSD symptoms, and healing approaches.',
      category: 'trauma',
      url: '/education'
    },
    {
      id: 16,
      type: 'education',
      title: 'Bipolar Disorder',
      content: 'Understanding mood episodes, triggers, and long-term management strategies.',
      category: 'bipolar',
      url: '/education'
    },
    {
      id: 17,
      type: 'education',
      title: 'ADHD Information',
      content: 'Information about attention-deficit/hyperactivity disorder across all ages.',
      category: 'adhd',
      url: '/education'
    }
  ];

  const performSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = searchableContent.filter(item => 
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.content.toLowerCase().includes(term.toLowerCase()) ||
        item.category.toLowerCase().includes(term.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  useEffect(() => {
    if (searchTerm) {
      performSearch(searchTerm);
    }
  }, [searchTerm]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'faq':
        return MessageCircle;
      case 'article':
        return FileText;
      case 'crisis':
        return AlertTriangle;
      case 'education':
        return Book;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'faq':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'article':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'crisis':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'education':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
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
            Search Results
          </h1>
          {searchTerm && (
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Results for "{searchTerm}"
            </p>
          )}
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles, FAQs, crisis resources..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white text-lg"
            />
          </div>
        </motion.div>

        {/* Search Results */}
        {isSearching ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Searching...</p>
          </motion.div>
        ) : searchResults.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </p>
            
            {searchResults.map((result, index) => {
              const Icon = getIcon(result.type);
              return (
                <motion.div
                  key={result.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                        {result.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {result.category}
                      </span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {result.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {result.content}
                  </p>
                  
                  <a
                    href={result.url}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    View More
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        ) : searchTerm ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search terms or browse our sections directly.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              <a
                href="/education"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Education
              </a>
              <a
                href="/articles"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Articles
              </a>
              <a
                href="/chatbot"
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Chatbot
              </a>
              <a
                href="/crisis"
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Crisis Help
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Start your search
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enter a search term to find relevant mental health resources, articles, and information.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Search;