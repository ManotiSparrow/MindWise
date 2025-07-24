// Run: npm init -y && npm install express multer openai dotenv
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const OpenAI = require('openai');

const app = express();
const upload = multer({ dest: 'uploads/' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Serve a minimal frontend to record audio
app.get('/', (req, res) => {
  res.send(`
    <!doctype html><html>
    <body>
      <h2>MindWise Voice Journal</h2>
      <button id="start">Start Recording</button>
      <button id="stop" disabled>Stop Recording</button>
      <p id="transcript"></p>
      <script>
        let mediaRecorder, audioChunks = [];
        document.getElementById('start').onclick = async () => {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
          mediaRecorder.start();
          document.getElementById('start').disabled = true;
          document.getElementById('stop').disabled = false;
        };
        document.getElementById('stop').onclick = async () => {
          mediaRecorder.stop();
          document.getElementById('stop').disabled = true;
          const blob = new Blob(audioChunks, { type: 'audio/wav' });
          audioChunks = [];
          const fd = new FormData();
          fd.append('audio', blob, 'note.wav');
          const res = await fetch('/transcribe', { method: 'POST', body: fd });
          const { text } = await res.json();
          document.getElementById('transcript').innerText = text;
          document.getElementById('start').disabled = false;
        };
      </script>
    </body>
    </html>
  `);
});

// Endpoint to receive audio and call Whisper API
app.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      model: 'whisper-1',
      file: fs.createReadStream(req.file.path),
      response_format: 'text'
    });
    fs.unlinkSync(req.file.path);
    res.json({ text: transcription.text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

// Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(\`Server listening on http://localhost:\${PORT}\`)
);
