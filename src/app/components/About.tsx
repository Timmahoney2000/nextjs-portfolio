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
      <p className='mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem error illum, totam eaque cumque non praesentium repellat harum voluptatem quos. Fugit maxime eum repellat officiis esse soluta ea accusantium modi?
      </p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse enim ipsa laudantium, voluptatum veniam et quidem! Vel, distinctio delectus minima voluptatum laborum eos id laudantium! Minima, corrupti fugit. Tempore architecto omnis voluptate maiores quia saepe reprehenderit minima repellendus suscipit impedit?</p>
    </div>
      </div>
    </section>
  );
};
