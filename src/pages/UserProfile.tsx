import React from 'react';
import { motion } from 'motion/react';
import { Settings, Edit3, Grid, Bookmark, Save, ArrowLeft, MoreHorizontal, GraduationCap, MapPin } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="pb-24">
      {/* Header / Cover */}
      <div className="relative h-48 mb-16">
        <img 
            src="https://picsum.photos/seed/profile_cover/1200/400" 
            alt="Cover" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Profile Avatar */}
        <div className="absolute -bottom-14 right-6">
            <div className="relative">
                <img 
                    src="https://picsum.photos/seed/iraqi_student/400/400" 
                    alt="Profile" 
                    className="w-32 h-32 rounded-[2.5rem] border-4 border-white object-cover shadow-xl"
                    referrerPolicy="no-referrer"
                />
                <button className="absolute bottom-1 -left-1 bg-primary text-secondary p-2 rounded-xl border-2 border-white shadow-lg active:scale-95 transition-transform">
                    <Edit3 size={18} />
                </button>
            </div>
        </div>

        {/* Back and Settings */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white">
                <ArrowLeft size={20} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white">
                <Settings size={20} />
            </button>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-black text-secondary">عباس علي</h1>
            <div className="flex gap-2">
                 <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/20">طالب</span>
            </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <GraduationCap size={16} className="text-primary" />
                <span>طالب في جامعة بغداد - هندسة تقنيات المعلومات</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={16} className="text-primary" />
                <span>المحافظة: بغداد</span>
            </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mb-8">
            <div className="flex flex-col">
                <span className="text-2xl font-black text-secondary font-inter">24</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Posts</span>
            </div>
            <div className="flex items-center gap-8 border-r border-gray-100 pr-8">
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-secondary font-inter">1.2k</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Followers</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-secondary font-inter">450</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Following</span>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
            <button className="flex-1 bg-secondary text-white font-bold py-4 rounded-2xl shadow-xl shadow-secondary/20 active:scale-95 transition-transform">تعديل الملف الشخصي</button>
            <button className="w-16 bg-surface border border-gray-100 flex items-center justify-center rounded-2xl active:scale-95 transition-all">
                <MoreHorizontal size={24} className="text-secondary" />
            </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 flex items-center justify-start gap-10 mb-6">
            <button className="relative pb-3 text-secondary font-black text-sm transition-all focus:outline-none">
                منشوراتي
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
            </button>
            <button className="pb-3 text-gray-400 font-bold text-sm transition-all">عني</button>
            <button className="pb-3 text-gray-400 font-bold text-sm transition-all">محفوظات</button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-2">
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden group active:scale-95 transition-transform">
                    <img src={`https://picsum.photos/seed/p${i}/300/300`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
