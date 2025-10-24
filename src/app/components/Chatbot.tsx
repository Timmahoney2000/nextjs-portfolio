'use client';

import React, { useState, useRef, useEffect } from 'react';

// Knowledge base with embeddings-ready structure
const knowledgeBase = {
  documents: [
    {
      id: 'summary',
      category: 'about',
      content: "Timothy J. Mahoney is a Front-End Developer with proven expertise in React, Next.js, Tailwind CSS, and TypeScript. He has IT field engineering experience and a B.A. in Computer Science. He consistently delivers responsive, accessible, and high-performance web applications. He drives measurable performance improvements, reduces deployment cycles by 40%, and enhances team velocity by 20% through strategic leadership and Agile collaboration.",
      keywords: ['about', 'summary', 'who', 'introduction', 'overview', 'developer', 'frontend']
    },
    {
      id: 'contact',
      category: 'contact',
      content: "Contact Timothy Mahoney at email: timmahoney2000@gmail.com, phone: (908) 397-8825, location: South Plainfield, NJ 07080. LinkedIn: linkedin.com/in/timmahoney77, GitHub: github.com/Timmahoney2000, Twitter: x.com/timmahoney2000. He is open to new opportunities and collaborations.",
      keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'linkedin', 'github', 'get in touch', 'availability']
    },
    {
      id: 'skills-frontend',
      category: 'skills',
      content: "Frontend skills: React, Next.js, Tailwind CSS, Vite, HTML5, JavaScript ES6+, TypeScript. Tim specializes in building modern, responsive web applications with excellent performance and user experience.",
      keywords: ['skills', 'frontend', 'react', 'nextjs', 'next.js', 'tailwind', 'typescript', 'javascript', 'html', 'css', 'rag']
    },
    {
      id: 'skills-backend',
      category: 'skills',
      content: "Backend skills: Node.js, MySQL, MongoDB, REST APIs, Express.js. Tim can build full-stack applications with database integration and RESTful API design.",
      keywords: ['skills', 'backend', 'nodejs', 'node', 'mongodb', 'mysql', 'api', 'database', 'express', 'rag', 'vector database']
    },
    {
      id: 'skills-tools',
      category: 'skills',
      content: "Tools and workflow: Git, GitHub, Postman, VS Code, Agile/Scrum methodologies, CI/CD with Vercel and Netlify. Tim is experienced with modern development workflows and team collaboration.",
      keywords: ['tools', 'git', 'github', 'agile', 'scrum', 'cicd', 'vercel', 'rag', 'workflow', 'methodology']
    },
    {
      id: 'job-unisys',
      category: 'experience',
      content: "Field Service Engineer at Unisys (Remote, 2023-Present). Manages enterprise-level technical operations for laptops achieving 95% SLA compliance for clients like Verizon, AT&T, and SHI. Resolved complex hardware/software challenges ensuring 99.9% uptime for Fortune 500 customers including FedEx, Phillips 66, and EPA. Led technical training programs accelerating onboarding by 30%. Reduced repeat service tickets by 15%.",
      keywords: ['unisys', 'current job', 'field service', 'engineer', 'experience', 'verizon', 'att', 'fedex', 'fortune 500', 'clients']
    },
    {
      id: 'job-hopewell',
      category: 'experience',
      content: "Help Desk Technician at Hopewell Valley Schools (Pennington, NJ, 2019-2021). Managed 30+ daily support tickets across 2,000+ user environment with 95% first-contact resolution rate. Supported Windows 11, macOS, and Chromebook ecosystems. Deployed 500+ workstations and enterprise AV systems. Maintained 99% system availability during COVID-19 hybrid learning transition.",
      keywords: ['hopewell', 'help desk', 'school', 'experience', 'support', 'covid', 'technician']
    },
    {
      id: 'job-jnj',
      category: 'experience',
      content: "Executive Sous Chef at Johnson & Johnson (New Brunswick, NJ, 2016-2019). Culinary leadership role managing kitchen operations.",
      keywords: ['johnson', 'chef', 'culinary', 'experience', 'sous chef']
    },
    {
      id: 'job-washington',
      category: 'experience',
      content: "Chef de Cuisine at Washington House (Basking Ridge, NJ, 2014-2016). Culinary leadership position.",
      keywords: ['washington house', 'chef', 'culinary', 'experience', 'cuisine']
    },
    {
      id: 'education',
      category: 'education',
      content: "B.A. in Computer Science from Thomas Edison State University, Trenton, NJ. Graduation: June 2025. GPA: 3.5. Currently completing degree while working full-time.",
      keywords: ['education', 'school', 'university', 'degree', 'computer science', 'gpa', 'college', 'thomas edison']
    },
    {
      id: 'project-portfolio',
      category: 'projects',
      content: "Portfolio Site built with Next.js and Tailwind CSS, hosted on Vercel. Features responsive design, optimized SEO, and a custom RAG AI chatbot for interactive engagement. Implements modular architecture, reusable components, and automated CI/CD pipeline through GitHub integration.",
      keywords: ['portfolio', 'project', 'nextjs', 'tailwind', 'chatbot', 'website', 'this site']
    },
    {
      id: 'project-notes',
      category: 'projects',
      content: "Notes App: Full-stack MERN application (MongoDB, Express.js, React, Node.js) with CRUD functionality. Designed RESTful API backend interfacing with MongoDB database for secure note management and real-time updates. Deployed on Render cloud platform, showcasing DevOps skills.",
      keywords: ['notes app', 'project', 'mern', 'mongodb', 'crud', 'fullstack', 'react', 'nodejs']
    },
    {
      id: 'project-restaurant',
      category: 'projects',
      content: "Restaurant Website for Park Seafood in Seaside Park, NJ. Multi-page responsive site with HTML5, CSS, JavaScript. Features menu sections, structured navigation, and design reflecting boardwalk heritage and fresh seafood focus.",
      keywords: ['restaurant', 'project', 'park seafood', 'website', 'html', 'css']
    },
    {
      id: 'achievements',
      category: 'achievements',
      content: "Key achievements: 99.9% uptime for mission-critical systems, 95% SLA compliance, 95% first-contact resolution rate, 30% onboarding efficiency improvement, 15% reduction in repeat tickets, 40% deployment cycle reduction, 20% team velocity enhancement. Works with Fortune 500 clients including Verizon, AT&T, FedEx, Phillips 66, EPA.",
      keywords: ['achievements', 'metrics', 'results', 'accomplishments', 'performance', 'statistics']
    },
    {
      id: 'availability',
      category: 'availability',
      content: "Open to new opportunities and collaborations. Interested in frontend or full-stack development roles using React, Next.js, and modern web technologies. Open to remote, hybrid, or on-site positions in NJ/NY area.",
      keywords: ['available', 'hiring', 'opportunities', 'looking', 'job search', 'open to work']
    },
    {
      id: 'hobbies-personal',
      category: 'personal',
      content: "Outside of work and coding, Tim enjoys spending time with his kids, fishing, reading, and touching grass. I also hear he's a real whiz in the kitchen from his culinary background.",
      keywords: ['hobbies', 'hobby', 'interests', 'personal', 'life', 'fun', 'kids', 'family', 'free time', 'relax', 'play', 'outside work', 'do for fun', 'enjoy', 'fishing', 'reading', 'cooking', 'kitchen', 'spare time']
    },
    {
      id: 'reading-personal',
      category: 'personal',
      content: "Recent reads: Post Office by Charles Bukowski, The Road to React by Robin Wieruch, You Don't Know JS by Kyle Simpson, The Tao of Pooh by Benjamin Hoff, On Power by Mark R. Levin.",
      keywords: ['books', 'reading', 'learning', 'read', 'relax', 'free time', 'hobbies']
    },
    {
      id: 'learning-currently',
      category: 'learning',
      content: "Tim is currently learning advanced TypeScript patterns, exploring serverless architecture, retrieval augmented generation, vector databases, and diving deeper into React Server Components. He's also studying system design and scalability to prepare for senior-level roles.",
      keywords: ['learning', 'studying', 'currently', 'improving', 'education', 'growth']
    },
    {
      id: 'tech-influences',
      category: 'inspiration',
      content: "Tim follows thought leaders like Kent C. Dodds, Dan Abramov, Ken Wheeler, Leon Noel, Danny Thompson, and Theo Browne. He stays current by reading the React and Next.js documentation regularly, watching conference talks, and participating in developer communities.",
      keywords: ['influences', 'follow', 'inspiration', 'role models', 'learn from', 'mentors']
    },
    {
      id: 'ideal-role',
      category: 'preferences',
      content: "Tim's ideal role involves working with modern JavaScript frameworks, collaborating with designers and product teams, and having ownership over features from conception to deployment. He thrives in environments that value clean code, testing, and continuous improvement.",
      keywords: ['ideal job', 'dream role', 'perfect position', 'looking for', 'want']
    },
    {
      id: 'work-environment',
      category: 'preferences',
      content: "Tim works best in collaborative environments with clear communication, regular code reviews, and a culture of learning. He's comfortable with remote work (currently works remotely for Unisys) but also enjoys hybrid arrangements for team bonding and pair programming sessions.",
      keywords: ['work environment', 'culture', 'remote', 'office', 'team', 'prefer']
    },
    {
      id: 'company-size',
      category: 'preferences',
      content: "Tim is open to both startup and enterprise environments. He appreciates the innovation and ownership opportunities at startups, but also values the mentorship and structure available at larger companies. His experience ranges from small school districts to Fortune 500 companies.",
      keywords: ['company size', 'startup', 'enterprise', 'big company', 'small company']
    }
  ]
};

// Simple semantic search function
function searchKnowledge(query: string, topK: number = 3): string[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
  
  // Score each document based on keyword matches and content relevance
  const scored = knowledgeBase.documents.map(doc => {
    let score = 0;
    
    // Check keyword matches (high weight)
    doc.keywords.forEach(keyword => {
      if (queryLower.includes(keyword)) {
        score += 10;
      }
      // Exact keyword match in query words
      if (queryWords.includes(keyword)) {
        score += 15;
      }
      queryWords.forEach(word => {
        if (keyword.includes(word)) {
          score += 5;
        }
      });
    });
    
    // Check content matches (lower weight)
    queryWords.forEach(word => {
      if (doc.content.toLowerCase().includes(word)) {
        score += 2;
      }
    });
    
    // Boost exact phrase matches
    if (doc.content.toLowerCase().includes(queryLower)) {
      score += 15;
    }
    
    return { doc, score };
  });
  
  // Sort by score and return top K documents
  // Only return documents with meaningful scores (threshold of 5)
  return scored
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 5)
    .slice(0, topK)
    .map(item => item.doc.content);
}

// Enhanced response generator using RAG
function generateRAGResponse(query: string): string {
  const queryLower = query.toLowerCase();
  
  // Real-time information handlers (priority)
  // Date and time questions
  if (queryLower.includes('date') || queryLower.includes('today')) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    return `Today is ${dateStr}.`;
  }
  
  if (queryLower.includes('time') && !queryLower.includes('full time') && !queryLower.includes('full-time')) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    return `The current time is ${timeStr}.`;
  }
  
  if (queryLower.includes('day of') || queryLower.includes('what day')) {
    const now = new Date();
    const dayStr = now.toLocaleDateString('en-US', { weekday: 'long' });
    return `Today is ${dayStr}.`;
  }
  
  if (queryLower.includes('year') && !queryLower.includes('experience')) {
    const year = new Date().getFullYear();
    return `The current year is ${year}.`;
  }
  
  // Weather (can't provide real weather, but can acknowledge)
  if (queryLower.includes('weather')) {
    return "I don't have access to real-time weather data, but you can check weather.com or your local weather app! Is there anything about Tim's experience or skills I can help you with?";
  }
  
  // Knowledge base retrieval for Tim-specific questions
  const relevantDocs = searchKnowledge(query, 3);
  
  if (relevantDocs.length === 0) {
    return "I don't have specific information about that, but feel free to ask me about Tim's experience, skills, projects, education, or how to contact him! I can also tell you the current date and time.";
  }
  
  // Handle specific question types with retrieved context
  if (queryLower.match(/^(hi|hello|hey|greetings)/)) {
    return "Hi! 👋 I'm Tim's AI assistant. I can answer questions about his experience, skills, projects, and education. I can also tell you the current date and time. What would you like to know?";
  }
  
  // For simple/specific questions, return only the most relevant document
  const simpleQuestions = ['hobbies', 'hobby', 'free time', 'fun', 'interests', 'email', 'phone', 'contact', 'location', 'where', 'gpa', 'school', 'degree', 'books', 'reading'];
  const isSimpleQuestion = simpleQuestions.some(term => queryLower.includes(term));
  
  if (isSimpleQuestion && relevantDocs.length > 0) {
    return relevantDocs[0]; // Return only the top match
  }
  
  // For "what" questions, provide direct information
  if (queryLower.includes('what') || queryLower.includes('tell me')) {
    // If asking about broad topics, return multiple docs
    const broadTopics = ['experience', 'skills', 'projects', 'background'];
    const isBroadQuestion = broadTopics.some(term => queryLower.includes(term));
    
    if (isBroadQuestion) {
      return relevantDocs.join('\n\n');
    }
    return relevantDocs[0]; // Otherwise just the top result
  }
  
  // For "how" questions about contact
  if (queryLower.includes('how') && (queryLower.includes('contact') || queryLower.includes('reach'))) {
    return relevantDocs[0];
  }
  
  // For yes/no questions, provide context
  if (queryLower.match(/^(do|does|can|is|are|has|have)/)) {
    const answer = relevantDocs[0];
    if (answer.toLowerCase().includes(queryLower.replace(/^(do|does|can|is|are|has|have)\s+/i, ''))) {
      return `Yes! ${answer}`;
    }
    return relevantDocs[0];
  }
  
  // Default: return most relevant single document for focused questions
  if (relevantDocs.length === 1) {
    return relevantDocs[0];
  }
  
  // For complex queries, return top 2 results max
  return relevantDocs.slice(0, 2).join('\n\n');
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function RAGChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 I'm Tim's AI assistant powered by RAG (Retrieval-Augmented Generation). I can answer questions about his experience, skills, projects, and even tell you the current date and time. Try asking me anything!",
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
      const response = generateRAGResponse(inputValue);
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
                <h3 className="text-white font-semibold">Tim&apos;s AI Assistant</h3>
                <p className="text-white/80 text-sm">RAG-powered chatbot</p>
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