import React from 'react';
import Header from './reuseable-components/Header';
import Image from 'next/image';

export default function About() {
  return (
    <section id='About' className="my-20 mt-40">
      <Header title='About Me'/>
      <div className='grid gap-4 items-center md:[grid-template-columns:1fr_1.5fr]'>
        <div>
    <Image src="/images/about-image.png" alt="about-image"width={500}height={500} className='w-full h-80 md:h-120 object-cover rounded-lg'/>
    </div>
    <div className='md:text-xl text-neutral-600 dark:text-neutral-300'>
      <p className='mb-3'>Hi, I&apos;m Timothy Mahoney - a passionate Full Stack Developer and lifelong problem solver dedicated to building clean, scalable, and user-focused digital experiences. With a background in hardware engineering and IT field service, I bring a unique systems-level perspective to every project - from server logic to the last pixel of the user interface.
      </p>
      <p>I specialize in React, Next.js, Tailwind, and Node, leveraging modern frameworks and best practices to craft fast, responsive web applications that deliver real value. Whether I&apos;m designing an intuitive front end or optimizing backend performance, my goal is always the same: to create seamless, high-impact solutions that make technology feel effortless.</p>
    </div>
      </div>
    </section>
  );
};
