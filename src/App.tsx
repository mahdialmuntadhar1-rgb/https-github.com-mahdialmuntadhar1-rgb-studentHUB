import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, X, HelpCircle, Sparkles, Bell, 
  MessageCircle, Image, MapPin, AtSign 
} from 'lucide-react';
import Navbar, { Header } from './components/Navigation';
import Feed from './pages/Feed';
import Home from './pages/Home';
import Discover from './pages/Discover';
import OpportunitiesHub from './pages/OpportunitiesHub';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Notifications from './pages/Notifications';
import InstitutionProfile from './pages/InstitutionProfile';
import { Institution } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null);
  const [showPostOverlay, setShowPostOverlay] = useState(false);

  // Global Tab Change Listener
  React.useEffect(() => {
    const handleTabChange = (e: any) => {
        if (e.detail === 'discover') setActiveTab('discover');
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  // Simple Router
  const renderContent = () => {
    if (selectedInst) {
      return (
        <InstitutionProfile 
          institution={selectedInst} 
          onBack={() => setSelectedInst(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Feed />;
      case 'discover':
        return <Discover onSelectInstitution={setSelectedInst} />;
      case 'post':
        return null; // Handled by overlay
      case 'opportunities':
        return <OpportunitiesHub />;
      case 'profile':
        return <Profile />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Feed />;
    }
  };

  const handleTabSelect = (tab: string) => {
    if (tab === 'post') {
        setShowPostOverlay(true);
    } else {
        setActiveTab(tab);
    }
  };

  if (!isOnboarded && !showOnboarding) {
    if (selectedInst) {
      return (
        <div className="min-h-screen bg-surface">
          <InstitutionProfile 
            institution={selectedInst} 
            onBack={() => setSelectedInst(null)} 
          />
        </div>
      );
    }
    return <Home onStart={() => setShowOnboarding(true)} onSelectInstitution={setSelectedInst} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={() => {
      setIsOnboarded(true);
      setShowOnboarding(false);
    }} />;
  }

  // Determine header title
  let headerTitle = "رافد";
  if (selectedInst) headerTitle = selectedInst.name;
  else {
    switch(activeTab) {
        case 'discover': headerTitle = "اكتشف الجامعات"; break;
        case 'opportunities': headerTitle = "الفرص والمهن"; break;
        case 'profile': headerTitle = "الملف الشخصي"; break;
        case 'notifications': headerTitle = "التنبيهات"; break;
        default: headerTitle = "رافد";
    }
  }

  return (
    <div className="min-h-screen bg-surface pb-24 pt-20">
      {!selectedInst && (
        <Header 
            title={headerTitle} 
            onNotificationsClick={() => setActiveTab('notifications')}
        />
      )}
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedInst ? `inst-${selectedInst.id}` : activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {!selectedInst && <Navbar activeTab={activeTab} setActiveTab={handleTabSelect} />}

      {/* Post Creation Overlay */}
      <AnimatePresence>
        {showPostOverlay && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] bg-secondary/80 backdrop-blur-xl flex items-end md:items-center justify-center p-0 md:p-6"
            >
                <motion.div 
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    className="bg-surface w-full max-w-xl rounded-t-[3rem] md:rounded-[3rem] p-8 md:p-10 shadow-2xl space-y-8"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-secondary shadow-lg shadow-primary/20 transform -rotate-6">
                                <Plus size={28} strokeWidth={3} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-secondary">شاركنا قصتك</h3>
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Share Your Story</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowPostOverlay(false)}
                            className="p-4 bg-gray-100/50 text-gray-400 rounded-2xl hover:bg-gray-100 hover:text-secondary transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'سؤال أكاديمي', icon: HelpCircle, color: 'bg-blue-50 text-blue-500' },
                            { label: 'مشاركة تجربة', icon: Sparkles, color: 'bg-orange-50 text-orange-500' },
                            { label: 'إعلان طلابي', icon: Bell, color: 'bg-purple-50 text-purple-500' },
                            { label: 'طلب نصيحة', icon: MessageCircle, color: 'bg-green-50 text-green-500' },
                        ].map(type => (
                            <button key={type.label} className={`${type.color} p-6 rounded-3xl border border-transparent hover:border-current/20 transition-all flex flex-col items-center gap-3 active:scale-95`}>
                                <type.icon size={32} />
                                <span className="font-black text-xs">{type.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="bg-white rounded-[2rem] p-6 border border-gray-100">
                            <textarea 
                                placeholder="ماذا يدور في ذهنك؟"
                                className="w-full bg-transparent border-none focus:ring-0 outline-none font-bold text-gray-600 min-h-[120px] resize-none"
                            />
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                                <div className="flex gap-4 text-gray-400">
                                    <button className="hover:text-primary transition-colors"><Image size={20} /></button>
                                    <button className="hover:text-primary transition-colors"><MapPin size={20} /></button>
                                    <button className="hover:text-primary transition-colors"><AtSign size={20} /></button>
                                </div>
                                <span className="text-[10px] font-black text-gray-200">280 حرف متبقي</span>
                            </div>
                        </div>

                        <button className="w-full bg-secondary text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-secondary/20 hover:bg-primary hover:text-secondary transition-all active:scale-95">
                            نشر في رافد
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
