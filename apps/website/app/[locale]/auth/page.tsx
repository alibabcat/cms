'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User, Phone, ArrowRight, Loader2, LogIn, UserPlus, TrendingUp, Sparkles, ShieldCheck, Activity } from 'lucide-react';
import { INSTITUTE_NAME } from '@/constants';
import { useLanguage } from '@/components/LanguageContext';

const TEXT = {
  fa: {
    back: 'بازگشت',
    welcomeBack: 'خوش‌آمدید!',
    joinAcademy: 'عضویت در آکادمی',
    loginSubtitle: 'برای ورود به پنل پاندولیسم مشخصات خود را وارد کنید.',
    registerSubtitle: 'مسیر حرفه‌ای شدن در مارکت طلا از اینجا شروع می‌شود.',
    loginTab: 'ورود به حساب',
    registerTab: 'ثبت نام جدید',
    fullNamePlaceholder: 'نام و نام خانوادگی',
    identifierPlaceholder: 'شماره موبایل یا ایمیل',
    passwordPlaceholder: 'رمز عبور',
    loginSubmit: 'ورود به پنل کاربری',
    registerSubmit: 'تایید و عضویت',
    quickLogin: 'سریع‌تر وارد شوید از طریق',
    visualHeading: 'قدرت',
    visualHeadingHighlight: 'نوسان‌گیری',
    visualBody: 'با درک قوانین فیزیک و حرکت پاندولی قیمت، نقاط تعادل پنهان مارکت را زودتر از دیگران شناسایی کنید.',
  },
  en: {
    back: 'Back',
    welcomeBack: 'Welcome back!',
    joinAcademy: 'Join the Academy',
    loginSubtitle: 'Enter your details to access the Pendulism panel.',
    registerSubtitle: 'Your path to becoming a professional in the gold market starts here.',
    loginTab: 'Log in',
    registerTab: 'Create account',
    fullNamePlaceholder: 'Full name',
    identifierPlaceholder: 'Mobile number or email',
    passwordPlaceholder: 'Password',
    loginSubmit: 'Log in to dashboard',
    registerSubmit: 'Confirm and join',
    quickLogin: 'Sign in faster with',
    visualHeading: 'The power of',
    visualHeadingHighlight: 'swing trading',
    visualBody: 'By understanding the laws of physics and the pendulum-like movement of price, identify the market\'s hidden equilibrium points before others do.',
  },
} as const;

const AuthPage: React.FC<{ onLoginSuccess?: (user?: any) => void }> = ({ onLoginSuccess }) => {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = TEXT[locale];
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    identifier: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 30 - 15,
        y: (e.clientY / window.innerHeight) * 30 - 15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess?.(formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-primary-500 selection:text-black transition-all">
      
      {/* --- Advanced Styles --- */}
      <style>{`
        @keyframes rotate-1 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes rotate-2 { 0% { transform: rotate(0deg); } 100% { transform: rotate(-720deg); } }
        @keyframes rotate-3 { 0% { transform: rotate(0deg); } 100% { transform: rotate(1080deg); } }
        @keyframes particle-float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, -20px); } }
        
        .triple-pendulum {
          position: relative;
          width: 2px;
          height: 140px;
          background: linear-gradient(to bottom, #f59e0b, transparent);
          transform-origin: top center;
          animation: rotate-1 20s infinite linear;
          box-shadow: 0 0 15px #f59e0b;
        }
        .pendulum-2 {
          position: absolute;
          top: 140px;
          left: 0;
          width: 2px;
          height: 100px;
          background: linear-gradient(to bottom, #f59e0b, transparent);
          transform-origin: top center;
          animation: rotate-2 12s infinite linear;
          box-shadow: 0 0 10px #f59e0b;
        }
        .pendulum-3 {
          position: absolute;
          top: 100px;
          left: 0;
          width: 2px;
          height: 70px;
          background: linear-gradient(to bottom, #f59e0b, white);
          transform-origin: top center;
          animation: rotate-3 6s infinite linear;
          box-shadow: 0 0 20px #fff;
        }
        .joint {
          position: absolute;
          top: -5px;
          left: -4px;
          width: 10px;
          height: 10px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 15px #fff, 0 0 30px #f59e0b;
        }
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          opacity: 0.3;
          animation: particle-float 10s infinite ease-in-out;
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* --- Background Elements --- */}
      <div className="absolute inset-0 bg-[#020617] bg-noise">
          <div className="absolute top-[-10%] end-[-10%] w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] start-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5
              }}
            ></div>
          ))}
      </div>

      {/* --- Main Container --- */}
      <div className="relative w-full max-w-6xl bg-[#0f172a]/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 animate-fade-in-up h-[750px] md:h-[650px]">
        
        {/* Visual Side (Left in RTL conceptually, visually animated) */}
        <div className="hidden md:flex md:w-5/12 relative items-center justify-center overflow-hidden border-e border-white/5 bg-gradient-to-br from-black to-[#0f172a]">
            
            {/* Parallax Layer */}
            <div className="absolute inset-0 pointer-events-none opacity-50" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}>
                <div className="absolute top-1/4 end-1/4 w-32 h-32 bg-primary-500/10 blur-3xl"></div>
                <div className="absolute bottom-1/4 start-1/4 w-40 h-40 bg-blue-500/10 blur-3xl"></div>
            </div>

            {/* Triple Pendulum */}
            <div className="relative mb-20">
                <div className="triple-pendulum">
                    <div className="joint"></div>
                    <div className="pendulum-2">
                        <div className="joint"></div>
                        <div className="pendulum-3">
                            <div className="joint"></div>
                            <div className="absolute bottom-0 end-[-4px] w-3 h-3 bg-white rounded-full shadow-[0_0_20px_#fff]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Overlay */}
            <div className="absolute bottom-12 end-0 start-0 px-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                    <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                    <span className="text-amber-200 text-[10px] font-bold tracking-[2px] uppercase">Pendulism Mastery</span>
                </div>
                <h2 className="text-3xl font-black text-white mb-3">{text.visualHeading} <span className="text-primary-500">{text.visualHeadingHighlight}</span></h2>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {text.visualBody}
                </p>
            </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-7/12 p-8 md:p-14 flex flex-col justify-center relative">
            
            <button
                type="button"
                onClick={() => router.back()}
                className="absolute top-8 start-8 text-slate-400 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
            >
                <ArrowRight className="w-4 h-4" />
                {text.back}
            </button>

            <div className="mb-10">
                <div className="flex items-center gap-3 text-primary-500 mb-6">
                    <div className="p-2 bg-primary-500/20 rounded-xl">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-white">{INSTITUTE_NAME}<span className="text-primary-500">.CO</span></span>
                </div>
                <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                    {isLogin ? text.welcomeBack : text.joinAcademy}
                </h1>
                <p className="text-slate-400 text-sm">
                    {isLogin ? text.loginSubtitle : text.registerSubtitle}
                </p>
            </div>

            {/* Switcher */}
            <div className="flex bg-black/30 rounded-2xl p-1 mb-8 border border-white/5 shadow-inner">
                <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${isLogin ? 'bg-[#1e293b] text-white shadow-xl border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <LogIn className="w-4 h-4 inline-block me-2" />
                    {text.loginTab}
                </button>
                <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${!isLogin ? 'bg-[#1e293b] text-white shadow-xl border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <UserPlus className="w-4 h-4 inline-block me-2" />
                    {text.registerTab}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div className="relative">
                        <User className="absolute start-4 top-4 text-slate-500 w-5 h-5" />
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder={text.fullNamePlaceholder}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/5 rounded-2xl px-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/5 transition-all"
                        />
                    </div>
                )}

                <div className="relative">
                    <Phone className="absolute start-4 top-4 text-slate-500 w-5 h-5" />
                    <input
                        name="identifier"
                        type="text"
                        required
                        placeholder={text.identifierPlaceholder}
                        value={formData.identifier}
                        onChange={handleChange}
                        className="w-full bg-black/20 border border-white/5 rounded-2xl px-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/5 transition-all"
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute start-4 top-4 text-slate-500 w-5 h-5" />
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder={text.passwordPlaceholder}
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-black/20 border border-white/5 rounded-2xl px-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/5 transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute end-4 top-4 text-slate-600 hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary-600 to-amber-500 hover:from-primary-500 hover:to-amber-400 text-black font-black py-4 rounded-2xl shadow-xl shadow-primary-500/10 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
                >
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isLogin ? text.loginSubmit : text.registerSubmit)}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-slate-500 text-xs mb-6">{text.quickLogin}</p>
                <div className="flex gap-4">
                    <button type="button" className="flex-1 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl py-3 flex items-center justify-center transition-all group">
                         <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button type="button" className="flex-1 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl py-3 flex items-center justify-center transition-all group">
                         <span className="text-white font-bold text-xs group-hover:scale-105 transition-transform">Apple ID</span>
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
