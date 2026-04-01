'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import SocialAuth from '@/components/SocialAuth';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginFormData {
  email: string;
  password: string;
  captchaInput: string;
  rememberMe?: boolean;
}

interface ErrorObject {
  email?: string;
  password?: string;
  captcha?: string;
}

const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 7);

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    captchaInput: ''
  });
  const [errors, setErrors] = useState<ErrorObject>({});
  const [captcha, setCaptcha] = useState('');
  const [chance, setChance] = useState(3);
  const [showPassword, setShowPassword] = useState(false);

  useEffect (() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chance === 0) {
      toast.error('Kesempatan login habis!', {theme: 'dark', position: 'top-right'});
      return;
    }

    const newErrors: ErrorObject = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!/^[^\s@]+@[^\s@]+\.(com|net|co)$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (formData.password !== '241712955') {
      newErrors.password = 'Password salah';
    }

    if (!formData.captchaInput.trim()) {
      newErrors.captcha = 'Captcha tidak boleh kosong';
    } else if (formData.captchaInput !== captcha) {
      newErrors.captcha = 'Captcha tidak valid';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      const newChance = Math.max(chance - 1, 0);
      setChance(newChance);

      setCaptcha(generateCaptcha());

      toast.error(`Login Gagal! Sisa kesempatan: ${newChance}`, { theme: 'dark', position: 'top-right' });
      if (newChance === 0) {
        toast.error('Kesempatan login habis!', {theme: 'dark', position: 'top-right' });
      }
      return;
    }

    localStorage.setItem("isLogin", "true");
    
    setTimeout(() => {
      router.replace('/home');
    }, 100);
  };

  return (
    <AuthFormWrapper title="Login">
      <ToastContainer />

      <p className='text-sm text-gray-600 text-center mt-2'>
        Sisa kesempatan: {chance}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukan email"
          />
          {errors.email && <p className="text-red-600 text-sm italic">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData?.password}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukan password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>

          {errors.password && <p className="text-red-600 text-sm italic">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={formData.rememberMe || false}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  rememberMe: e.target.checked
                }))
              }
              className="mr-2"
            />
            Ingat Saya
          </label>

          <Link href="/auth/forgot-password" className="text-blue-600 text-sm">
            Forgot Password?
          </Link>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span>Captcha:</span>
            <span className="font-bold bg-gray-100 px-3 py-1 rounded">
              {captcha}
            </span>

            <button
              type="button"
              onClick={() => setCaptcha(generateCaptcha())}
              className="text-blue-600 text-sm"
            >
              Refresh
            </button>
          </div>

          <input
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.captcha ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukan captcha"
          />
          {errors.captcha && <p className="text-red-600 text-sm italic">{errors.captcha}</p>}
        </div>

        <button
          type="submit"
          disabled={chance === 0}
          className={`w-full py-2.5 rounded-lg text-white font-semibold ${
            chance === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Sign In
        </button>

        <button
          type='button'
          onClick={() => {
            setChance(3);
            setCaptcha(generateCaptcha());
            toast.info('Kesempatan direset!', {
              theme: 'dark',
              position: 'top-right'
            });
          }}
          disabled={chance !== 0}
          className={`w-full py-2.5 rounded-lg font-semibold ${
            chance === 0
              ? 'bg-green-500 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Reset Kesempatan
        </button>

        <SocialAuth />

        <p className="text-center text-sm text-gray-600">
          Tidak punya akun?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-semibold">
            Daftar
          </Link>
        </p>
      </form>
    </AuthFormWrapper>
  );
};

export default LoginPage;