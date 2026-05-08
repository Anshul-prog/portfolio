"use client";
import { useEffect, useRef, useState, FormEvent } from "react";
import { CheckCircle2, Phone, Mail, MessageCircle, BarChart2, Headphones, MonitorSmartphone, Monitor, Globe, ShoppingCart, Layout, RefreshCw, Loader2, Star, X, Menu, ChevronDown, Zap, Clock, TrendingUp, Shield, Bot, Target, MessageSquare, TrendingDown, Workflow, ShoppingBag, LayoutTemplate } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "./../components/ui/animated-shiny-text";
import { Spotlight } from "./../components/ui/spotlight";
import { Button } from "./../components/ui/button";
import { GlowCard } from "./../components/ui/spotlight-card";
import { BentoGrid, BentoCard } from "./../components/ui/bento-grid";
import { Card3DWrapper } from "./../components/ui/3d-card-wrapper";
import ROISection from "./../components/ROISection";

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger); }

const MagneticCursor = () => {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = r.current; if (!c) return;
    if (window.matchMedia("(pointer: coarse)").matches) { c.style.display = "none"; return; }
    const mv = (e: MouseEvent) => gsap.to(c, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    const ho = () => gsap.to(c, { scale: 1.5, backgroundColor: "rgba(168,85,247,0.1)", border: "1px solid #A855F7", duration: 0.2 });
    const hx = () => gsap.to(c, { scale: 1, backgroundColor: "#fff", border: "none", duration: 0.2 });
    window.addEventListener("mousemove", mv);
    document.querySelectorAll("a,button,input,textarea,select,.magnetic").forEach(el => { el.addEventListener("mouseenter", ho); el.addEventListener("mouseleave", hx); });
    return () => window.removeEventListener("mousemove", mv);
  }, []);
  return <div ref={r} className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2" />;
};

export default function Portfolio() {
  const mainRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", whatsapp: "", service: "", message: "" });
  const [status, setStatus] = useState({ submitting: false, success: false, error: false });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up — sections, headings, card grids
      (gsap.utils.toArray(".gsap-fade-up") as Element[]).forEach(el =>
        gsap.fromTo(el,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        )
      );
      // Slide from left
      (gsap.utils.toArray(".gsap-slide-right") as Element[]).forEach(el =>
        gsap.fromTo(el,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        )
      );
      // Slide from right
      (gsap.utils.toArray(".gsap-slide-left") as Element[]).forEach(el =>
        gsap.fromTo(el,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        )
      );
      // Staggered card grids — each child animates one after another
      (gsap.utils.toArray(".gsap-stagger") as Element[]).forEach(grid => {
        const children = Array.from((grid as HTMLElement).children);
        gsap.fromTo(children,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.1,
            scrollTrigger: { trigger: grid, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false });
    try {
      await fetch("https://script.google.com/macros/s/AKfycbx8hzHkA_14EP7afpHEpKv6eC52k-sp8YHGCKcJ6j4tvaEqZTbtUFG7WLC7GrimqYv5/exec", { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      setStatus({ submitting: false, success: true, error: false });
      setFormData({ name: "", email: "", company: "", whatsapp: "", service: "", message: "" });
      setTimeout(() => setStatus(p => ({ ...p, success: false })), 4000);
    } catch { setStatus({ submitting: false, success: false, error: true }); }
  };

  const navLinks = [{ href: "#ai-automation", label: "Services" }, { href: "#work", label: "Work" }, { href: "#process", label: "Process" }, { href: "#pricing", label: "Pricing" }];

  const aiServices = [
    { title: "AI Website Chatbot", desc: "Turn visitors into customers instantly with an intelligent agent.", icon: <Globe className="w-5 h-5 text-purple-400" /> },
    { title: "AI Lead Qualifier", desc: "Automatically filter and score prospects with zero manual effort.", icon: <CheckCircle2 className="w-5 h-5 text-purple-400" /> },
    { title: "WhatsApp Bot", desc: "Engage customers with automated WhatsApp sales flows.", icon: <MessageCircle className="w-5 h-5 text-purple-400" /> },
    { title: "Social Media Automation", desc: "Scale globally with systems that interact across channels.", icon: <BarChart2 className="w-5 h-5 text-purple-400" /> },
    { title: "Customer Support Bot", desc: "Resolve 80% of support tickets instantly around the clock.", icon: <Headphones className="w-5 h-5 text-purple-400" /> },
    { title: "AI Calling Bot", desc: "Siri on steroids for your sales calls and inbound responses.", icon: <Phone className="w-5 h-5 text-purple-400" /> },
  ];

  const webServices = [
    { title: "Custom Website Design", desc: "Stunning, fast websites built from scratch to match your brand.", icon: <Monitor className="w-5 h-5 text-purple-400" /> },
    { title: "E-Commerce Store", desc: "Online stores with payment integration and product management.", icon: <ShoppingCart className="w-5 h-5 text-purple-400" /> },
    { title: "Landing Page", desc: "High-converting pages to turn visitors into paying customers.", icon: <Layout className="w-5 h-5 text-purple-400" /> },
    { title: "Website Redesign", desc: "Transform your outdated website into a modern online presence.", icon: <RefreshCw className="w-5 h-5 text-purple-400" /> },
  ];

  const pricing = [
    { name: "Starter", price: "$299", monthly: "$49/month", popular: false, includes: ["1 AI agent of your choice", "Integration with your existing tools", "7-day testing & training", "1-week post-launch support"] },
    { name: "Growth Bundle", price: "$799", monthly: "$99/month", popular: true, includes: ["3 AI agents of your choice", "Custom website or landing page", "CRM & calendar integrations", "WhatsApp or voice bot included", "30-day post-launch support"] },
    { name: "Full Stack", price: "$1,299", monthly: "$149/month", popular: false, includes: ["All 6 AI automation services", "Full website or e-commerce store", "Voice AI calling bot", "Omni-channel support system", "60-day dedicated support", "Monthly performance report"] },
  ];

  const testimonials = [
    { quote: "The WhatsApp bot Anshul built for our clinic handles appointment reminders automatically. We've reduced no-shows by 40%.", author: "Dr. Ramesh K.", role: "Clinic Owner, Delhi" },
    { quote: "We were losing leads because we couldn't respond fast enough. The AI qualifier now engages every enquiry in under 60 seconds. Our conversion rate doubled.", author: "Suresh K.", role: "Real Estate Agency, Noida" },
    { quote: "Anshul delivered our full website and AI support bot in under 2 weeks. The chatbot saves us 25 hours of support work every single week.", author: "Priya A.", role: "D2C Brand Founder, Bangalore" },
  ];

  const demos = [
    { title: "Inbound Lead Qualification Flow", desc: "Watch how our AI instantly engages a new website visitor, asks qualifying questions, and books a high-value meeting — without lifting a finger.", tags: ["Lead Gen", "Scheduling", "CRM Sync"], video: "/videos/demo1.mp4" },
    { title: "Voice AI Sales Representative", desc: "Listen to a live recording of our Voice AI calling an inbound lead within 5 minutes of form submission, handling objections naturally.", tags: ["Voice AI", "Speed to Lead", "Sales"], video: "/videos/demo2.mp4" },
    { title: "Automated Omni-Channel Support", desc: "See one central AI brain simultaneously handle inquiries over WhatsApp, Email, and Website chat, maintaining context across all channels.", tags: ["Customer Support", "WhatsApp", "Email"], video: "/videos/demo3.mp4" },
  ];

  const faqs = [
    { q: "What platforms and tools do you work with?", a: "I work with n8n, Make, OpenAI API, WhatsApp Business API, Retell AI for voice bots, and CRMs like HubSpot and GoHighLevel. For websites I use Next.js and Framer." },
    { q: "How long does a typical project take?", a: "Most AI automation projects go live in 7–14 days. Growth Bundle and Full Stack packages typically take 2–3 weeks end-to-end including testing and training." },
    { q: "Do I need technical knowledge to use AI automation?", a: "Not at all. I handle 100% of the setup, integrations, and training. Once delivered, your systems run automatically with a simple handover walkthrough." },
    { q: "What kind of support do you offer after launch?", a: "Every package includes post-launch support: 1 week for Starter, 30 days for Growth Bundle, 60 days for Full Stack. I fix issues and optimize at no extra cost." },
  ];

  const benefits = [
    { icon: <Zap className="w-5 h-5 text-purple-400" />, title: "10× Productivity", desc: "Automate repetitive tasks and free your team to focus on high-value work." },
    { icon: <Clock className="w-5 h-5 text-purple-400" />, title: "24/7 Availability", desc: "AI agents capture leads and serve customers while you sleep." },
    { icon: <TrendingUp className="w-5 h-5 text-purple-400" />, title: "Cost Reduction", desc: "Replace manual processes costing thousands with systems running for cents." },
    { icon: <Shield className="w-5 h-5 text-purple-400" />, title: "Better CX", desc: "Instant responses, consistent quality, and personalized interactions at scale." },
  ];

  const skills = ["n8n / Make", "OpenAI API", "WhatsApp API", "Voice AI", "Web Development", "CRM Integrations", "Prompt Engineering"];
  const trustItems = ["5+ Clients Onboarded", "500+ Hours Automated", "80% Tickets Resolved by AI", "24/7 Operations", "2-Week Delivery", "100% Done-For-You"];
  const CC = "group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.12)] transition-all duration-300";
  const IC = "w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-all duration-300";

  return (
    <div ref={mainRef} className="text-white selection:bg-purple-600 selection:text-white relative min-h-screen bg-[#000]" style={{ overflowX: "hidden", fontFamily: "var(--font-figtree), Figtree, sans-serif" }}>
      <MagneticCursor />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center" style={{ background: "rgba(0,0,0,0.97)", backdropFilter: "blur(16px)" }}>
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white p-2"><X className="w-7 h-7" /></button>
          <nav className="flex flex-col items-center gap-10">
            {navLinks.map(l => <a key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold font-syne uppercase tracking-widest text-white hover:text-purple-400 transition-colors">{l.label}</a>)}
            <button onClick={() => { setMobileMenuOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-4 px-8 py-4 rounded-full bg-[#A855F7] text-white font-bold font-syne text-lg hover:bg-purple-600 transition-colors">Book a Call</button>
          </nav>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-16 py-5 bg-black/60 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-purple-600 flex items-center justify-center text-white font-black text-xs">A</div>
          <span className="text-xl font-bold font-syne tracking-tighter text-white">Anshul<span className="text-[#888]">.</span></span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-space-grotesk tracking-wider uppercase text-[#bbb]">
          {navLinks.map(l => <a key={l.href} href={l.href} className="hover:text-white transition-all magnetic">{l.label}</a>)}
        </div>
        <button className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#A855F7] text-white font-semibold font-syne text-sm hover:bg-purple-600 transition-colors magnetic" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Book a Call</button>
        <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(true)}><Menu className="w-7 h-7" /></button>
      </nav>

      <main className="relative z-10">
        {/* HERO */}
        <section className="w-full min-h-screen relative overflow-hidden flex items-center pt-24 bg-[#000]">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full flex flex-col md:flex-row gap-12 relative z-10 items-center">
            <div className="flex flex-col justify-center w-full md:w-1/2 pt-10 md:pt-0">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-xs font-space-grotesk tracking-widest uppercase mb-6 w-fit">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />Available for new projects
              </div>
              <div className="flex justify-start text-left ml-0 md:-translate-x-4">
                <AnimatedText text="THE LAST HIRE YOU'LL EVER NEED." gradientColors="linear-gradient(90deg,#ffffff,#a855f7,#ffffff)" gradientAnimationDuration={3} textClassName="font-bold text-left text-4xl lg:text-6xl tracking-tight mb-2 uppercase font-syne" className="py-2 justify-start items-start" />
              </div>
              <p className="text-[#bbb] text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">AI agents that qualify leads, handle support, book appointments, and run your marketing — so your team focuses only on what humans do best.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3.5 rounded-full bg-[#A855F7] text-white font-semibold font-syne hover:bg-purple-600 transition-colors magnetic" onClick={() => document.getElementById("ai-automation")?.scrollIntoView({ behavior: "smooth" })}>Explore Services</button>
                <button className="px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold font-syne hover:border-purple-400/50 hover:bg-white/[0.04] transition-colors magnetic" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Let&apos;s Talk</button>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-10">
                {[{ value: "5+", label: "Clients Onboarded" }, { value: "500+", label: "Hours Automated" }, { value: "80%", label: "Support Resolved by AI" }, { value: "24/7", label: "AI Works While You Sleep" }].map((s, i) => (
                  <Card3DWrapper key={i} className="bg-transparent border border-white/[0.08] rounded-xl px-4 py-3">
                    <div className="text-white font-black font-syne text-xl">{s.value}</div>
                    <div className="text-[#888] text-xs font-space-grotesk leading-tight mt-0.5">{s.label}</div>
                  </Card3DWrapper>
                ))}
              </div>
            </div>
            {/* Purple Orb — XTRACT-style atmospheric glow */}
            <div className="h-[40vh] md:h-[70vh] w-full md:w-1/2 relative flex items-center justify-center mt-8 md:mt-0">
              {/* Outermost wide halo */}
              <div className="orb-pulse absolute" style={{ width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 65%)", filter: "blur(40px)" }} />
              {/* Mid atmospheric bloom */}
              <div className="orb-pulse absolute" style={{ width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(193,104,255,0.22) 0%, rgba(140,60,230,0.18) 40%, transparent 70%)", filter: "blur(60px)", animationDelay: "1s" }} />
              {/* Core floating orb — soft, no hard edges */}
              <div className="orb-float absolute" style={{ width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle at 40% 38%, rgba(223,122,254,0.95) 0%, rgba(168,85,247,0.85) 35%, rgba(129,74,200,0.7) 60%, transparent 80%)", filter: "blur(28px)", boxShadow: "0 0 80px 20px rgba(168,85,247,0.25)" }} />
              {/* Bright inner highlight — gives the depth/3D feel */}
              <div className="orb-float absolute" style={{ width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle at 38% 35%, rgba(255,210,255,0.9) 0%, rgba(223,122,254,0.6) 45%, transparent 75%)", filter: "blur(18px)", animationDelay: "0.5s" }} />
              {/* Top-left specular highlight */}
              <div className="absolute" style={{ width: 70, height: 70, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 70%)", filter: "blur(10px)", transform: "translate(-90px, -100px)" }} />
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF MARQUEE */}
        <div className="border-y border-white/[0.06] py-5 overflow-hidden bg-white/[0.015]">
          <div className="animate-marquee">
            {[...trustItems, ...trustItems].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-10 shrink-0">
                <span className="text-purple-400 text-lg">✦</span>
                <span className="text-white/55 text-sm font-space-grotesk tracking-widest uppercase whitespace-nowrap">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI AUTOMATION SERVICES */}
        <section id="ai-automation" className="py-20 md:py-32 px-4 md:px-8 lg:px-16 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-20 text-center gsap-fade-up">
              <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">AI Services</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">Intelligent Agents That <span className="text-[#888]">Work While You Sleep</span></h2>
            </div>
            <BentoGrid className="gsap-fade-up">
              <BentoCard icon={<Target className="w-6 h-6 text-purple-400" />} title="AI Lead Qualifier" description="Automatically filters, scores, and segments leads so your sales team only talks to people ready to buy." bgImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">↗ Save 10hrs/week</span><div className="flex gap-1.5">{["Sales","AI"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard className="md:col-span-2" icon={<MessageSquare className="w-6 h-6 text-purple-400" />} title="WhatsApp Bot" description="Automated flows for sales, appointment reminders, order updates, and re-engagement — on the app your clients use most." bgImage="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">↗ 90% Open Rate</span><div className="flex gap-1.5">{["WhatsApp","Outreach"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard className="md:col-span-2" icon={<Headphones className="w-6 h-6 text-purple-400" />} title="Customer Support Bot" description="Resolves 80% of support tickets instantly with zero human input. Works across chat, email, and WhatsApp." bgImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">↗ Cut Costs 60%</span><div className="flex gap-1.5">{["Support","Automation"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard icon={<Phone className="w-6 h-6 text-purple-400" />} title="AI Calling Bot" description="Calls every inbound lead within 5 minutes of form submission, handles objections, and books appointments automatically." bgImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">↗ 5-min Speed</span><div className="flex gap-1.5">{["Voice AI","Speed"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard className="md:col-span-2" icon={<Workflow className="w-6 h-6 text-purple-400" />} title="AI Automation Workflow" description="End-to-end custom automation pipelines connecting your CRM, email, calendar, and data tools into one seamless intelligent system." bgImage="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">↗ Full Automation</span><div className="flex gap-1.5">{["Workflow","n8n / Make"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
            </BentoGrid>
          </div>
        </section>

        {/* WEB DEVELOPMENT SERVICES */}
        <section id="web-development" className="py-20 md:py-32 px-4 md:px-8 lg:px-16 border-t border-white/[0.06] relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-20 text-center gsap-fade-up">
              <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">Web Development</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">Websites That <span className="text-[#888]">Convert, Not Just Impress</span></h2>
            </div>
            <BentoGrid className="gsap-fade-up">
              <BentoCard className="md:col-span-2" icon={<Globe className="w-6 h-6 text-purple-400" />} title="Custom Website" description="Unique websites built to match your brand identity. Fast loading, SEO-ready, and designed to turn visitors into customers." bgImage="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">↗ Built from Scratch</span><div className="flex gap-1.5">{["Custom","SEO"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard icon={<ShoppingBag className="w-6 h-6 text-purple-400" />} title="E-Commerce Store" description="Full online stores with payment integration, product management, and automated order flows. Shopify, WooCommerce, or custom-built." bgImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">↗ Ready to Sell</span><div className="flex gap-1.5">{["E-Commerce","Payments"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard icon={<LayoutTemplate className="w-6 h-6 text-purple-400" />} title="Landing Page" description="Single-focus pages designed to generate leads or sales. Fast load times and conversion-tested layouts." bgImage="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">↗ Max Conversions</span><div className="flex gap-1.5">{["Landing Page","CRO"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard className="md:col-span-2" icon={<RefreshCw className="w-6 h-6 text-purple-400" />} title="Website Redesign" description="Transform your outdated website into a modern, high-performance digital presence that reflects where your business is today." bgImage="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">↗ Modern &amp; Fast</span><div className="flex gap-1.5">{["Redesign","Performance"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
            </BentoGrid>
          </div>
        </section>


        {/* ABOUT */}
        <section id="about" className="py-20 md:py-32 px-4 md:px-8 lg:px-16 relative z-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center gsap-fade-up">
              <p className="text-xs font-space-grotesk tracking-widest uppercase text-purple-400 mb-4">The Person Behind It</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-syne tracking-tight text-white">Who&apos;s behind <span className="text-[#888]">all this?</span></h2>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black font-syne tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white mt-4">Anshul</h1>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center gsap-fade-up">
              <div className="grid grid-cols-2 gap-4">
                {[{ value: "5+", label: "Clients Onboarded" }, { value: "500+", label: "Hours Automated" }, { value: "2 wks", label: "Avg. Delivery Time" }, { value: "100%", label: "Done-For-You" }].map((s, i) => (
                  <Card3DWrapper key={i} className="bg-transparent border border-white/[0.08] rounded-2xl p-6">
                    <div className="text-3xl font-black font-syne text-purple-400">{s.value}</div>
                    <div className="text-[#888] text-xs font-space-grotesk mt-1">{s.label}</div>
                  </Card3DWrapper>
                ))}
              </div>
              <GlowCard glowColor="purple" customSize={true} className="w-full p-8 md:p-10">
                <p className="text-[#bbb] text-base md:text-lg font-light leading-relaxed mb-8">I&apos;m Anshul — an independent AI automation specialist and web developer based in India, working with businesses globally. I started building because most small businesses are drowning in manual work that AI can handle in seconds. Everything is done-for-you: 100% of the setup, integrations, and training. Most projects go live in <span className="text-white font-semibold">1–2 weeks.</span></p>
                <p className="text-[10px] tracking-widest uppercase text-[#888] mb-4">Skills &amp; Tools</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map(sk => <span key={sk} className="px-3 py-1.5 text-[10px] tracking-widest uppercase bg-white/[0.05] border border-white/[0.10] text-[#bbb] rounded-md">{sk}</span>)}
                </div>
              </GlowCard>

            </div>
          </div>
        </section>

        {/* DEMO / WORK */}
        <section id="work" className="py-20 md:py-32 px-4 md:px-8 lg:px-16 border-t border-white/[0.06] relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 gsap-fade-up">
              <p className="text-xs font-space-grotesk tracking-widest uppercase text-purple-400 mb-4">Live Demos</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-syne tracking-tight text-white mb-4">See it in <span className="text-[#888]">Action.</span></h2>
              <p className="text-base md:text-xl text-[#bbb] font-light max-w-3xl">Real AI agents performing real tasks. No fluff, just pure functionality.</p>
              <p className="text-xs text-[#555] font-space-grotesk mt-3 tracking-wider">← Drag to explore →</p>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory gsap-fade-up" style={{ scrollbarWidth: "none" }}>
              {demos.map((d, i) => (
                <div key={i} className="snap-start shrink-0 w-[85vw] md:w-[480px]">
                  <Card3DWrapper className="bg-transparent border border-white/[0.08] rounded-2xl overflow-hidden hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300">
                    <div className="aspect-[4/3] bg-[#0a0a0a] border-b border-white/[0.06] relative flex items-center justify-center">
                      <video autoPlay muted loop playsInline src={d.video} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 relative z-10 bg-[#0d0d0d]">
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {d.tags.map(t => <span key={t} className="px-3 py-1 text-[10px] font-space-grotesk tracking-widest uppercase bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}
                      </div>
                      <h3 className="text-lg font-bold font-syne text-white mb-2">{d.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{d.desc}</p>
                    </div>
                  </Card3DWrapper>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 border-t border-white/[0.06] relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center gsap-fade-up">
              <p className="text-xs font-space-grotesk tracking-widest uppercase text-purple-400 mb-4">Why Automate</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-syne tracking-tight text-white mb-4">Built to <span className="text-[#888]">Scale With You.</span></h2>
            </div>
            <BentoGrid className="gsap-fade-up">
              <BentoCard className="md:col-span-2" icon={<Zap className="w-6 h-6 text-purple-400" />} title="Increased Productivity" description="Automate repetitive tasks and let your team focus on high-value work that actually moves the needle." bgImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">Always On</span><div className="flex gap-1.5">{["Automation","Efficiency"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard icon={<MessageCircle className="w-6 h-6 text-purple-400" />} title="Better Customer Experience" description="Personalised AI interactions improve response times, engagement, and overall satisfaction." bgImage="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">AI Powered</span><div className="flex gap-1.5">{["CX","Support"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard icon={<Clock className="w-6 h-6 text-purple-400" />} title="24/7 Availability" description="AI-powered systems operate around the clock, ensuring seamless support without any downtime." bgImage="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">Live</span><div className="flex gap-1.5">{["Uptime","Reliability"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard className="md:col-span-2" icon={<TrendingDown className="w-6 h-6 text-purple-400" />} title="Cost Reduction" description="AI automation minimises manual work, cuts operational costs, and optimises resource allocation." bgImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">Saving</span><div className="flex gap-1.5">{["ROI","Costs"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard icon={<BarChart2 className="w-6 h-6 text-purple-400" />} title="Data-Driven Insights" description="Leverage AI to analyse data, identify trends, and make smarter, faster business decisions." bgImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">Analytics</span><div className="flex gap-1.5">{["Data","AI"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
              <BentoCard icon={<TrendingUp className="w-6 h-6 text-purple-400" />} title="Scalability & Growth" description="AI adapts to your needs, letting you scale efficiently without increasing headcount or costs." bgImage="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800" header={<div className="flex items-center justify-between flex-wrap gap-2 mb-2"><span className="text-xs text-green-400 font-semibold">Growing</span><div className="flex gap-1.5">{["Scale","Growth"].map(t=><span key={t} className="px-2 py-0.5 text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md">{t}</span>)}</div></div>} />
            </BentoGrid>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-20 md:py-32 px-4 md:px-8 lg:px-16 border-t border-white/[0.06] relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-20 text-center gsap-fade-up">
              <p className="text-xs font-space-grotesk tracking-widest uppercase text-purple-400 mb-4">Investment</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-syne tracking-tight text-white mb-4">Simple, <span className="text-[#888]">Transparent Pricing.</span></h2>
              <p className="text-base md:text-xl text-[#bbb] font-light max-w-3xl mx-auto">One-time setup + a low monthly retainer. No hidden fees, no surprises.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 gsap-fade-up">
              {pricing.map((card, i) => (
                <div key={i} className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${card.popular ? "bg-white/[0.06] purple-glow-border" : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05] hover:border-purple-500/20"}`}>
                  {card.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#A855F7] text-white text-[10px] font-space-grotesk font-bold tracking-widest uppercase">Most Popular</div>}
                  <div className="mb-6">
                    <h3 className="text-xl font-black font-syne text-white mb-1">{card.name}</h3>
                    <div className="text-3xl md:text-4xl font-black font-syne text-white mt-3">{card.price} <span className="text-base font-normal text-[#888]">one-time</span></div>
                    <div className="text-[#bbb] text-sm mt-1 font-space-grotesk">+ {card.monthly}</div>
                  </div>
                  <ul className="space-y-3 flex-grow mb-8">
                    {card.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-[#bbb] text-sm">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className={`block text-center py-3 px-6 rounded-full font-syne font-bold text-sm tracking-wide transition-all duration-300 ${card.popular ? "bg-[#A855F7] text-white hover:bg-purple-600" : "bg-white/[0.06] text-white border border-white/20 hover:bg-white/[0.10] hover:border-purple-400/40"}`}>Get a Quote</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* À LA CARTE PRICING */}
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 border-t border-white/[0.06] relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-20 text-center gsap-fade-up">
              <p className="text-xs font-space-grotesk tracking-widest uppercase text-purple-400 mb-4">Individual Services</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-syne tracking-tight text-white mb-4">À La Carte <span className="text-[#888]">Pricing</span></h2>
              <p className="text-base md:text-xl text-[#bbb] font-light max-w-3xl mx-auto">Need just one service? Pick exactly what your business needs.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gsap-fade-up">
              {/* AI Services Table */}
              <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
                <div className="px-6 py-4 bg-white/[0.04] border-b border-white/[0.08]">
                  <h3 className="text-lg font-bold font-syne text-white">AI Services</h3>
                </div>
                <div className="px-6 py-3 flex items-center border-b border-white/[0.06] bg-white/[0.02]">
                  <span className="flex-1 text-[10px] font-space-grotesk tracking-widest uppercase text-[#888]">Service</span>
                  <span className="w-32 text-right text-[10px] font-space-grotesk tracking-widest uppercase text-[#888]">One-Time</span>
                  <span className="w-24 text-right text-[10px] font-space-grotesk tracking-widest uppercase text-[#888]">Monthly</span>
                </div>
                {[
                  { service: "AI Website Chatbot", price: "$219 – $369", monthly: "+ $49/mo" },
                  { service: "AI Lead Qualifier", price: "$299 – $519", monthly: "—" },
                  { service: "WhatsApp Bot", price: "$269 – $449", monthly: "—" },
                  { service: "Social Media Automation", price: "$369 – $669", monthly: "—" },
                  { service: "Customer Support Bot", price: "$299 – $599", monthly: "—" },
                  { service: "AI Calling Bot", price: "$519 – $899", monthly: "—" },
                  { service: "AI Automation Workflow", price: "$449 – $749", monthly: "—" },
                ].map((row, i) => (
                  <div key={i} className="px-6 py-4 flex items-center border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors">
                    <div className="flex-1">
                      <span className="text-white text-sm font-semibold">{row.service}</span>
                      <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="block text-purple-400 text-xs mt-1 hover:text-purple-300 transition-colors">Get a Quote →</a>
                    </div>
                    <span className="w-32 text-right text-[#bbb] text-sm font-space-grotesk">{row.price}</span>
                    <span className="w-24 text-right text-[#888] text-sm font-space-grotesk">{row.monthly}</span>
                  </div>
                ))}
              </div>
              {/* Web Services Table */}
              <div className="rounded-2xl border border-white/[0.08] overflow-hidden h-fit">
                <div className="px-6 py-4 bg-white/[0.04] border-b border-white/[0.08]">
                  <h3 className="text-lg font-bold font-syne text-white">Web Services</h3>
                </div>
                <div className="px-6 py-3 flex items-center border-b border-white/[0.06] bg-white/[0.02]">
                  <span className="flex-1 text-[10px] font-space-grotesk tracking-widest uppercase text-[#888]">Service</span>
                  <span className="w-32 text-right text-[10px] font-space-grotesk tracking-widest uppercase text-[#888]">Price</span>
                </div>
                {[
                  { service: "Custom Website", price: "$199 – $499" },
                  { service: "Landing Page", price: "$179 – $369" },
                  { service: "E-Commerce Store", price: "$249 – $599" },
                  { service: "Website Redesign", price: "$99 – $299" },
                ].map((row, i) => (
                  <div key={i} className="px-6 py-4 flex items-center border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors">
                    <div className="flex-1">
                      <span className="text-white text-sm font-semibold">{row.service}</span>
                      <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="block text-purple-400 text-xs mt-1 hover:text-purple-300 transition-colors">Get a Quote →</a>
                    </div>
                    <span className="w-32 text-right text-[#bbb] text-sm font-space-grotesk">{row.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ROI */}
        <ROISection />

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-20 md:py-32 px-4 md:px-8 lg:px-16 border-t border-white/[0.06] relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-20 text-center gsap-fade-up">
              <p className="text-xs font-space-grotesk tracking-widest uppercase text-purple-400 mb-4">Social Proof</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-syne tracking-tight text-white">What clients <span className="text-[#888]">say.</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gsap-fade-up">
              {testimonials.map((t, i) => (
                <GlowCard key={i} glowColor="purple" customSize={true} className="w-full p-6">
                  <div className="flex gap-1 mb-5">{[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                  <p className="text-[#bbb] text-base font-light leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <div className="text-white font-bold text-sm">{t.author}</div>
                    <div className="text-[#888] text-xs mt-0.5">{t.role}</div>
                  </div>
                </GlowCard>
              ))}
            </div>

          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="py-20 md:py-32 px-4 md:px-8 lg:px-16 border-t border-white/[0.06] relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-24 text-center gsap-fade-up">
              <p className="text-xs font-space-grotesk tracking-widest uppercase text-purple-400 mb-4">How It Works</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-syne tracking-tight text-white mb-4">How I <span className="text-[#888]">Work.</span></h2>
              <p className="text-base md:text-xl text-[#bbb] font-light max-w-3xl mx-auto">A done-for-you process from audit to launch — no technical knowledge needed.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6 relative gsap-fade-up">
              <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
              {[{ num: "01", title: "Discovery", desc: "Deep dive into your operations to find the highest-ROI automation opportunities." }, { num: "02", title: "Blueprint", desc: "Custom architecture design of the exact AI models and workflows we'll build." }, { num: "03", title: "Development", desc: "I handle 100% of the coding, integrations, and prompt engineering." }, { num: "04", title: "Deployment", desc: "Testing, training, and seamless transition into your daily business." }].map((step, i) => (
                <GlowCard key={i} glowColor="purple" customSize={true} className="w-full p-8 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#0d0d0d] border border-purple-500/30 flex items-center justify-center text-lg font-black text-purple-400 mb-6 z-10 shadow-[0_0_20px_rgba(168,85,247,0.15)]">{step.num}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-[#bbb] text-sm font-light">{step.desc}</p>
                </GlowCard>
              ))}
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 border-t border-white/[0.06] relative z-20">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center gsap-fade-up">
              <p className="text-xs font-space-grotesk tracking-widest uppercase text-purple-400 mb-4">FAQ</p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-syne tracking-tight text-white">Frequently Asked <span className="text-[#888]">Questions.</span></h2>
            </div>
            <div className="space-y-3 gsap-fade-up">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/[0.08] rounded-2xl overflow-hidden bg-white/[0.02] hover:border-purple-500/20 transition-all duration-300">
                  <button className="w-full flex items-center justify-between p-6 text-left magnetic" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-white font-semibold font-syne text-base md:text-lg pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="text-[#bbb] text-sm md:text-base font-light leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 relative z-20">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-purple-500/20 gsap-fade-up" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.25), rgba(109,40,217,0.12) 50%, transparent 80%), #0a0a0a" }}>
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="relative z-10 text-center py-20 px-8 md:px-16">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-syne text-white mb-6 leading-tight">Let AI do the Work so<br/>you can <span className="text-purple-400">Scale Faster</span></h2>
                <p className="text-[#bbb] text-lg md:text-xl font-light mb-10 max-w-xl mx-auto">Book a strategy call today and start automating your business in under 2 weeks.</p>
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#A855F7] text-white font-bold font-syne text-base hover:bg-purple-600 transition-colors magnetic shadow-[0_0_40px_rgba(168,85,247,0.4)]" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Book a Free Call ↗</button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 md:py-32 px-4 md:px-8 lg:px-16 border-t border-white/[0.06] relative z-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20">
            <div className="gsap-slide-right">
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black font-syne tracking-tight text-white mb-6 leading-[1.05]">Ready to<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">Automate?</span></h2>
              <p className="text-lg md:text-2xl text-[#bbb] mb-10 max-w-lg font-light leading-relaxed">Stop doing manual work. Let&apos;s build an AI that works 24/7 for your business.</p>
              <div className="space-y-4">
                <a href="https://wa.me/918076451049" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-5 rounded-2xl bg-[#0d0d0d] border border-white/[0.08] hover:border-purple-500/30 hover:shadow-[0_0_24px_rgba(168,85,247,0.1)] transition-all duration-300 group magnetic">
                  <div className="w-14 h-14 bg-black border border-white/[0.08] rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-all"><MessageCircle className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors" /></div>
                  <div><div className="text-xs font-space-grotesk tracking-widest uppercase text-[#888] mb-1">Fastest response</div><div className="font-bold font-syne text-xl text-white">+91 8076451049</div></div>
                </a>
                <a href="mailto:anshul.myai@gmail.com" className="flex items-center gap-5 p-5 rounded-2xl bg-[#0d0d0d] border border-white/[0.08] hover:border-purple-500/30 hover:shadow-[0_0_24px_rgba(168,85,247,0.1)] transition-all duration-300 group magnetic overflow-hidden">
                  <div className="w-14 h-14 shrink-0 bg-black border border-white/[0.08] rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-all"><Mail className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors" /></div>
                  <div className="truncate"><div className="text-xs font-space-grotesk tracking-widest uppercase text-[#888] mb-1">Email directly</div><div className="font-bold font-syne text-lg text-white truncate">anshul.myai@gmail.com</div></div>
                </a>
              </div>
            </div>
            <div className="gsap-slide-left bg-[#0d0d0d] border border-white/[0.08] rounded-2xl p-6 md:p-10 backdrop-blur-2xl">
              <h3 className="text-2xl md:text-3xl font-black font-syne text-white mb-8">Send an Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-[10px] font-space-grotesk uppercase text-[#888]">Name</label><input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="magnetic w-full bg-black/50 border-b border-white/[0.12] px-3 py-3 focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-[#333]" placeholder="John Doe" /></div>
                  <div className="space-y-2"><label className="text-[10px] font-space-grotesk uppercase text-[#888]">Email</label><input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="magnetic w-full bg-black/50 border-b border-white/[0.12] px-3 py-3 focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-[#333]" placeholder="john@company.com" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-[10px] font-space-grotesk uppercase text-[#888]">Company</label><input type="text" required value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="magnetic w-full bg-black/50 border-b border-white/[0.12] px-3 py-3 focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-[#333]" placeholder="Acme Inc." /></div>
                  <div className="space-y-2"><label className="text-[10px] font-space-grotesk uppercase text-[#888]">WhatsApp</label><input type="tel" required value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} className="magnetic w-full bg-black/50 border-b border-white/[0.12] px-3 py-3 focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-[#333]" placeholder="+91 9876543210" /></div>
                </div>
                <div className="space-y-2"><label className="text-[10px] font-space-grotesk uppercase text-[#888]">What do you need?</label>
                  <select required value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} className="magnetic w-full bg-black/80 border-b border-white/[0.12] px-3 py-3 focus:outline-none focus:border-purple-500 transition-all text-white appearance-none cursor-pointer" style={{ colorScheme: "dark" }}>
                    <option value="" disabled className="bg-[#111] text-[#888]">Select a service…</option>
                    {["AI Website Chatbot","AI Lead Qualifier","WhatsApp Bot","Customer Support Bot","AI Calling Bot","Social Media Automation","Custom Website / Landing Page","Growth Bundle","Full Stack Package","Not sure — need advice"].map(o => <option key={o} value={o} className="bg-[#111] text-white">{o}</option>)}
                  </select>
                </div>
                <div className="space-y-2"><label className="text-[10px] font-space-grotesk uppercase text-[#888]">Tell me about your business</label><textarea required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="magnetic w-full bg-black/50 border-b border-white/[0.12] px-3 py-3 focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-[#333] resize-none" placeholder="What does your business do and what's your biggest bottleneck?" /></div>
                {status.error && <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">Oops! Something went wrong. Please try again.</div>}
                {status.success && <div className="text-white text-sm bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 flex items-center gap-3"><CheckCircle2 className="w-5 h-5 shrink-0 text-purple-400" />Sent! I&apos;ll be in touch within 24 hours.</div>}
                <button disabled={status.submitting} className="w-full h-13 py-4 rounded-full bg-[#A855F7] text-white font-bold font-syne hover:bg-purple-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-4">
                  {status.submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Free Audit"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/[0.06] py-12 md:py-16 px-4 md:px-8 lg:px-16 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-md bg-purple-600 flex items-center justify-center text-white font-black text-xs">A</div>
                  <span className="text-2xl font-black font-syne tracking-tighter text-white">Anshul<span className="text-[#888]">.</span></span>
                </div>
                <p className="text-[#666] text-sm font-space-grotesk max-w-xs leading-relaxed">AI Automation &amp; Website Development. Two powerful services. One expert.</p>
              </div>
              <div>
                <p className="text-[10px] font-space-grotesk tracking-widest uppercase text-[#555] mb-5">Services</p>
                <div className="space-y-3">
                  {["AI Website Chatbot","WhatsApp Bot","AI Calling Bot","Custom Website","E-Commerce Store"].map(s => <a key={s} href="#ai-automation" className="block text-[#888] text-sm hover:text-purple-400 transition-colors font-space-grotesk">{s}</a>)}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-space-grotesk tracking-widest uppercase text-[#555] mb-5">Quick Links</p>
                <div className="space-y-3">
                  {[{ label: "Work", href: "#work" }, { label: "Process", href: "#process" }, { label: "Pricing", href: "#pricing" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }].map(l => <a key={l.label} href={l.href} className="block text-[#888] text-sm hover:text-purple-400 transition-colors font-space-grotesk">{l.label}</a>)}
                </div>
              </div>
            </div>
            <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#555] text-xs font-space-grotesk uppercase tracking-widest">© {new Date().getFullYear()} Anshul. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="https://wa.me/918076451049" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-purple-400 transition-colors text-xs font-space-grotesk tracking-widest uppercase">WhatsApp</a>
                <a href="mailto:anshul.myai@gmail.com" className="text-[#555] hover:text-purple-400 transition-colors text-xs font-space-grotesk tracking-widest uppercase">Email</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

