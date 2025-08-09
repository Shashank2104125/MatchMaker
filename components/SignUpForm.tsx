"use client";

import { useState } from "react";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { signUp, signInWithGoogle } = useAuth();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signUp(email, password);
      console.log("User created:", result.user);
      router.push('/login')
      // Optional: update profile or store name in Firestore
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <form className="space-y-4 max-w-sm mx-auto" onSubmit={handleSignup}>
      <h2 className="text-lg font-bold">Sign Up</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600"
      >
        Sign Up
      </button>
      <button
        type="button"
        onClick={signInWithGoogle}
        className="w-full bg-red-400 text-white p-2 rounded hover:bg-red-600"
      >
        Sign Up with Google
      </button>
    </form>
  );
};

export default SignUpForm;
