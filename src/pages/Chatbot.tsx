import React, { useState } from 'react';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    const chunks: Blob[] = [];

    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: 'audio/wav' });
      setAudioChunks([]);

      const formData = new FormData();
      formData.append('audio', audioBlob, 'note.wav');

      try {
        const response = await fetch('http://localhost:3000/transcribe', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (data.text) setMessage(data.text);
      } catch (error) {
        console.error('Transcription failed', error);
      }
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    // You can customize this to send message to a chatbot or store it
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-hero flex flex-col items-center justify-start py-12 px-2 md:px-0"
    >
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="bg-gradient-to-br from-blue-400 to-purple-400 p-4 rounded-full shadow-lg mb-2">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight text-center drop-shadow-soft">
            Mental Health Support Chat
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-xl">
            Get instant support and answers to your mental health questions
          </p>
        </motion.div>
        <div className="bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-card p-0 mb-8 border border-border backdrop-blur-md flex flex-col h-[600px]">
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
                  <div className={`px-4 py-2 rounded-2xl ${message.isUser ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-button' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-card'}`}>
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
          <div className="border-t border-border p-4 bg-white/80 dark:bg-gray-800/80 rounded-b-3xl">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border-2 border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg shadow-inner transition-smooth"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-lg shadow-button hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-bounce"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg shadow-soft"
        >
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Important:</strong> This chatbot provides general information and support, 
            but it's not a substitute for professional mental health care. If you're experiencing 
            a crisis or need immediate help, please contact a mental health professional or 
            emergency services.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Chatbot;
