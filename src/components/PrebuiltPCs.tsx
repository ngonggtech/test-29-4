import { motion } from 'motion/react';
import { PREBUILT_PCS } from '../constants';
import { ChevronRight } from 'lucide-react';

interface PrebuiltPCsProps {
  onViewAll?: () => void;
  onSelectPC?: (pc: any) => void;
  onCheckout?: (text: string) => void;
  isMobile?: boolean;
}

export default function PrebuiltPCs({ onViewAll, onSelectPC, onCheckout, isMobile }: PrebuiltPCsProps) {
  const generatePCText = (pc: any) => {
    const specsParts = pc.specs.split(' | ');
    let text = `MBC Computer:\n/Pc build sẵn/: ${pc.name}\n`;
    text += `Cpu: ${specsParts[0] || 'N/A'}; Motherboard: Theo tiêu chuẩn; Gpu: ${specsParts[1] || 'N/A'}; Ram: ${specsParts[2] || 'N/A'}; Storage: ${specsParts[3] || 'N/A'}; Psu: Theo tiêu chuẩn; Case: Theo tiêu chuẩn;`;
    return text;
  };
  return (
    <section className={`py-2 px-6 max-w-7xl mx-auto w-full ${isMobile ? 'px-0' : ''}`}>
      <div className={`flex justify-between items-end border-b border-white/10 pb-4 ${isMobile ? 'mb-4' : 'mb-6'}`}>
        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-black uppercase tracking-tighter italic`}>
          PC Build Sẵn <span className="text-[10px] md:text-xs not-italic font-mono opacity-40 ml-2">Chọn là mua ngay</span>
        </h3>
        {!isMobile && (
          <button 
            onClick={onViewAll}
            className="flex items-center gap-2 text-[10px] text-[#00FFD1] font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer relative z-10"
          >
            Xem Tất Cả <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {isMobile ? (
        <div className="grid grid-cols-2 gap-3 w-full">
          {PREBUILT_PCS.map((pc, i) => (
            <div
              key={`${pc.id}-${i}`}
              onClick={() => onSelectPC?.(pc)}
              className="flex flex-col cursor-pointer border border-white/5 bg-[#111] overflow-hidden hover:border-[#00FFD1]/50 transition-colors"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
                 <img src={pc.image} alt={pc.name} className="w-full h-full object-cover opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent h-full" />
                 <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-[#00FFD1] text-black font-black text-[8px]">
                   {new Intl.NumberFormat('vi-VN').format(pc.price)}
                 </div>
              </div>
              
              <div className="p-3 flex flex-col gap-1.5 flex-1 justify-between relative mt-[-20px] z-10">
                 <h4 className="font-bold uppercase tracking-widest text-[10px] leading-tight line-clamp-2 text-white drop-shadow-md">{pc.name}</h4>
                 <div className="mt-2 border-t border-white/10 pt-2 flex justify-between items-center relative z-20">
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       onCheckout?.(generatePCText(pc));
                     }}
                     className="text-[8px] uppercase font-bold tracking-widest text-[#FF007A] hover:text-white transition-colors cursor-pointer"
                   >
                     Mua Ngay
                   </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative flex overflow-hidden group w-full py-16 -my-14">
          <div className="flex w-max animate-marquee gap-6 px-3 pt-4">
          {PREBUILT_PCS.map((pc, i) => (
            <div
              key={`${pc.id}-${i}`}
              onClick={() => onSelectPC?.(pc)}
              className="hover-cyber-3d w-[280px] sm:w-[320px] flex-shrink-0 group/card relative cursor-pointer border border-white/5 bg-[#111] overflow-hidden hover:border-[#00FFD1]/50 transition-colors whitespace-normal"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#0a0a0a] group-hover/card:shadow-[0_0_20px_rgba(0,255,209,0.4)] z-0 transition-shadow duration-500">
                 <img src={pc.image} alt={pc.name} className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent h-1/2 mt-auto" />
                 <div className="absolute top-2 right-2 px-2 py-1 bg-[#00FFD1] text-black font-black text-xs">
                   {new Intl.NumberFormat('vi-VN').format(pc.price)} VNĐ
                 </div>
              </div>
              
              <div className="p-5 flex flex-col gap-2 relative z-10">
                 <h4 className="font-bold uppercase tracking-widest text-lg group-hover/card:text-[#00FFD1] transition-colors">{pc.name}</h4>
                 <p className="text-[11px] font-mono opacity-60 text-white/70 h-8 leading-tight">
                   {pc.specs}
                 </p>
                 
                 <div className="mt-4 border-t border-white/10 pt-4 flex justify-between items-center relative z-20">
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       onCheckout?.(generatePCText(pc));
                     }}
                     className="text-[10px] uppercase font-bold tracking-widest text-[#FF007A] hover:text-white transition-colors cursor-pointer"
                   >
                     Mua Ngay
                   </button>
                   <ChevronRight className="w-4 h-4 text-white/30 group-hover/card:text-white transition-colors pointer-events-none" />
                 </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-max animate-marquee gap-6 px-3 pt-4" aria-hidden="true">
          {PREBUILT_PCS.map((pc, i) => (
            <div
              key={`${pc.id}-clone-${i}`}
              onClick={() => onSelectPC?.(pc)}
              className="hover-cyber-3d w-[280px] sm:w-[320px] flex-shrink-0 group/card relative cursor-pointer border border-white/5 bg-[#111] overflow-hidden hover:border-[#00FFD1]/50 transition-colors whitespace-normal"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#0a0a0a] group-hover/card:shadow-[0_0_20px_rgba(0,255,209,0.4)] z-0 transition-shadow duration-500">
                 <img src={pc.image} alt={pc.name} className="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent h-1/2 mt-auto" />
                 <div className="absolute top-2 right-2 px-2 py-1 bg-[#00FFD1] text-black font-black text-xs">
                   {new Intl.NumberFormat('vi-VN').format(pc.price)} VNĐ
                 </div>
              </div>
              
              <div className="p-5 flex flex-col gap-2 relative z-10">
                 <h4 className="font-bold uppercase tracking-widest text-lg group-hover/card:text-[#00FFD1] transition-colors">{pc.name}</h4>
                 <p className="text-[11px] font-mono opacity-60 text-white/70 h-8 leading-tight">
                   {pc.specs}
                 </p>
                 
                 <div className="mt-4 border-t border-white/10 pt-4 flex justify-between items-center relative z-20">
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       onCheckout?.(generatePCText(pc));
                     }}
                     className="text-[10px] uppercase font-bold tracking-widest text-[#FF007A] hover:text-white transition-colors cursor-pointer"
                   >
                     Mua Ngay
                   </button>
                   <ChevronRight className="w-4 h-4 text-white/30 group-hover/card:text-white transition-colors pointer-events-none" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </section>
  );
}
