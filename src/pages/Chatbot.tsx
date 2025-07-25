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
    <div style={{ padding: '2rem' }}>
      <h2>MindWise Chatbot</h2>
      <input
        id="chatInput"
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message or use the mic..."
        style={{ width: '60%', padding: '0.5rem', fontSize: '1rem' }}
      />
      <button onClick={handleSend} style={{ marginLeft: '1rem' }}>Send</button>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={startRecording} disabled={recording}>🎙️ Start</button>
        <button onClick={stopRecording} disabled={!recording}>🛑 Stop</button>
      </div>
    </div>
  );
};

export default Chatbot;
