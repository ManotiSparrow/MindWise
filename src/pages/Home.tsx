import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Book, AlertTriangle, Heart, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  
  const affirmations = [
    "You are not alone in your journey.",
    "Today is a new chance to heal.",
    "Your mental health matters.",
    "It's okay to ask for help.",
    "You are stronger than you know.",
    "Progress, not perfection.",
    "You deserve peace and happiness.",
    "Every step forward counts."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation(prev => (prev + 1) % affirmations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredArticle = {
    title: "Understanding Anxiety: A Comprehensive Guide",
    summary: "Learn about anxiety disorders, their symptoms, and effective coping strategies that can help you manage daily challenges.",
    readTime: "8 min read",
    category: "Anxiety"
  };

  const quickAccessButtons = [
    {
      title: "Chat Now",
      description: "Get instant support and answers to your questions",
      icon: MessageCircle,
      path: "/chatbot",
      color: "bg-blue-500 hover:bg-blue-600",
      priority: true
    },
    {
      title: "Explore Topics",
      description: "Learn about different mental health conditions",
      icon: Book,
      path: "/education",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "In Crisis?",
      description: "Get immediate help and emergency resources",
      icon: AlertTriangle,
      path: "/crisis",
      color: "bg-red-500 hover:bg-red-600",
      priority: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Your Mental Health
            <span className="text-primary block">Matters</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            A safe space for mental health support, education, and resources. 
            We're here to help you navigate your journey to better mental wellness.
          </motion.p>

          {/* Daily Affirmation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-secondary rounded-2xl p-6 mb-12 max-w-2xl mx-auto shadow-card"
          >
            <Heart className="h-8 w-8 text-crisis mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Daily Affirmation</h3>
            <motion.p
              key={currentAffirmation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-muted-foreground text-lg italic"
            >
              "{affirmations[currentAffirmation]}"
            </motion.p>
          </motion.div>

          {/* Quick Access Buttons */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickAccessButtons.map((button, index) => (
              <motion.div
                key={button.title}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link
                  to={button.path}
                  className={`block ${button.color} text-white rounded-2xl p-6 hover:scale-105 transition-bounce shadow-button hover:shadow-soft ${button.priority ? 'ring-2 ring-white/20' : ''}`}
                >
                  <button.icon className="h-8 w-8 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{button.title}</h3>
                  <p className="text-white/90">{button.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Featured Article of the Day
            </h2>
            <div className="bg-gradient-primary rounded-3xl p-8 text-white max-w-4xl mx-auto shadow-soft">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-6 w-6 mr-2" />
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {featuredArticle.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{featuredArticle.title}</h3>
              <p className="text-white/90 mb-6 text-lg">{featuredArticle.summary}</p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <span className="text-white/80">{featuredArticle.readTime}</span>
              </div>
              <Link
                to="/articles"
                className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-smooth shadow-button"
              >
                Read Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that mental health support should be accessible, compassionate, and stigma-free. 
              Our platform provides educational resources, crisis support, and a safe space for individuals 
              to learn about mental health conditions and find the help they need. Whether you're looking 
              for immediate support or want to learn more about mental wellness, we're here to guide you 
              on your journey to better mental health.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;