import React, { useState, useEffect } from 'react';
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
  FiLoader
} from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

// Statistics Metrics
const metrics = [
  { value: '250+', label: 'DSA Problems', tag: 'LeetCode practice' },
  { value: '4+', label: 'Major Projects', tag: 'Full stack development' },
  { value: '4', label: 'Certifications', tag: 'Continuous learning' },
  { value: '8.35', label: 'B.Tech CGPA', tag: 'Academic record' }
];

// Featured Projects
const projects = [
  {
    id: 1,
    title: 'Chatbot for College ERP',
    tag: 'AI Conversational Agent',
    features: [
      'Seamless navigation of college resources and administrative portals',
      'Real-time schedule checking & instant automated query resolution',
      'Intelligent natural language processing (NLP) for fluid conversation flows'
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'NLP'],
    github: 'https://github.com/PS_06',
    demo: 'https://github.com/PS_06'
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

// Skills organized dynamically
const skills = [
  { name: 'React.js & MERN Stack', value: 85 },
  { name: 'C++ & Data Structures', value: 80 },
  { name: 'JavaScript & Python', value: 75 },
  { name: 'MongoDB & PostgreSQL', value: 70 },
  { name: 'Next.js & Redux Toolkit', value: 65 },
  { name: 'REST APIs & Node.js', value: 80 }
];

// Learning Goals
const goals = [
  { icon: '⚛️', title: 'Next.js 15 & SSR', desc: 'Mastering server-side rendering, routing strategies, and speed optimization.' },
  { icon: '🌩️', title: 'Advanced Cloud Deployments', desc: 'Deploying server configurations and microservices using AWS services and Docker.' },
  { icon: '🤖', title: 'Generative AI Workflows', desc: 'Integrating machine learning and intelligence layers into modern web platforms.' },
  { icon: '🧩', title: 'Competitive Programming', desc: 'Solving advanced algorithm structures and graph trees daily on LeetCode.' }
];

// Certifications
const certifications = [
  { id: 1, title: 'Hackdata 2026', org: 'Shiv Nadar University', link: 'https://drive.google.com/file/d/1T3966ITV442lnZsU8RtNTSt5OBAHvmc2/view' },
  { id: 2, title: 'MERN Full Stack', org: 'Udemy / Coursera', link: 'https://drive.google.com/file/d/11l7x9DQduy_A0QlhoExH67csJu7oU2Ly/view' },
  { id: 3, title: 'Python for Data Science', org: 'IBM', link: 'https://drive.google.com/file/d/1g66m7bvY9TnAVMIZJZG2qYv_ZkQ8c2eF/view' },
  { id: 4, title: 'Gen AI with AWS', org: 'AWS Training', link: 'https://drive.google.com/file/d/1fWtvpX8ABs6GEMzDI1b4o4r_gPRG9xWr/view' }
];

// Typewriter component
const Typewriter = () => {
  const roles = [
    "Software Engineer & MERN Developer.",
    "DSA Enthusiast (250+ LeetCode Solved).",
    "IMS Engineering College B.Tech Student."
  ];

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const handleType = () => {
      const idx = loopNum % roles.length;
      const fullText = roles[idx];

      if (!isDeleting) {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(90);
        if (text === fullText) {
          setTypingSpeed(1800); // Hold role
          setIsDeleting(true);
        }
      } else {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(40);
        if (text === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(300);
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span>
      {text}
      <span className="cursor"></span>
    </span>
  );
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: null, text: '' });

  // Scroll reveal setup
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Animate skill bars
    const barsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.pct + '%';
          });
          barsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const barsGrid = document.getElementById('bars-grid');
    if (barsGrid) barsObserver.observe(barsGrid);

    // Animate goal progress fills
    const goalsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.goal-fill').forEach(fill => {
            fill.style.width = '75%';
          });
          goalsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const goalsSection = document.getElementById('goals-grid-section');
    if (goalsSection) goalsObserver.observe(goalsSection);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, text: '' });

    const { name, email, message } = formData;

    // 1. Client-side input validation
    if (!name.trim()) {
      setStatus({ type: 'error', text: 'Please enter your name.' });
      return;
    }
    if (!email.trim()) {
      setStatus({ type: 'error', text: 'Please enter your email address.' });
      return;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    
    if (!message.trim()) {
      setStatus({ type: 'error', text: 'Please write a message before sending.' });
      return;
    }

    // 2. Perform API post transmission
    setIsSending(true);
    try {
      // Backend URL read from environment or fallback locally
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success and form reset
        setFormData({ name: '', email: '', message: '' });
        setStatus({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
      } else {
        // Error payload returned by server (e.g. Rate limit or Validation fail)
        setStatus({ type: 'error', text: data.message || 'Failed to send message.' });
      }
    } catch (error) {
      console.error('Contact transmission error:', error);
      setStatus({ type: 'error', text: 'Server is currently unreachable. Please try again later or email directly.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="ambient-bg"></div>
      <div className="ambient-noise"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      {/* Floating Pill Navbar */}
      <nav className="navbar">
        <a href="#home" className="nav-brand">
          <div className="brand-icon">P</div>
          <span className="brand-name">priyanshu<span>.dev</span></span>
        </a>
        
        <ul className="nav-menu">
          <li><a href="#home" className="nav-link">home</a></li>
          <li><a href="#about" className="nav-link">about</a></li>
          <li><a href="#skills" className="nav-link">skills</a></li>
          <li><a href="#projects" className="nav-link">works</a></li>
          <li><a href="#contact" className="nav-link">contact</a></li>
        </ul>
        
        <a href="#contact" className="btn-pill nav-cta">Get in Touch</a>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container hero-grid">
          <div className="hero-content reveal">
            <div className="section-tag">
              <span>✨</span> INTRODUCTION
            </div>
            
            <div className="hero-title-group">
              <h1 className="hero-title">
                Priyanshu
                <span className="hero-title-accent">Shakya.</span>
              </h1>
              <div className="hero-divider"></div>
            </div>
            
            <h2 className="hero-role">
              &gt; <Typewriter />
            </h2>
            
            <div className="hero-location">
              <FiMapPin style={{ marginRight: '4px' }} /> Based in Ghaziabad, India
            </div>
            
            <p className="hero-desc">
              I am a dedicated Software Engineer specializing in full stack MERN systems and algorithm design. Passionate about building functional and high-performance digital architectures, I translate complex code logic into intuitive, visually-refined user experiences.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn-pill">⚡ View Works</a>
              <a href="#contact" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Let's Talk <FiArrowRight />
              </a>
            </div>
          </div>

          <div className="hero-visual reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="hero-card">
              <div className="hero-card-pattern"></div>
              <div className="hero-status">
                <div className="status-dot"></div>
                Available for internships
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Metrics */}
      <section id="metrics" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="metrics-grid reveal">
            {metrics.map((m, i) => (
              <div key={i} className="metric-card glass-panel">
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
                <div className="metric-tagline">{m.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="section-tag reveal">
            <span>👤</span> ABOUT
          </div>
          
          <h3 className="about-quote reveal">
            "Striving to build technology that is not just highly functional, but beautifully crafted inside and out."
          </h3>
          
          <div className="about-cards-row reveal">
            <div className="about-card glass-panel">
              <div className="about-card-header">
                <div className="square-badge"><FiBriefcase /></div>
                <h3>Career Objective</h3>
              </div>
              <p>
                Currently pursuing a B.Tech in Computer Science and Engineering (AI/ML) at <span className="highlight">IMS Engineering College (2023–2027)</span>. I am seeking a challenging software engineer internship where I can apply my MERN stack skills and strong data structure foundations to build real-world systems and collaborate on high-impact digital solutions.
              </p>
            </div>

            <div className="about-card glass-panel">
              <div className="about-card-header">
                <div className="square-badge"><FiBookOpen /></div>
                <h3>Education</h3>
              </div>
              
              <div className="edu-timeline">
                <div className="edu-item">
                  <div className="edu-info">
                    <h4>B.Tech CSE (AI/ML)</h4>
                    <p>IMS Engineering College</p>
                  </div>
                  <div className="edu-pill">CGPA: 8.35</div>
                </div>
                <div className="edu-item">
                  <div className="edu-info">
                    <h4>Class XII (Senior Secondary)</h4>
                    <p>SRSVM School</p>
                  </div>
                  <div className="edu-pill">92% score</div>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-full-card glass-panel reveal">
            <div className="about-card-header">
              <div className="square-badge"><FiCode /></div>
              <h3>Technical Arsenal</h3>
            </div>
            <div className="skills-wrap">
              {['C++', 'Python', 'JavaScript', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Redux', 'REST APIs'].map((s, i) => (
                <span key={i} className="skill-badge">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skill Level Proficiency */}
      <section id="skills">
        <div className="container">
          <div className="section-tag reveal">
            <span>📊</span> PROFICIENCY
          </div>
          <h2 className="title-primary reveal">Expertise Levels</h2>
          
          <div className="bars-grid reveal" id="bars-grid">
            {skills.map((s, i) => (
              <div key={i} className="bar-item">
                <div className="bar-header">
                  <span className="bar-name">{s.name}</span>
                  <span className="bar-pct">{s.value}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" data-pct={s.value}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Milestones */}
      <section id="journey">
        <div className="container">
          <div className="section-tag reveal">
            <span>🏆</span> ACCOMPLISHMENTS
          </div>
          <h2 className="title-primary reveal">Certifications & Milestones</h2>
          
          <div className="journey-stack">
            <div className="journey-card glass-panel reveal">
              <div className="journey-header">
                <div className="journey-title">
                  <h3>Specialized Technical Training</h3>
                  <p>Institutions & Cloud Platforms</p>
                </div>
                <div className="journey-tags">
                  <span className="j-tag current">Completed</span>
                  <span className="j-tag verified">Verified</span>
                </div>
              </div>
              
              <ul className="journey-details">
                <li>Acquired deep knowledge in modern web architectures and artificial intelligence integrations.</li>
                <li>Completed hands-on capstone projects integrating cloud serverless layers and predictive modeling.</li>
              </ul>
              
              <div className="doc-previews">
                {certifications.map(cert => (
                  <a href={cert.link} target="_blank" rel="noreferrer" key={cert.id} className="doc-preview">
                    <div className="doc-icon"><FiFileText /></div>
                    <div className="doc-info">
                      <div className="doc-name">{cert.title}</div>
                      <div className="doc-org">{cert.org}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="journey-card glass-panel reveal">
              <div className="journey-header">
                <div className="journey-title">
                  <h3>Key Achievements</h3>
                  <p>Competitive & Academic Excellence</p>
                </div>
              </div>
              
              <ul className="journey-details">
                <li><strong>250+ LeetCode Solutions:</strong> Mastering linear algorithms, trees, and dynamic arrays.</li>
                <li><strong>HackData SNU 2026:</strong> Actively contributed in coding and logic layers at SNU premier hackathon.</li>
                <li><strong>Class XII Rank Holder:</strong> Ranked at the top tier of school examinations with a score of 92%.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects">
        <div className="container">
          <div className="section-tag reveal">
            <span>💻</span> PORTFOLIO
          </div>
          <h2 className="title-primary reveal">Featured Projects</h2>
          
          <div className="projects-stack">
            {projects.map(proj => (
              <div key={proj.id} className="project-card glass-panel reveal">
                <div className="project-header">
                  <div className="square-badge"><FiServer /></div>
                  <div className="project-title">
                    <h3>{proj.title}</h3>
                    <span className="project-sub">{proj.tag}</span>
                  </div>
                </div>
                
                <div className="project-body">
                  <div className="p-col">
                    <h4>Key Features</h4>
                    <ul className="p-features">
                      {proj.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                  <div className="p-col">
                    <h4>Technologies Used</h4>
                    <div className="p-techs">
                      {proj.tech.map((t, i) => <span key={i} className="p-tech-pill">{t}</span>)}
                    </div>
                  </div>
                </div>
                
                <div className="project-footer">
                  <a href={proj.github} target="_blank" rel="noreferrer" className="btn-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                    <FiGithub /> Source Code
                  </a>
                  <a href={proj.demo} target="_blank" rel="noreferrer" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                    Live Preview <FiArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Goals / Next Steps */}
      <section id="goals">
        <div className="container">
          <div className="section-tag reveal">
            <span>🚀</span> NEXT STEPS
          </div>
          <h2 className="title-primary reveal">Learning & Growth Objectives</h2>
          
          <div className="goals-grid reveal" id="goals-grid-section">
            {goals.map((g, i) => (
              <div key={i} className="goal-card glass-panel">
                <span className="goal-icon">{g.icon}</span>
                <div className="goal-title">{g.title}</div>
                <div className="goal-desc">{g.desc}</div>
                <div className="goal-progress">
                  <div className="goal-fill"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container reveal">
          <div className="contact-grid">
            <div className="contact-left">
              <div className="section-tag">
                <span>📧</span> CONNECT
              </div>
              <h2>Ready to build something amazing?</h2>
              
              <div className="contact-stack">
                <a href="mailto:ps01091977@gmail.com" className="contact-row">
                  <div className="c-icon"><FiMail /></div>
                  <div className="c-info">
                    <span>Email Me</span>
                    <p>ps01091977@gmail.com</p>
                  </div>
                </a>
                
                <a href="tel:+919876543210" className="contact-row">
                  <div className="c-icon"><FiPhone /></div>
                  <div className="c-info">
                    <span>Call Me</span>
                    <p>+91 9876543210</p>
                  </div>
                </a>
                
                <a href="https://www.linkedin.com/in/priyanshu-shakya-304b07292" target="_blank" rel="noreferrer" className="contact-row">
                  <div className="c-icon"><FiLinkedin /></div>
                  <div className="c-info">
                    <span>LinkedIn</span>
                    <p>Priyanshu Shakya</p>
                  </div>
                </a>
                
                <a href="https://github.com/PS_06" target="_blank" rel="noreferrer" className="contact-row">
                  <div className="c-icon"><FiGithub /></div>
                  <div className="c-info">
                    <span>GitHub</span>
                    <p>PS_06</p>
                  </div>
                </a>
                
                <a href="https://leetcode.com/u/PriyanshuS_06/" target="_blank" rel="noreferrer" className="contact-row">
                  <div className="c-icon"><SiLeetcode /></div>
                  <div className="c-info">
                    <span>LeetCode</span>
                    <p>PriyanshuS_06</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="contact-right">
              <form className="contact-form glass-panel" onSubmit={handleContactSubmit}>
                <div className="input-group">
                  <label className="form-label">// YOUR_NAME</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    disabled={isSending}
                    required 
                  />
                </div>
                <div className="input-group">
                  <label className="form-label">// YOUR_EMAIL</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    disabled={isSending}
                    required 
                  />
                </div>
                <div className="input-group">
                  <label className="form-label">// MESSAGE</label>
                  <textarea 
                    className="form-input" 
                    placeholder="Hey Priyanshu..." 
                    value={formData.message}
                    onChange={(e) => handleInputChange(e, 'message')}
                    disabled={isSending}
                    required
                  ></textarea>
                </div>
                
                {/* Visual Status Notifications */}
                {status.text && (
                  <div className={`glass-panel`} style={{
                    padding: '0.8rem 1.2rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    marginTop: '0.5rem',
                    background: status.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                    borderColor: status.type === 'success' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
                    color: status.type === 'success' ? '#10b981' : '#f87171'
                  }}>
                    {status.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                    <span>{status.text}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-pill btn-submit" 
                  disabled={isSending}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: isSending ? 0.7 : 1, cursor: isSending ? 'not-allowed' : 'pointer' }}
                >
                  {isSending ? (
                    <>
                      <FiLoader className="spin" style={{ animation: 'spin 1s linear infinite' }} /> Sending...
                    </>
                  ) : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <a href="#home" className="nav-brand" style={{ textDecoration: 'none' }}>
              <div className="brand-icon">P</div>
              <span className="brand-name">priyanshu<span>.dev</span></span>
            </a>
            <div className="footer-text">
              &copy; {new Date().getFullYear()} Priyanshu Shakya. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
