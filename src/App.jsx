import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';
import { 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiExternalLink, 
  FiBriefcase, 
  FiBookOpen, 
  FiCode, 
  FiDatabase, 
  FiServer, 
  FiArrowRight, 
  FiFileText,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

// --- DATA ---
const metrics = [
  { value: 250, suffix: '+', label: 'DSA Problems', tag: 'LeetCode practice', color: 'from-blue-500 to-cyan-400' },
  { value: 4, suffix: '+', label: 'Major Projects', tag: 'Full stack development', color: 'from-purple-500 to-pink-500' },
  { value: 4, suffix: '', label: 'Certifications', tag: 'Continuous learning', color: 'from-emerald-400 to-cyan-500' },
  { value: 8.35, suffix: '', label: 'B.Tech CGPA', tag: 'Academic record', color: 'from-amber-400 to-orange-500', decimals: 2 }
];

const projects = [
  {
    id: 1,
    title: 'NoteVault Pro',
    tag: 'Secure Cloud Note-Taking Platform',
    features: [
      'Secure authentication and encrypted data storage for personal notes',
      'Rich text editing with real-time cloud synchronization across devices',
      'Intuitive organization with folders, tags, and powerful search capabilities'
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/ps01091977-creator/notevaultpro3.o.git',
    demo: 'https://notevaultpro3-o.vercel.app'
  },
  {
    id: 2,
    title: 'NOVACARE',
    tag: 'Healthcare Management Platform',
    features: [
      'Comprehensive patient health records & history management',
      'Real-time remote consultation through secure video calls',
      'Automated medical appointment scheduling with notification alerts'
    ],
    tech: ['MERN Stack', 'Redux', 'Tailwind CSS', 'Socket.io', 'WebRTC'],
    github: 'https://github.com/PS_06',
    demo: 'https://github.com/PS_06'
  }
];

const skills = [
  { category: 'Frontend', icon: <FiCode />, items: ['React.js', 'Next.js', 'Tailwind CSS', 'Redux Toolkit'] },
  { category: 'Backend', icon: <FiServer />, items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io'] },
  { category: 'Database', icon: <FiDatabase />, items: ['MongoDB', 'PostgreSQL'] },
  { category: 'Languages', icon: <FiFileText />, items: ['C++', 'JavaScript', 'Python'] },
];

const goals = [
  { icon: '⚛️', title: 'Next.js 15 & SSR', desc: 'Mastering server-side rendering, routing strategies, and speed optimization.' },
  { icon: '🌩️', title: 'Advanced Cloud Deployments', desc: 'Deploying server configurations and microservices using AWS services and Docker.' },
  { icon: '🤖', title: 'Generative AI Workflows', desc: 'Integrating machine learning and intelligence layers into modern web platforms.' },
  { icon: '🧩', title: 'Competitive Programming', desc: 'Solving advanced algorithm structures and graph trees daily on LeetCode.' }
];

const certifications = [
  { id: 1, title: 'Hackdata 2026', org: 'Shiv Nadar University', link: 'https://drive.google.com/file/d/1T3966ITV442lnZsU8RtNTSt5OBAHvmc2/view' },
  { id: 2, title: 'MERN Full Stack', org: 'Udemy / Coursera', link: 'https://drive.google.com/file/d/11l7x9DQduy_A0QlhoExH67csJu7oU2Ly/view' },
  { id: 3, title: 'Python for Data Science', org: 'IBM', link: 'https://drive.google.com/file/d/1g66m7bvY9TnAVMIZJZG2qYv_ZkQ8c2eF/view' },
  { id: 4, title: 'Gen AI with AWS', org: 'AWS Training', link: 'https://drive.google.com/file/d/1fWtvpX8ABs6GEMzDI1b4o4r_gPRG9xWr/view' }
];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: null, text: '' });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, text: '' });
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'Please fill out all fields.' });
      return;
    }

    setIsSending(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setFormData({ name: '', email: '', message: '' });
        setStatus({ type: 'success', text: 'Message sent successfully!' });
      } else {
        setStatus({ type: 'error', text: data.message || 'Failed to send message.' });
      }
    } catch (error) {
      setStatus({ type: 'error', text: 'Server is unreachable. Please email directly.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative min-h-screen font-inter selection:bg-electric selection:text-white">
      {/* Background Elements */}
      <div className="bg-noise"></div>
      <div className="gradient-mesh"></div>
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-navy-900/50 to-navy-900/80 z-[-1]"></div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-cyan flex items-center justify-center font-syne font-bold text-white text-xl shadow-lg shadow-electric/20 group-hover:shadow-electric/40 transition-all">
              P
            </div>
            <span className="font-syne font-semibold text-lg text-white">
              priyanshu<span className="text-cyan">.dev</span>
            </span>
          </a>
          
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {['home', 'about', 'skills', 'works', 'contact'].map((item) => (
              <li key={item}>
                <a href={`#${item}`} className="hover:text-cyan transition-colors capitalize">{item}</a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center">
            <a href="#contact" className="glass px-5 py-2.5 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/20">
              Let's Talk
            </a>
          </div>

          <button className="md:hidden text-white text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-navy-900 border-t border-white/5 py-4 px-6 flex flex-col gap-4 shadow-2xl z-50">
            {['home', 'about', 'skills', 'works', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setMobileMenuOpen(false)} className="text-slate-300 font-medium capitalize py-2 border-b border-white/5 hover:text-cyan transition-colors">
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center pt-20 pb-16">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden" animate="visible" variants={staggerContainer}
                className="flex flex-col items-start"
              >
                <motion.div variants={fadeInUp} className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 text-sm font-medium text-cyan mb-8">
                  <span className="animate-pulse">✨</span> Welcome to my digital space
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-syne font-bold text-white leading-tight mb-4">
                  Priyanshu <br/>
                  <span className="gradient-text">Shakya.</span>
                </motion.h1>

                <motion.div variants={fadeInUp} className="text-xl lg:text-2xl font-syne text-slate-300 mb-6 h-10">
                  <span className="text-electric mr-2">&gt;</span>
                  <TypeAnimation
                    sequence={[
                      'Software Engineer', 1500,
                      'MERN Developer', 1500,
                      'DSA Enthusiast (250+)', 1500,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-center gap-2 text-slate-400 mb-8">
                  <FiMapPin className="text-cyan" /> Based in Ghaziabad, India
                </motion.div>

                <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-lg mb-10 leading-relaxed">
                  I am a dedicated Software Engineer specializing in full stack MERN systems and algorithm design. I translate complex code logic into intuitive, visually-refined user experiences.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                  <a href="#projects" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric to-cyan text-white font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2 group">
                    <FiCode className="group-hover:rotate-12 transition-transform" /> View Works
                  </a>
                  <a href="https://drive.google.com/drive/u/0/folders/1n9BTyEPDuXLFlFRkZNldtz-2xdvM-ZTn" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-xl glass border border-electric/30 text-electric font-medium hover:bg-electric/10 transition-all flex items-center gap-2 group">
                    <FiFileText className="group-hover:-translate-y-1 transition-transform" /> My Resume
                  </a>
                  <a href="#contact" className="px-8 py-3.5 rounded-xl glass border border-white/10 text-white font-medium hover:bg-white/5 transition-all flex items-center gap-2 group">
                    Get in Touch <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative w-full max-w-lg mx-auto animate-float">
                  {/* Decorative Elements */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-electric to-cyan rounded-2xl blur opacity-30 animate-pulse"></div>
                  
                  {/* Glass Code Editor Window */}
                  <div className="relative glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* Editor Header */}
                    <div className="flex items-center px-4 py-3 border-b border-white/5 bg-black/40">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="mx-auto text-xs font-mono text-slate-400">developer.js</div>
                    </div>
                    {/* Editor Body */}
                    <div className="p-6 font-mono text-sm sm:text-base text-slate-300 leading-relaxed overflow-x-auto">
                      <p><span className="text-pink-500">const</span> <span className="text-blue-400">engineer</span> <span className="text-pink-500">=</span> <span className="text-yellow-300">{`{`}</span></p>
                      <p className="ml-4">name: <span className="text-green-400">'Priyanshu Shakya'</span>,</p>
                      <p className="ml-4">skills: [<span className="text-green-400">'MERN'</span>, <span className="text-green-400">'Data Structures'</span>],</p>
                      <p className="ml-4">leetCodeSolved: <span className="text-orange-400">250+</span>,</p>
                      <p className="ml-4">passion: <span className="text-cyan">()</span> <span className="text-pink-500">=&gt;</span> <span className="text-green-400">'Building Scalable Systems'</span></p>
                      <p><span className="text-yellow-300">{`}`}</span>;</p>
                      <br/>
                      <p><span className="text-blue-400">engineer</span>.<span className="text-cyan">startCoding</span>();</p>
                    </div>
                  </div>
                  
                  {/* Floating Badges */}
                  <div className="absolute -top-6 -right-6 p-4 rounded-xl glass border border-white/10 text-electric text-3xl shadow-xl shadow-electric/20 animate-bounce" style={{ animationDuration: '3s' }}><FiCode /></div>
                  <div className="absolute -bottom-8 -left-8 p-4 rounded-xl glass border border-white/10 text-cyan text-3xl shadow-xl shadow-cyan/20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}><FiServer /></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="py-12 border-y border-white/5 bg-black/20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((m, i) => (
                <motion.div 
                  key={i} 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                  className="glass p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors relative overflow-hidden"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${m.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                  <h3 className={`text-4xl md:text-5xl font-syne font-bold mb-2 bg-gradient-to-r ${m.color} text-transparent bg-clip-text`}>
                    {m.value}{m.suffix}
                  </h3>
                  <div className="font-medium text-white mb-1">{m.label}</div>
                  <div className="text-xs text-slate-400">{m.tag}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-6">Behind the <span className="gradient-text">Code</span></h2>
              <p className="text-xl md:text-2xl font-syne italic text-slate-300 leading-relaxed">
                "Striving to build technology that is not just highly functional, but beautifully crafted inside and out."
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-electric to-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center text-electric text-xl border border-electric/20">
                    <FiBriefcase />
                  </div>
                  <h3 className="text-2xl font-syne font-semibold text-white">Career Objective</h3>
                </div>
                <p className="text-slate-400 leading-relaxed text-lg">
                  Currently pursuing a B.Tech in Computer Science and Engineering (AI/ML) at <span className="text-cyan font-medium">IMS Engineering College (2023–2027)</span>. I am seeking a challenging software engineer internship where I can apply my MERN stack skills and strong data structure foundations to build real-world systems and collaborate on high-impact digital solutions.
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl border border-purple-500/20">
                    <FiBookOpen />
                  </div>
                  <h3 className="text-2xl font-syne font-semibold text-white">Education</h3>
                </div>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[7px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border-4 border-navy-900 bg-purple-400 absolute left-0 md:left-1/2 -translate-x-1/2 z-10 shadow-[0_0_10px_#a855f7]"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] ml-8 md:ml-0 glass p-5 rounded-xl border border-white/5">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-syne font-bold text-white text-lg">B.Tech CSE (AI/ML)</h4>
                        <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/20">8.35 CGPA</span>
                      </div>
                      <p className="text-slate-400 text-sm">IMS Engineering College</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border-4 border-navy-900 bg-slate-500 absolute left-0 md:left-1/2 -translate-x-1/2 z-10"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] ml-8 md:ml-0 glass p-5 rounded-xl border border-white/5">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-syne font-bold text-white text-lg">Class XII</h4>
                        <span className="px-2 py-1 rounded-md bg-white/5 text-slate-300 text-xs font-bold border border-white/10">92%</span>
                      </div>
                      <p className="text-slate-400 text-sm">SRSVM School</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 bg-black/20">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-4">Technical <span className="gradient-text">Arsenal</span></h2>
              <p className="text-slate-400 text-lg">Tools and technologies I use to build scalable applications.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((category, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                  className="glass p-6 rounded-3xl border border-white/5 hover:border-cyan/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan text-lg border border-cyan/20 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-syne font-semibold text-white text-xl">{category.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-sm hover:bg-cyan/10 hover:text-cyan hover:border-cyan/20 transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-4">Featured <span className="gradient-text">Works</span></h2>
              <p className="text-slate-400 text-lg">Real-world projects demonstrating my expertise in the MERN stack.</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((proj) => (
                <motion.div 
                  key={proj.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                  className="group relative glass rounded-3xl overflow-hidden border border-white/10 hover:border-electric/50 transition-all duration-500"
                >
                  {/* Project Graphic Placeholder / Overlay */}
                  <div className="h-48 w-full bg-gradient-to-br from-navy-800 to-black relative overflow-hidden border-b border-white/5">
                     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-electric to-transparent"></div>
                     <div className="absolute bottom-4 left-6 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs font-medium text-cyan uppercase tracking-wider">
                       {proj.tag}
                     </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-syne font-bold text-white mb-4 group-hover:text-electric transition-colors">{proj.title}</h3>
                    
                    <ul className="space-y-2 mb-6">
                      {proj.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                          <FiCheckCircle className="text-electric mt-1 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {proj.tech.map((t, i) => (
                        <span key={i} className="text-xs font-medium text-slate-300 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <a href={proj.github} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-3 rounded-xl glass border border-white/10 hover:bg-white/10 text-white font-medium transition-all">
                        <FiGithub /> Source
                      </a>
                      <a href={proj.demo} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-3 rounded-xl bg-electric/10 border border-electric/30 text-electric hover:bg-electric/20 font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        Preview <FiExternalLink />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS (Carousel Style) */}
        <section className="py-24 bg-black/20 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-4">Certifications</h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {certifications.map((cert) => (
                <motion.a 
                  key={cert.id}
                  href={cert.link} target="_blank" rel="noreferrer"
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                  className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 hover:border-cyan/40 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan/0 via-cyan/0 to-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan text-xl border border-cyan/20 mb-4">
                    <FiFileText />
                  </div>
                  <h3 className="font-syne font-bold text-white text-lg mb-1">{cert.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{cert.org}</p>
                  <div className="text-cyan text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Certificate <FiArrowRight />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-5 gap-12">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:col-span-2">
                <h2 className="text-3xl md:text-5xl font-syne font-bold text-white mb-6">Let's <span className="gradient-text">Connect</span></h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  I'm currently available for internships and open to exciting software engineering opportunities. Send me a message and let's build something amazing together.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: <FiMail />, label: 'Email Me', value: 'ps01091977@gmail.com', href: 'mailto:ps01091977@gmail.com' },
                    { icon: <FiPhone />, label: 'Call Me', value: '+91 9876543210', href: 'tel:+919876543210' },
                    { icon: <FiLinkedin />, label: 'LinkedIn', value: 'Priyanshu Shakya', href: 'https://linkedin.com/in/priyanshu-shakya-304b07292' },
                    { icon: <FiGithub />, label: 'GitHub', value: 'PS_06', href: 'https://github.com/PS_06' },
                  ].map((item, i) => (
                    <a key={i} href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl glass border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white text-xl border border-white/10 group-hover:scale-110 group-hover:bg-electric/20 group-hover:text-electric transition-all">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-0.5">{item.label}</div>
                        <div className="text-slate-200 font-medium group-hover:text-white transition-colors">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:col-span-3">
                <form onSubmit={handleContactSubmit} className="glass p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-electric/20 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <input 
                          type="text" id="name"
                          className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:border-electric focus:ring-1 focus:ring-electric transition-all peer" 
                          placeholder="Name"
                          value={formData.name} onChange={(e) => handleInputChange(e, 'name')}
                          disabled={isSending} required 
                        />
                        <label htmlFor="name" className="absolute left-5 -top-2.5 bg-navy-900 px-2 text-xs font-semibold text-electric transition-all peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-electric peer-focus:bg-navy-900 rounded-md">Your Name</label>
                      </div>
                      <div className="relative group">
                        <input 
                          type="email" id="email"
                          className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:border-electric focus:ring-1 focus:ring-electric transition-all peer" 
                          placeholder="Email"
                          value={formData.email} onChange={(e) => handleInputChange(e, 'email')}
                          disabled={isSending} required 
                        />
                        <label htmlFor="email" className="absolute left-5 -top-2.5 bg-navy-900 px-2 text-xs font-semibold text-electric transition-all peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-electric peer-focus:bg-navy-900 rounded-md">Your Email</label>
                      </div>
                    </div>

                    <div className="relative group">
                      <textarea 
                        id="message" rows="5"
                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-transparent focus:border-electric focus:ring-1 focus:ring-electric transition-all peer resize-none" 
                        placeholder="Message"
                        value={formData.message} onChange={(e) => handleInputChange(e, 'message')}
                        disabled={isSending} required
                      ></textarea>
                      <label htmlFor="message" className="absolute left-5 -top-2.5 bg-navy-900 px-2 text-xs font-semibold text-electric transition-all peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-electric peer-focus:bg-navy-900 rounded-md">Your Message</label>
                    </div>

                    {status.text && (
                      <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold border ${status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                        {status.type === 'success' ? <FiCheckCircle className="text-lg" /> : <FiAlertCircle className="text-lg" />}
                        {status.text}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-electric to-cyan text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isSending ? (
                        <><FiLoader className="animate-spin text-xl" /> Transmitting...</>
                      ) : (
                        <>Launch Message <FiSend className="group-hover:-mt-1 group-hover:ml-1 transition-all" /></>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 border-t border-white/5 text-center">
          <div className="container mx-auto px-6">
            <p className="text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Priyanshu Shakya. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
