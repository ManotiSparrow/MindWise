import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }
    // Always read the latest users array
    const usersRaw = localStorage.getItem('users');
    let users: any[] = [];
    try {
      users = usersRaw ? JSON.parse(usersRaw) : [];
    } catch {
      users = [];
    }
    if (users.find((u: any) => u.email === email)) {
      setError('Email already registered');
      setSuccess('');
      return;
    }
    const newUser = { email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Account created! You can now log in.');
    setError('');
    setTimeout(() => navigate('/login'), 1500);
  };

  React.useEffect(() => {
    // Ensure users array exists in localStorage
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) navigate('/');
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign Up</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-500 text-center">{success}</div>}
        <div className="flex flex-col gap-2 mb-4">
          <button type="button" className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg shadow hover:bg-gray-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.1 3 22 3 11.5 3 3 11.5 3 22s8.5 19 19 19c10.5 0 19-8.5 19-19 0-1.3-.1-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.2 19.2 13 24 13c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.1 3 22 3 11.5 3 3 11.5 3 22s8.5 19 19 19c10.5 0 19-8.5 19-19 0-1.3-.1-2.7-.5-4z"/><path fill="#FBBC05" d="M24 44c5.8 0 10.7-2.9 13.7-7.4l-7-5.7C29.8 36 24 36 24 36c-5.8 0-10.7-2.9-13.7-7.4l7-5.7C18.2 31.8 22.2 35 24 35c1.8 0 5.8-3.2 7.7-6.1l7 5.7C34.7 41.1 29.8 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.1 3 22 3 11.5 3 3 11.5 3 22s8.5 19 19 19c10.5 0 19-8.5 19-19 0-1.3-.1-2.7-.5-4z"/></g></svg>
            Sign up with Google
          </button>
          <button type="button" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
            <svg width="20" height="20" viewBox="0 0 32 32"><path fill="#fff" d="M29 0H3C1.3 0 0 1.3 0 3v26c0 1.7 1.3 3 3 3h13V20h-4v-5h4v-3.7C16 7.6 18.4 6 21.1 6c1.3 0 2.6.1 2.9.2v4h-2c-1.6 0-2 .8-2 2V15h4.5l-1 5H20v12h9c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"/></svg>
            Sign up with Facebook
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp; 