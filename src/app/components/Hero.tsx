import React from 'react';
import { cn } from '@/lib/utils';
import { TextGenerateEffect } from './ui/text-generate-effect';
import { Spotlight } from './ui/Spotlight';

export default function Hero() {
  return (
    <section id="home" className="relative">
      <Spotlight fill="white" className="top-10 left-10" />
      <Spotlight fill="white" className="-top-60 -left-50" />
      <Spotlight fill="indigo" className="-top-20 -right-20" />

      <div className="relative h-[90vh] lg:h-screen flex items-center justify-center">
        {/* Background grid */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />

        {/* Radial gradient mask purely for background */}
        <div className="pointer-events-none absolute inset-0 bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] z-10" />

        {/* Content */}
        <div className="relative z-50 flex flex-col items-center text-center px-4">
          <h2 className="text-neutral-600 dark:text-neutral-300 uppercase text-xl">
            Next.js Fullstack Developer | AI Agent Architect
          </h2>
          <TextGenerateEffect words="Turning imagination into seamless interaction." />
          <p className="text-neutral-600 dark:text-neutral-300 lg:text-xl md:tracking-wider mt-2">
            Hello, I&apos;m Tim. A Fullstack Developer & AI Agent Architect.
          </p>

          <div className="flex justify-center my-6">
            <a
              href="#RecentProjects"
              className="px-8 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              Explore My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
