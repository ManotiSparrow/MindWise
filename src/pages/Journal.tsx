import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

interface JournalEntry {
  id: string;
  content: string;
  date: string;
}

const aiPrompts = [
  "What made you smile today?",  
  "Describe a small act of kindness you witnessed or received.",  
  "What’s something new you learned recently?",  
  "Write about a place that makes you feel at peace.",  
  "What’s a fear or worry you’d like to let go of?",  
  "How have you grown in the past year?",  
  "What’s a habit you’d like to start or break?",  
  "Describe a book, movie, or song that deeply impacted you.",  
  "What does self-care look like for you today?",  
  "Write a letter to your future self.",  
  "What’s a difficult decision you’ve had to make recently?",  
  "Who inspires you and why?",  
  "What’s something you’d like to forgive yourself for?",  
  "Describe a time when you stepped out of your comfort zone.",  
  "What’s a lesson you’ve learned from a past mistake?",  
  "How do you recharge when you’re feeling drained?",  
  "What’s a personal strength you often overlook?",  
  "Write about a dream or aspiration you haven’t shared with anyone.",  
  "What’s something you appreciate about your body or mind?",  
  "Describe your ideal day in detail.",  
  "What’s a challenge you’re currently facing, and how can you approach it?",  
  "What’s a piece of advice you’d give your younger self?",  
  "How do you define happiness, and are you pursuing it?",  
  "What’s a boundary you need to set or reinforce?",  
  "Write about a time when you felt truly understood.",  
];

function mockAIAnalysis(text: string) {
  // Simple mock: positive if contains 'happy', negative if 'sad', else neutral
  const lower = text.toLowerCase();
  let sentiment = 'neutral';
  let feedback = "Thank you for sharing your thoughts.";
  if (lower.includes('happy') || lower.includes('grateful') || lower.includes('proud')) {
    sentiment = 'positive';
    feedback = "Your entry radiates positivity! Keep it up.";
  } else if (lower.includes('sad') || lower.includes('angry') || lower.includes('upset')) {
    sentiment = 'negative';
    feedback = "It's okay to have tough days. Remember, you're not alone.";
  }
  return { sentiment, feedback };
}

const Journal = () => {
  const navigate = useNavigate();
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [lastAnalysis, setLastAnalysis] = useState<{sentiment: string, feedback: string} | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(currentUser);
    setUserEmail(user.email);
    const saved = localStorage.getItem(`journal_${user.email}`);
    setEntries(saved ? JSON.parse(saved) : []);
    setAiPrompt(aiPrompts[Math.floor(Math.random() * aiPrompts.length)]);
  }, [navigate]);

  const handleSave = () => {
    if (!entry.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: entry,
      date: new Date().toLocaleString(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    setEntry('');
    localStorage.setItem(`journal_${userEmail}`, JSON.stringify(updated));
    // AI analysis
    setLastAnalysis(mockAIAnalysis(newEntry.content));
    // New prompt for next entry
    setAiPrompt(aiPrompts[Math.floor(Math.random() * aiPrompts.length)]);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-start py-12 px-2 md:px-0">
      <div className="max-w-2xl w-full mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-purple-400 p-4 rounded-full shadow-lg mb-2">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight text-center drop-shadow-soft">My Journal</h1>
          <p className="text-lg text-muted-foreground text-center max-w-xl">Reflect, express, and grow. Your private space for thoughts, gratitude, and self-discovery.</p>
        </div>
        <div className="bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-card p-6 mb-8 border border-border backdrop-blur-md">
          {aiPrompt && (
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 rounded-xl text-blue-900 dark:text-blue-100 text-center shadow-soft">
              <span className="font-semibold">AI Prompt:</span> {aiPrompt}
            </div>
          )}
          <textarea
            className="w-full h-32 p-4 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-smooth bg-white/80 dark:bg-gray-800/80 text-lg resize-none mb-4 shadow-inner"
            placeholder="Write your thoughts..."
            value={entry}
            onChange={e => setEntry(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold text-lg shadow-button transition-bounce mb-4"
          >
            Save Entry
          </button>
          {lastAnalysis && (
            <div className="mb-2 p-4 rounded-xl border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 shadow-soft">
              <div className="font-semibold mb-1">AI Analysis:</div>
              <div>Sentiment: <span className="capitalize font-bold">{lastAnalysis.sentiment}</span></div>
              <div>{lastAnalysis.feedback}</div>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">Previous Entries</h2>
          {entries.length === 0 ? (
            <p className="text-gray-500 text-center">No entries yet.</p>
          ) : (
            <ul className="space-y-6">
              {entries.map((e, idx) => (
                <li key={e.id} className="relative group">
                  <div className="absolute left-0 top-6 bottom-0 w-1 bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 rounded-full opacity-60" style={{height: idx === entries.length-1 ? '50%' : '100%'}}></div>
                  <div className="ml-6 p-5 bg-white/90 dark:bg-gray-900/80 rounded-2xl border border-border shadow-card relative">
                    <div className="flex items-center mb-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 shadow mr-2"></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{e.date}</span>
                    </div>
                    <div className="whitespace-pre-line text-gray-900 dark:text-gray-100 text-lg">{e.content}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal; 