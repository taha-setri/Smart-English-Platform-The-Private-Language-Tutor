import React from 'react';
import { ShieldCheck, Lock, Cookie, UserCheck, X, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, currentLang }) => {
  if (!isOpen) return null;

  const isAr = currentLang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-6 text-slate-200 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {isAr ? 'سياسة الخصوصية وأمان بيانات الطلاب وملفات الكوكيز' : 'Student Privacy Policy & Cookie Security'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr ? 'تأكيد الحماية الصارمة لبيانات المتمدرسين والطلاب لعام 2026' : 'Strict student data privacy protection 2026'}
            </p>
          </div>
        </div>

        {/* Key Commitments */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
          
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <Lock className="w-4 h-4" />
              <span>{isAr ? '1. سرية بيانات النصوص والمدخلات التعليمية:' : '1. Confidentiality of Inputs:'}</span>
            </div>
            <p className="text-slate-300">
              {isAr
                ? 'نؤكد لجميع الطلاب والمتمدرسين وأولياء الأمور أن كافة النصوص، والجمل، والاختبارات التي يتم إدخالها داخل المنصة تُعالج بطريقة آمنة ومشفرة، ولا يتم تخزين أي نصوص شخصية أو مشاركتها مع أطراف خارجية تجارية بأي شكل من الأشكال.'
                : 'We confirm that all texts, sentences, and exercises entered by students are processed securely and privately without commercial third-party storage.'}
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-400">
              <Cookie className="w-4 h-4" />
              <span>{isAr ? '2. سياسة ملفات تعريف الارتباط (Cookies):' : '2. Cookies Policy:'}</span>
            </div>
            <p className="text-slate-300">
              {isAr
                ? 'تقتصر ملفات الكوكيز المستخدمة في هذه المنصة فقط على تفضيلات الجلسة الضرورية (مثل تذكر المستوى المختار، وتفضيل سرعة الصوت، واللغة المفضلة). لا نستخدم كوكيز تتبعية إعلانية أو استخباراتية إطلاقاً.'
                : 'Cookies are restricted strictly to essential session preferences (selected level, audio speed, language). Zero advertising or tracking cookies are used.'}
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-cyan-400">
              <UserCheck className="w-4 h-4" />
              <span>{isAr ? '3. الإشراف الأكاديمي والمسؤولية التربوية:' : '3. Academic Supervision:'}</span>
            </div>
            <p className="text-slate-300">
              {isAr
                ? 'تخضع هذه المنصة لإشراف وتطوير المؤسس والمشرف التربوي الأستاذ طه سطري (Taha Setri)، وفق معايير تربوية تهدف إلى صون كرامة المتعلم وتوفير بيئة تعليمية آمنة وخالية من أي مشتتات.'
                : 'This platform is developed and maintained under the direct supervision of Founder Taha Setri, adhering to strict pedagogical privacy standards.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{isAr ? 'جميع العمليات التعليمية محمية ومتوافقة مع أعلى معايير أمان الويب الحديثة لعام 2026.' : 'All educational interactions are protected under 2026 web safety standards.'}</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
          <div>
            <span>{isAr ? 'المؤسس والمشرف: ' : 'Founder & Supervisor: '}</span>
            <span className="font-bold text-white">Taha Setri</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors"
          >
            {isAr ? 'فهمت وموافق' : 'I Understand'}
          </button>
        </div>

      </div>
    </div>
  );
};
