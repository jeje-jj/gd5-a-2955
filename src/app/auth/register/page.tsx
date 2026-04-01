'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthFormWrapper from '../../../components/AuthFormWrapper';
import SocialAuth from '../../../components/SocialAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type RegisterFormData = {
  username: string;
  email: string;
  nomorTelp: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};

const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 7).toUpperCase();

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>();

  const watchedPassword = watch('password');

  const [captcha, setCaptcha] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  useEffect(() => {
    const strengthValue =
      ((watchedPassword || '').length > 7 ? 25 : 0) +
      (/[A-Z]/.test(watchedPassword || '') ? 25 : 0) +
      (/[0-9]/.test(watchedPassword || '') ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(watchedPassword || '') ? 25 : 0);

    setStrength(strengthValue);
  }, [watchedPassword]);

  const onSubmit = (data: RegisterFormData) => {
    if (data.captcha !== captcha) {
      toast.error('Captcha salah', { theme: 'dark' });
      setCaptcha(generateCaptcha());
      return;
    }

    toast.success('Register Berhasil!', { theme: 'dark', position: 'top-right' });
    router.push('/auth/login');
  };

  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <AuthFormWrapper title="Register">
      <ToastContainer />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            {...register('username', {
              required: 'Username tidak boleh kosong',
              minLength: { value: 3, message: 'Minimal 3 karakter' },
              maxLength: { value: 8, message: 'Maksimal 8 karakter' }
            })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukan username"
          />
          {errors.username && <p className="text-red-600 text-sm italic">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email tidak boleh kosong',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.(com|net|co)$/,
                message: 'Format email tidak valid'
              }
            })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukan email"
          />
          {errors.email && <p className="text-red-600 text-sm italic">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input
            type="tel"
            {...register('nomorTelp', {
              required: 'Nomor tidak boleh kosong',
              minLength: { value: 10, message: 'Minimal 10 digit' },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Harus angka saja'
              }
            })}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
            }}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.nomorTelp ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukan nomor telepon"
          />
          {errors.nomorTelp && <p className="text-red-600 text-sm italic">{errors.nomorTelp.message}</p>}
        </div>

        <div className="space-y-2">
          <label>Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register('password', {
                required: 'Password tidak boleh kosong',
                minLength: { value: 8, message: 'Minimal 8 karakter' }
              })}
              className={`w-full px-4 py-3 pr-10 rounded-xl border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>

          {errors.password && (
              <p className="text-red-600 text-sm italic">
                {errors.password.message}
              </p>
            )}

          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-2 rounded bg-yellow-500"
              style={{ width: `${strength}%` }}
            ></div>
          </div>

          <p className="text-xs text-gray-500">Strength: {strength}%</p>
        </div>

        <div className="space-y-2">
          <label>Confirm Password</label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register('confirmPassword', {
                required: 'Konfirmasi password tidak boleh kosong',
                validate: (value) =>
                  value === watchedPassword || 'Password tidak cocok'
              })}
              className={`w-full px-4 py-3 pr-10 rounded-xl border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan konfirmasi password"
            />

            {errors.confirmPassword && (
              <p className="text-red-600 text-sm italic">
                {errors.confirmPassword.message}
              </p>
            )}

            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>
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
            {...register('captcha', {
              required: 'Captcha tidak boleh kosong',
              validate: (value) =>
                value === captcha || 'Captcha tidak sesuai'
            })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.captcha ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukan captcha"
          />
          {errors.captcha && <p className="text-red-600 text-sm italic">{errors.captcha.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Register
        </button>

        <SocialAuth />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link href="/auth/login" className="text-blue-600 font-semibold">
          Login
        </Link>
      </p>
    </AuthFormWrapper>
  );
};

export default RegisterPage;