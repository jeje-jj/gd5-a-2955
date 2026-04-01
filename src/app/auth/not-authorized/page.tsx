'use client';

import { useRouter } from 'next/navigation';

export default function NotAuthorizedPage() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
          alt="Not Authorized"
          style={styles.image}
        />

        <h1>❌ Anda belum login</h1>
        <p>Silahkan login terlebih dahulu</p>

        <button
          style={styles.button}
          onClick={() => router.push('/auth/login')}
        >
          Kembali
        </button>

      </div>
    </div>
  );
}

const styles: any = {
    container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(to right, #4facfe, #00f2fe)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    },
    card: {
        background: '#fff',
        padding: '20px',
        borderRadius: '15px',
        textAlign: 'center',
        width: '300px',
    },
    image: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '10px',
    },

    button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#4facfe',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    },
};