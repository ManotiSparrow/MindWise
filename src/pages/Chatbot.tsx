import React, { useState, useRef } from 'react';
import { Bot, User, Send, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  hasLinks?: boolean;
  links?: string[];
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: idCounter.current++,
      text,
      isUser,
    };
    setMessages((prev) => [...prev, newMessage]);
    scrollToBottom();
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    addMessage(text, true);
    setInputText('');
    // Simulate bot response (you can replace this with your logic)
    setIsLoading(true);
    setTimeout(() => {
      addMessage("I'm here for you. Tell me more.", false);
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputText);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'note.wav');

      try {
        const response = await fetch('http://localhost:3000/transcribe', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.text) {
          addMessage(data.text, true);
          // Optional bot response
          setIsLoading(true);
          setTimeout(() => {
            addMessage("Thank you for sharing that.", false);
            setIsLoading(false);
          }, 1500);
        }
      } catch (error) {
        console.error('Transcription failed:', error);
        addMessage("Sorry, I couldn't understand that audio.", false);
      }
    };

    setAudioChunks([]);
    setMediaRecorder(recorder);
    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-6"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[90vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`px-4 py-2 rounded-2xl max-w-xs ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-2xl bg-gray-300 flex items-center gap-2 text-gray-800">
                <Loader className="h-4 w-4 animate-spin" />
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input & Buttons */}
        <form onSubmit={handleSubmit} className="border-t p-4 bg-white flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            disabled={!inputText.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={recording ? stopRecording : startRecording}
            className={`px-4 py-2 rounded-full font-medium transition ${
              recording ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            {recording ? 'Stop 🎙️' : 'Start 🎙️'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Chatbot;
