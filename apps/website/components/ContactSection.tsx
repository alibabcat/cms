import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#0f172a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#111827] to-[#0f172a] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            ارتباط با <span className="text-primary-500">موسسه کیاوش</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            برای مشاوره درباره استراتژی پاندولیسم یا ثبت نام در دوره‌ها، با ما در تماس باشید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#1e293b] p-8 rounded-2xl border border-gray-800 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-6">اطلاعات تماس</h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary-500/10 p-3 rounded-lg text-primary-500">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white font-bold">آدرس دفتر مرکزی</p>
                            <p className="text-gray-400 text-sm mt-1">تهران، جردن، خیابان پدیدار، پلاک ۲۰، ساختمان کیاوش</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary-500/10 p-3 rounded-lg text-primary-500">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white font-bold">تلفن مشاوره</p>
                            <p className="text-gray-400 text-sm mt-1 dir-ltr text-start">021 - 88 88 20 20</p>
                            <p className="text-gray-500 text-xs mt-1">پاسخگویی: شنبه تا چهارشنبه ۹ تا ۱۷</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary-500/10 p-3 rounded-lg text-primary-500">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white font-bold">ایمیل پشتیبانی</p>
                            <p className="text-gray-400 text-sm mt-1">support@kiawosch.co</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary-600 to-amber-600 p-8 rounded-2xl shadow-lg text-black">
                <h3 className="text-xl font-bold mb-2">مشاوره رایگان پاندولیسم</h3>
                <p className="mb-4 text-sm font-medium opacity-90">عدد ۱ را به سامانه پیامکی ما ارسال کنید تا مشاوران ما با شما تماس بگیرند.</p>
                <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center font-mono text-xl font-bold">
                    10008585
                </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#1e293b] p-8 rounded-2xl border border-gray-800 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">ارسال پیام</h3>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">نام و نام خانوادگی</label>
                        <input type="text" className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="مثلا: علی رضایی" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">شماره موبایل</label>
                        <input type="tel" className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="0912..." />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">موضوع پیام</label>
                    <select className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors">
                        <option>مشاوره دوره پاندولیسم</option>
                        <option>پشتیبانی سیگنال VIP</option>
                        <option>همکاری سازمانی</option>
                        <option>سایر موارد</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">متن پیام</label>
                    <textarea rows={4} className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="پیام خود را بنویسید..."></textarea>
                </div>
                <button type="submit" className="w-full bg-primary-500 hover:bg-primary-400 text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2">
                    ارسال پیام
                    <Send className="w-5 h-5" />
                </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;