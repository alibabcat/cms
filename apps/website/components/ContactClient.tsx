'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2, ChevronRight, Loader2, Timer, ArrowRight, Navigation, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/components/LanguageContext';
import { t } from '@/lib/ui-strings';
import type { InstituteInfo } from '@/lib/payload';

const PROVINCES = {
  fa: [
    "آذربایجان شرقی", "آذربایجان غربی", "اردبیل", "اصفهان", "البرز", "ایلام", "بوشهر",
    "تهران", "چهارمحال و بختیاری", "خراسان جنوبی", "خراسان رضوی", "خراسان شمالی",
    "خوزستان", "زنجان", "سمنان", "سیستان و بلوچستان", "فارس", "قزوین", "قم", "کردستان",
    "کرمان", "کرمانشاه", "کهگیلویه و بویراحمد", "گلستان", "گیلان", "لرستان", "مازندران",
    "مرکزی", "هرمزگان", "همدان", "یزد"
  ],
  en: [
    "East Azerbaijan", "West Azerbaijan", "Ardabil", "Isfahan", "Alborz", "Ilam", "Bushehr",
    "Tehran", "Chaharmahal and Bakhtiari", "South Khorasan", "Razavi Khorasan", "North Khorasan",
    "Khuzestan", "Zanjan", "Semnan", "Sistan and Baluchestan", "Fars", "Qazvin", "Qom", "Kurdistan",
    "Kerman", "Kermanshah", "Kohgiluyeh and Boyer-Ahmad", "Golestan", "Gilan", "Lorestan", "Mazandaran",
    "Markazi", "Hormozgan", "Hamadan", "Yazd"
  ],
} as const;

const REQUEST_TYPES = [
  { value: 'course-consultation', fa: 'مشاوره تخصصی دوره', en: 'Course consultation' },
  { value: 'investment-consultation', fa: 'مشاوره سرمایه‌گذاری / کپی ترید', en: 'Investment consultation / copy trading' },
  { value: 'technical-support', fa: 'پشتیبانی فنی', en: 'Technical support' },
  { value: 'other', fa: 'سایر موارد', en: 'Other' },
] as const;

const QUESTIONS = {
  fa: [
    { id: 'goal', question: 'هدف اصلی شما از این مسیر چیست؟', options: ['می‌خواهم تریدر حرفه‌ای شوم (هدف شغلی و جدی)', 'می‌خواهم به یک درآمد ثابت/مستمر از ترید برسم', 'می‌خواهم آموزش اصولی و بلندمدت ببینم (ساختن پایه قوی)', 'فعلاً هدفم یادگیری و تجربه برای شروع است (آشنایی و ورود کم‌ریسک)'] },
    { id: 'level', question: 'الان در چه سطحی هستید؟', options: ['صفر، تازه می‌خوام شروع کنم', 'مبتدی (چند تا آموزش دیدم ولی پلن ندارم)', 'متوسط (معامله کردم، نتیجه‌هام ثابت نیست)', 'پیشرفته (پلن دارم ولی دنبال بهینه‌سازی‌ام)'] },
    { id: 'timeSpent', question: 'در 3 ماه گذشته چقدر برای یادگیری/ترید وقت گذاشتید؟', options: ['کمتر از ۲ ساعت در هفته', '۲ تا ۵ ساعت در هفته', '۵ تا ۱۰ ساعت در هفته', 'بیشتر از ۱۰ ساعت در هفته'] },
    { id: 'challenge', question: 'بزرگ‌ترین چالش شما در ترید چیست؟', options: ['ورود و خروج (نقطه‌گیری)', 'مدیریت سرمایه و ریسک', 'روانشناسی (ترس/طمع/بی‌صبری/ریونج)', 'استراتژی مشخص ندارم / هنوز شروع نکرده‌ام'] },
    { id: 'status', question: 'الان وضعیت شما کدام است؟', options: ['هنوز معامله نکرده‌ام', 'معامله می‌کنم ولی بیشتر وقت‌ها احساسی می‌شود', 'معامله می‌کنم ولی نتیجه‌ام نوسانی است', 'نتیجه‌ام نسبتاً پایدار است، دنبال رشد بیشترم'] },
    { id: 'intent', question: 'اگر یک دوره شامل آموزش حرفه‌ای + روانشناسی + کارگاه تمرین + منتورینگ باشد، چقدر جدی هستید؟', options: ['فقط می‌خوام اطلاعات بگیرم', 'اگر شرایطش مناسب باشه، بررسی می‌کنم', 'به احتمال زیاد ثبت‌نام می‌کنم', 'همین هفته می‌خوام ثبت‌نام کنم'] },
    { id: 'mentorship', question: 'برای شما «پشتیبانی و منتورینگ» چقدر مهم است؟', options: ['کم', 'متوسط', 'زیاد', 'خیلی زیاد'] },
    { id: 'timeline', question: 'تا چه زمانی می‌خواهید شروع/جدی‌تر کنید؟', options: ['فعلاً زمانش معلوم نیست', 'تا یک ماه آینده', 'همین هفته', 'امروز تصمیم دارم'] },
  ],
  en: [
    { id: 'goal', question: 'What is your main goal on this path?', options: ['I want to become a professional trader (a serious career goal)', 'I want to reach a steady/consistent income from trading', 'I want proper, long-term education (building a strong foundation)', 'For now my goal is just learning and low-risk experience getting started'] },
    { id: 'level', question: 'What level are you at right now?', options: ['Zero, just about to start', 'Beginner (watched a few tutorials but have no plan)', 'Intermediate (I trade, but results are inconsistent)', 'Advanced (I have a plan but I’m looking to optimize it)'] },
    { id: 'timeSpent', question: 'How much time have you spent learning/trading in the last 3 months?', options: ['Less than 2 hours a week', '2 to 5 hours a week', '5 to 10 hours a week', 'More than 10 hours a week'] },
    { id: 'challenge', question: 'What is your biggest challenge in trading?', options: ['Entries and exits (timing)', 'Money and risk management', 'Psychology (fear/greed/impatience/revenge trading)', 'No clear strategy / haven’t started yet'] },
    { id: 'status', question: 'What is your current status?', options: ['Haven’t traded yet', 'I trade, but I get emotional most of the time', 'I trade, but my results are inconsistent', 'My results are fairly stable, looking for more growth'] },
    { id: 'intent', question: 'If a course included professional training + psychology + practice workshops + mentorship, how serious would you be?', options: ['I just want to gather information', 'I’ll consider it if the terms are right', 'I’ll most likely enroll', 'I want to enroll this week'] },
    { id: 'mentorship', question: 'How important is "support and mentorship" to you?', options: ['Low', 'Medium', 'High', 'Very high'] },
    { id: 'timeline', question: 'By when do you want to start/get more serious?', options: ['No timeline in mind yet', 'Within the next month', 'This week', 'I’m deciding today'] },
  ],
} as const;

const TEXT = {
  fa: {
    backToHome: 'بازگشت به خانه',
    formTitle: 'فرم درخواست',
    formTitleHighlight: 'مشاوره تخصصی',
    formSubtitle: 'برای دریافت بهترین راهنمایی، لطفا به سوالات زیر با دقت پاسخ دهید.',
    step1Title: 'مرحله اول: اطلاعات فردی',
    fullName: 'نام و نام خانوادگی',
    fullNamePlaceholder: 'مثلا: علی رضایی',
    province: 'استان محل سکونت',
    provincePlaceholder: 'انتخاب کنید...',
    phone: 'شماره همراه',
    phonePlaceholder: '0912...',
    phoneHint: 'کد تایید به این شماره ارسال خواهد شد.',
    email: 'ایمیل',
    requestType: 'نوع درخواست',
    extraDescription: 'توضیحات تکمیلی (اختیاری)',
    extraDescriptionPlaceholder: 'هر گونه توضیحات اضافی که فکر می‌کنید به ما کمک می‌کند...',
    nextStep: 'مرحله بعدی',
    step2Title: 'مرحله دوم: تعیین سطح و اهداف',
    prevStep: 'بازگشت به مرحله قبل',
    confirmAndGetCode: 'تایید و دریافت کد',
    otpTitle: 'احراز هویت',
    otpSentTo: (phone: string) => `کد تایید ۴ رقمی به شماره ${phone} ارسال شد.`,
    otpPlaceholder: 'کد تایید را وارد کنید',
    editNumber: 'ویرایش شماره',
    resendCode: 'ارسال مجدد کد',
    finalSubmit: 'ثبت نهایی درخواست',
    successTitle: 'درخواست شما ثبت شد!',
    successBody: (phone: string) => `اطلاعات شما با موفقیت برای تیم مشاوران کیاوش ارسال شد. کارشناسان ما پس از بررسی پاسخ‌های شما، در اولین فرصت با شماره ${phone} تماس خواهند گرفت.`,
    whatsappTitle: 'مشاوره سریع واتساپ',
    whatsappBody: 'نیاز به مشاوره فوری دارید؟ همین حالا پیام دهید تا دستیاران ما راهنمایی‌تان کنند.',
    whatsappButton: 'ارسال پیام در واتساپ',
    directContact: 'اطلاعات تماس مستقیم',
    officeAddress: 'آدرس دفتر مرکزی',
    consultationPhone: 'تلفن مشاوره',
    supportEmail: 'ایمیل پشتیبانی',
    mapTitle: 'موقعیت روی نقشه',
    viewLargerMap: 'مشاهده نقشه بزرگ‌تر',
    getDirections: 'مسیریابی',
    defaultAddress: 'تهران، جردن، خیابان پدیدار، پلاک ۲۰',
    defaultPhone: '021 - 88 88 20 20',
    defaultEmail: 'support@kiawosch.co',
    requiredFieldsAlert: 'لطفا تمام فیلدهای ستاره‌دار را تکمیل کنید.',
    allQuestionsAlert: 'لطفا به تمام سوالات پاسخ دهید.',
    resendSimAlert: 'کد جدید ارسال شد (شبیه‌سازی)',
    invalidOtpAlert: 'کد تایید نامعتبر است',
  },
  en: {
    backToHome: 'Back to home',
    formTitle: 'Request a',
    formTitleHighlight: 'specialized consultation',
    formSubtitle: 'To get the best guidance, please answer the following questions carefully.',
    step1Title: 'Step 1: Personal information',
    fullName: 'Full name',
    fullNamePlaceholder: 'e.g. John Smith',
    province: 'Province of residence',
    provincePlaceholder: 'Select...',
    phone: 'Mobile number',
    phonePlaceholder: '0912...',
    phoneHint: 'A verification code will be sent to this number.',
    email: 'Email',
    requestType: 'Request type',
    extraDescription: 'Additional details (optional)',
    extraDescriptionPlaceholder: 'Any additional details you think could help us...',
    nextStep: 'Next step',
    step2Title: 'Step 2: Level and goals',
    prevStep: 'Back to previous step',
    confirmAndGetCode: 'Confirm and get code',
    otpTitle: 'Verification',
    otpSentTo: (phone: string) => `A 4-digit verification code was sent to ${phone}.`,
    otpPlaceholder: 'Enter the verification code',
    editNumber: 'Edit number',
    resendCode: 'Resend code',
    finalSubmit: 'Submit final request',
    successTitle: 'Your request has been submitted!',
    successBody: (phone: string) => `Your information was successfully sent to the Kiawosch advisory team. After reviewing your answers, our specialists will contact you at ${phone} as soon as possible.`,
    whatsappTitle: 'Quick WhatsApp consultation',
    whatsappBody: 'Need urgent advice? Message us right now so our assistants can guide you.',
    whatsappButton: 'Send a message on WhatsApp',
    directContact: 'Direct contact information',
    officeAddress: 'Head office address',
    consultationPhone: 'Consultation phone',
    supportEmail: 'Support email',
    mapTitle: 'Location on the map',
    viewLargerMap: 'View a larger map',
    getDirections: 'Get directions',
    defaultAddress: 'Tehran, Jordan St., Padidar Alley, No. 20',
    defaultPhone: '021 - 88 88 20 20',
    defaultEmail: 'support@kiawosch.co',
    requiredFieldsAlert: 'Please fill in all the required fields.',
    allQuestionsAlert: 'Please answer all the questions.',
    resendSimAlert: 'A new code has been sent (simulated)',
    invalidOtpAlert: 'Invalid verification code',
  },
} as const;

interface ContactClientProps {
  institute: InstituteInfo | null;
}

const ContactClient: React.FC<ContactClientProps> = ({ institute }) => {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = TEXT[locale];
  const provinces = PROVINCES[locale];
  const questions = QUESTIONS[locale];

  // OpenStreetMap embed — only shown when the Institute global has coordinates.
  const lat = institute?.latitude ?? null;
  const lon = institute?.longitude ?? null;
  const hasMap = lat !== null && lon !== null;
  const zoom = institute?.mapZoom ?? 16;
  const d = 180 / Math.pow(2, zoom); // bbox half-size (deg), derived from the CMS zoom level
  const mapEmbedSrc = hasMap
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${lon! - d}%2C${lat! - d}%2C${lon! + d}%2C${lat! + d}&layer=mapnik&marker=${lat}%2C${lon}`
    : '';
  const mapLargeHref = hasMap
    ? `https://www.google.com/maps?q=${lat},${lon}&z=${zoom}`
    : '';
  const mapDirectionsHref = hasMap
    ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`
    : '';
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', province: '', requestType: 'course-consultation', description: '', goal: '', level: '', timeSpent: '', challenge: '', status: '', intent: '', mentorship: '', timeline: '' });
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
      let interval: ReturnType<typeof setInterval>;
      if (step === 3 && timer > 0) {
          interval = setInterval(() => { setTimer((prev) => prev - 1); }, 1000);
      } else if (timer === 0) {
          setCanResend(true);
      }
      return () => clearInterval(interval);
  }, [step, timer]);

  const handleChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => formData.name && formData.email && formData.phone && formData.province;
  const validateStep2 = () => formData.goal && formData.level && formData.timeSpent && formData.challenge && formData.status && formData.intent && formData.mentorship && formData.timeline;

  const handleNext = () => {
      if (step === 1) {
          if (!validateStep1()) { alert(text.requiredFieldsAlert); return; }
          setStep(2); window.scrollTo(0, 0);
      } else if (step === 2) {
          if (!validateStep2()) { alert(text.allQuestionsAlert); return; }
          setLoading(true);
          setTimeout(() => { setLoading(false); setStep(3); setTimer(120); setCanResend(false); window.scrollTo(0, 0); }, 1500);
      }
  };

  const handleResendOtp = () => {
      setLoading(true);
      setTimeout(() => { setLoading(false); setTimer(120); setCanResend(false); alert(text.resendSimAlert); }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (otp.length < 4) { alert(text.invalidOtpAlert); return; }
      setLoading(true);
      setTimeout(() => { setLoading(false); setIsSuccess(true); window.scrollTo(0, 0); }, 2000);
  };

  const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isSuccess) {
      return (
        <div className="min-h-screen bg-background pt-20 pb-20 flex items-center justify-center transition-colors duration-300">
             <div className="bg-surface p-12 rounded-3xl border border-green-500/30 text-center max-w-lg shadow-2xl">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-black text-foreground mb-4">{text.successTitle}</h2>
                <p className="text-muted text-lg mb-8">
                    {text.successBody(formData.phone)}
                </p>
                <button type="button" onClick={() => router.back()} className="bg-gradient-to-r from-primary-500 to-amber-400 text-black font-bold px-8 py-3 rounded-xl hover:from-primary-400 hover:to-amber-300 transition-colors">
                    {t(locale, 'backToHome')}
                </button>
             </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-background pt-10 pb-20 relative transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <button type="button" onClick={() => router.back()} className="flex items-center text-muted hover:text-primary-500 mb-8 transition-colors">
            <ArrowRight className="w-5 h-5 me-2" />
            {text.backToHome}
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            {text.formTitle} <span className="text-primary-500">{text.formTitleHighlight}</span>
          </h1>
          <p className="text-muted">{text.formSubtitle}</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-12 relative max-w-xl mx-auto">
            <div className="absolute top-1/2 end-0 w-full h-1 bg-border -z-10 -translate-y-1/2 rounded-full"></div>
            <div className="absolute top-1/2 end-0 h-1 bg-primary-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            {[1, 2, 3].map((n) => (
                <div key={n} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= n ? 'bg-primary-500 text-black scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-surface border border-border text-muted'}`}>{n}</div>
            ))}
        </div>

        <div className="bg-surface p-6 md:p-10 rounded-3xl border border-border shadow-2xl mb-16">

            {/* STEP 1 */}
            {step === 1 && (
                <div className="animate-fade-in space-y-6">
                    <h3 className="text-xl font-bold text-foreground mb-6 border-b border-border pb-4">{text.step1Title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">{text.fullName} <span className="text-red-500">*</span></label>
                            <Input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder={text.fullNamePlaceholder} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">{text.province} <span className="text-red-500">*</span></label>
                            <Select value={formData.province} onValueChange={(v) => handleChange('province', v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={text.provincePlaceholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">{text.phone} <span className="text-red-500">*</span></label>
                            <Input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="dir-ltr text-start" placeholder={text.phonePlaceholder} />
                            <p className="text-xs text-muted mt-1">{text.phoneHint}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">{text.email} <span className="text-red-500">*</span></label>
                            <Input dir="ltr" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="dir-ltr text-start" placeholder="example@mail.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">{text.requestType}</label>
                        <Select value={formData.requestType} onValueChange={(v) => handleChange('requestType', v)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {REQUEST_TYPES.map((r) => (
                                    <SelectItem key={r.value} value={r.value}>{r[locale]}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">{text.extraDescription}</label>
                        <Textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} placeholder={text.extraDescriptionPlaceholder} />
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button type="button" onClick={handleNext} className="bg-gradient-to-r from-primary-500 to-amber-400 hover:from-primary-400 hover:to-amber-300 text-black font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2">
                            {text.nextStep}
                            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <div className="animate-fade-in space-y-8">
                     <h3 className="text-xl font-bold text-foreground mb-6 border-b border-border pb-4">{text.step2Title}</h3>
                     <div className="space-y-8">
                        {questions.map((q, idx) => (
                            <div key={q.id} className="bg-background p-5 rounded-2xl border border-border">
                                <p className="font-bold text-foreground mb-4 text-base md:text-lg flex gap-2">
                                    <span className="text-primary-500">#{idx + 1}</span> {q.question} <span className="text-red-500 text-sm">*</span>
                                </p>
                                <div className="space-y-3">
                                    {q.options.map((opt) => (
                                        <label key={opt} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                            // @ts-ignore
                                            formData[q.id] === opt ? 'bg-primary-500/10 border-primary-500 text-foreground shadow-sm' : 'border-transparent hover:bg-surface text-muted hover:text-foreground'
                                        }`}>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                                // @ts-ignore
                                                formData[q.id] === opt ? 'border-primary-500' : 'border-muted'
                                            }`}>
                                                {/* @ts-ignore */}
                                                {formData[q.id] === opt && <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>}
                                            </div>
                                            <input type="radio" name={q.id} value={opt}
                                                // @ts-ignore
                                                checked={formData[q.id] === opt}
                                                onChange={(e) => handleChange(q.id, e.target.value)}
                                                className="hidden"
                                            />
                                            <span className="text-sm md:text-base font-medium">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                     </div>
                     <div className="pt-6 flex justify-between items-center border-t border-border">
                        <button type="button" onClick={() => { setStep(1); window.scrollTo(0, 0); }} className="text-muted hover:text-foreground font-medium px-4 py-2">{text.prevStep}</button>
                        <button type="button" onClick={handleNext} disabled={loading} className="bg-gradient-to-r from-primary-500 to-amber-400 hover:from-primary-400 hover:to-amber-300 text-black font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : (<>{text.confirmAndGetCode}<ChevronRight className="w-5 h-5 rtl:rotate-180" /></>)}
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
                <div className="animate-fade-in max-w-md mx-auto text-center space-y-6">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500">
                            <MessageCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{text.otpTitle}</h3>
                        <p className="text-muted text-sm mt-2">{text.otpSentTo(formData.phone)}</p>
                    </div>
                    <div className="relative">
                        <Input type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} className="rounded-2xl py-5 text-center text-3xl font-mono tracking-[0.5em] placeholder:tracking-normal placeholder:text-base" placeholder={text.otpPlaceholder} autoFocus />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <button type="button" onClick={() => setStep(1)} className="text-muted hover:text-foreground">{text.editNumber}</button>
                        {canResend ? (
                            <button type="button" onClick={handleResendOtp} disabled={loading} className="text-primary-500 hover:text-primary-400 font-bold">{text.resendCode}</button>
                        ) : (
                            <div className="flex items-center gap-1 text-muted font-mono">
                                <Timer className="w-4 h-4" />
                                <span>{formatTime(timer)}</span>
                            </div>
                        )}
                    </div>
                    <button type="button" onClick={handleSubmit} disabled={loading || otp.length < 4} className="w-full bg-gradient-to-r from-primary-500 to-amber-400 hover:from-primary-400 hover:to-amber-300 text-black font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-primary-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8">
                         {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : (<>{text.finalSubmit}<CheckCircle2 className="w-5 h-5" /></>)}
                    </button>
                </div>
            )}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="bg-gradient-to-r from-primary-500 to-amber-400 p-8 rounded-3xl shadow-2xl text-black transform hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black">{text.whatsappTitle}</h3>
                    <MessageCircle className="w-8 h-8" />
                </div>
                <p className="mb-6 text-lg font-medium opacity-90">{text.whatsappBody}</p>
                <button type="button" className="bg-white text-black w-full py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">{text.whatsappButton}</button>
            </div>
            <div className="bg-surface p-8 rounded-3xl border border-border shadow-xl">
                <h3 className="text-xl font-bold text-foreground mb-6">{text.directContact}</h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary-500/10 p-3 rounded-xl text-primary-500"><MapPin className="w-6 h-6" /></div>
                        <div>
                            <p className="text-foreground font-bold">{text.officeAddress}</p>
                            <p className="text-muted text-sm mt-1">{institute?.address || text.defaultAddress}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary-500/10 p-3 rounded-xl text-primary-500"><Phone className="w-6 h-6" /></div>
                        <div>
                            <p className="text-foreground font-bold">{text.consultationPhone}</p>
                            <p className="text-muted text-sm mt-1 dir-ltr text-start font-mono">{institute?.tel || text.defaultPhone}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary-500/10 p-3 rounded-xl text-primary-500"><Mail className="w-6 h-6" /></div>
                        <div>
                            <p className="text-foreground font-bold">{text.supportEmail}</p>
                            <p className="text-muted text-sm mt-1 font-mono">{institute?.email || text.defaultEmail}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Location map (OpenStreetMap) — rendered only when coordinates are set */}
        {hasMap && (
            <div className="mt-8 bg-surface rounded-3xl border border-border shadow-xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-500/10 p-3 rounded-xl text-primary-500"><MapPin className="w-6 h-6" /></div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground">{text.mapTitle}</h3>
                            {(institute?.address) && <p className="text-muted text-sm mt-0.5">{institute.address}</p>}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <a href={mapDirectionsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-black transition-colors font-bold text-sm px-4 py-2 rounded-xl">
                            <Navigation className="w-4 h-4" />
                            {text.getDirections}
                        </a>
                        <a href={mapLargeHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors font-medium text-sm px-3 py-2 rounded-xl">
                            <ExternalLink className="w-4 h-4" />
                            <span className="hidden sm:inline">{text.viewLargerMap}</span>
                        </a>
                    </div>
                </div>
                <iframe
                    title={text.mapTitle}
                    src={mapEmbedSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[320px] md:h-[420px] border-0 grayscale-[0.15] contrast-[1.05]"
                />
            </div>
        )}
      </div>
    </div>
  );
};

export default ContactClient;
