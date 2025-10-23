'use client';

import React, { useState, useRef, useEffect } from 'react';

// Comprehensive knowledge base about Timothy
const knowledge = {
  name: "Timothy J. Mahoney",
  title: "Front-End Developer",
  email: "timmahoney2000@gmail.com",
  phone: "(908) 397-8825",
  location: "South Plainfield, NJ 07080",
  
  summary: "Front-End Developer with proven expertise in React, Next.js, Tailwind CSS, and TypeScript, backed by IT field engineering experience and B.A. in Computer Science. Consistently delivers responsive, accessible, and high-performance web applications that exceed industry standards.",
  
  skills: {
    frontend: ["React", "Next.js", "Tailwind CSS", "Vite", "HTML5", "JavaScript (ES6+)", "TypeScript"],
    backend: ["Node.js", "MySQL", "MongoDB", "REST APIs"],
    tools: ["Git", "GitHub", "Postman", "VS Code", "Agile/Scrum", "CI/CD (Vercel, Netlify)"]
  },
  
  experience: [
    {
      title: "Field Service Engineer",
      company: "Unisys",
      location: "Remote",
      period: "2023 - Present",
      achievements: [
        "Managed enterprise-level technical operations for laptops achieving 95% SLA compliance while reducing client downtime for clients such as Verizon, AT&T, and SHI",
        "Resolved complex hardware/software challenges across distributed enterprise environments ensuring 99.9% uptime for mission-critical systems serving Fortune 500 customers, including FedEx, Phillips 66, and the EPA",
        "Led technical training programs for new team members, accelerating onboarding efficiency by 30%",
        "Collaborated with engineering teams to reduce repeat service tickets by 15%"
      ]
    },
    {
      title: "Help Desk Technician",
      company: "Hopewell Valley Schools",
      location: "Pennington, NJ",
      period: "2019 - 2021",
      achievements: [
        "Executed high-volume technical operations managing 30+ daily support tickets across 2,000+ user environment",
        "Sustained 95% first-contact resolution rate supporting Windows 11, macOS, and Chromebook ecosystems",
        "Architected large-scale technology infrastructure deployments, including 500+ workstations",
        "Maintained 99% system availability during COVID-19 hybrid learning transition"
      ]
    },
    {
      title: "Executive Sous Chef",
      company: "Johnson & Johnson",
      location: "New Brunswick, NJ",
      period: "2016 - 2019",
      achievements: []
    },
    {
      title: "Chef de Cuisine",
      company: "Washington House",
      location: "Basking Ridge, NJ",
      period: "2014 - 2016",
      achievements: []
    }
  ],
  
  education: {
    degree: "B.A. in Computer Science",
    school: "Thomas Edison State University",
    location: "Trenton, NJ",
    graduation: "June 2025",
    gpa: "3.5"
  },
  
  projects: [
    {
      name: "Portfolio Site",
      technologies: ["Next.js", "Tailwind CSS", "React", "Vercel", "RAG AI Chatbot"],
      description: "Personal portfolio website showcasing full-stack development projects with clean UI, responsive design, and optimized SEO. Features a custom RAG AI chatbot for interactive user engagement.",
      highlights: [
        "Implemented modular architecture and reusable components",
        "Deployed with automated CI/CD pipeline through GitHub integration",
        "Optimized for performance and global deployment"
      ]
    },
    {
      name: "Notes App",
      technologies: ["MERN Stack", "MongoDB", "Express.js", "React", "Node.js", "Render"],
      description: "Full-stack note-taking application with CRUD functionality and RESTful API backend.",
      highlights: [
        "Designed RESTful API interfacing with MongoDB database",
        "Enabled secure note management and real-time updates",
        "Managed full life-cycle from development to production on Render"
      ]
    },
    {
      name: "Restaurant Website",
      technologies: ["HTML5", "CSS", "JavaScript", "Responsive Design"],
      description: "Responsive, multi-page site for Park Seafood (Seaside Park, NJ) featuring menu pages, about section, and contact information.",
      highlights: [
        "Implemented clear menu sections with structured HTML",
        "Designed to reflect boardwalk heritage and fresh seafood focus",
        "Optimized for mobile and desktop viewing"
      ]
    }
  ],
  
  availability: "Open to new opportunities and collaborations",
  
  social: {
    github: "https://github.com/Timmahoney2000",
    linkedin: "https://www.linkedin.com/in/timmahoney77/",
    twitter: "https://x.com/timmahoney2000"
  }
};

// Enhanced response generator with resume knowledge
const generateResponse = (message: string): string => {
  const msg = message.toLowerCase();
  
  // Greetings
  if (msg.match(/^(hi|hello|hey|greetings|good morning|good afternoon|sup|yo)/)) {
    return `Hello! 👋 I'm Tim's AI assistant. I know all about his experience, skills, projects, and education. Ask me anything like:\n\n• "What's your work experience?"\n• "Tell me about your projects"\n• "What are your skills?"\n• "Where did you go to school?"\n\nWhat would you like to know?`;
  }
  
  // Work Experience - General
  if (msg.includes('experience') || msg.includes('work history') || msg.includes('employment') || msg.includes('job')) {
    const currentJob = knowledge.experience[0];
    return `Tim has diverse experience spanning IT and culinary fields:\n\n**Current Role:**\n🔧 ${currentJob.title} at ${currentJob.company} (${currentJob.period})\n• Managing enterprise-level tech operations for Fortune 500 clients\n• 99.9% uptime for mission-critical systems\n• Leading technical training programs\n\n**Previous:**\n• Help Desk Technician at Hopewell Valley Schools (2019-2021)\n• Executive Sous Chef at Johnson & Johnson (2016-2019)\n• Chef de Cuisine at Washington House (2014-2016)\n\nAsk about a specific role for more details!`;
  }
  
  // Current Job - Unisys
  if (msg.includes('unisys') || msg.includes('current') || msg.includes('field service') || msg.includes('field engineer')) {
    const job = knowledge.experience[0];
    return `**${job.title} at ${job.company}** (${job.period})\n\n${job.achievements.map(a => `• ${a}`).join('\n')}\n\nTim works with major clients including Verizon, AT&T, FedEx, Phillips 66, and the EPA, maintaining 99.9% uptime and 95% SLA compliance.`;
  }
  
  // Help Desk Role
  if (msg.includes('help desk') || msg.includes('hopewell') || msg.includes('school')) {
    const job = knowledge.experience[1];
    return `**${job.title} at ${job.company}** (${job.period})\n\n${job.achievements.map(a => `• ${a}`).join('\n')}\n\nTim managed a 2,000+ user environment and played a crucial role during the COVID-19 transition to hybrid learning.`;
  }
  
  // Skills - General
  if (msg.includes('skill') || msg.includes('technology') || msg.includes('tech stack') || msg.includes('what can you do') || msg.includes('what do you know')) {
    return `Tim's technical skills:\n\n**Frontend:**\n${knowledge.skills.frontend.join(', ')}\n\n**Backend:**\n${knowledge.skills.backend.join(', ')}\n\n**Tools & Workflow:**\n${knowledge.skills.tools.join(', ')}\n\nHe specializes in building modern, responsive web applications with React and Next.js!`;
  }
  
  // Specific Tech Questions
  if (msg.includes('react') || msg.includes('next.js') || msg.includes('nextjs')) {
    return `Yes! Tim is highly proficient in React and Next.js:\n\n• Built his portfolio site with Next.js and Tailwind CSS\n• Uses React for all modern UI development\n• Implements server-side rendering and optimal performance\n• Works with TypeScript for type-safe code\n\nHis portfolio (this site!) is built entirely with Next.js and React, featuring a custom AI chatbot!`;
  }
  
  if (msg.includes('typescript') || msg.includes('javascript')) {
    return `Tim works extensively with JavaScript and TypeScript:\n\n• Modern ES6+ JavaScript\n• TypeScript for type-safe development\n• Used across all his React/Next.js projects\n• Ensures code quality and maintainability\n\nHe believes TypeScript is essential for building scalable applications!`;
  }
  
  // Projects
  if (msg.includes('project') || msg.includes('portfolio site') || msg.includes('what have you built') || msg.includes('created')) {
    return `Tim has built several impressive projects:\n\n**1. Portfolio Site** (Next.js, Tailwind, AI Chatbot)\n• This site you're on right now!\n• Custom RAG AI chatbot for interactive engagement\n• Optimized SEO and responsive design\n• Automated CI/CD with Vercel\n\n**2. Notes App** (MERN Stack)\n• Full-stack CRUD application\n• RESTful API with MongoDB backend\n• Deployed on Render cloud platform\n\n**3. Restaurant Website** (HTML/CSS/JS)\n• Multi-page responsive site for Park Seafood\n• Structured menu sections and clean navigation\n\nWant details on any specific project?`;
  }
  
  // Specific Project Questions
  if (msg.includes('notes app') || msg.includes('mern')) {
    const project = knowledge.projects[1];
    return `**${project.name}**\n\nTechnologies: ${project.technologies.join(', ')}\n\n${project.description}\n\nKey Features:\n${project.highlights.map(h => `• ${h}`).join('\n')}\n\nThis showcases Tim's full-stack development capabilities from database design to cloud deployment!`;
  }
  
  if (msg.includes('restaurant') || msg.includes('park seafood')) {
    const project = knowledge.projects[2];
    return `**${project.name}**\n\nTechnologies: ${project.technologies.join(', ')}\n\n${project.description}\n\nHighlights:\n${project.highlights.map(h => `• ${h}`).join('\n')}`;
  }
  
  // Education
  if (msg.includes('education') || msg.includes('school') || msg.includes('college') || msg.includes('university') || msg.includes('degree') || msg.includes('studied')) {
    const edu = knowledge.education;
    return `**${edu.degree}**\n${edu.school}, ${edu.location}\nGraduation: ${edu.graduation}\nGPA: ${edu.gpa}\n\nTim is completing his Computer Science degree while working full-time, demonstrating strong dedication and time management skills.`;
  }
  
  // About/Summary
  if (msg.includes('about') || msg.includes('who are you') || msg.includes('tell me about') || msg.includes('introduce') || msg.includes('summary')) {
    return `${knowledge.summary}\n\nTim brings a unique combination of:\n• Strong technical foundation in modern web development\n• Real-world IT experience with Fortune 500 clients\n• Academic background with a B.A. in Computer Science\n• Proven track record of delivering measurable results\n\nHe's passionate about creating elegant, high-performance web applications that solve real business problems.`;
  }
  
  // Contact/Resume
  if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('phone') || msg.includes('get in touch') || msg.includes('hire') || msg.includes('resume') || msg.includes('cv')) {
    return `**Contact Information:**\n\n📧 Email: ${knowledge.email}\n📱 Phone: ${knowledge.phone}\n📍 Location: ${knowledge.location}\n\n💼 LinkedIn: ${knowledge.social.linkedin}\n🐙 GitHub: ${knowledge.social.github}\n\n📄 You can also download Tim's full resume from this site!\n\nHe's ${knowledge.availability.toLowerCase()}.`;
  }
  
  // Location/Remote
  if (msg.includes('location') || msg.includes('where') || msg.includes('based') || msg.includes('remote')) {
    return `Tim is based in ${knowledge.location} and currently works remotely for Unisys.\n\nHe's open to:\n• Remote positions\n• Hybrid arrangements\n• On-site opportunities in the NJ/NY area\n\nHe's ${knowledge.availability.toLowerCase()}!`;
  }
  
  // Achievements/Metrics
  if (msg.includes('achievement') || msg.includes('accomplishment') || msg.includes('metrics') || msg.includes('results')) {
    return `Tim has delivered measurable results throughout his career:\n\n📊 **Key Metrics:**\n• 99.9% uptime for mission-critical systems\n• 95% SLA compliance rate\n• 95% first-contact resolution rate\n• 30% improvement in onboarding efficiency\n• 15% reduction in repeat service tickets\n• 40% reduction in deployment cycles\n• 20% enhancement in team velocity\n\nHe focuses on outcomes that drive real business value!`;
  }
  
  // Clients
  if (msg.includes('client') || msg.includes('customer') || msg.includes('who have you worked')) {
    return `Tim has worked with impressive enterprise clients:\n\n**Fortune 500 Companies:**\n• Verizon\n• AT&T\n• FedEx\n• Phillips 66\n• EPA (Environmental Protection Agency)\n• SHI International\n• Johnson & Johnson\n\nPlus 2,000+ users at Hopewell Valley Schools during the critical COVID-19 transition period.`;
  }
  
  // Agile/Development Process
  if (msg.includes('agile') || msg.includes('scrum') || msg.includes('methodology') || msg.includes('workflow')) {
    return `Tim is experienced with modern development workflows:\n\n• Agile/Scrum methodologies\n• CI/CD pipelines (Vercel, Netlify)\n• Git version control and GitHub collaboration\n• Code reviews and quality assurance\n• Cross-functional team collaboration\n\nHe led technical training programs and improved team velocity by 20% through strategic Agile practices!`;
  }
  
  // API/Backend
  if (msg.includes('api') || msg.includes('backend') || msg.includes('database') || msg.includes('mongodb') || msg.includes('node')) {
    return `Tim has solid backend development skills:\n\n**Backend Technologies:**\n• Node.js for server-side JavaScript\n• MongoDB & MySQL databases\n• RESTful API design and implementation\n• Express.js framework\n\n**Projects:**\nHis Notes App features a complete RESTful API backend interfacing with MongoDB, enabling secure note management and real-time updates.\n\nHe's comfortable building full-stack applications from database to deployment!`;
  }
  
  // Availability/Hiring
  if (msg.includes('available') || msg.includes('hiring') || msg.includes('opportunity') || msg.includes('looking for work')) {
    return `Great question! Tim is ${knowledge.availability.toLowerCase()}.\n\nHe's particularly interested in:\n• Front-end or full-stack development roles\n• Projects using React, Next.js, and modern web technologies\n• Remote or hybrid positions\n• Innovative teams building impactful products\n\nContact him at:\n📧 ${knowledge.email}\n📱 ${knowledge.phone}\n\nLet's discuss how he can contribute to your team!`;
  }
  
  // Download Resume
  if (msg.includes('download') || msg.includes('pdf')) {
    return `You can download Tim's full resume from this site! Look for the "Download Resume" button in the contact section, or scroll down to find it.\n\nThe resume includes detailed information about his experience, projects, and technical skills.`;
  }
  
  // Help/What can you do
  if (msg.includes('help') || msg.includes('what can i ask') || msg.includes('commands')) {
    return `I can answer detailed questions about Tim's background! Try asking:\n\n**Experience:**\n• "What's your current job?"\n• "Tell me about Unisys"\n• "What clients have you worked with?"\n\n**Skills & Projects:**\n• "What are your skills?"\n• "Tell me about your projects"\n• "Do you know React/Next.js?"\n\n**Education & Contact:**\n• "Where did you go to school?"\n• "How can I contact you?"\n• "Are you available for work?"\n\nJust ask naturally - I understand!`;
  }
  
  // Default response
  return `I'm here to help you learn about Tim! I can tell you about:\n\n• His work experience (currently at Unisys)\n• Technical skills (React, Next.js, TypeScript, etc.)\n• Projects he's built (Portfolio, Notes App, Restaurant Site)\n• Education (B.A. in Computer Science)\n• How to get in touch\n\nWhat would you like to know? Just ask naturally!`;
};

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 I'm Tim's AI assistant. I know all about his experience at companies like Unisys and his skills in React, Next.js, and TypeScript. Ask me anything!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-96 h-[600px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl flex flex-col border border-neutral-200 dark:border-neutral-800">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Tim's AI Assistant</h3>
                <p className="text-white/80 text-sm">Ask me anything!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl whitespace-pre-line ${
                    message.isBot
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}