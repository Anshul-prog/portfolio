"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { Copy, ArrowRight, CheckCircle2, MessageSquare, Phone, Mail, ChevronRight, MessageCircle, BarChart3, Users, Headphones, MonitorSmartphone, Loader2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check if it's a touch device, hide cursor
    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    const handleHover = () => {
      gsap.to(cursor, { scale: 1.5, backgroundColor: "rgba(37, 99, 255, 0.1)", border: "1px solid #2563ff", duration: 0.2 });
    };

    const handleHoverOut = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "#2563ff", border: "none", duration: 0.2 });
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
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[#2563ff] pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
    />
  );
};

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create floating spheres
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x2563ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const spheres: THREE.Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      );

      const scale = Math.random() * 1.5 + 0.5;
      mesh.scale.set(scale, scale, scale);

      scene.add(mesh);
      spheres.push(mesh);
    }

    camera.position.z = 10;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      spheres.forEach((sphere, i) => {
        sphere.rotation.x += 0.001 * (i % 2 === 0 ? 1 : -1);
        sphere.rotation.y += 0.002 * (i % 3 === 0 ? 1 : -1);
        sphere.position.y += Math.sin(elapsedTime * 0.5 + i) * 0.005;
      });

      // Subtle parallax based on mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    whatsapp: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSelectPackage = () => {
    const servicesList = selectedServices.length === 0 
      ? "" 
      : `I'm interested in: ${selectedServices.join(', ')}`;
      
    setFormData(prev => ({
      ...prev,
      message: servicesList
    }));
    
    // Smooth scroll to contact section
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false });

    try {
      await fetch("https://script.google.com/macros/s/AKfycbx8hzHkA_14EP7afpHEpKv6eC52k-sp8YHGCKcJ6j4tvaEqZTbtUFG7WLC7GrimqYv5/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      setStatus({ submitting: false, success: true, error: false });
      setFormData({ name: '', email: '', company: '', whatsapp: '', message: '' });
      
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false, error: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#020818] text-white selection:bg-[#2563ff] selection:text-white overflow-hidden font-sans">
      <MagneticCursor />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#020818]/60 backdrop-blur-md border-b border-white/5">
        <div className="text-2xl font-bold tracking-tighter">
          Anshul<span className="text-[#2563ff]">.</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <a href="#services" className="hover:text-white transition-colors magnetic">Services</a>
          <a href="#work" className="hover:text-white transition-colors magnetic">Work</a>
          <a href="#process" className="hover:text-white transition-colors magnetic">Process</a>
        </div>
        <a href="#contact" className="magnetic px-6 py-2.5 bg-[#2563ff] hover:bg-[#1a4acc] text-white text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(37,99,255,0.4)]">
          Let&apos;s Talk
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        <ThreeBackground />

        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center mt-10 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[#2563ff] animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">Available for new projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6"
          >
            Your Business On <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563ff] to-cyan-400">Autopilot.</span><br />
            Powered by AI.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
          >
            I build custom AI solutions that automate your most time-consuming tasks, generate leads on autopilot, and scale your operations 24/7.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-20"
          >
            <a href="#services" className="magnetic flex items-center justify-center gap-2 px-8 py-4 bg-[#2563ff] hover:bg-[#1a4acc] rounded-full font-medium transition-all group">
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#process" className="magnetic flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium transition-all">
              How it works
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-[#030c23] relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "AI Systems Built", value: "6+" },
            { label: "Operational", value: "24/7" },
            { label: "Done-for-you", value: "100%" },
            { label: "Manual Work", value: "0" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative z-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[#2563ff]/5 blur-[150px] pointer-events-none rounded-full transform -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Automation <span className="text-[#2563ff]">Arsenal.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl">Custom-built AI agents designed to replace manual processes and maximize efficiency across your entire business.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI Website Chatbot",
                desc: "Turn visitors into customers instantly with an intelligent agent that knows your business inside and out.",
                icon: <MessageSquare className="w-6 h-6 text-[#2563ff]" />,
                img: "chatbot-demo.png.png"
              },
              {
                title: "AI Lead Qualifier",
                desc: "Automatically filter, score, and book high-intent prospects directly into your calendar.",
                icon: <Users className="w-6 h-6 text-[#2563ff]" />,
                img: "qualifier-demo.png.png"
              },
              {
                title: "WhatsApp Bot",
                desc: "Engage customers where they already are with personalized, automated WhatsApp sales flows.",
                icon: <MessageCircle className="w-6 h-6 text-[#2563ff]" />,
                img: "whatsapp-demo.png.png"
              },
              {
                title: "Social Media Automation",
                desc: "Scale your reach with AI systems that create, schedule, and interact across all your social channels.",
                icon: <BarChart3 className="w-6 h-6 text-[#2563ff]" />,
                img: "social-demo.png.png"
              },
              {
                title: "Customer Support Bot",
                desc: "Resolve 80% of support tickets instantly, providing 5-star service around the clock.",
                icon: <Headphones className="w-6 h-6 text-[#2563ff]" />,
                img: "support-demo.png.png"
              },
              {
                title: "AI Calling Bot",
                desc: "Siri on steroids for your sales. Make and receive human-like calls to qualify leads and handle inquiries.",
                icon: <Phone className="w-6 h-6 text-[#2563ff]" />,
                img: "calling-demo.png.jpeg"
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#2563ff]/30 transition-all duration-500 flex flex-col h-full cursor-pointer relative overflow-hidden"
              >
                {/* Browser Mockup Image Area */}
                <div className="w-full h-48 bg-[#0a1530] border-b border-white/5 relative overflow-hidden flex flex-col">
                  {/* Browser Top Bar */}
                  <div className="h-8 bg-[#030c23] w-full flex items-center px-4 gap-2 border-b border-white/5 relative z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                  </div>
                  
                  {/* Image Placeholder */}
                  <div className="flex-grow relative bg-[#020818]/50 flex items-center justify-center">
                    <div className="absolute inset-0 w-full h-full p-2">
                       <img 
                          src={`/images/${service.img}`} 
                          alt={`${service.title} Interface`}
                          className="w-full h-full object-cover rounded shadow-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500 bg-[#0a1530]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                       />
                       {/* Fallback if image not found */}
                       <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-white/20">
                         <MonitorSmartphone className="w-10 h-10 mb-2 opacity-30" />
                         <span className="text-[10px] tracking-wider uppercase font-medium">{service.img}</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow magnetic">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#2563ff]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-12 h-12 rounded-full bg-[#2563ff]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2563ff]/20 transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{service.desc}</p>
                  <div className="flex items-center mt-auto pt-6 text-sm font-medium text-[#2563ff] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <a href="#work" className="flex items-center">
                      Learn more <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Your Package Section */}
      <section id="pricing" className="py-32 px-6 relative z-20 bg-[#020818]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Build Your <span className="text-[#2563ff]">Custom Package.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Choose the services your business needs. Mix and match — no fixed pricing, every package is tailored to you.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { id: "AI Website Chatbot", icon: <MessageSquare className="w-5 h-5 mx-auto" /> },
              { id: "AI Lead Qualifier", icon: <Users className="w-5 h-5 mx-auto" /> },
              { id: "WhatsApp Bot", icon: <MessageCircle className="w-5 h-5 mx-auto" /> },
              { id: "Social Media Automation", icon: <BarChart3 className="w-5 h-5 mx-auto" /> },
              { id: "Customer Support Bot", icon: <Headphones className="w-5 h-5 mx-auto" /> },
              { id: "AI Calling Bot", icon: <Phone className="w-5 h-5 mx-auto" /> }
            ].map((service, i) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleServiceToggle(service.id)}
                  className={`magnetic cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${isSelected ? 'bg-[#2563ff]/10 border-[#2563ff] shadow-[0_0_20px_rgba(37,99,255,0.2)]' : 'bg-white/[0.02] border-white/10 hover:border-white/30'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-[#2563ff] text-white' : 'bg-white/5 text-gray-400'}`}>
                    {service.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className={`font-bold text-lg transition-colors ${isSelected ? 'text-white' : 'text-gray-300'}`}>{service.id}</h3>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-[#2563ff] bg-[#2563ff]' : 'border-white/20'}`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-[#0a1530] to-[#020818] border border-[#2563ff]/30 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(37,99,255,0.1)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563ff]/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div>
                <p className="text-gray-400 font-medium mb-2 uppercase tracking-wide text-sm">Selections</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-4xl sm:text-5xl font-bold tracking-tighter">
                    {selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  {selectedServices.length === 0 ? "Select services above to build a custom package." : "Selected."}
                </p>
              </div>
              
              <button 
                onClick={handleSelectPackage}
                disabled={selectedServices.length === 0}
                className="magnetic w-full md:w-auto px-8 py-5 bg-[#2563ff] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed hover:bg-[#1a4acc] text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(37,99,255,0.3)] hover:shadow-[0_0_30px_rgba(37,99,255,0.5)] transform hover:-translate-y-1 text-lg whitespace-nowrap"
              >
                Request Custom Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Videos Section */}
      <section id="work" className="py-32 px-6 bg-[#030c23] relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">See it in <span className="text-[#2563ff]">Action.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl">Real AI agents performing real tasks. No fluff, just pure functionality.</p>
          </motion.div>

          <div className="space-y-32">
            {[
              {
                title: "Inbound Lead Qualification Flow",
                desc: "Watch how our AI instantly engages a new website visitor, asks qualifying questions, checks available times, and books a high-value meeting without lifting a finger.",
                tags: ["Lead Gen", "Scheduling", "CRM Sync"]
              },
              {
                title: "Voice AI Sales Representative",
                desc: "Listen to a live recording of our Voice AI calling an inbound lead within 5 minutes of form submission, handling objections naturally, and confirming an appointment.",
                tags: ["Voice AI", "Speed to Lead", "Sales"]
              },
              {
                title: "Automated Omni-Channel Support",
                desc: "See one central AI brain simultaneously handle inquiries over WhatsApp, Email, and Website chat, maintaining context and personality across all channels.",
                tags: ["Customer Support", "WhatsApp", "Email Parsing"]
              }
            ].map((demo, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 1 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#0a1530] to-[#020818] rounded-2xl border border-white/10 overflow-hidden relative group magnetic flex items-center justify-center shadow-2xl">
                    <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2563ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>

                    {/* Placeholder for actual video styling */}
                    <div className="absolute top-4 left-4 right-4 flex gap-2 z-20 pointer-events-none">
                      <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                    </div>

                    {/* The Image */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={`/images/demo${i + 1}.png.png`}
                        alt={`${demo.title} Screenshot`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      {/* Fallback pattern if image is missing */}
                      <div className="hidden absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a2b54] to-[#020818] flex flex-col items-center justify-center text-white/20">
                        <MonitorSmartphone className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-sm font-medium tracking-widest uppercase">Image Placeholder</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 1 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 flex flex-col items-start"
                >
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {demo.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium bg-[#2563ff]/10 text-[#2563ff] rounded-full border border-[#2563ff]/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">{demo.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">{demo.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 px-6 relative z-20 bg-[#020818]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">How I <span className="text-[#2563ff]">Work.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">A streamlined, done-for-you process from audit to launch.</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative mt-16">
            {/* Connecting line hidden on mobile */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#2563ff]/50 to-transparent"></div>

            {[
              { num: "01", title: "Discovery", desc: "Deep dive into your operations to find the highest-ROI automation opportunities." },
              { num: "02", title: "Blueprint", desc: "Custom architecture design of the exact AI models and workflows we'll build." },
              { num: "03", title: "Development", desc: "I handle 100% of the coding, integrations, and prompt engineering." },
              { num: "04", title: "Deployment", desc: "Testing, training, and seamless transition into your daily business." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center group mt-8 md:mt-0"
              >
                <div className="w-14 h-14 rounded-full bg-[#020818] border border-[#2563ff] flex items-center justify-center text-xl font-bold mb-6 z-10 group-hover:bg-[#2563ff] group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,255,0.2)]">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#2563ff] transition-colors">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden bg-[#030c23] z-20">
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-[#2563ff]/5 blur-[200px] pointer-events-none rounded-full transform -translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              Ready to <br />
              <span className="text-[#2563ff]">Automate?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-md">
              Stop doing manual work. Let&apos;s build an AI that works 24/7 for your business.
            </p>

            <div className="space-y-6">
              <a href="https://wa.me/918076451049" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2563ff] hover:bg-white/10 transition-all group magnetic">
                <div className="w-12 h-12 bg-[#2563ff]/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2563ff]/20 transition-all">
                  <MessageCircle className="w-5 h-5 text-[#2563ff]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Fastest response</div>
                  <div className="font-semibold text-lg group-hover:text-white transition-colors">+91 8076451049</div>
                </div>
              </a>

              <a href="mailto:yanshul7162005@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2563ff] hover:bg-white/10 transition-all group magnetic">
                <div className="w-12 h-12 bg-[#2563ff]/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2563ff]/20 transition-all">
                  <Mail className="w-5 h-5 text-[#2563ff]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Email directly</div>
                  <div className="font-semibold text-lg group-hover:text-white transition-colors">yanshul7162005@gmail.com</div>
                </div>
              </a>

              <a href="tel:+918076451049" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2563ff] hover:bg-white/10 transition-all group magnetic">
                <div className="w-12 h-12 bg-[#2563ff]/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2563ff]/20 transition-all">
                  <Phone className="w-5 h-5 text-[#2563ff]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Let&apos;s talk</div>
                  <div className="font-semibold text-lg group-hover:text-white transition-colors">+91 8076451049</div>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563ff]/10 blur-[80px] rounded-full pointer-events-none"></div>

            <h3 className="text-2xl font-bold mb-8">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="magnetic w-full bg-[#020818]/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2563ff] focus:ring-1 focus:ring-[#2563ff] transition-all text-white placeholder:text-gray-600" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Email</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="magnetic w-full bg-[#020818]/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2563ff] focus:ring-1 focus:ring-[#2563ff] transition-all text-white placeholder:text-gray-600" placeholder="john@company.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Company Name</label>
                  <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="magnetic w-full bg-[#020818]/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2563ff] focus:ring-1 focus:ring-[#2563ff] transition-all text-white placeholder:text-gray-600" placeholder="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">WhatsApp Number</label>
                  <input type="tel" required value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="magnetic w-full bg-[#020818]/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2563ff] focus:ring-1 focus:ring-[#2563ff] transition-all text-white placeholder:text-gray-600" placeholder="+91 9876543210" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">What are you looking to automate?</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="magnetic w-full bg-[#020818]/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2563ff] focus:ring-1 focus:ring-[#2563ff] transition-all text-white placeholder:text-gray-600 resize-none" placeholder="Tell me about your current bottlenecks..."></textarea>
              </div>
              
              {status.error && (
                <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  Oops! Something went wrong. Please try again or email directly.
                </div>
              )}
              {status.success && (
                <div className="text-green-400 text-sm bg-green-400/10 p-3 rounded-lg border border-green-400/20 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Thank you! I&apos;ll be in touch within 24 hours
                </div>
              )}

              <button disabled={status.submitting} className="magnetic w-full py-4 bg-[#2563ff] hover:bg-[#1a4acc] disabled:opacity-70 disabled:hover:bg-[#2563ff] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,255,0.3)] hover:shadow-[0_0_30px_rgba(37,99,255,0.5)] transform hover:-translate-y-1 disabled:hover:translate-y-0 flex items-center justify-center gap-2">
                {status.submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : "Request Free Audit"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 bg-[#020818] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold tracking-tighter">
            Anshul<span className="text-[#2563ff]">.</span>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Anshul. AI Business Automation. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors magnetic">LinkedIn</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors magnetic">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors magnetic">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
