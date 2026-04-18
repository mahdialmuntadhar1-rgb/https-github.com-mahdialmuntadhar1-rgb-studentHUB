import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, Heart, MessageCircle, UserPlus, 
  Briefcase, Info, Calendar, Sparkles, 
  CheckCircle2, AlertCircle, Bookmark, Trash2
} from 'lucide-react';
import { SAMPLE_NOTIFICATIONS } from '../constants';
import { Notification } from '../types';

export default function Notifications() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const categories = [
    { id: 'All', label: 'الكل', icon: Bell },
    { id: 'announcement', label: 'إعلانات', icon: Info },
    { id: 'event', label: 'فعاليات', icon: Calendar },
    { id: 'opportunity', label: 'فرص عمل', icon: Briefcase },
    { id: 'social', label: 'اجتماعي', icon: Heart },
  ];

  const getIcon = (notif: Notification) => {
    switch (notif.type) {
      case 'announcement': return { icon: Info, color: 'text-orange-500', bg: 'bg-orange-50' };
      case 'event': return { icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' };
      case 'opportunity': return { icon: Briefcase, color: 'text-primary', bg: 'bg-primary/10' };
      case 'social':
        if (notif.subType === 'like') return { icon: Heart, color: 'text-red-500', bg: 'bg-red-50' };
        if (notif.subType === 'comment') return { icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-50' };
        if (notif.subType === 'follow') return { icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-50' };
        return { icon: Heart, color: 'text-gray-500', bg: 'bg-gray-50' };
      default: return { icon: Bell, color: 'text-gray-500', bg: 'bg-gray-50' };
    }
  };

  const filteredNotifs = notifications.filter(n => activeCategory === 'All' || n.type === activeCategory);

  const groups = [
    { id: 'today', label: 'اليوم' },
    { id: 'this_week', label: 'هذا الأسبوع' },
    { id: 'earlier', label: 'سابقاً' },
  ];

  const deleteNotification = (id: string) => {
      setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Header & Categories */}
      <div className="bg-white px-6 pt-6 pb-2 border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-black text-secondary">التنبيهات</h1>
            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:bg-primary/5 px-4 py-2 rounded-xl border border-primary/20 transition-all">
                Mark all as read
            </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-4">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                        activeCategory === cat.id 
                            ? 'bg-secondary border-secondary text-white shadow-lg' 
                            : 'bg-white border-gray-50 text-gray-400 hover:border-primary/30'
                    }`}
                >
                    <cat.icon size={14} />
                    <span>{cat.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-6 py-8">
        {groups.map((group) => {
            const groupNotifs = filteredNotifs.filter(n => n.group === group.id);
            if (groupNotifs.length === 0) return null;

            return (
                <div key={group.id} className="mb-10">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <span className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">{group.label}</span>
                        <div className="h-px bg-gray-100 flex-1" />
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {groupNotifs.map((notif, idx) => {
                                const meta = getIcon(notif);
                                return (
                                    <motion.div
                                        key={notif.id}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={`group relative bg-white p-5 rounded-[2rem] border transition-all flex items-start gap-5 hover:shadow-xl active:scale-[0.98] cursor-pointer ${
                                            notif.isRead ? 'border-gray-50' : 'border-primary/20 shadow-lg shadow-primary/5'
                                        }`}
                                    >
                                        <div className="relative">
                                            {notif.avatar ? (
                                                <img src={notif.avatar} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-surface" alt="" />
                                            ) : (
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${meta.bg} ${meta.color} shadow-sm border border-white/50`}>
                                                    <meta.icon size={24} />
                                                </div>
                                            )}
                                            {!notif.isRead && (
                                                <div className="absolute -top-1 -left-1 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-sm" />
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-black text-secondary leading-tight">{notif.title}</h4>
                                                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{notif.timestamp}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">{notif.content}</p>
                                        </div>

                                        <div className="flex flex-col gap-2 scale-0 group-hover:scale-100 transition-transform origin-right">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                                                className="p-2 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            );
        })}

        {filteredNotifs.length === 0 && (
            <div className="py-32 text-center space-y-6">
                <div className="w-24 h-24 bg-white rounded-[3rem] shadow-sm border border-gray-50 flex items-center justify-center mx-auto text-gray-200">
                    <Bell size={40} />
                </div>
                <div>
                   <h3 className="font-black text-secondary text-lg">لا توجد تنبيهات هنا</h3>
                   <p className="text-sm text-gray-400 font-bold">بمجرد حدوث شيء جديد، سنقوم بإعلامك فوراً!</p>
                </div>
                <button 
                  onClick={() => setActiveCategory('All')}
                  className="px-8 py-3 bg-secondary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-secondary/20"
                >
                   View All Notifications
                </button>
            </div>
        )}
      </div>
    </div>
  );
}
