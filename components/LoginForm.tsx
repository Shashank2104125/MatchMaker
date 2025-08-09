'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../app/context/AuthContext'; // ✅ adjust path

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { logIn } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      console.log('Login successful');
      router.push('/'); // ✅ change to your actual page
    } catch (error) {
      console.error('Login error:', (error as Error).message);
      alert('Login failed: Invalid credentials');
    }
  };

  const handleGoToSignup = () => {
    router.push('/signup');
  };

  return (
    <form className="space-y-4 max-w-sm mx-auto" onSubmit={handleLogin}>
      <h2 className="text-lg font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600">
        Login
      </button>
      <button
        type="button"
        onClick={handleGoToSignup}
        className="w-full bg-red-400 text-white p-2 rounded hover:bg-red-600">
        Do not have an account?
      </button>
    </form>
  );
}
