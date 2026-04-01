'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Game1 from '../../components/Game1';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');

    if (isLogin !== "true") {
      router.replace('/auth/not-authorized');
    }
  }, [router]);

  return (
    <div>
      <h1>Halaman Game</h1>
      <p>Selamat datang, kamu sudah login 🎮</p>

      <Game1 />

      <button 
        onClick={() => {
          localStorage.removeItem('isLogin');
          router.replace('/auth/login');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;