"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { CheckCircle2, MessageSquare, Phone, Mail, MessageCircle, BarChart3, Users, Headphones, MonitorSmartphone, Globe, ShoppingCart, MousePointer, Layout, RefreshCw, Loader2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollExpandMedia } from "./../components/ui/scroll-expansion-hero";
import { GlowCard } from "./../components/ui/spotlight-card";
import { ContainerScroll } from "./../components/ui/container-scroll-animation";
import { ShootingStars } from "./../components/ui/shooting-stars";
import { AnimatedText } from "./../components/ui/animated-shiny-text";
import { SplineScene } from "./../components/ui/splite";
import { Spotlight } from "./../components/ui/spotlight";
import { Button } from "./../components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    };

    const handleHover = () => {
      gsap.to(cursor, { scale: 1.5, backgroundColor: "rgba(255, 255, 255, 0.1)", border: "1px solid #ffffff", duration: 0.2 });
    };

    const handleHoverOut = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "#ffffff", border: "none", duration: 0.2 });
    };

    window.addEventListener("mousemove", moveCursor);
    const interactables = document.querySelectorAll("a, button, input, textarea, .magnetic");
    interactables.forEach(el => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactables.forEach(el => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2" />
  );
};

export default function Portfolio() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      (gsap.utils.toArray('.gsap-fade-up') as Element[]).forEach((elem) => {
        gsap.fromTo(elem, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: elem, start: "top 85%" } });
      });
      (gsap.utils.toArray('.gsap-slide-right') as Element[]).forEach((elem) => {
        gsap.fromTo(elem, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 80%" } });
      });
      (gsap.utils.toArray('.gsap-slide-left') as Element[]).forEach((elem) => {
        gsap.fromTo(elem, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 80%" } });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', company: '', whatsapp: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: false });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]);
  };

  const handleSelectPackage = () => {
    const servicesList = selectedServices.length === 0 ? "" : `I'm interested in: ${selectedServices.join(', ')}`;
    setFormData(prev => ({ ...prev, message: servicesList }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false });
    try {
      await fetch("https://script.google.com/macros/s/AKfycbx8hzHkA_14EP7afpHEpKv6eC52k-sp8YHGCKcJ6j4tvaEqZTbtUFG7WLC7GrimqYv5/exec", {
        method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData)
      });
      setStatus({ submitting: false, success: true, error: false });
      setFormData({ name: '', email: '', company: '', whatsapp: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false, error: true });
    }
  };

  const aiServicesData = [
    { title: "AI Website Chatbot", desc: "Turn visitors into customers instantly with an intelligent agent.", icon: <Globe className="w-8 h-8 text-white mb-4" /> },
    { title: "AI Lead Qualifier", desc: "Automatically filter and score prospects directly.", icon: <CheckCircle2 className="w-8 h-8 text-white mb-4" /> },
    { title: "WhatsApp Bot", desc: "Engage customers with automated WhatsApp sales flows.", icon: <MessageCircle className="w-8 h-8 text-white mb-4" /> },
    { title: "Social Media Automation", desc: "Scale globally with systems that interact across tracking channels.", icon: <BarChart3 className="w-8 h-8 text-white mb-4" /> },
    { title: "Customer Support Bot", desc: "Resolve 80% of support tickets instantly around the clock.", icon: <Headphones className="w-8 h-8 text-white mb-4" /> },
    { title: "AI Calling Bot", desc: "Siri on steroids for your sales calls and inbound responses.", icon: <Phone className="w-8 h-8 text-white mb-4" /> }
  ];

  const webServicesData = [
    { title: "Custom Website Design", desc: "Stunning, fast websites built from scratch to match your brand.", icon: <MonitorSmartphone className="w-8 h-8 text-white mb-4" /> },
    { title: "E-Commerce Store", desc: "Online stores with payment integration and product management.", icon: <ShoppingCart className="w-8 h-8 text-white mb-4" /> },
    { title: "Landing Page", desc: "High-converting landing pages to turn visitors into paying customers.", icon: <Layout className="w-8 h-8 text-white mb-4" /> },
    { title: "Website Redesign", desc: "Transform your outdated website into a modern online presence.", icon: <RefreshCw className="w-8 h-8 text-white mb-4" /> }
  ];

  return (
    <div ref={mainRef} className="text-white selection:bg-[#2563ff] selection:text-white font-manrope relative min-h-screen bg-[#000000]">
      
      {/* Background Layer completely behind layout */}
      <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_80%)]" />
        <ShootingStars
          starColor="#9E00FF"
          trailColor="#2EB9DF"
          minSpeed={15}
          maxSpeed={35}
          minDelay={1000}
          maxDelay={3000}
        />
        <ShootingStars
          starColor="#FF0099"
          trailColor="#FFB800"
          minSpeed={10}
          maxSpeed={25}
          minDelay={2000}
          maxDelay={4000}
        />
        <ShootingStars
          starColor="#00FF9E"
          trailColor="#00B8FF"
          minSpeed={20}
          maxSpeed={40}
          minDelay={1500}
          maxDelay={3500}
        />
      </div>

      <main className="relative z-10">
      <MagneticCursor />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-transparent backdrop-blur-md border-b border-[#333333]/30">
        <div className="text-2xl font-bold font-syne tracking-tighter text-white">Anshul<span className="text-[#888888]">.</span></div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-space-grotesk tracking-wider uppercase text-[#bbbbbb]">
          <a href="#ai-automation" className="hover:text-white transition-all magnetic">AI Automation</a>
          <a href="#web-design" className="hover:text-white transition-all magnetic">Web Design</a>
          <a href="#work" className="hover:text-white transition-all magnetic">Work</a>
          <a href="#process" className="hover:text-white transition-all magnetic">Process</a>
        </div>
        <Button size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Let&apos;s Talk</Button>
      </nav>

      {/* Hero Section */}
      <section className="w-full h-screen bg-transparent relative overflow-hidden flex items-center pt-24 border-b border-[#333333]/30">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 relative z-10 h-full items-center">
          <div className="flex flex-col justify-center h-full max-w-2xl pt-20 lg:pt-0">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-xs font-space-grotesk tracking-widest uppercase mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#2563ff] mr-2"></span>
              AI & Web Development
            </div>
            
            <div className="flex justify-start text-left ml-0 md:-translate-x-4">
              <AnimatedText 
                text="AI Automation & Website Development"
                gradientColors="linear-gradient(90deg, #ffffff, #666666, #ffffff)"
                gradientAnimationDuration={3}
                textClassName="font-bold text-left text-4xl sm:text-5xl md:text-6xl tracking-tight mb-2 uppercase font-syne"
                className="py-2 justify-start items-start"
              />
            </div>
            
            <p className="text-[#bbbbbb] text-xl md:text-2xl font-light leading-relaxed mb-10 max-w-xl">
              Automate your business. Build your presence.<br className="hidden md:block" />Powered by AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-[#dddddd]" onClick={() => document.getElementById('ai-automation')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Services
              </Button>
              <Button size="lg" variant="outline" className="border-[#333333] hover:border-[#888888]" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Let&apos;s Talk
              </Button>
            </div>
          </div>
          <div className="h-[40vh] lg:h-[80vh] w-full relative">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
              className="w-full h-full" 
            />
          </div>
        </div>
      </section>

      {/* Container Scroll Dashboard Mockup */}
      <section className="relative z-20 py-20 bg-transparent">
        <ContainerScroll 
          titleComponent={
            <h2 className="text-5xl md:text-7xl font-black font-syne text-white mb-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tight">
              See Your Business <br /> Transform
            </h2>
          }
        >
          {/* Mockup UI Inner Container */}
          <div className="w-full h-full bg-[#111111] p-8 flex flex-col gap-6 font-manrope">
            <div className="flex items-center justify-between border-b border-[#333333] pb-6">
              <div className="flex gap-4 items-center">
                 <div className="w-4 h-4 rounded-full bg-red-500"></div>
                 <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                 <div className="w-4 h-4 rounded-full bg-green-500"></div>
                 <div className="text-white font-bold font-syne ml-4 tracking-widest uppercase">Admin Dashboard</div>
              </div>
              <div className="flex gap-4">
                 <div className="h-8 w-24 bg-[#222222] rounded-md animate-pulse"></div>
                 <div className="h-8 w-8 rounded-full bg-[#2563ff] animate-pulse"></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 flex-grow">
               <div className="col-span-2 flex flex-col gap-6">
                  <div className="h-40 bg-[#1a1a1a] rounded-xl border border-[#333333] p-6 flex flex-col justify-between">
                     <div className="text-[#888888] text-sm uppercase tracking-widest font-space-grotesk">Conversations Automated</div>
                     <div className="text-5xl font-black text-white font-syne">14,208</div>
                  </div>
                  <div className="flex-grow bg-[#1a1a1a] rounded-xl border border-[#333333] p-6 space-y-4 overflow-hidden relative">
                    <div className="text-[#888888] text-sm uppercase tracking-widest font-space-grotesk mb-4">Live Agent Logs</div>
                    {[1,2,3].map(i => (
                      <div key={i} className="flex gap-4 items-center opacity-80">
                         <div className="w-10 h-10 rounded-full bg-[#333333]"></div>
                         <div className="space-y-2 flex-grow">
                           <div className="h-2 bg-[#444444] rounded w-1/4"></div>
                           <div className="h-2 bg-[#222222] rounded w-3/4"></div>
                         </div>
                      </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent pointer-events-none"></div>
                  </div>
               </div>
               <div className="flex flex-col gap-6">
                  <div className="h-1/2 bg-gradient-to-br from-[#2563ff]/20 to-[#1a1a1a] rounded-xl border border-[#2563ff]/30 p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(37,99,255,0.1)]">
                     <div className="text-[#888888] text-sm uppercase tracking-widest font-space-grotesk">Leads Captured</div>
                     <div className="text-5xl font-black text-white font-syne tracking-tight">4,812</div>
                  </div>
                  <div className="h-1/2 bg-[#1a1a1a] rounded-xl border border-[#333333] p-6 flex items-center justify-center">
                     <div className="w-32 h-32 rounded-full border-8 border-t-[#2563ff] border-r-[#2563ff] border-b-[#333333] border-l-[#333333] rotate-45"></div>
                  </div>
               </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* AI Automation Services -> Glow Cards */}
      <section id="ai-automation" className="py-32 px-6 relative z-20 bg-transparent border-t border-[#333333]/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center gsap-fade-up">
            <h2 className="text-5xl md:text-7xl font-black font-syne tracking-tight text-white mb-6">AI Automation <span className="text-[#888888]">Services.</span></h2>
            <p className="text-xl md:text-2xl text-[#bbbbbb] font-light max-w-3xl mx-auto leading-relaxed">Custom-built AI agents designed to replace manual processes and maximize efficiency across your entire business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gsap-fade-up">
             {aiServicesData.map((service, i) => (
                <GlowCard 
                  key={i} 
                  glowColor="blue"
                  customSize={true}
                  width="100%"
                  height="280px"
                  className="bg-[#111111] hover:shadow-2xl transition-all duration-300 border-[#333333] border"
                >
                  <div className="flex flex-col h-full z-20 pointer-events-none p-2">
                    {service.icon}
                    <h3 className="text-2xl font-bold font-syne text-white mb-3 mt-auto">{service.title}</h3>
                    <p className="font-sans font-normal text-[#888888] text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </GlowCard>
             ))}
          </div>
        </div>
      </section>

      {/* Web Design Section -> Glow Cards */}
      <section id="web-design" className="py-32 px-6 relative z-20 bg-transparent border-t border-[#333333]/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center gsap-fade-up">
            <h2 className="text-5xl md:text-7xl font-black font-syne tracking-tight text-white mb-6">Website <span className="text-[#888888]">Development.</span></h2>
            <p className="text-xl md:text-2xl text-[#bbbbbb] font-light max-w-3xl mx-auto leading-relaxed">High-performance custom web solutions designed to scale your brand and maximize conversions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto gsap-fade-up">
            {webServicesData.map((service, i) => (
               <GlowCard 
                 key={i} 
                 glowColor="purple"
                 customSize={true}
                 width="100%"
                 height="280px"
                 className="bg-[#111111] hover:shadow-2xl transition-all duration-300 border-[#333333] border"
               >
                  <div className="flex flex-col h-full z-20 pointer-events-none p-2">
                    {service.icon}
                    <h3 className="text-2xl font-bold font-syne text-white mb-3 mt-auto">{service.title}</h3>
                    <p className="font-sans font-normal text-[#888888] text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
               </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Videos Section */}
      <section id="work" className="py-32 px-6 bg-transparent border-y border-[#333333]/30 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center md:text-left gsap-fade-up">
            <h2 className="text-5xl md:text-7xl font-black font-syne tracking-tight text-white mb-6">See it in <span className="text-[#888888]">Action.</span></h2>
            <p className="text-xl md:text-2xl text-[#bbbbbb] font-light max-w-3xl leading-relaxed">Real AI agents performing real tasks. No fluff, just pure functionality.</p>
          </div>
          <div className="space-y-40">
            {[{title: "Inbound Lead Qualification Flow", desc: "Watch how our AI instantly engages a new website visitor, asks qualifying questions, checks available times, and books a high-value meeting without lifting a finger.", tags: ["Lead Gen", "Scheduling", "CRM Sync"]}, {title: "Voice AI Sales Representative", desc: "Listen to a live recording of our Voice AI calling an inbound lead within 5 minutes of form submission, handling objections naturally, and confirming an appointment.", tags: ["Voice AI", "Speed to Lead", "Sales"]}, {title: "Automated Omni-Channel Support", desc: "See one central AI brain simultaneously handle inquiries over WhatsApp, Email, and Website chat, maintaining context and personality across all channels.", tags: ["Customer Support", "WhatsApp", "Email Parsing"]}].map((demo, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
                <div className={`w-full lg:w-1/2 ${i % 2 === 1 ? 'gsap-slide-left' : 'gsap-slide-right'}`}>
                  <div className="aspect-[4/3] bg-[#111111] rounded-[1.5rem] border border-[#333333] overflow-hidden relative group magnetic flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                    <div className="absolute inset-0 w-full h-full p-2 pt-14 z-20">
                      <img src={`/images/demo${i + 1}.png.png`} alt={`${demo.title} Screenshot`} className="w-full h-full object-cover rounded-xl shadow-2xl" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }} />
                      <div className="hidden absolute inset-0 bg-[#000000] flex flex-col items-center justify-center text-[#333333]">
                        <MonitorSmartphone className="w-20 h-20 mb-6 opacity-30" />
                        <p className="text-xs font-space-grotesk tracking-[0.3em] uppercase opacity-50">Video Demo {i+1}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`w-full lg:w-1/2 flex flex-col items-start ${i % 2 === 1 ? 'gsap-slide-right' : 'gsap-slide-left'}`}>
                  <div className="flex gap-3 mb-8 flex-wrap">
                    {demo.tags.map(tag => <span key={tag} className="px-4 py-1.5 text-xs font-space-grotesk tracking-widest uppercase bg-[#111111]/80 backdrop-blur-md text-[#888888] border border-[#333333] rounded-md">{tag}</span>)}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black font-syne text-white mb-6 leading-tight drop-shadow-lg">{demo.title}</h3>
                  <p className="text-[#bbbbbb] text-xl font-light leading-relaxed mb-8">{demo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Your Package Section */}
      <section id="pricing" className="py-32 px-6 relative z-20 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center gsap-fade-up">
            <h2 className="text-5xl md:text-7xl font-black font-syne tracking-tight text-white mb-6">Build Your <span className="text-[#888888]">Custom Package.</span></h2>
            <p className="text-xl md:text-2xl text-[#bbbbbb] font-light max-w-3xl mx-auto leading-relaxed">Choose the services your business needs. Mix and match — no fixed pricing, every package is tailored to you.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 gsap-fade-up">
            {[{ id: "AI Website Chatbot", icon: <MessageSquare className="w-6 h-6 mx-auto text-[#2563ff]" /> }, { id: "AI Lead Qualifier", icon: <Users className="w-6 h-6 mx-auto text-[#2563ff]" /> }, { id: "WhatsApp Bot", icon: <MessageCircle className="w-6 h-6 mx-auto text-[#2563ff]" /> }, { id: "Social Media Automation", icon: <BarChart3 className="w-6 h-6 mx-auto text-[#2563ff]" /> }, { id: "Customer Support Bot", icon: <Headphones className="w-6 h-6 mx-auto text-[#2563ff]" /> }, { id: "AI Calling Bot", icon: <Phone className="w-6 h-6 mx-auto text-[#2563ff]" /> }].map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <div key={service.id} onClick={() => handleServiceToggle(service.id)} className={`magnetic cursor-pointer p-8 rounded-[1rem] border transition-all duration-500 flex items-center gap-6 ${isSelected ? 'bg-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-md' : 'bg-[#111111]/80 backdrop-blur-md border-[#333333] hover:border-white/20'}`}>
                  <div className={`w-14 h-14 rounded-md flex items-center justify-center shrink-0 transition-all duration-500 ${isSelected ? 'bg-[#000000] border-white/50 text-white shadow-inner' : 'bg-[#000000] border border-[#333333] text-[#888888]'}`}>{service.icon}</div>
                  <div className="flex-grow"><h3 className={`font-bold font-syne text-xl transition-colors duration-500 ${isSelected ? 'text-white' : 'text-[#bbbbbb]'}`}>{service.id}</h3></div>
                  <div className={`w-7 h-7 rounded-sm border-[1.5px] flex items-center justify-center transition-all duration-500 ${isSelected ? 'border-white bg-[#1a1a1a]' : 'border-[#333333]'}`}>{isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}</div>
                </div>
              );
            })}
          </div>
          <div className="gsap-fade-up max-w-4xl mx-auto bg-[#111111]/80 backdrop-blur-3xl border border-[#333333] p-10 md:p-14 rounded-[1rem] relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div>
                <p className="text-[#888888] font-space-grotesk tracking-widest uppercase text-xs mb-3">Selections</p>
                <div className="flex items-end gap-3"><h3 className="text-5xl sm:text-6xl font-black font-syne text-white tracking-tight">{selectedServices.length} <span className="text-2xl text-[#888888] font-light">{selectedServices.length === 1 ? 'Service' : 'Services'}</span></h3></div>
                <p className="text-sm text-[#888888] mt-4 font-manrope">{selectedServices.length === 0 ? "Select services above to build a custom quote." : "Selected. Ready for a custom quote."}</p>
              </div>
              <Button onClick={handleSelectPackage} disabled={selectedServices.length === 0} className="w-full md:w-auto h-14 px-10">Request Custom Quote</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 px-6 relative z-20 bg-transparent border-y border-[#333333]/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center gsap-fade-up">
            <h2 className="text-5xl md:text-7xl font-black font-syne tracking-tight text-white mb-6">How I <span className="text-[#888888]">Work.</span></h2>
            <p className="text-xl md:text-2xl text-[#bbbbbb] font-light max-w-3xl mx-auto leading-relaxed">A cinematic, done-for-you process from audit to launch.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-12 relative mt-16 gsap-fade-up">
            <div className="hidden md:block absolute top-[36px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#333333] to-transparent"></div>
            {[{ num: "01", title: "Discovery", desc: "Deep dive into your operations to find the highest-ROI automation opportunities." }, { num: "02", title: "Blueprint", desc: "Custom architecture design of the exact AI models and workflows we'll build." }, { num: "03", title: "Development", desc: "I handle 100% of the coding, integrations, and prompt engineering." }, { num: "04", title: "Deployment", desc: "Testing, training, and seamless transition into your daily business." }].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group mt-8 md:mt-0 cursor-default">
                <div className="w-20 h-20 rounded-md bg-[#111111]/80 backdrop-blur-md border border-[#333333] flex items-center justify-center text-3xl font-black font-syne text-[#888888] mb-8 z-10 group-hover:bg-white group-hover:text-[#000000] group-hover:border-white group-hover:scale-110 transition-all duration-500 shadow-2xl rotate-45 group-hover:rotate-0">
                  <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">{step.num}</div>
                </div>
                <h3 className="text-2xl font-bold font-syne text-white mb-4 transition-colors duration-500">{step.title}</h3>
                <p className="text-[#bbbbbb] text-base font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden bg-transparent z-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 relative z-10">
          <div className="gsap-slide-right">
            <h2 className="text-6xl md:text-8xl font-black font-syne tracking-tight text-white mb-6 leading-[1.05]">Ready to <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#888888]">Automate?</span></h2>
            <p className="text-2xl text-[#bbbbbb] mb-16 max-w-lg font-light leading-relaxed">Stop doing manual work. Let&apos;s build an AI that works 24/7 for your business.</p>
            <div className="space-y-6">
              <a href="https://wa.me/918076451049" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 rounded-[1rem] bg-[#111111]/80 backdrop-blur-md border border-[#333333] hover:border-white/30 hover:bg-[#1a1a1a]/90 transition-all duration-500 group magnetic shadow-xl">
                <div className="w-16 h-16 bg-[#000000] border border-[#333333] rounded-md flex items-center justify-center group-hover:bg-white transition-all"><MessageCircle className="w-6 h-6 text-[#2563ff] group-hover:text-[#000000] transition-colors" /></div>
                <div><div className="text-xs font-space-grotesk tracking-widest uppercase text-[#888888] mb-1.5">Fastest response</div><div className="font-bold font-syne text-2xl text-white">+91 8076451049</div></div>
              </a>
              <a href="mailto:yanshul7162005@gmail.com" className="flex items-center gap-6 p-6 rounded-[1rem] bg-[#111111]/80 backdrop-blur-md border border-[#333333] hover:border-white/30 hover:bg-[#1a1a1a]/90 transition-all duration-500 group magnetic shadow-xl">
                <div className="w-16 h-16 bg-[#000000] border border-[#333333] rounded-md flex items-center justify-center group-hover:bg-white transition-all"><Mail className="w-6 h-6 text-[#2563ff] group-hover:text-[#000000] transition-colors" /></div>
                <div><div className="text-xs font-space-grotesk tracking-widest uppercase text-[#888888] mb-1.5">Email directly</div><div className="font-bold font-syne text-2xl text-white md:text-xl lg:text-2xl">yanshul7162005@gmail.com</div></div>
              </a>
            </div>
          </div>
          <div className="gsap-slide-left bg-[#111111]/80 border border-[#333333] rounded-[1.5rem] p-10 md:p-14 relative overflow-hidden backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
            <h3 className="text-3xl font-black font-syne text-white mb-10">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3"><label className="text-xs font-space-grotesk uppercase text-[#888888]">Name</label><input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="magnetic w-full bg-[#000000]/50 border-b border-[#333333] px-3 py-4 focus:outline-none focus:border-white transition-all text-white placeholder:text-[#333333]" placeholder="John Doe" /></div>
                <div className="space-y-3"><label className="text-xs font-space-grotesk uppercase text-[#888888]">Email</label><input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="magnetic w-full bg-[#000000]/50 border-b border-[#333333] px-3 py-4 focus:outline-none focus:border-white transition-all text-white placeholder:text-[#333333]" placeholder="john@company.com" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3"><label className="text-xs font-space-grotesk uppercase text-[#888888]">Company</label><input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="magnetic w-full bg-[#000000]/50 border-b border-[#333333] px-3 py-4 focus:outline-none focus:border-white transition-all text-white placeholder:text-[#333333]" placeholder="Acme Inc." /></div>
                <div className="space-y-3"><label className="text-xs font-space-grotesk uppercase text-[#888888]">WhatsApp</label><input type="tel" required value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="magnetic w-full bg-[#000000]/50 border-b border-[#333333] px-3 py-4 focus:outline-none focus:border-white transition-all text-white placeholder:text-[#333333]" placeholder="+91 9876543210" /></div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-space-grotesk tracking-widest uppercase text-[#888888]">Project Details</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="magnetic w-full bg-[#000000]/50 border-b border-[#333333] px-3 py-4 focus:outline-none focus:border-white transition-all text-white placeholder:text-[#333333] resize-none" placeholder="Tell me about your bottlenecks..."></textarea>
              </div>
              {status.error && <div className="text-[#ffb4ab] text-sm bg-[#93000a]/20 p-4 rounded-md border border-[#93000a]/50">Oops! Something went wrong.</div>}
              {status.success && <div className="text-white text-sm bg-white/10 p-4 rounded-md border border-white/30 flex items-center gap-3"><CheckCircle2 className="w-5 h-5" /> Thank you! I&apos;ll be in touch.</div>}
              <Button disabled={status.submitting} className="w-full h-14 mt-4">
                {status.submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Free Audit"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-transparent z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-3xl font-black font-syne tracking-tighter text-white">Anshul<span className="text-[#888888]">.</span></div>
          <div className="text-sm font-space-grotesk uppercase text-[#888888]">© {new Date().getFullYear()} Anshul. All rights reserved.</div>
        </div>
      </footer>
      </main>
    </div>
  );
}
