import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, ArrowRight, Layers, 
  Shield, RotateCcw, X, Smartphone 
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- SVG RENDERER ---
const Patterns = () => (
  <defs>
    <pattern id="kevlarPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
    </pattern>
    <pattern id="pufferPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <line x1="0" y1="19" x2="20" y2="19" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </pattern>
  </defs>
);

const JacketRender = ({ baseColor, sleeveType, hoodType, pocketType }) => {
  const isPuffer = sleeveType === 'thermal';
  const isKevlar = sleeveType === 'kevlar';
  const strokeColor = "#333"; 

  // Стили теней для объема
  const dropShadowStyle = { filter: "drop-shadow(0px 25px 35px rgba(0,0,0,0.7))" };

  return (
    <svg viewBox="0 0 400 500" className="w-full h-full" style={dropShadowStyle}>
      <Patterns />
      
      {/* 1. HOOD (Back) */}
      {hoodType === 'storm' && (
        <path d="M140,60 Q200,30 260,60 L280,100 L120,100 Z" fill={baseColor} stroke={strokeColor} strokeWidth="2"/>
      )}

      {/* 2. LEFT SLEEVE (Плавное плечо) */}
      <motion.g initial={false}>
        <path 
          d="M125,100 Q100,105 90,140 L60,350 L100,360 L128,150" 
          fill={isKevlar ? "url(#kevlarPattern)" : baseColor} 
          stroke={strokeColor} strokeWidth="2"
        />
        {isPuffer && <path d="M125,100 Q100,105 90,140 L60,350 L100,360 L128,150" fill="url(#pufferPattern)" className="pointer-events-none"/>}
        <path d="M60,350 L100,360 L102,375 L58,365 Z" fill="#111" />
      </motion.g>

      {/* 3. RIGHT SLEEVE (Плавное плечо) */}
      <motion.g initial={false}>
        <path 
          d="M275,100 Q300,105 310,140 L340,350 L300,360 L272,150" 
          fill={isKevlar ? "url(#kevlarPattern)" : baseColor} 
          stroke={strokeColor} strokeWidth="2"
        />
        {isPuffer && <path d="M275,100 Q300,105 310,140 L340,350 L300,360 L272,150" fill="url(#pufferPattern)" className="pointer-events-none"/>}
        <path d="M340,350 L300,360 L298,375 L342,365 Z" fill="#111" />
      </motion.g>

      {/* 4. BODY */}
      <g>
        <path 
          d="M125,100 Q200,90 275,100 L285,140 L280,420 L120,420 L115,140 Z" 
          fill={baseColor} stroke={strokeColor} strokeWidth="2"
        />
        
        {/* Молния */}
        <line x1="200" y1="100" x2="200" y2="420" stroke="#222" strokeWidth="4" />
        <line x1="200" y1="100" x2="200" y2="420" stroke="#555" strokeWidth="1" strokeDasharray="2 2" />

        {/* POCKETS */}
        {pocketType === 'cargo' && (
          <>
            <rect x="130" y="280" width="55" height="70" rx="4" fill={baseColor} stroke={strokeColor} strokeWidth="2" />
            <rect x="215" y="280" width="55" height="70" rx="4" fill={baseColor} stroke={strokeColor} strokeWidth="2" />
            <path d="M130,280 L185,280 L185,295 L130,295 Z" fill="#222" opacity="0.2" />
            <path d="M215,280 L270,280 L270,295 L215,295 Z" fill="#222" opacity="0.2" />
            <text x="135" y="340" fontSize="5" fontFamily="monospace" fill="#ccff00" opacity="0.8">CARGO_L</text>
          </>
        )}

        {pocketType === 'tech' && (
          <>
            <line x1="160" y1="160" x2="160" y2="240" stroke="#111" strokeWidth="3" />
            <line x1="240" y1="160" x2="240" y2="240" stroke="#111" strokeWidth="3" />
            <rect x="158" y="240" width="4" height="8" fill="#ccff00" />
            <rect x="238" y="240" width="4" height="8" fill="#ccff00" />
          </>
        )}

        {pocketType === 'minimal' && (
           <>
             <path d="M140,300 L125,340" stroke="#333" strokeWidth="2" />
             <path d="M260,300 L275,340" stroke="#333" strokeWidth="2" />
           </>
        )}

        {/* Logo */}
        <rect x="235" y="140" width="20" height="6" fill="#ccff00" />
      </g>

      {/* 5. COLLAR/HOOD FRONT */}
      {hoodType === 'collar' ? (
         <path d="M125,100 Q200,110 275,100 L275,120 Q200,130 125,120 Z" fill="#1a1a1a" stroke={strokeColor}/>
      ) : (
         <path d="M125,100 L125,130 M275,100 L275,130" stroke="#111" strokeWidth="3" />
      )}
    </svg>
  );
};

// --- Data ---
const CONFIG = {
  bases: [
    { id: 'stealth', name: 'Stealth Black', price: 190, color: '#18181b' },
    { id: 'concrete', name: 'Concrete Grey', price: 190, color: '#52525b' },
    { id: 'military', name: 'Olive Drab', price: 210, color: '#3f4136' },
  ],
  sleeves: [
    { id: 'light', name: 'Lite Shell', price: 0, desc: 'Легкая ветрозащита', type: 'basic' },
    { id: 'thermal', name: 'Thermal Puffer', price: 55, desc: 'Утепленные сегменты', type: 'thermal' },
    { id: 'kevlar', name: 'Kevlar® Grid', price: 85, desc: 'Армированная сетка', type: 'kevlar' },
  ],
  hoods: [
    { id: 'collar', name: 'Воротник-стойка', price: 0, type: 'collar' },
    { id: 'storm', name: 'Штормовой капюшон', price: 35, type: 'storm' },
  ],
  pockets: [
    { id: 'minimal', name: 'Скрытые (Invisible)', price: 0, type: 'minimal' },
    { id: 'tech', name: 'Нагрудные (Tech)', price: 25, type: 'tech' },
    { id: 'cargo', name: 'Накладные (Cargo)', price: 40, type: 'cargo' },
  ],
  sizes: ['S', 'M', 'L', 'XL']
};

// --- Modal Component ---
const OrderModal = ({ isOpen, onClose, total, config }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Заказ принят! Менеджер свяжется с вами.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="relative z-10 bg-[#111] border border-white/10 w-full max-w-md p-8 rounded-xl shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black uppercase text-neon-lime mb-2">Оформить заказ</h2>
        <p className="text-zinc-500 text-xs mb-6 uppercase tracking-widest">Fast Checkout</p>

        {/* Summary */}
        <div className="bg-white/5 p-4 rounded-lg mb-6 border border-white/5">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-zinc-400">Основа:</span>
            <span className="font-bold text-white">{config.base.name}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-zinc-400">Модули:</span>
            <span className="text-white">{config.sleeve.name} + {config.pocket.name}</span>
          </div>
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <span className="text-zinc-400 uppercase text-xs">Итого</span>
            <span className="text-3xl font-bold text-neon-lime">${total}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase text-zinc-500 mb-3 font-bold">Контактный телефон</label>
            <div className="relative">
              {/* Увеличенная иконка телефона */}
              <Smartphone className="absolute top-3 left-3 text-neon-lime" size={28} />
              <input 
                type="tel" 
                placeholder="+7 (___) ___-__-__" 
                required
                className="w-full bg-black border border-white/20 rounded-lg py-4 pl-14 pr-4 text-lg text-white focus:border-neon-lime focus:outline-none transition-colors"
              />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-neon-lime text-black font-black uppercase py-4 rounded-lg hover:bg-[#b3e600] transition-colors shadow-[0_0_20px_rgba(204,255,0,0.3)]">
            Жду звонка
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- Feature Card Component ---
const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="p-8 border border-white/5 bg-[#0c0c0f] hover:border-neon-lime/50 transition-colors group">
    <Icon className="text-zinc-500 group-hover:text-neon-lime mb-6 transition-colors" size={32} />
    <h3 className="font-bold uppercase mb-3 text-white tracking-wider">{title}</h3>
    <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
  </div>
);

// --- Main App ---

const Hero = () => (
  <section className="relative h-[85vh] flex items-center px-6 overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1605218457336-927483641772?q=80&w=2000&auto=format&fit=crop" 
        alt="Techwear Hero" 
        className="w-full h-full object-cover grayscale brightness-50 contrast-125"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/60" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 border border-neon-lime/50 bg-black/50 backdrop-blur px-3 py-1 rounded-sm text-neon-lime text-xs font-mono mb-6 uppercase tracking-widest">
          <span className="w-2 h-2 bg-neon-lime animate-pulse rounded-full" />
          System V.2.1 Online
        </div>
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-white drop-shadow-xl">
          Urban <br/> <span className="text-neon-lime">Protocol</span>
        </h1>
        <a 
          href="#configurator"
          className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-neon-lime transition-all"
        >
          Initialize Build
          <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

const Configurator = () => {
  const [base, setBase] = useState(CONFIG.bases[0]);
  const [sleeve, setSleeve] = useState(CONFIG.sleeves[0]);
  const [hood, setHood] = useState(CONFIG.hoods[0]);
  const [pocket, setPocket] = useState(CONFIG.pockets[0]);
  const [size, setSize] = useState('L');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = base.price + sleeve.price + hood.price + pocket.price;

  return (
    <>
      <section id="configurator" className="py-24 bg-[#09090b] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row gap-4 items-end justify-between mb-12 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                Constructor
              </h2>
              <div className="flex gap-4 mt-2 font-mono text-xs text-neon-lime">
                <span>// NODE: {base.id.toUpperCase()}</span>
                <span>// MODS: {sleeve.type.toUpperCase()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Total Unit Cost</div>
              <div className="text-6xl font-black text-neon-lime tracking-tighter">${total}</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* --- VISUALIZER --- */}
            <div className="lg:col-span-7 relative">
              <div className="sticky top-24 w-full aspect-[4/5] bg-[#0f0f12] border border-white/10 rounded-sm overflow-hidden flex items-center justify-center relative shadow-2xl bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px]">
                
                {/* SVG RENDER */}
                <div className="w-[85%] h-[85%] z-10 relative transition-all duration-500">
                  <JacketRender 
                    baseColor={base.color}
                    sleeveType={sleeve.type}
                    hoodType={hood.type}
                    pocketType={pocket.type}
                  />
                </div>
              </div>
            </div>

            {/* --- CONTROLS --- */}
            <div className="lg:col-span-5 space-y-10">
              
              {/* 1. Base */}
              <div>
                <Label text="01. Chassis (Base)" />
                <div className="grid grid-cols-1 gap-2">
                  {CONFIG.bases.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBase(b)}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 border border-white/10 bg-white/5 hover:border-white/30 transition-all",
                        base.id === b.id && "border-neon-lime bg-neon-lime/10"
                      )}
                    >
                      <div className="w-4 h-4 rounded-sm border border-white/20" style={{ backgroundColor: b.color }} />
                      <span className="font-bold text-sm uppercase text-white">{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Sleeves */}
              <div>
                <Label text="02. Arm Modules" />
                <div className="grid grid-cols-1 gap-2">
                  {CONFIG.sleeves.map(s => (
                    <OptionButton 
                      key={s.id} 
                      selected={sleeve.id === s.id} 
                      onClick={() => setSleeve(s)} 
                      name={s.name} 
                      desc={s.desc} 
                      price={s.price} 
                    />
                  ))}
                </div>
              </div>

              {/* 3. Pockets */}
              <div>
                <Label text="03. Storage (Pockets)" />
                <div className="grid grid-cols-1 gap-2">
                  {CONFIG.pockets.map(p => (
                    <OptionButton 
                      key={p.id} 
                      selected={pocket.id === p.id} 
                      onClick={() => setPocket(p)} 
                      name={p.name} 
                      desc="Модульное крепление"
                      price={p.price} 
                    />
                  ))}
                </div>
              </div>

              {/* 4. Hood & Size */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label text="04. Headgear" />
                  <div className="flex flex-col gap-2">
                    {CONFIG.hoods.map(h => (
                      <button
                        key={h.id}
                        onClick={() => setHood(h)}
                        className={cn(
                          "px-4 py-3 text-xs font-bold uppercase border border-white/10 bg-white/5 text-left hover:bg-white/10 transition-all text-zinc-300",
                          hood.id === h.id && "border-neon-lime text-neon-lime bg-neon-lime/5"
                        )}
                      >
                        {h.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label text="05. Size" />
                  <div className="grid grid-cols-4 gap-2">
                    {CONFIG.sizes.map(sz => (
                      <button
                        key={sz}
                        onClick={() => setSize(sz)}
                        className={cn(
                          "aspect-square flex items-center justify-center text-sm font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300",
                          size === sz && "bg-white text-black border-white"
                        )}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assemble Button */}
              <div className="pt-8 border-t border-white/10">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-neon-lime hover:bg-[#b3e600] text-black h-16 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)]"
                >
                  Assemble Unit
                  <ArrowRight size={20} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        total={total}
        config={{ base, sleeve, pocket }}
      />
    </>
  );
};

const OptionButton = ({ selected, onClick, name, desc, price }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex justify-between items-center p-3 border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-left",
      selected && "border-neon-lime bg-neon-lime/5"
    )}
  >
    <div>
      <div className="font-bold text-sm uppercase text-white">{name}</div>
      <div className="text-[10px] text-zinc-400 mt-0.5 uppercase tracking-wider">{desc}</div>
    </div>
    <div className="font-mono text-xs text-neon-lime">
      {price > 0 ? `+$${price}` : 'STD'}
    </div>
  </button>
);

const Label = ({ text }) => (
  <h4 className="text-[10px] font-mono uppercase text-zinc-500 mb-3 tracking-[0.2em] flex items-center gap-2">
    <div className="w-1 h-1 bg-neon-lime rounded-full" />
    {text}
  </h4>
);

const Footer = () => (
  <footer className="py-12 bg-black text-center border-t border-white/10">
    <div className="text-neon-lime font-black text-xl mb-4 italic">JACKET_SHOP</div>
    <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">8(900)556-56-90  |  jacket@shop.ex</p>
    <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">ООО "Стильные куртки"</p>
    <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">ИНН 7704407589</p>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-neon-lime selection:text-black font-sans">
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter uppercase italic text-white">
            Jacket<span className="text-neon-lime">_Shop</span>
          </div>
          <ShoppingBag className="text-white hover:text-neon-lime transition-colors cursor-pointer" />
        </div>
      </nav>
      
      <main>
        <Hero />
        
        {/* Key Advantage Section (Restored) */}
        <section className="py-24 px-6 bg-[#0c0c0f] border-b border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
             <FeatureCard 
               icon={Layers} 
               title="Modular Core" 
               desc="Запатентованная система креплений MagLock™. Смена конфигурации занимает секунды."
             />
             <FeatureCard 
               icon={Shield} 
               title="Ballistic Nylon" 
               desc="Материалы, устойчивые к разрывам, воде и агрессивной городской среде."
             />
             <FeatureCard 
               icon={RotateCcw} 
               title="Sustainable Loop" 
               desc="Заменяйте только изношенные модули, а не всю куртку целиком."
             />
          </div>
        </section>

        <Configurator />
      </main>

      <Footer />
    </div>
  );
}