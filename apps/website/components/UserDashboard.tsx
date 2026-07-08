'use client'


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserStatus, Announcement } from '@/types';
import LocalDate from './LocalDate';
import { 
  Trophy, GraduationCap, Zap, Clock, ShieldAlert, CreditCard, 
  Settings, LogOut, Bell, BookOpen, TrendingUp, PlayCircle, 
  MessageCircle, ChevronLeft, Calendar, User as UserIcon,
  ShieldCheck, CircleCheck, AlertCircle, Home, LayoutGrid, Search,
  Activity, Globe, MapPin, UserCheck, Smartphone, PhoneCall, Save,
  KeyRound, Eye, EyeOff, Camera, HelpCircle, ClipboardList, FileText,
  Library, History, Send, Download, MonitorPlay, MessageSquare, Lock,
  Info, AlertTriangle, CheckCircle, ChevronRight, MoreVertical
} from 'lucide-react';

const getStatusConfig = (status: UserStatus) => {
  switch (status) {
    case 'pendulist':
      return { label: 'پاندولیست', color: 'text-amber-500', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30', icon: <Trophy className="w-5 h-5" /> };
    case 'pendulism_student':
      return { label: 'دانشجوی پاندولیسم', color: 'text-primary-500', bgColor: 'bg-primary-500/10', borderColor: 'border-primary-500/30', icon: <Zap className="w-5 h-5" /> };
    case 'graduate':
      return { label: 'فارغ‌التحصیل', color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30', icon: <GraduationCap className="w-5 h-5" /> };
    case 'student':
      return { label: 'دانشجو', color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30', icon: <BookOpen className="w-5 h-5" /> };
    default:
      return { label: 'کاربر معمولی', color: 'text-slate-400', bgColor: 'bg-white/5', borderColor: 'border-white/10', icon: <UserIcon className="w-5 h-5" /> };
  }
};

type ActiveView = 'home' | 'profile' | 'course-hub' | 'notifications';
type CourseSubView = 'dashboard' | 'exercises' | 'exams' | 'resources' | 'archive' | 'support';

const UserDashboard: React.FC<{ user: any; onLogout: () => void }> = ({ user, onLogout }) => {
  const router = useRouter();
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [courseSubView, setCourseSubView] = useState<CourseSubView>('dashboard');
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const isStudent = user.purchasedCourses.length > 0;

  // Mock Announcements
  const mockAnnouncements: Announcement[] = [
    { id: 'n1', title: 'جلسه لایو جدید', content: 'جلسه لایو ترید طلا امروز ساعت ۱۸ برگزار خواهد شد.', date: '۱ ساعت پیش', isRead: false, type: 'info' },
    { id: 'n2', title: 'تمدید اشتراک سیگنال', content: 'اشتراک شما تا ۳ روز دیگر به پایان می‌رسد.', date: 'دیروز', isRead: false, type: 'warning' },
    { id: 'n3', title: 'بروزرسانی سرفصل‌ها', content: 'فصل ۵ دوره پاندولیسم با محتوای جدید آپدیت شد.', date: '۲ روز پیش', isRead: true, type: 'success' },
  ];

  const unreadCount = mockAnnouncements.filter(a => !a.isRead).length;

  // --- Sub-View Renderers ---
  
  const renderCourseDashboard = () => (
    <div className="animate-fade-in-up space-y-6 pb-20">
      {/* Course Progress Card */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 end-0 w-full h-1 bg-gradient-to-r from-primary-500 to-transparent opacity-50"></div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="58" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-primary-500" strokeDasharray="364" strokeDashoffset={364 - (364 * user.completionRate) / 100} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-white">{user.completionRate}%</span>
                      <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">پیشرفت</span>
                  </div>
              </div>
              <div className="text-center md:text-start flex-1">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                      <span className="bg-primary-500/10 text-primary-500 text-[10px] font-black px-3 py-1 rounded-full border border-primary-500/20">دوره فعال</span>
                      <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20">رتبه {user.rankInCourse || '۱۲'} در کلاس</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">مستری پاندولیسم (پیشرفته)</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                      شما در حال گذراندن فصل پنجم هستید. تمرینات این فصل برای درک Zero Point حیاتی هستند.
                  </p>
              </div>
              <button onClick={() => setCourseSubView('archive')} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-3xl border border-white/10 transition-all flex flex-col items-center gap-2 group">
                  <PlayCircle className="w-8 h-8 text-primary-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">ادامه یادگیری</span>
              </button>
          </div>
      </div>

      {/* Grid Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'exercises', label: 'تمرینات', val: '۳ مورد', icon: <ClipboardList />, color: 'blue' },
            { id: 'exams', label: 'آزمون‌ها', val: '۱ فعال', icon: <FileText />, color: 'rose' },
            { id: 'resources', label: 'منابع', val: '۱۲ فایل', icon: <Library />, color: 'amber' },
            { id: 'support', label: 'پشتیبانی', val: 'آنلاین', icon: <MessageCircle />, color: 'emerald' },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setCourseSubView(item.id as CourseSubView)}
              className="bg-surface/50 border border-white/5 p-6 rounded-[2rem] flex flex-col items-center text-center gap-3 hover:bg-white/5 hover:border-white/10 transition-all group active:scale-95"
            >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${item.color}-500/10 text-${item.color}-500 group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
                </div>
                <div>
                    <p className="text-xs font-bold text-white mb-1">{item.label}</p>
                    <p className="text-[10px] text-slate-500">{item.val}</p>
                </div>
            </button>
          ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-surface/30 rounded-[2.5rem] border border-white/5 p-8">
          <div className="flex items-center justify-between mb-6">
              <h4 className="font-black text-white text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary-500" />
                  آخرین فعالیت‌های دوره
              </h4>
              <button onClick={() => setCourseSubView('archive')} className="text-primary-500 text-xs font-bold flex items-center gap-1">مشاهده همه <ChevronLeft className="w-4 h-4"/></button>
          </div>
          <div className="space-y-4">
              {[
                { t: 'فصل ۵: استراتژی Zero Point', type: 'ویدیو', d: '۲ ساعت پیش', icon: <MonitorPlay className="text-primary-500" /> },
                { t: 'تمرین شناسایی نقدینگی', type: 'تکلیف', d: 'امروز', icon: <ClipboardList className="text-blue-500" /> },
                { t: 'جزوه روانشناسی ترید', type: 'منبع', d: 'دیروز', icon: <Library className="text-amber-500" /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black/20 rounded-xl flex items-center justify-center">
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{item.t}</p>
                            <p className="text-[10px] text-slate-500">{item.type} • {item.d}</p>
                        </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-slate-700" />
                </div>
              ))}
          </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-foreground flex pb-24 lg:pb-0 relative overflow-x-hidden transition-all duration-500 selection:bg-primary-500 selection:text-black">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex w-72 flex-col bg-surface/30 backdrop-blur-xl border-e border-white/5 h-screen sticky top-0 p-6 z-50">
          <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(245,158,11,0.3)]">K</div>
              <span className="font-black text-xl tracking-tight">پنل هوشمند کیاوش</span>
          </div>

          <nav className="flex-1 space-y-2">
              {[
                { id: 'home', label: 'پیشخوان اصلی', icon: <Home className="w-5 h-5" /> },
                { id: 'course-hub', label: 'مرکز یادگیری', icon: <MonitorPlay className="w-5 h-5" /> },
                { id: 'notifications', label: 'اعلانات داخلی', icon: <Bell className="w-5 h-5" />, badge: unreadCount },
                { id: 'profile', label: 'تنظیمات حساب', icon: <UserIcon className="w-5 h-5" /> },
              ].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setActiveView(item.id as ActiveView)} 
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${activeView === item.id ? 'bg-primary-500 text-black font-bold shadow-lg shadow-primary-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                >
                    <div className="flex items-center gap-4">
                        {item.icon} {item.label}
                    </div>
                    {item.badge ? <span className="w-5 h-5 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{item.badge}</span> : null}
                </button>
              ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
              <button onClick={() => router.push('/')} className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white transition-all group">
                  <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" /> مشاهده سایت
              </button>
              <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all">
                  <LogOut className="w-5 h-5" /> خروج ایمن
              </button>
          </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 safe-top overflow-y-auto">
          
          <header className="px-6 py-6 flex items-center justify-between sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
              <div className="flex items-center gap-4">
                  {activeView === 'course-hub' && courseSubView !== 'dashboard' && (
                      <button onClick={() => setCourseSubView('dashboard')} className="p-2 bg-white/5 rounded-xl text-white">
                          <ChevronRight className="w-5 h-5" />
                      </button>
                  )}
                  <h2 className="text-lg font-black text-white">
                      {activeView === 'home' ? 'خوش‌آمدید!' : 
                       activeView === 'course-hub' ? (courseSubView === 'dashboard' ? 'مرکز یادگیری' : 'جزئیات آموزش') :
                       activeView === 'notifications' ? 'پیام‌های سیستم' : 'پروفایل کاربر'}
                  </h2>
              </div>

              <div className="flex items-center gap-3">
                  {/* Internal Notifications Bell */}
                  <div className="relative">
                      <button 
                        onClick={() => setActiveView('notifications')}
                        className={`p-2.5 rounded-xl border transition-all ${activeView === 'notifications' ? 'bg-primary-500/20 border-primary-500 text-primary-500' : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'}`}
                      >
                          <Bell className="w-5 h-5" />
                          {unreadCount > 0 && <span className="absolute top-1 start-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#020617] animate-pulse"></span>}
                      </button>
                  </div>
                  
                  {/* Fixed Avatar Menu */}
                  <div className="relative">
                      <button 
                        onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                        className={`p-0.5 rounded-xl border-2 transition-all ${isAvatarMenuOpen ? 'border-primary-500' : 'border-white/10'}`}
                      >
                          <img 
                            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100'} 
                            className="w-10 h-10 rounded-lg object-cover"
                            alt="profile"
                          />
                      </button>

                      {isAvatarMenuOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsAvatarMenuOpen(false)}></div>
                          <div className="absolute end-0 mt-3 w-64 bg-surface/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl p-3 z-50 animate-fade-in origin-top-left overflow-hidden">
                              <div className="px-4 py-4 border-b border-white/5 mb-2 bg-white/5 rounded-2xl">
                                  <p className="text-sm font-black text-white truncate">{user.name}</p>
                                  <p className="text-[10px] text-primary-500 uppercase font-black tracking-widest mt-1">{getStatusConfig(user.status).label}</p>
                              </div>
                              <div className="space-y-1">
                                  <button onClick={() => { setActiveView('profile'); setIsAvatarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all group">
                                      <UserIcon className="w-4 h-4 text-primary-500 group-hover:scale-110 transition-transform" /> پروفایل کاربری
                                  </button>
                                  <button onClick={() => { router.push('/'); setIsAvatarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all group">
                                      <Globe className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" /> مشاهده سایت اصلی
                                  </button>
                                  <button onClick={() => { router.push('/signals'); setIsAvatarMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all group">
                                      <Activity className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" /> سیگنال‌های VIP
                                  </button>
                              </div>
                              <div className="h-px bg-white/5 my-2"></div>
                              <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-rose-500 hover:bg-rose-500/10 transition-all font-bold">
                                  <LogOut className="w-4 h-4" /> خروج امن از حساب
                              </button>
                          </div>
                        </>
                      )}
                  </div>
              </div>
          </header>

          <div className="p-6 space-y-8 max-w-6xl mx-auto pb-32">
              
              {/* --- HOME VIEW --- */}
              {activeView === 'home' && (
                  <div className="animate-fade-in-up space-y-8">
                      {!isStudent ? (
                          <div className="bg-surface/40 backdrop-blur-xl rounded-[3rem] p-12 border border-white/5 text-center flex flex-col items-center justify-center min-h-[450px]">
                              <div className="w-24 h-24 bg-primary-500/10 rounded-full flex items-center justify-center text-primary-500 mb-8 relative">
                                  <div className="absolute inset-0 bg-primary-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                                  <Lock className="w-10 h-10 relative z-10" />
                              </div>
                              <h3 className="text-3xl font-black text-white mb-4">آکادمی قفل است!</h3>
                              <p className="text-slate-400 max-w-md leading-8 mb-10">
                                  شما هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید. برای دسترسی به محتوای آموزشی پاندولیسم، تمرینات و آرشیو جلسات، یکی از دوره‌های ما را تهیه کنید.
                              </p>
                              <button onClick={() => router.push('/courses')} className="bg-primary-500 text-black font-black px-12 py-5 rounded-[2rem] shadow-2xl shadow-primary-500/30 hover:scale-105 active:scale-95 transition-all text-lg">
                                  مشاهده لیست دوره‌ها
                              </button>
                          </div>
                      ) : (
                          <>
                              {/* Simple Overview Widgets */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="bg-gradient-to-br from-[#0f172a] to-black rounded-[2.5rem] p-8 border border-white/5 flex items-center justify-between group cursor-pointer overflow-hidden relative">
                                      <div className="absolute top-0 end-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                                      <div className="relative z-10">
                                          <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-2">Continue Learning</p>
                                          <h3 className="text-xl font-black text-white mb-2">فصل پنجم: Zero Point</h3>
                                          <p className="text-xs text-slate-500">ادامه ویدیو از دقیقه ۱۲:۴۰</p>
                                      </div>
                                      <div onClick={() => { setActiveView('course-hub'); setCourseSubView('archive'); }} className="relative z-10 w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center text-black shadow-xl group-hover:scale-110 transition-transform">
                                          <PlayCircle className="w-8 h-8" />
                                      </div>
                                  </div>
                                  <div className="bg-surface/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 flex items-center justify-between group cursor-pointer">
                                      <div>
                                          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Assignments</p>
                                          <h3 className="text-xl font-black text-white mb-2">۳ تمرین جدید</h3>
                                          <p className="text-xs text-slate-500">مهلت تحویل تا ۴۸ ساعت آینده</p>
                                      </div>
                                      <div onClick={() => { setActiveView('course-hub'); setCourseSubView('exercises'); }} className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                          <ClipboardList className="w-7 h-7" />
                                      </div>
                                  </div>
                              </div>

                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                  {[
                                    { label: 'رتبه کلاس', val: '#' + (user.rankInCourse || '۱۲'), icon: <Trophy className="text-amber-500" />, bg: 'bg-amber-500/10' },
                                    { label: 'جلسات تماشا شده', val: '۱۸ جلسه', icon: <MonitorPlay className="text-primary-500" />, bg: 'bg-primary-500/10' },
                                    { label: 'تکالیف موفق', val: '۹ مورد', icon: <CheckCircle className="text-emerald-500" />, bg: 'bg-emerald-500/10' },
                                    { label: 'امتیاز فعالیت', val: '۸۵۰ XP', icon: <Zap className="text-purple-500" />, bg: 'bg-purple-500/10' },
                                  ].map((w, i) => (
                                    <div key={i} className="bg-surface/50 p-6 rounded-[2rem] border border-white/5 flex flex-col items-center text-center gap-4 group hover:border-white/20 transition-all cursor-pointer">
                                        <div className={`w-12 h-12 ${w.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            {w.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{w.label}</p>
                                            <p className="text-lg font-black text-white">{w.val}</p>
                                        </div>
                                    </div>
                                  ))}
                              </div>
                          </>
                      )}
                  </div>
              )}

              {/* --- COURSE HUB VIEW (App-Like LMS) --- */}
              {activeView === 'course-hub' && (
                  <div className="animate-fade-in space-y-8">
                      {!isStudent ? (
                          <div className="text-center py-20 bg-surface/20 rounded-[3rem] border-2 border-dashed border-white/5">
                              <Lock className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                              <h3 className="text-xl font-bold text-slate-400">دسترسی محدود</h3>
                              <p className="text-sm text-slate-600 mt-2">ابتدا در یک دوره ثبت نام کنید.</p>
                          </div>
                      ) : (
                          <>
                              {courseSubView === 'dashboard' ? renderCourseDashboard() : (
                                  <div className="space-y-6">
                                      {/* Sub-View Container */}
                                      <div className="animate-fade-in-up">
                                          {courseSubView === 'archive' && (
                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                  {[1, 2, 3, 4, 5, 6].map(i => (
                                                      <div key={i} className="bg-surface/50 rounded-3xl border border-white/5 overflow-hidden group hover:border-primary-500/30 transition-all cursor-pointer">
                                                          <div className="relative h-44">
                                                              <img src={`https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=600&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover opacity-50" />
                                                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                  <PlayCircle className="w-16 h-16 text-primary-500" />
                                                              </div>
                                                          </div>
                                                          <div className="p-6">
                                                              <h4 className="font-bold text-white mb-2">جلسه {i}: تحلیل نقاط چرخش طلا</h4>
                                                              <p className="text-xs text-slate-500">مدت زمان: ۱۲۰ دقیقه • منتشر شده در ۱۴۰۳/۰۸/۱۰</p>
                                                          </div>
                                                      </div>
                                                  ))}
                                              </div>
                                          )}

                                          {courseSubView === 'exercises' && (
                                              <div className="space-y-4">
                                                  {[
                                                      { t: 'شناسایی نقدینگی در طلا', d: '۱۴۰۳/۰۹/۰۵', s: 'فعال' },
                                                      { t: 'تحلیل واگرایی پاندولی', d: '۱۴۰۳/۰۸/۳۰', s: 'تکمیل شده' },
                                                  ].map((ex, i) => (
                                                      <div key={i} className="bg-surface/50 p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                                                          <div className="flex items-center gap-4">
                                                              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                                                                  <ClipboardList className="w-6 h-6" />
                                                              </div>
                                                              <div>
                                                                  <h4 className="font-bold text-white text-sm">{ex.t}</h4>
                                                                  <p className="text-xs text-slate-500 mt-1">مهلت: {ex.d}</p>
                                                              </div>
                                                          </div>
                                                          <button className={`px-6 py-2 rounded-xl text-xs font-bold ${ex.s === 'فعال' ? 'bg-primary-500 text-black' : 'bg-white/5 text-slate-500'}`}>
                                                              {ex.s}
                                                          </button>
                                                      </div>
                                                  ))}
                                              </div>
                                          )}

                                          {courseSubView === 'support' && (
                                              <div className="bg-surface/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 h-[550px] flex flex-col overflow-hidden">
                                                  <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                                      <div className="flex items-center gap-3">
                                                          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-black">
                                                              <MessageSquare className="w-5 h-5" />
                                                          </div>
                                                          <div>
                                                              <h4 className="font-bold text-white text-sm">پشتیبانی پاندولیسم</h4>
                                                              <p className="text-[10px] text-emerald-500">آنلاین - در حال پاسخگویی</p>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                                      <div className="flex flex-row-reverse items-end gap-3">
                                                          <div className="bg-primary-500 text-black p-4 rounded-2xl rounded-ss-none text-sm max-w-[80%] shadow-lg">
                                                              سلام، چطور می‌تونم نقطه تعادل رو در تایم ۵ دقیقه پیدا کنم؟
                                                          </div>
                                                      </div>
                                                      <div className="flex items-end gap-3">
                                                          <div className="bg-white/5 text-white p-4 rounded-2xl rounded-se-none text-sm max-w-[80%] border border-white/5">
                                                              درود. برای این کار باید ابتدا "گره معاملاتی" اصلی را در تایم بالا شناسایی کنید.
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className="p-4 bg-black/20 border-t border-white/5 flex gap-2">
                                                      <input type="text" placeholder="پیام خود را بنویسید..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                                                      <button className="bg-primary-500 text-black p-3 rounded-xl"><Send className="w-5 h-5" /></button>
                                                  </div>
                                              </div>
                                          )}

                                          {(courseSubView === 'exams' || courseSubView === 'resources') && (
                                              <div className="text-center py-24 bg-surface/20 rounded-3xl border border-dashed border-white/5">
                                                  <AlertCircle className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                                  <h3 className="text-white font-bold">این بخش به زودی فعال می‌شود</h3>
                                                  <p className="text-slate-500 text-sm mt-2">طبق تقویم آموزشی، محتوا بارگذاری خواهد شد.</p>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              )}
                          </>
                      )}
                  </div>
              )}

              {/* --- NOTIFICATIONS VIEW --- */}
              {activeView === 'notifications' && (
                  <div className="animate-fade-in-up max-w-2xl mx-auto space-y-4">
                      <div className="flex items-center justify-between mb-8">
                          <h3 className="text-2xl font-black text-white">مرکز اعلانات</h3>
                          <button className="text-[10px] font-bold text-primary-500 border border-primary-500/20 px-4 py-2 rounded-xl bg-primary-500/5">خوانده شده برای همه</button>
                      </div>
                      {mockAnnouncements.map(item => (
                          <div key={item.id} className={`bg-surface/50 p-6 rounded-[2rem] border transition-all ${!item.isRead ? 'border-primary-500/30 bg-primary-500/5' : 'border-white/5 opacity-70'}`}>
                              <div className="flex items-start gap-4">
                                  <div className={`p-3 rounded-2xl ${item.type === 'info' ? 'bg-blue-500/10 text-blue-500' : item.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                      {item.type === 'info' ? <Info className="w-6 h-6" /> : item.type === 'warning' ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                                  </div>
                                  <div className="flex-1">
                                      <div className="flex items-center justify-between mb-2">
                                          <h4 className="font-black text-white">{item.title}</h4>
                                          <LocalDate value={item.date} className="text-[10px] text-slate-500 font-bold" />
                                      </div>
                                      <p className="text-sm text-slate-400 leading-7">{item.content}</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              )}

              {/* --- PROFILE VIEW --- */}
              {activeView === 'profile' && (
                  <div className="animate-fade-in-up space-y-8">
                      <div className="bg-surface/30 backdrop-blur-xl rounded-[3rem] p-10 border border-white/5 text-center relative overflow-hidden shadow-2xl">
                           <div className="absolute top-0 end-0 w-full h-32 bg-gradient-to-b from-primary-500/10 to-transparent"></div>
                           <div className="relative z-10 flex flex-col items-center">
                               <div className="relative w-36 h-36 mb-6">
                                   <img src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'} className="w-full h-full rounded-[3rem] object-cover border-4 border-surface shadow-2xl" />
                                   <button className="absolute -bottom-2 -start-2 bg-primary-500 text-black p-4 rounded-3xl shadow-xl hover:scale-110 active:scale-95 transition-all"><Camera className="w-6 h-6" /></button>
                               </div>
                               <h3 className="text-2xl font-black text-white">{user.name}</h3>
                               <p className="text-slate-500 text-xs mt-2 bg-white/5 px-6 py-2 rounded-full border border-white/5 uppercase tracking-widest font-black">
                                  {getStatusConfig(user.status).label}
                               </p>
                           </div>
                      </div>
                      
                      <div className="bg-surface/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl">
                           <div className="space-y-3">
                               <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ms-2">نام کامل کاربری</label>
                               <div className="relative">
                                    <UserIcon className="absolute start-4 top-4 w-5 h-5 text-slate-600" />
                                    <input type="text" value={user.name} disabled className="w-full bg-black/20 border border-white/10 rounded-2xl px-12 py-4 text-slate-400 focus:outline-none" />
                               </div>
                           </div>
                           <div className="space-y-3">
                               <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ms-2">شماره همراه پاندولیسم</label>
                               <div className="relative">
                                    <Smartphone className="absolute start-4 top-4 w-5 h-5 text-slate-600" />
                                    <input type="text" value={user.phone} disabled className="w-full bg-black/20 border border-white/10 rounded-2xl px-12 py-4 text-slate-400 text-start dir-ltr" />
                               </div>
                           </div>
                           <div className="space-y-3 md:col-span-2">
                               <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ms-2">ایمیل جهت اعلانات</label>
                               <div className="relative">
                                    <Globe className="absolute start-4 top-4 w-5 h-5 text-slate-600" />
                                    <input type="text" value={user.email} disabled className="w-full bg-black/20 border border-white/10 rounded-2xl px-12 py-4 text-slate-400" />
                               </div>
                           </div>
                      </div>

                      <div className="bg-surface/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/5 space-y-8 shadow-xl">
                          <h3 className="text-xl font-black text-white flex items-center gap-3"><KeyRound className="w-6 h-6 text-primary-500" /> امنیت و تغییر گذرواژه</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3">
                                  <label className="text-[10px] text-slate-500 font-black uppercase ms-1">رمز عبور فعلی</label>
                                  <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-primary-500/50 transition-all" />
                              </div>
                              <div className="space-y-3">
                                  <label className="text-[10px] text-slate-500 font-black uppercase ms-1">رمز عبور جدید</label>
                                  <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-primary-500/50 transition-all" />
                              </div>
                          </div>
                          <button className="bg-primary-500 text-black font-black py-5 px-12 rounded-2xl shadow-xl shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all">تایید تغییرات امنیتی</button>
                      </div>
                  </div>
              )}
          </div>
      </main>

      {/* --- MOBILE BOTTOM NAVIGATION (PWA Feel) --- */}
      <nav className="lg:hidden fixed bottom-0 end-0 start-0 z-50 px-6 pb-8 pt-2 safe-bottom">
          <div className="bg-surface/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-2 shadow-[0_-15px_50px_rgba(0,0,0,0.6)] flex justify-between items-center h-20">
              {[
                { id: 'home', icon: <Home className="w-6 h-6" />, label: 'خانه' },
                { id: 'course-hub', icon: <MonitorPlay className="w-6 h-6" />, label: 'یادگیری' },
                { id: 'notifications', icon: <Bell className="w-6 h-6" />, label: 'پیام‌ها', badge: unreadCount },
                { id: 'profile', icon: <UserIcon className="w-6 h-6" />, label: 'پروفایل' },
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => { setActiveView(tab.id as ActiveView); if(tab.id === 'course-hub') setCourseSubView('dashboard'); }} 
                  className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all relative ${activeView === tab.id ? 'text-primary-500 bg-white/5' : 'text-slate-500'}`}
                >
                    <div className="relative">
                        {tab.icon}
                        {tab.badge ? <span className="absolute -top-1.5 -start-1.5 w-4 h-4 bg-rose-500 text-white text-[8px] rounded-full flex items-center justify-center font-black border-2 border-[#020617]">{tab.badge}</span> : null}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-tighter">{tab.label}</span>
                </button>
              ))}
          </div>
      </nav>

    </div>
  );
};

export default UserDashboard;
