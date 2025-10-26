'use client';

import { useState, useRef, useEffect } from 'react';

interface Question {
  key: 'name' | 'email' | 'subject' | 'message';
  prompt: string;
  type: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface OutputLine {
  text: string;
  type: string;
}

const QUESTIONS: Question[] = [
  { key: 'name', prompt: 'What is your name?', type: 'text' },
  { key: 'email', prompt: 'What is your email?', type: 'email' },
  { key: 'subject', prompt: 'Subject?', type: 'text' },
  { key: 'message', prompt: 'Your message (press Enter twice):', type: 'textarea' }
];

export default function Contact() {
 const [output, setOutput] = useState<OutputLine[]>([
  { text: '$ contact_me --init', type: 'prompt' },
  { text: 'Initializing...', type: 'info' },
  { text: "Type responses and press Enter. Type 'exit' to cancel.", type: 'normal' },
  { text: '─────────────────────────────', type: 'normal' }
]);
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '' 
  });
  const [input, setInput] = useState<string>('');
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [lastEnter, setLastEnter] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const timer = setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      addOutput('');
      addOutput(QUESTIONS[0].prompt, 'prompt');
    }
  }, 500);
  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [output]);

  const addOutput = (text: string, type: string = 'normal'): void => {
    setOutput(prev => [...prev, { text, type }]);
  };

  const askQuestion = (idx: number): void => {
    if (idx >= QUESTIONS.length) {
      setShowSummary(true);
      addOutput('');
      addOutput('─────────────────────────────');
      addOutput('Review your info:', 'info');
      addOutput('');
      return;
    }
    addOutput('');
    addOutput(QUESTIONS[idx].prompt, 'prompt');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmitAnswer = (): void => {
    const val = input.trim();
    const q = QUESTIONS[currentQ];

    console.log('handleSubmitAnswer called');
    console.log('Current question:', q);
    console.log('Input value:', val);
    console.log('Current question index:', currentQ);

    if (val.toLowerCase() === 'exit') {
      addOutput('');
      addOutput('Cancelled.', 'error');
      setIsDone(true);
      return;
    }

    if (!val) {
      console.log('Empty value, returning');
      return;
    }

    if (q.type === 'email' && !val.includes('@')) {
      addOutput('Invalid email.', 'error');
      setInput('');
      return;
    }

    setFormData(prev => {
      const updated = { ...prev, [q.key]: val };
      console.log('Updated formData:', updated);
      return updated;
    });
    
    addOutput(`> ${val.substring(0, 60)}${val.length > 60 ? '...' : ''}`, 'input');
    setInput('');
    setLastEnter(false);

    const next = currentQ + 1;
    console.log('Next question index will be:', next);
    console.log('Total questions:', QUESTIONS.length);
    
    setCurrentQ(next);
    setTimeout(() => askQuestion(next), 300);
  };

  const handleKey = (e: React.KeyboardEvent): void => {
    if (isDone || showSummary) return;

    const isTextarea = QUESTIONS[currentQ]?.type === 'textarea';
    
    if (isTextarea) {
      if (e.key === 'Enter' && lastEnter && input.trim() === '') {
        e.preventDefault();
        handleSubmitAnswer();
      } else {
        setLastEnter(e.key === 'Enter');
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitAnswer();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    console.log('=== handleSubmit CALLED ===');
    console.log('Form data about to send:', formData);
    
    addOutput('');
    addOutput('Sending...', 'info');
    
    try {
      console.log('Making fetch request to /api/contact...');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      console.log('Response received!');
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data: { success?: boolean; error?: string } = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        addOutput('✓ Sent!', 'success');
        addOutput("I'll get back to you soon!", 'success');
      } else {
        addOutput('✗ Failed to send. Please try again.', 'error');
        console.error('Server error:', data);
      }
    } catch (error) {
      addOutput('✗ Network error. Please try again.', 'error');
      console.error('Catch block error:', error);
    }
    
    setIsDone(true);
    console.log('=== handleSubmit COMPLETE ===');
  };

  const handleCancel = (): void => {
    addOutput('');
    addOutput('Cancelled.', 'error');
    setIsDone(true);
  };

  const lineColor = (type: string): string => ({
    prompt: 'text-[#00ff00]',
    error: 'text-[#ff5555]',
    success: 'text-[#50fa7b]',
    info: 'text-[#8be9fd]',
    input: 'text-[#00ff00] opacity-70',
    normal: 'text-[#00ff00]'
  }[type] || 'text-[#00ff00]');

  const PhoneIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const GithubIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const LinkedinIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const XIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  return (
    <section id='contact'>
      {/* Hero */}
      <div className="relative flex flex-col h-[20rem] w-full items-center justify-center bg-white dark:bg-black">
        <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
        <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-3xl md:text-5xl text-center font-bold text-transparent">
          Let&apos;s elevate your digital brand together
        </p>
        <p className='text-center text-neutral-500 dark:text-neutral-300 z-20'>
          Let&apos;s connect and talk about how I can help bring your ideas to life.
        </p>
      </div>

      {/* CLI Terminal */}
      <div className="py-16 bg-white dark:bg-black">
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-lg overflow-hidden shadow-2xl bg-[#1a1d24]">
            <div className="bg-[#2d3139] px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            <div ref={terminalRef} className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto font-mono text-sm">
              {output.map((line, i) => (
                <div key={i} className={`mb-2 ${lineColor(line.type)}`}>
                  {line.text}
                </div>
              ))}

              {showSummary && (
                <>
                  <div className="text-[#00ff00] mb-2">Name:    {formData.name}</div>
                  <div className="text-[#00ff00] mb-2">Email:   {formData.email}</div>
                  <div className="text-[#00ff00] mb-2">Subject: {formData.subject}</div>
                  <div className="text-[#00ff00] mb-4">Message: {formData.message.slice(0, 50)}{formData.message.length > 50 ? '...' : ''}</div>
                  
                  <div className="flex gap-3 mt-6">
                    <button onClick={handleSubmit} className="px-4 py-2 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#0a0e14] transition-colors font-mono">
                      Submit
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#0a0e14] transition-colors font-mono">
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {!showSummary && !isDone && (
                <div className="flex items-start mt-4">
                  <span className="text-[#00ff00] mr-2">&gt;</span>
                {QUESTIONS[currentQ]?.type === 'textarea' ? (
  <textarea
    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      console.log('=== TEXTAREA KEY EVENT ===');
      console.log('Key pressed:', e.key);
      console.log('lastEnter state:', lastEnter);
      console.log('Current input:', input);
      
      if (e.key === 'Enter') {
        // If last key was Enter and we just pressed Enter again
        if (lastEnter) {
          console.log('DOUBLE ENTER - SUBMITTING!');
          e.preventDefault();
          handleSubmitAnswer();
        } else {
          console.log('First Enter detected, setting flag');
          setLastEnter(true);
        }
      } else {
        // Any other key resets the double-enter detection
        if (lastEnter) {
          console.log('Non-Enter key, resetting lastEnter');
        }
        setLastEnter(false);
      }
    }}
    className="flex-1 bg-transparent border-none outline-none text-[#00ff00] font-mono resize-none"
    rows={3}
  />
) : (
                    <input
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      className="flex-1 bg-transparent border-none outline-none text-[#00ff00] font-mono"
                    />
                  )}
                  <span className="inline-block w-2 h-4 bg-[#00ff00] animate-pulse ml-1" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    {/* Alt Contact */}
<div className='py-6 bg-white dark:bg-black'>
  <div className='text-center mb-8'>
    <a href="/resume.docx" download className="px-8 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transition-shadow">
      Download Resume
    </a>
  </div>
</div>

      {/* Footer */}
      <div className='flex flex-col md:flex-row justify-between items-center py-6 border-t border-neutral-200 dark:border-neutral-800'>
        <p className='text-neutral-600 dark:text-neutral-400 mb-8 md:mb-0'>
          &copy; 2025 Timothy J. Mahoney
        </p>
        <div className='flex space-x-4'>
          <a href="tel:+19083978825" className='rounded-full bg-gray-100 dark:bg-neutral-800 w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors'>
            <PhoneIcon />
          </a>
          <a href="https://github.com/Timmahoney2000" className='rounded-full bg-gray-100 dark:bg-neutral-800 w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors' target='_blank' rel="noopener noreferrer">
            <GithubIcon />
          </a>
          <a href="https://www.linkedin.com/in/timmahoney77/" className='rounded-full bg-gray-100 dark:bg-neutral-800 w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors' target='_blank' rel="noopener noreferrer">
            <LinkedinIcon />
          </a>
          <a href="https://x.com/timmahoney2000" className='rounded-full bg-gray-100 dark:bg-neutral-800 w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors' target='_blank' rel="noopener noreferrer">
            <XIcon />
          </a>
        </div>
      </div>
    </section>
  );
}