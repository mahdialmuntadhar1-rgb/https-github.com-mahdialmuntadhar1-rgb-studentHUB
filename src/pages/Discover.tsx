import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, University, Users, Filter, 
  ChevronLeft, LayoutGrid, List, Star, TrendingUp, 
  Zap, Plus, CheckCircle2, MoreHorizontal, GraduationCap, Building2, School
} from 'lucide-react';
import { SAMPLE_INSTITUTIONS, GOVERNORATES } from '../constants';
import { Institution } from '../types';
import { InstitutionSkeleton } from '../components/Skeletons';

interface DiscoverProps {
  onSelectInstitution: (inst: Institution) => void;
}

export default function Discover({ onSelectInstitution }: DiscoverProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGov, setActiveGov] = useState('الكل');
  const [activeType, setActiveType] = useState('الكل');
  const [sortBy, setSortBy] = useState('الأكثر نشاطاً');
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load simulation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeGov, activeType, sortBy]);

  const types = ['الكل', 'جامعات', 'كليات', 'معاهد', 'إعداديات'];
  const sorts = ['الأكثر نشاطاً', 'الأكثر متابعة', 'أبجدياً'];

  // Filter Logic
  const filteredInstitutions = useMemo(() => {
    return SAMPLE_INSTITUTIONS.filter(inst => {
      const matchSearch = inst.name.includes(searchQuery) || inst.nameEn?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchGov = activeGov === 'الكل' || inst.governorate === activeGov;
      // Rough type matching for demo
      const matchType = activeType === 'الكل' || 
                       (activeType === 'جامعات' && inst.type === 'university') ||
                       (activeType === 'كليات' && inst.type === 'college') ||
                       (activeType === 'معاهد' && inst.type === 'institute') ||
                       (activeType === 'إعداديات' && inst.type === 'highschool');
      return matchSearch && matchGov && matchType;
    }).sort((a, b) => {
        if (sortBy === 'الأكثر متابعة') return b.followers - a.followers;
        if (sortBy === 'أبجدياً') return a.name.localeCompare(b.name);
        return b.postCount - a.postCount; // Default most active
    });
  }, [searchQuery, activeGov, activeType, sortBy]);

  const toggleFollow = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFollowedIds(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  return (
    <div className="px-6 py-6 pb-24 bg-surface max-w-4xl mx-auto">
      {/* 1. Page Header: Premium Search & Filters */}
      <div className="space-y-6 mb-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-all" />
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 w-6 h-6 transition-colors group-focus-within:text-primary" />
          <input 
            type="text" 
            placeholder="ابحث عن جامعتك، كليتك، أو مدرستك..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-6 pr-16 pl-6 rounded-[2.5rem] border border-gray-100 bg-white shadow-sm focus:border-primary outline-none transition-all font-bold text-lg placeholder:text-gray-300"
          />
        </div>

        {/* Filter Row 1: Governorates */}
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1 relative">
          {['الكل', ...GOVERNORATES].map((gov) => (
             <button
                key={gov}
                onClick={() => setActiveGov(gov)}
                className={`px-6 py-3 rounded-2xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest border-2 transition-all relative ${
                    activeGov === gov ? 'border-secondary z-10' : 'bg-white border-gray-50 text-gray-400 hover:border-primary/30'
                }`}
             >
                <span className="relative z-10 transition-colors duration-300" style={{ color: activeGov === gov ? 'white' : 'inherit' }}>{gov}</span>
                {activeGov === gov && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-secondary rounded-[0.85rem]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
             </button>
          ))}
        </div>

        {/* Filter Row 2: Types & View Toggle */}
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar flex-1">
                {types.map(t => (
                    <button 
                        key={t}
                        onClick={() => setActiveType(t)}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${
                            activeType === t ? 'bg-primary text-secondary' : 'bg-surface text-gray-400 border border-gray-100'
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>
            
            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-gray-50 shadow-sm">
                <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-surface text-primary shadow-sm' : 'text-gray-300 hover:text-gray-500'}`}
                >
                    <LayoutGrid size={18} />
                </button>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-surface text-primary shadow-sm' : 'text-gray-300 hover:text-gray-500'}`}
                >
                    <List size={18} />
                </button>
            </div>
        </div>
      </div>

      {/* 2. Featured Sections (Horizontal Scroll) */}
      {!searchQuery && activeType === 'الكل' && (
        <div className="space-y-10 mb-12">
            {/* Top Regional Institutions */}
            <section>
                <div className="flex items-center justify-between mb-5">
                   <div className="flex items-center gap-2">
                       <TrendingUp className="text-primary" size={20} />
                       <h2 className="text-xl font-black text-secondary">
                        {activeGov === 'الكل' ? 'الأبرز هذا الأسبوع' : `الأبرز في ${activeGov}`}
                       </h2>
                   </div>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-6 px-6 pb-4">
                    {SAMPLE_INSTITUTIONS
                      .filter(inst => activeGov === 'الكل' || inst.governorate === activeGov)
                      .slice(0, 4)
                      .map((inst) => (
                        <motion.div 
                            key={inst.id}
                            onClick={() => onSelectInstitution(inst)}
                            className="min-w-[280px] bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group p-2 active:scale-95 transition-all cursor-pointer"
                        >
                            <div className="relative h-32 rounded-[2rem] overflow-hidden mb-4">
                                <img src={inst.cover} className="w-full h-full object-cover group-hover:scale-110 duration-700 transition-transform" alt="" referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                                    {inst.governorate}
                                </div>
                            </div>
                            <div className="px-4 pb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={inst.logo} className="w-10 h-10 rounded-xl border-2 border-white object-cover shadow-md" alt="" referrerPolicy="no-referrer" />
                                    <p className="font-black text-secondary text-sm leading-tight">{inst.name}</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-xl text-[8px] font-black text-primary border border-gray-50">
                                  <Star size={10} className="fill-primary" />
                                  <span>4.8</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

             {/* Dynamic Join Section */}
             <section>
                <div className="flex items-center justify-between mb-5">
                   <div className="flex items-center gap-2">
                       <Zap className="text-accent" size={20} />
                       <h2 className="text-xl font-black text-secondary">انضموا حديثاً</h2>
                   </div>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-6 px-6 pb-2">
                    {SAMPLE_INSTITUTIONS
                      .filter(inst => activeGov === 'الكل' || inst.governorate === activeGov)
                      .reverse()
                      .slice(0, 6)
                      .map((inst) => (
                         <button 
                            key={inst.id}
                            onClick={() => onSelectInstitution(inst)}
                            className="flex items-center gap-3 bg-white pl-6 pr-2 py-2 rounded-full border border-gray-50 shadow-sm hover:border-primary/40 transition-all active:scale-95"
                         >
                            <img src={inst.logo} className="w-10 h-10 rounded-full object-cover" alt="" referrerPolicy="no-referrer" />
                            <span className="text-xs font-black text-secondary whitespace-nowrap">{inst.name}</span>
                         </button>
                    ))}
                </div>
            </section>
        </div>
      )}

      {/* 3. Main Catalog Feed */}
      <div>
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="w-1 bg-primary h-6 rounded-full" />
                <h2 className="text-2xl font-black text-secondary">دليل المؤسسات</h2>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">فرز حسب:</span>
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-[10px] font-black text-secondary uppercase tracking-widest bg-transparent outline-none cursor-pointer"
                >
                    {sorts.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>

        <AnimatePresence mode="popLayout">
            {isLoading ? (
                <div className={viewMode === 'grid' ? "grid grid-cols-2 gap-4 md:gap-6" : "space-y-4"}>
                    {[1, 2, 3, 4].map(i => <InstitutionSkeleton key={i} />)}
                </div>
            ) : (
                <motion.div 
                    layout
                    className={viewMode === 'grid' ? "grid grid-cols-2 gap-4 md:gap-6" : "space-y-4"}
                >
                    {filteredInstitutions.map((inst, index) => (
                    viewMode === 'grid' ? (
                        <motion.div
                            key={inst.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            onClick={() => onSelectInstitution(inst)}
                            className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-50 shadow-sm group hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer relative"
                        >
                             <div className="relative h-28 md:h-36">
                                <img src={inst.cover} alt={inst.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute top-3 left-3 flex gap-1">
                                    <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[7px] font-black text-white uppercase tracking-widest border border-white/20">
                                        {inst.governorate}
                                    </span>
                                </div>
                                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                    <p className="text-[8px] font-black text-primary uppercase tracking-widest bg-secondary/80 backdrop-blur-md px-2 py-1 rounded-md">{inst.type}</p>
                                </div>
                            </div>
                            <div className="p-4 pt-0 -mt-6 relative z-10 text-center flex flex-col items-center">
                                <img src={inst.logo} className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg mb-3 object-cover bg-white" alt="" />
                                <h3 className="font-black text-secondary text-sm mb-1 leading-tight line-clamp-1">{inst.name}</h3>
                                
                                <div className="flex items-center gap-4 py-3 border-y border-gray-50 w-full mb-4 justify-center">
                                    <div className="text-center">
                                        <p className="text-[8px] font-black text-gray-300 uppercase leading-none mb-1">Students</p>
                                        <p className="text-[10px] font-black text-secondary font-inter">{(inst.students / 1000).toFixed(1)}k</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[8px] font-black text-gray-300 uppercase leading-none mb-1">Posts</p>
                                        <p className="text-[10px] font-black text-secondary font-inter">{inst.postCount}</p>
                                    </div>
                                </div>

                                <motion.button 
                                    onClick={(e) => toggleFollow(e, inst.id)}
                                    initial={false}
                                    animate={{ 
                                      backgroundColor: followedIds.includes(inst.id) ? '#1a1a2e' : 'rgba(244, 168, 32, 0.1)',
                                      color: followedIds.includes(inst.id) ? '#ffffff' : '#f4a820'
                                    }}
                                    transition={{ duration: 0.25 }}
                                    className="w-full py-3 rounded-2xl font-black text-[10px] uppercase transition-all flex items-center justify-center gap-2"
                                >
                                    <AnimatePresence mode="wait">
                                      <motion.div
                                        key={followedIds.includes(inst.id) ? 'followed' : 'follow'}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2"
                                      >
                                        {followedIds.includes(inst.id) ? (
                                            <>
                                                <span>Followed</span>
                                                <CheckCircle2 size={12} />
                                            </>
                                        ) : (
                                            <span>Follow</span>
                                        )}
                                      </motion.div>
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={inst.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            onClick={() => onSelectInstitution(inst)}
                            className="bg-white p-4 rounded-[2rem] border border-gray-50 shadow-sm flex items-center gap-5 group hover:border-primary transition-all cursor-pointer"
                        >
                            <div className="relative">
                                <img src={inst.logo} className="w-20 h-20 rounded-2xl object-cover bg-surface" alt="" />
                                <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg">
                                    <div className="w-4 h-4 bg-primary rounded bg-center bg-cover" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-black text-secondary leading-none">{inst.name}</h3>
                                    <span className="px-2 py-0.5 bg-gray-50 rounded-lg text-[7px] font-black text-gray-400 border border-gray-100 uppercase tracking-widest">{inst.governorate}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold mb-3 line-clamp-1">{inst.description}</p>
                                <div className="flex items-center gap-4 text-[9px] font-black font-inter text-gray-300 uppercase tracking-widest">
                                    <div className="flex items-center gap-1"><Users size={12} /> {inst.followers.toLocaleString()}</div>
                                    <div className="flex items-center gap-1"><GraduationCap size={12} /> {inst.students.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="p-3 bg-primary text-secondary rounded-2xl shadow-xl shadow-primary/10 active:scale-90 transition-all">
                                    <Plus size={18} />
                                </button>
                                <button className="p-3 bg-surface text-gray-300 rounded-2xl active:scale-90 transition-all">
                                    <ChevronLeft size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )
                ))}
                </motion.div>
            )}
        </AnimatePresence>

        {filteredInstitutions.length === 0 && (
            <div className="py-20 text-center space-y-4">
                <div className="w-24 h-24 bg-surface rounded-[3rem] flex items-center justify-center mx-auto text-gray-200">
                    <Search size={40} />
                </div>
                <div>
                   <h3 className="font-black text-secondary">لا توجد نتائج</h3>
                   <p className="text-sm text-gray-400 font-bold">جرّب تقليل الفلاتر أو تغيير كلمة البحث</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
