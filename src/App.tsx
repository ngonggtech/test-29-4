import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowUp, MessageCircle, Phone, Volume2, VolumeX, Monitor, Cpu, Gamepad2, Package } from 'lucide-react';
import ReactPlayer from 'react-player';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PrebuiltPCs from './components/PrebuiltPCs';
import GameCatalog from './components/GameCatalog';
import TechShowcase from './components/TechShowcase';
import RequestPanel from './components/RequestPanel';
import ComponentBuilder from './components/ComponentBuilder';
import GameSidebar from './components/GameSidebar';
import PCSidebar from './components/PCSidebar';
import AllPCsPage from './components/AllPCsPage';
import PromotionsPage from './components/PromotionsPage';
import { Game } from './types';

import SoftwareCatalog from './components/SoftwareCatalog';

export default function App() {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<Game[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [viewedGame, setViewedGame] = useState<Game | null>(null);
  const [viewedSoftware, setViewedSoftware] = useState<Game | null>(null);
  const [viewedPC, setViewedPC] = useState<any | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'all-pcs' | 'promotions'>('home');
  const [mobileModal, setMobileModal] = useState<'about' | 'promotions' | 'prebuilt' | 'game' | 'software' | 'builder' | 'systems' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const bgY1 = useTransform(scrollYProgress, [0, 1], [-200, 1200]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [1000, -500]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.8, 0.5]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  const toggleGame = (game: Game) => {
    setSelectedGames(prev => {
      const exists = prev.find(g => g.id === game.id);
      if (exists) {
        return prev.filter(g => g.id !== game.id);
      }
      return [...prev, game];
    });
  };

  const toggleSoftware = (sw: Game) => {
    setSelectedSoftware(prev => {
      const exists = prev.find(s => s.id === sw.id);
      if (exists) {
        return prev.filter(s => s.id !== sw.id);
      }
      return [...prev, sw];
    });
  };

  const removeGame = (id: string) => {
    setSelectedGames(prev => prev.filter(g => g.id !== id));
  };

  const handleCheckoutText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text.trim());
    } catch (err) {
      console.error("Lỗi copy vào clipboard:", err);
    }
    
    setSelectedGames([]);
    setSelectedSoftware([]);
    setViewedPC(null);
    setMobileModal(null);
    setShowConfirmation(true);
  };

  const handleRequestSubmit = async () => {
    let copyText = "MBC Computer:\n";
    if (selectedGames.length > 0) {
      copyText += `/listgame/: ${selectedGames.map(g => g.title).join('; ')}\n`;
    }
    if (selectedSoftware.length > 0) {
      copyText += `/listaccount/: ${selectedSoftware.map(s => s.title).join('; ')}\n`;
    }
    
    setMobileModal(null);
    handleCheckoutText(copyText);
  };

  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden lg:flex relative min-h-screen bg-transparent text-white font-sans selection:bg-cyber-blue selection:text-black flex-col">
        {/* Dynamic Animated Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-cyber-black flex justify-center items-center">
        <div className="absolute inset-0 cyber-grid opacity-20 mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
        
        {/* Floating Light Orbs */}
        <motion.div 
          style={{ y: bgY1, opacity: opacity1 }} 
          className="absolute top-0 left-[10%] w-[40vw] h-[40vw] bg-[#00FFD1] blur-[150px] rounded-full mix-blend-lighten pointer-events-none" 
        />
        <motion.div 
          style={{ y: bgY2, opacity: opacity2 }} 
          className="absolute bottom-0 right-[10%] w-[50vw] h-[50vw] bg-[#FF007A] blur-[180px] rounded-full mix-blend-lighten pointer-events-none" 
        />
        <motion.div 
          style={{ y: bgY1, opacity: opacity2, scale: 1.5 }} 
          className="absolute top-[40%] right-[30%] w-[30vw] h-[30vw] bg-[#9D00FF] blur-[160px] rounded-full mix-blend-lighten pointer-events-none" 
        />
        
        {/* Scanning Light Strip */}
        <motion.div 
          style={{ y: bgY1 }} 
          className="absolute left-1/4 w-[3px] h-[50vh] bg-gradient-to-b from-transparent via-[#00FFD1] to-transparent blur-[2px] opacity-100 shadow-[0_0_30px_#00FFD1,0_0_60px_#00FFD1] pointer-events-none" 
        />
        <motion.div 
          style={{ y: bgY2 }} 
          className="absolute right-1/3 w-[2px] h-[60vh] bg-gradient-to-b from-transparent via-[#FF007A] to-transparent blur-[3px] opacity-100 shadow-[0_0_40px_#FF007A,0_0_80px_#FF007A] pointer-events-none" 
        />
      </div>

      <Navbar onHome={() => setCurrentView('home')} />
      
      {currentView === 'home' ? (
        <main className="flex-1 flex flex-col pt-4">
          <Hero />
          {/* Promotion Section and About sidebar */}
        <section className="py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Left Sidebar: Company Info & Promos */}
            <motion.aside 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/4 flex flex-col gap-6 lg:sticky lg:top-24"
            >
              <div className="hover-cyber-3d bg-[#111] p-6 border-l-2 border-cyber-pink flex flex-col gap-4 shadow-sm border-r border-y border-white/5">
                <h2 className="text-[10px] font-bold text-cyber-pink uppercase tracking-widest">Về Chúng Tôi</h2>
                <p className="text-sm leading-relaxed opacity-80 font-sans">
                  MBC Computer - đối tác số 1 của MSI và GIGABYTE. Giải pháp công nghệ toàn diện cho cá nhân và doanh nghiệp.
Chuyên cung cấp PC, linh kiện, thiết bị văn phòng chính hãng với giá tốt.
Bảo hành nhanh chóng - Hỗ trợ tận tâm.
                </p>
                <div className="mt-4 flex flex-col gap-2 font-mono">
                  <div className="flex justify-between text-[10px] border-b border-white/10 pb-1">
                    <span className="opacity-60">CHẤT LƯỢNG LẮP RÁP</span>
                    <span className="text-cyber-blue">ĐÃ KIỂM ĐỊNH</span>
                  </div>
                  <div className="flex justify-between text-[10px] border-b border-white/10 pb-1">
                    <span className="opacity-60">TỐI ƯU HIỆU NĂNG</span>
                    <span className="text-cyber-blue">SẴN SÀNG CHIẾN GAME</span>
                  </div>
                </div>
              </div>

              <div 
                className="hover-cyber-3d bg-gradient-to-br from-[#1A1A1A] to-[#050505] p-6 border border-white/5 flex-1 flex flex-col gap-6"
                onClick={() => {
                  setCurrentView('promotions');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
              >
                <div className="flex justify-between items-center group">
                  <h2 className="text-[10px] font-bold uppercase tracking-widest">Khuyến Mãi Đang Chạy</h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyber-blue group-hover:text-white transition-colors cursor-pointer">Xem Thêm {'>'}</span>
                </div>
                <div className="space-y-6">
                  <div className="group cursor-pointer border-l-2 border-transparent hover:border-cyber-blue pl-3 transition-all">
                    <div className="text-[10px] text-cyber-blue mb-1 font-mono">[ DEAL_01 ]</div>
                    <div className="text-base font-bold leading-none uppercase tracking-tight mb-2">ƯU ĐÃI CỰC LỚN</div>
                    <div className="text-[11px] opacity-60 font-sans">Mua bất kỳ PC Cao Cấp nào, nhận ngay combo game hot tùy chọn được tải sẵn hoàn toàn miễn phí.</div>
                  </div>
                  <div className="group cursor-pointer border-l-2 border-transparent hover:border-cyber-pink pl-3 transition-all">
                    <div className="text-[10px] text-cyber-pink mb-1 font-mono">[ DEAL_02 ]</div>
                    <div className="text-base font-bold leading-none uppercase tracking-tight mb-2">GÓI COMBO MÀN HÌNH</div>
                    <div className="text-[11px] opacity-60 font-sans">Giảm thêm 10% khi mua kèm hệ thống dùng GPU tầm cao.</div>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Main Center Catalog */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 overflow-hidden"
            >
              <PrebuiltPCs 
                onViewAll={() => {
                  setCurrentView('all-pcs');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }} 
                onSelectPC={(pc) => setViewedPC(pc)}
                onCheckout={handleCheckoutText}
              />
              <GameCatalog 
                selectedGames={selectedGames} 
                onToggleGame={toggleGame} 
                onViewGameDetails={(g) => setViewedGame(g)}
              />
              <SoftwareCatalog
                selectedSoftware={selectedSoftware}
                onToggleSoftware={toggleSoftware}
                onViewSoftwareDetails={(g) => setViewedSoftware(g)}
              />
            </motion.div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <ComponentBuilder onCheckout={handleCheckoutText} />
        </motion.div>

        {/* Tech Showcase Preview moved to bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-6 pb-12 w-full max-w-7xl mx-auto"
        >
          <TechShowcase />
        </motion.div>
      </main>
      ) : currentView === 'all-pcs' ? (
        <AllPCsPage 
          onBack={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }} 
          onSelectPC={(pc) => setViewedPC(pc)}
        />
      ) : currentView === 'promotions' ? (
        <PromotionsPage onBack={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }} />
      ) : null}

      {/* Footer Status Bar */}
      <footer className="mt-auto bg-cyber-blue text-black h-10 flex items-center px-6 justify-between font-mono text-[10px] font-bold uppercase border-t border-cyber-blue">
        <div className="flex items-center gap-8 hidden sm:flex">
          <span>Hệ Thống Trực Tuyến</span>
          <span>Giao Hàng: Toàn Quốc</span>
          <span>Hỗ Trợ: 24/7</span>
        </div>
        <div className="animate-pulse tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black block"></span> GỌI TRỰC TIẾP: 1900-CYBER-TECH
        </div>
      </footer>

      <div className={`fixed right-6 z-40 flex flex-col items-center gap-3 transition-all duration-300 ${
        selectedGames.length > 0 || selectedSoftware.length > 0 ? 'bottom-[18rem] md:bottom-[20rem]' : 'bottom-16'
      }`}>
        {/* Phone */}
        <a href="tel:0123456789" className="w-10 h-10 bg-[#4CAF50] text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(76,175,80,0.5)] hover:bg-white hover:text-[#4CAF50] hover:scale-110 transition-all cursor-pointer" title="Gọi Điện">
          <Phone className="w-5 h-5" />
        </a>
        {/* Zalo */}
        <a href="https://zalo.me/0123456789" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#0068FF] text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,104,255,0.5)] hover:bg-white hover:text-[#0068FF] hover:scale-110 transition-all font-bold text-[10px] cursor-pointer" title="Zalo">
          Zalo
        </a>
        {/* Messenger */}
        <a href="https://m.me/yourusername" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#0084FF] text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,132,255,0.5)] hover:bg-white hover:text-[#0084FF] hover:scale-110 transition-all cursor-pointer" title="Messenger">
          <MessageCircle className="w-5 h-5" />
        </a>

        <AnimatePresence>
          {isScrolled && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, height: 0, marginTop: -12 }}
              animate={{ opacity: 1, scale: 1, height: 40, marginTop: 0 }}
              exit={{ opacity: 0, scale: 0.8, height: 0, marginTop: -12 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 bg-cyber-blue text-black rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,255,209,0.3)] hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-110 transition-all overflow-hidden cursor-pointer"
            >
              <ArrowUp className="w-5 h-5 flex-shrink-0" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={toggleMusic}
          className="w-10 h-10 bg-[#FF007A] text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,0,122,0.5)] hover:bg-white hover:text-[#FF007A] hover:scale-110 transition-all cursor-pointer mt-1"
          title={isMusicPlaying ? "Tắt Nhạc" : "Bật Nhạc"}
        >
          {isMusicPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* Background YouTube Music */}
      <div className="absolute w-[1px] h-[1px] opacity-0 pointer-events-none -z-50 overflow-hidden">
        <ReactPlayer
          url="https://www.youtube.com/embed/T-q9Ww3-F9U?si=DI0NPHSFKDzjJskW"
          playing={isMusicPlaying}
          loop={true}
          volume={0.5}
          width="10px"
          height="10px"
          config={{
            youtube: {
              playerVars: { autoplay: 1 }
            }
          }}
        />
      </div>

      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <div className="flex lg:hidden fixed inset-0 z-[40] bg-[#050505] flex-col overflow-hidden text-white font-sans selection:bg-cyber-pink selection:text-white">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/15 to-cyber-pink/15"></div>
          <div className="absolute inset-0 cyber-grid opacity-20 mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
        </div>
        
        {/* Mobile Header: Logo */}
        <div className="p-4 border-b border-white/10 flex flex-col relative z-10 shrink-0 bg-[#050505]">
          <div className="flex items-baseline">
            <h1 className="text-3xl font-black italic tracking-tighter leading-none m-0 p-0 flex items-baseline">
              <span className="bg-[linear-gradient(to_bottom,#ed1d25_50%,#044ea2_50%)] bg-clip-text text-transparent py-1 pr-1">MBC</span>
              <span className="text-[#ffffff] ml-2">Computer</span>
            </h1>
            <span className="text-[#00FFD1] font-bold text-sm ml-1 tracking-tight mb-0.5">@ngonggtech</span>
          </div>
          <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-white/50 mt-1">Dịch Vụ Lắp Máy PC Cao Cấp</p>
        </div>

        {/* Mobile Header: Marquee */}
        <div className="bg-[#111] border-b border-white/5 py-1.5 flex overflow-hidden shrink-0 relative z-10">
          <div className="animate-marquee whitespace-nowrap text-[9px] uppercase tracking-[0.3em] text-white/50 font-mono flex gap-8 shrink-0 px-4">
            <span>// FACEBOOK: MBC COMPUTER</span>
            <span>// TIKTOK: MBC COMPUTER OFFICIAL</span>
            <span>// SHOPEE: CÔNG TY TNHH TIN HỌC MBC</span>
            <span>// FACEBOOK: MBC COMPUTER</span>
            <span>// TIKTOK: MBC COMPUTER OFFICIAL</span>
            <span>// SHOPEE: CÔNG TY TNHH TIN HỌC MBC</span>
          </div>
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#111] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#111] to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 relative z-10">
          {/* Top Row: Video Full Width Portrait */}
          <div className="w-full shrink-0 landscape:w-[160px] aspect-video bg-black relative border border-white/10 shadow-[0_0_15px_rgba(0,255,209,0.1)] rounded overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/pHwRrE14cjE?si=Fg7f_ujfXFX4VC5x&controls=0&autoplay=1&mute=1&loop=1"
              className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] pointer-events-none"
              frameBorder="0"
              allow="autoplay"
            ></iframe>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <button 
              onClick={() => setMobileModal('about')}
              className="min-h-[44px] bg-gradient-to-r from-cyber-pink/20 to-transparent border border-cyber-pink/50 text-white active:bg-cyber-pink/40 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-[3px_3px_0_0_rgba(255,0,122,0.2)] active:shadow-[0_0_0_0_rgba(255,0,122,0)]"
            >
              Về Chúng Tôi
            </button>
            <button 
              onClick={() => setMobileModal('promotions')}
              className="min-h-[44px] bg-gradient-to-r from-transparent to-cyber-blue/20 border border-cyber-blue/50 text-white active:bg-cyber-blue/40 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-[3px_3px_0_0_rgba(0,255,209,0.2)] active:shadow-[0_0_0_0_rgba(0,255,209,0)]"
            >
              Tin Tức
            </button>
          </div>

          {/* Bottom List Navigation - 3D Buttons Grid */}
          <div className="grid grid-cols-2 gap-4 pb-20 justify-center">
            <button 
              onClick={() => setMobileModal('game')}
              className="group min-h-[50px] flex flex-row items-center justify-center gap-2 py-3 px-2 active:translate-x-0.5 active:translate-y-0.5 transition-all w-full border border-[#00FFD1] shadow-[3px_3px_0_0_rgba(0,255,209,0.2)] active:shadow-[0_0_0_0_rgba(0,255,209,0)] bg-black/40 hover:bg-[#00FFD1]/10 rounded-sm"
            >
              <Gamepad2 strokeWidth={2.5} className="w-4 h-4 text-[#00FFD1] shrink-0" />
              <span className="font-bold text-[9px] md:text-[10px] uppercase tracking-widest text-white text-left leading-tight">Thư Viện<br/>Game</span>
            </button>

            <button 
              onClick={() => setMobileModal('software')}
              className="group min-h-[50px] flex flex-row items-center justify-center gap-2 py-3 px-2 active:translate-x-0.5 active:translate-y-0.5 transition-all w-full border border-[#044ea2] shadow-[3px_3px_0_0_rgba(4,78,162,0.2)] active:shadow-[0_0_0_0_rgba(4,78,162,0)] bg-black/40 hover:bg-[#044ea2]/10 rounded-sm"
            >
              <Package strokeWidth={2.5} className="w-4 h-4 text-[#044ea2] shrink-0" />
              <span className="font-bold text-[9px] md:text-[10px] uppercase tracking-widest text-white text-left leading-tight">Thư Viện<br/>App</span>
            </button>

            <button 
              onClick={() => setMobileModal('prebuilt')}
              className="group min-h-[50px] flex flex-row items-center justify-center gap-2 py-3 px-2 active:translate-x-0.5 active:translate-y-0.5 transition-all w-full border border-[#FF007A] shadow-[3px_3px_0_0_rgba(255,0,122,0.2)] active:shadow-[0_0_0_0_rgba(255,0,122,0)] bg-black/40 hover:bg-[#FF007A]/10 rounded-sm"
            >
              <Monitor strokeWidth={2.5} className="w-4 h-4 text-[#FF007A] shrink-0" />
              <span className="font-bold text-[9px] md:text-[10px] uppercase tracking-widest text-white text-left leading-tight">PC Build<br/>Sẵn</span>
            </button>

            <button 
              onClick={() => setMobileModal('systems')}
              className="group min-h-[50px] flex flex-row items-center justify-center gap-2 py-3 px-2 active:translate-x-0.5 active:translate-y-0.5 transition-all w-full border border-cyber-blue shadow-[3px_3px_0_0_rgba(0,255,209,0.2)] active:shadow-[0_0_0_0_rgba(0,255,209,0)] bg-black/40 hover:bg-cyber-blue/10 rounded-sm"
            >
              <Cpu strokeWidth={2.5} className="w-4 h-4 text-cyber-blue shrink-0" />
              <span className="font-bold text-[9px] md:text-[10px] uppercase tracking-widest text-white text-left leading-tight">Hệ<br/>Thống</span>
            </button>

            <button 
              onClick={() => setMobileModal('builder')}
              className="col-span-2 group min-h-[50px] flex flex-row items-center justify-center gap-3 py-3 px-4 active:translate-x-0.5 active:translate-y-0.5 transition-all w-full border border-[#9D00FF] shadow-[4px_4px_0_0_rgba(157,0,255,0.2)] active:shadow-[0_0_0_0_rgba(157,0,255,0)] bg-black/40 hover:bg-[#9D00FF]/10 rounded-sm"
            >
              <Cpu strokeWidth={2.5} className="w-6 h-6 text-[#9D00FF] shrink-0" />
              <span className="font-bold text-[13px] uppercase tracking-[0.2em] text-white">Tự Build PC <span className="opacity-50 font-normal">➔</span></span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MODALS - Using Full Screen Overlay */}
      <AnimatePresence>
        {mobileModal && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[50] bg-[#050505] flex flex-col overflow-hidden lg:hidden text-white font-sans"
          >
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/15 to-cyber-pink/15"></div>
              <div className="absolute inset-0 cyber-grid opacity-20 mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
            </div>

            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
              <h2 className="font-bold text-cyber-blue uppercase tracking-widest text-sm">
                {mobileModal === 'about' ? 'Về Chúng Tôi' : 
                 mobileModal === 'promotions' ? 'Tin Tức' : 
                 mobileModal === 'prebuilt' ? 'PC Build Sẵn' : 
                 mobileModal === 'systems' ? 'Hệ Thống' :
                 mobileModal === 'game' ? 'Thư Viện Game' : 
                 mobileModal === 'software' ? 'Thư Viện Tài Khoản' : 
                 'Tự Build PC'}
              </h2>
              <button 
                onClick={() => setMobileModal(null)}
                className="text-xs font-bold uppercase border border-white/20 px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
               >
                 Đóng X
               </button>
            </div>
            
            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto pb-24 text-base relative z-10">
              {mobileModal === 'about' && (
                <div className="p-6">
                  <div className="bg-[#111] p-6 border-l-2 border-cyber-pink shadow-sm border-r border-y border-white/5">
                    <p className="text-sm leading-relaxed opacity-80 font-sans">
                      MBC Computer - đối tác số 1 của MSI và GIGABYTE. Giải pháp công nghệ toàn diện cho cá nhân và doanh nghiệp.
                      Chuyên cung cấp PC, linh kiện, thiết bị văn phòng chính hãng với giá tốt.
                      Bảo hành nhanh chóng - Hỗ trợ tận tâm.
                    </p>
                  </div>
                </div>
              )}
              {mobileModal === 'promotions' && (
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="group border-l-2 border-cyber-blue pl-4">
                      <div className="text-xs text-cyber-blue mb-1 font-mono">[ DEAL_01 ]</div>
                      <div className="font-bold leading-none uppercase tracking-tight mb-2">ƯU ĐÃI CỰC LỚN</div>
                      <div className="text-sm opacity-60 font-sans">Mua bất kỳ PC Cao Cấp nào, nhận ngay combo game hot tùy chọn được tải sẵn hoàn toàn miễn phí.</div>
                    </div>
                    <div className="group border-l-2 border-cyber-pink pl-4">
                      <div className="text-xs text-cyber-pink mb-1 font-mono">[ DEAL_02 ]</div>
                      <div className="font-bold leading-none uppercase tracking-tight mb-2">GÓI COMBO MÀN HÌNH</div>
                      <div className="text-sm opacity-60 font-sans">Giảm thêm 10% khi mua kèm hệ thống dùng GPU tầm cao.</div>
                    </div>
                  </div>
                </div>
              )}
              {mobileModal === 'systems' && (
                <div className="p-4">
                  <TechShowcase />
                </div>
              )}
              {mobileModal === 'prebuilt' && (
                <div className="p-4 pt-10">
                  <PrebuiltPCs 
                    isMobile={true}
                    onSelectPC={(pc) => setViewedPC(pc)}
                    onCheckout={handleCheckoutText}
                  />
                </div>
              )}
              {mobileModal === 'builder' && (
                <div className="p-2">
                  <ComponentBuilder onCheckout={(text) => {
                    handleCheckoutText(text);
                    setMobileModal(null);
                  }} />
                </div>
              )}
              {mobileModal === 'game' && (
                <div className="p-2">
                  <GameCatalog 
                    selectedGames={selectedGames} 
                    onToggleGame={toggleGame} 
                    onViewGameDetails={(g) => setViewedGame(g)}
                  />
                </div>
              )}
              {mobileModal === 'software' && (
                 <div className="p-2">
                  <SoftwareCatalog
                    selectedSoftware={selectedSoftware}
                    onToggleSoftware={toggleSoftware}
                    onViewSoftwareDetails={(g) => setViewedSoftware(g)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GameSidebar 
        game={viewedGame} 
        onClose={() => setViewedGame(null)} 
        onSelectGame={toggleGame}
        isSelectedForInstall={viewedGame ? selectedGames.some(sg => sg.id === viewedGame.id) : false}
      />
      <GameSidebar 
        game={viewedSoftware} 
        onClose={() => setViewedSoftware(null)} 
        onSelectGame={toggleSoftware}
        isSelectedForInstall={viewedSoftware ? selectedSoftware.some(sg => sg.id === viewedSoftware.id) : false}
        type="software"
      />
      
      <AnimatePresence>
        {viewedPC && (
          <PCSidebar 
            pc={viewedPC}
            onClose={() => setViewedPC(null)}
            onCheckout={handleCheckoutText}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-card p-12 rounded-[2rem] text-center max-w-md border-cyber-blue shadow-[0_0_50px_rgba(0,243,255,0.2)]"
            >
              <div className="w-20 h-20 bg-cyber-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  📡
                </motion.div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black mb-4 mx-[-20px] md:mx-0">ĐÃ NHẬN THÔNG TIN</h2>
              <p className="text-gray-400 mb-8 font-sans">
                Danh sách yêu cầu của bạn đã được sao chép dưới dạng văn bản vào bộ nhớ tạm (Clipboard). Hãy dán đoạn text này (Ctrl+V) vào khung chat để gửi cho chúng tôi!
              </p>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="w-full border border-cyber-blue text-cyber-blue font-bold uppercase tracking-widest text-[10px] md:text-sm hover:bg-cyber-blue hover:text-black mt-6 py-3 transition-colors"
              >
                Quay Trở Lại
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <RequestPanel 
        selectedGames={selectedGames} 
        selectedSoftware={selectedSoftware}
        onRemove={removeGame}
        onRemoveSoftware={(id) => setSelectedSoftware(prev => prev.filter(s => s.id !== id))}
        onClearAll={() => {
          setSelectedGames([]);
          setSelectedSoftware([]);
        }}
        onSubmit={handleRequestSubmit}
      />
    </>
  );
}

