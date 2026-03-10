/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBasket, 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  MessageCircle,
  Menu,
  X,
  Send,
  ChevronDown,
  Maximize2,
  Apple,
  Citrus
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'motion/react';

// --- Types ---
interface Slide {
  id: number;
  image: string;
  headline: string;
  subtext: string;
}

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface GalleryItem {
  id: number;
  name: string;
  image: string;
  category: string;
  details: string[];
}

// --- Constants ---
const PRIMARY_GREEN = '#2E7D32';
const LIGHT_GREEN = '#66BB6A';
const ORANGE_ACCENT = '#FF8F00';

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop',
    headline: 'Fresh Fruits & Vegetables Everyday',
    subtext: 'Bringing farm freshness to your neighborhood'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1920&auto=format&fit=crop',
    headline: 'Quality You Can Trust',
    subtext: 'Carefully selected produce for your family'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=1920&auto=format&fit=crop',
    headline: 'Your Local Grocery Store',
    subtext: 'Fruits, vegetables and daily essentials in one place'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1920&auto=format&fit=crop',
    headline: 'Fresh From Farm To Store',
    subtext: 'Supporting local farmers and fresh produce'
  }
];

const FEATURES: Feature[] = [
  {
    id: 1,
    icon: <Leaf className="w-8 h-8 text-[#2E7D32]" />,
    title: 'Fresh Produce Daily',
    description: 'We restock our shelves every morning with the freshest harvest.'
  },
  {
    id: 2,
    icon: <ShoppingBasket className="w-8 h-8 text-[#2E7D32]" />,
    title: 'Affordable Prices',
    description: 'Quality food shouldn\'t break the bank. We keep our prices fair.'
  },
  {
    id: 3,
    icon: <MapPin className="w-8 h-8 text-[#2E7D32]" />,
    title: 'Trusted Local Store',
    description: 'Serving our community with pride for over a decade.'
  },
  {
    id: 4,
    icon: <CheckCircle className="w-8 h-8 text-[#2E7D32]" />,
    title: 'Wide Variety',
    description: 'From exotic fruits to daily staples, we have it all.'
  },
  {
    id: 5,
    icon: <MessageCircle className="w-8 h-8 text-[#2E7D32]" />,
    title: 'Friendly Service',
    description: 'Our staff is always here to help you find what you need.'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Local Customer',
    text: 'Very fresh vegetables and reasonable prices. My go-to store for groceries.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Regular Shopper',
    text: 'Friendly staff and great variety of fruits and vegetables. The quality is unmatched.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Community Member',
    text: 'Always fresh and well stocked. Highly recommended for anyone looking for quality produce.',
    rating: 4
  }
];

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, name: 'Carrot', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop', category: 'Vegetable', details: ['Fresh Quality', 'Farm Sourced', 'Rich in Nutrients'] },
  { id: 2, name: 'Tomato', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop', category: 'Vegetable', details: ['Fresh Quality', 'Farm Sourced', 'Rich in Nutrients'] },
  { id: 3, name: 'Spinach', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop', category: 'Vegetable', details: ['Fresh Quality', 'Farm Sourced', 'Rich in Nutrients'] },
  { id: 4, name: 'Potato', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop', category: 'Vegetable', details: ['Fresh Quality', 'Farm Sourced', 'Rich in Nutrients'] },
  { id: 5, name: 'Cucumber', image: 'https://images.unsplash.com/photo-1449333254714-231871469700?q=80&w=800&auto=format&fit=crop', category: 'Vegetable', details: ['Fresh Quality', 'Farm Sourced', 'Rich in Nutrients'] },
  { id: 6, name: 'Onion', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800&auto=format&fit=crop', category: 'Vegetable', details: ['Fresh Quality', 'Farm Sourced', 'Rich in Nutrients'] },
  { id: 7, name: 'Apple', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop', category: 'Fruit', details: ['Fresh Quality', 'Farm Sourced', 'Rich in Nutrients'] },
  { id: 8, name: 'Mango', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop', category: 'Fruit', details: ['Fresh Quality', 'Farm Sourced', 'Rich in Nutrients'] },
];

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="bg-[#2E7D32] p-3 rounded-2xl">
          <ShoppingBasket className="text-white w-10 h-10" />
        </div>
        <span className="text-4xl font-black text-[#2E7D32] tracking-tighter">
          FreshHarvest <span className="text-[#FF8F00]">Market</span>
        </span>
      </motion.div>
      <div className="flex gap-4">
        {[Apple, Citrus, Leaf].map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
          >
            <Icon className="w-8 h-8 text-[#2E7D32]" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const SectionDivider = ({ type = 'wave' }: { type?: 'wave' | 'leaf' }) => {
  if (type === 'leaf') {
    return (
      <div className="flex justify-center py-12 overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <Leaf className="w-12 h-12 text-[#2E7D32]/20" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden leading-[0] rotate-180">
      <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
      </svg>
    </div>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0.1
          }}
          animate={{ 
            y: [null, "-=50", "+=50"],
            rotate: [0, 45, -45, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10 + Math.random() * 10, 
            ease: "easeInOut" 
          }}
          className="absolute"
        >
          {i % 2 === 0 ? <Leaf className="text-[#2E7D32]" size={24} /> : <Apple className="text-[#FF8F00]" size={20} />}
        </motion.div>
      ))}
    </div>
  );
};

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsSection = () => {
  const stats = [
    { label: 'Years Serving', value: 10, suffix: '+' },
    { label: 'Happy Customers', value: 1000, suffix: '+' },
    { label: 'Fresh Deliveries', value: 50, suffix: ' Daily' },
    { label: 'Local Partners', value: 25, suffix: '+' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#2E7D32] text-white relative overflow-hidden">
      <FloatingElements />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl md:text-7xl font-black mb-2 md:mb-4 tracking-tighter">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/70 font-bold uppercase tracking-widest text-[10px] md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const ParallaxBackground = ({ src, speed = 0.5, overlay = "bg-black/30" }: { src: string, speed?: number, overlay?: string }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div style={{ y }} className="absolute inset-0 h-[150%] w-full">
        <div className={`absolute inset-0 ${overlay} z-10`} />
        <img
          src={src}
          alt="Parallax background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  );
};

const ScrollReveal = ({ children, delay = 0, type = "fade" }: { children: React.ReactNode, delay?: number, key?: React.Key, type?: "fade" | "mask" | "slide" }) => {
  const variants = {
    fade: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 }
    },
    mask: {
      initial: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      whileInView: { clipPath: "inset(0 0% 0 0)", opacity: 1 }
    },
    slide: {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      initial={variants[type].initial}
      whileInView={variants[type].whileInView}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

const ParallaxBanner = ({ src, title, subtitle }: { src: string, title: string, subtitle?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 h-[140%] w-full -z-10">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img src={src} alt={title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </motion.div>
      <div className="text-center px-6 z-20">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-3 md:mb-4 tracking-tight drop-shadow-2xl">{title}</h2>
          {subtitle && <p className="text-base sm:text-xl text-white/90 font-medium">{subtitle}</p>}
        </ScrollReveal>
      </div>
    </section>
  );
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#2E7D32] p-1.5 md:p-2 rounded-lg">
              <ShoppingBasket className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className={`text-lg sm:text-xl font-bold tracking-tight ${scrolled ? 'text-[#2E7D32]' : 'text-white'}`}>
              FreshHarvest <span className="text-[#FF8F00]">Market</span>
            </span>
          </div>

          {/* Hamburger Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-[#FF8F00] text-white shadow-lg hover:scale-110 transition-all z-50 relative"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} className="md:w-7 md:h-7" /> : <Menu size={24} className="md:w-7 md:h-7" />}
            </button>

            {/* Small Dropdown Menu Box */}
            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Invisible backdrop to catch clicks if the ref logic fails or for mobile tap experience */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100"
                  >
                    <div className="p-2">
                      {navLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-[#2E7D32] rounded-xl font-medium transition-colors"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const bgX = useTransform(springX, [-500, 500], ["-2%", "2%"]);
  const bgY = useTransform(springY, [-500, 500], ["-2%", "2%"]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  const nextSlide = () => setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));

  // Swipe logic
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      onMouseMove={handleMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative h-screen w-full overflow-hidden bg-gray-900"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-10" />
          <motion.div style={{ x: bgX, y: bgY, scale: 1.1 }} className="absolute inset-0">
            <motion.img
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 10, ease: "linear" }}
              src={HERO_SLIDES[current].image}
              alt={HERO_SLIDES[current].headline}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-5xl"
              style={{ x: useTransform(springX, [-500, 500], [10, -10]), y: useTransform(springY, [-500, 500], [10, -10]) }}
            >
              <motion.h1
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-[0.95] md:leading-[0.9]"
              >
                {HERO_SLIDES[current].headline.split(' ').map((word, i) => (
                  <motion.span 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="inline-block mr-2 md:mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 md:mb-10 font-medium max-w-3xl mx-auto"
              >
                {HERO_SLIDES[current].subtext}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <a
                  href="#visit-us"
                  className="group relative inline-flex items-center gap-3 bg-[#FF8F00] text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-black hover:bg-[#E65100] transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(255,143,0,0.3)]"
                >
                  Visit Our Store
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronRight size={24} />
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-32 md:top-1/2 md:-translate-y-1/2 z-30 flex justify-between px-4 md:px-6 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all border border-white/10"
        >
          <ChevronLeft size={24} className="md:w-8 md:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all border border-white/10"
        >
          <ChevronRight size={24} className="md:w-8 md:h-8" />
        </button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3 md:gap-4">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${current === idx ? 'bg-[#FF8F00] w-8 md:w-12' : 'bg-white/30 w-4 md:w-6'}`}
          />
        ))}
      </div>


      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs font-bold uppercase tracking-widest">Scroll Down</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-32 bg-white relative overflow-hidden">
      <FloatingElements />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <ScrollReveal type="slide">
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
                  alt="Fresh Produce"
                  className="rounded-[2rem] md:rounded-[2.5rem] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-50 rounded-[3rem] -z-0 hidden md:block"
              />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FF8F00]/10 rounded-full -z-0 blur-2xl" />
            </div>
          </ScrollReveal>
          <div className="space-y-6 md:space-y-8">
            <ScrollReveal type="mask">
              <span className="inline-block px-4 py-1.5 bg-green-50 text-[#2E7D32] rounded-full font-black tracking-widest uppercase text-[10px] md:text-xs">
                Our Story
              </span>
            </ScrollReveal>
            <ScrollReveal type="mask" delay={0.2}>
              <h2 className="text-3xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] md:leading-[1.1]">
                Serving Freshness to Your <span className="text-[#2E7D32] relative inline-block">Neighborhood<motion.span initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-1 md:bottom-2 left-0 h-2 md:h-3 bg-[#2E7D32]/10 -z-10"></motion.span></span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
                FreshHarvest Market is a trusted neighborhood grocery store offering fresh fruits, vegetables, and everyday grocery essentials. Our goal is to provide high-quality produce at affordable prices while supporting local farmers and suppliers.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                We take pride in serving our community with fresh, healthy food every day. From the moment we open our doors at sunrise, our mission is to ensure every family in our area has access to the best nature has to offer.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 pt-4">
              <ScrollReveal delay={0.8} type="slide">
                <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 rounded-2xl">
                    <CheckCircle className="text-[#2E7D32] w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <span className="font-black text-gray-800 tracking-tight text-sm md:text-base">100% Organic</span>
                </motion.div>
              </ScrollReveal>
              <ScrollReveal delay={1} type="slide">
                <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 rounded-2xl">
                    <CheckCircle className="text-[#2E7D32] w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <span className="font-black text-gray-800 tracking-tight text-sm md:text-base">Local Sourced</span>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const WhyUs = () => {
  return (
    <section id="why-us" className="py-16 md:py-32 bg-gray-50 relative overflow-hidden">
      <FloatingElements />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <ScrollReveal type="mask">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-[#2E7D32] rounded-full font-black tracking-widest uppercase text-[10px] md:text-xs mb-4 md:mb-6">
              The Advantage
            </span>
            <h2 className="text-3xl md:text-7xl font-black text-gray-900 mt-2 tracking-tighter">The FreshHarvest Advantage</h2>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
          {FEATURES.map((feature, idx) => (
            <ScrollReveal key={feature.id} delay={idx * 0.1} type="fade">
              <motion.div
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  boxShadow: "0 40px 80px rgba(0,0,0,0.1)"
                }}
                className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all text-center group h-full flex flex-col items-center"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6 md:mb-8 p-5 md:p-6 bg-green-50 rounded-[1.5rem] md:rounded-[2rem] group-hover:bg-[#2E7D32] transition-all duration-500"
                >
                  {React.cloneElement(feature.icon as React.ReactElement, { 
                    className: "w-8 h-8 md:w-10 md:h-10 text-[#2E7D32] group-hover:text-white transition-colors duration-500" 
                  })}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};


const Testimonials = () => {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#2E7D32] font-bold tracking-wider uppercase text-xs md:text-sm">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-50 p-6 md:p-8 rounded-2xl md:rounded-3xl relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? 'fill-[#FF8F00] text-[#FF8F00]' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 text-sm md:text-base">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2E7D32] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
                  <span className="text-xs md:text-sm text-gray-500">{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const GalleryCard = ({ item, index }: { item: GalleryItem, index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Entry animation variants
  const entryVariants = {
    hidden: { 
      opacity: 0, 
      y: index % 2 === 0 ? -100 : 100, 
      x: index % 3 === 0 ? -50 : 50,
      rotate: index % 2 === 0 ? -10 : 10
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 50,
        damping: 15,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={entryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="flex-shrink-0 w-72 h-[28rem] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-700"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={!isFlipped ? { y: -15 } : {}}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-xl bg-white flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-2/3 overflow-hidden relative group">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[#2E7D32] rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                {item.category}
              </span>
            </div>
          </div>
          <div className="p-8 flex-grow flex flex-col justify-center items-center text-center">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">{item.name}</h3>
            <div className="mt-4 w-10 h-1 bg-[#FF8F00] rounded-full" />
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#2E7D32] text-white p-10 flex flex-col justify-center items-center text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="mb-6 p-4 bg-white/10 rounded-2xl">
            <Leaf className="w-10 h-10 text-[#FF8F00]" />
          </div>
          <h3 className="text-3xl font-black mb-8 tracking-tight">{item.name}</h3>
          <ul className="space-y-4 w-full">
            {item.details.map((detail, i) => (
              <li key={i} className="flex items-center justify-center gap-3 font-bold text-sm">
                <CheckCircle size={18} className="text-[#FF8F00] flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            Click to flip back
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Gallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (isInteracting) return;
    
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 0.6;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  return (
    <section id="gallery" className="py-16 md:py-32 bg-gray-50 relative overflow-hidden">
      <FloatingElements />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <ScrollReveal type="mask">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-[#2E7D32] rounded-full font-black tracking-widest uppercase text-[10px] md:text-xs mb-4 md:mb-6">
              Our Showcase
            </span>
            <h2 className="text-3xl md:text-7xl font-black text-gray-900 mt-2 tracking-tighter">Freshness in Every Card</h2>
            <p className="text-gray-500 mt-4 md:mt-6 font-medium text-base md:text-lg">Swipe or drag to explore our fresh harvest</p>
          </ScrollReveal>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 md:gap-10 overflow-x-auto pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 no-scrollbar cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
        style={{ scrollBehavior: isInteracting ? 'smooth' : 'auto' }}
      >
        {GALLERY_ITEMS.map((item, idx) => (
          <div key={item.id} className="flex-shrink-0">
            <GalleryCard item={item} index={idx} />
          </div>
        ))}
      </div>
    </section>
  );
};


const VisitUs = () => {
  return (
    <section id="visit-us" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[#2E7D32] font-bold tracking-wider uppercase text-xs md:text-sm">Visit Us</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-6 md:mb-8">Find Your Local Store</h2>
            
            <div className="space-y-6 md:space-y-8">
              <div className="flex gap-4 md:gap-6">
                <div className="p-3 md:p-4 bg-green-50 rounded-xl md:rounded-2xl h-fit">
                  <MapPin className="text-[#2E7D32] w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Store Address</h4>
                  <p className="text-gray-600 text-sm md:text-base">123 Harvest Lane, Green Valley, CA 94043</p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6">
                <div className="p-3 md:p-4 bg-green-50 rounded-xl md:rounded-2xl h-fit">
                  <Clock className="text-[#2E7D32] w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Store Timings</h4>
                  <p className="text-gray-600 text-sm md:text-base">Monday - Sunday: 7:00 AM - 9:00 PM</p>
                  <p className="text-[#FF8F00] text-xs md:text-sm font-semibold mt-1">Open on Public Holidays</p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6">
                <div className="p-3 md:p-4 bg-green-50 rounded-xl md:rounded-2xl h-fit">
                  <Phone className="text-[#2E7D32] w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Phone Number</h4>
                  <p className="text-gray-600 text-sm md:text-base">+1 (555) 123-4567</p>
                </div>
              </div>

              <button className="w-full sm:w-auto bg-[#2E7D32] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1B5E20] transition-all flex items-center justify-center gap-2 shadow-lg">
                <MapPin size={20} />
                Get Directions
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="h-[300px] sm:h-[400px] lg:h-auto min-h-[300px] sm:min-h-[400px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-gray-50"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639290622367!2d-122.0838511!3d37.4219999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbba1ee160911%3A0x57718a1a5fcacc0d!2sGoogleplex!5e0!3m2!1sen!2sus!4v1709999999999!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#2E7D32] p-2 rounded-xl">
                <ShoppingBasket className="text-white w-8 h-8" />
              </div>
              <span className="text-3xl font-black tracking-tight">
                FreshHarvest <span className="text-[#FF8F00]">Market</span>
              </span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Your trusted neighborhood partner for the freshest farm produce and daily essentials. Serving quality since 2015.
            </p>
            <div className="flex gap-4 pt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#FF8F00] transition-all cursor-pointer group">
                  <div className="w-4 h-4 bg-white rounded-sm group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-sm font-bold text-[#FF8F00] uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-lg">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors text-lg">About Us</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-white transition-colors text-lg">Our Gallery</a></li>
              <li><a href="#visit-us" className="text-gray-300 hover:text-white transition-colors text-lg">Visit Store</a></li>
            </ul>
          </div>
          
          {/* Owner/Contact Column */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-sm font-bold text-[#FF8F00] uppercase tracking-[0.2em]">Store Information</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-2 bg-white/5 rounded-lg group-hover:bg-[#2E7D32] transition-colors">
                  <Phone size={18} className="text-[#66BB6A] group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Call Us</p>
                  <p className="text-white font-medium text-lg">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-2 bg-white/5 rounded-lg group-hover:bg-[#2E7D32] transition-colors">
                  <Mail size={18} className="text-[#66BB6A] group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Email Us</p>
                  <p className="text-white font-medium text-lg">hello@freshharvest.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-2 bg-white/5 rounded-lg group-hover:bg-[#2E7D32] transition-colors">
                  <MapPin size={18} className="text-[#66BB6A] group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Location</p>
                  <p className="text-white font-medium text-lg">123 Harvest Lane, Green Valley, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>&copy; 2026 FreshHarvest Market. All rights reserved.</p>
          <p className="italic">Freshness you can taste, quality you can trust.</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/15551234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="28" 
        height="28" 
        className="md:w-8 md:h-8"
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
        Chat with us!
      </span>
    </a>
  );
};


export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-green-100 selection:text-[#2E7D32] scroll-smooth">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        
        <About />
        <SectionDivider type="leaf" />
        
        <ParallaxBanner 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop"
          title="Fresh Produce Arriving Daily"
          subtitle="Directly from local farms to your table"
        />

        <StatsSection />
        <SectionDivider />

        <WhyUs />
        <SectionDivider type="leaf" />

        <ParallaxBanner 
          src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1920&auto=format&fit=crop"
          title="Supporting Local Farmers"
          subtitle="Quality you can trust, community you can support"
        />

        <Gallery />

        <ParallaxBanner 
          src="https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=1920&auto=format&fit=crop"
          title="Quality Fruits & Vegetables"
          subtitle="The best nature has to offer, every single day"
        />

        <Testimonials />
        <SectionDivider />
        <VisitUs />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
