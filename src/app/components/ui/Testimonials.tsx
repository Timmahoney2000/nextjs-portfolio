import React from 'react';
import Header from '../reuseable-components/Header';
import { AnimatedTestimonials } from './animated-testimonials';

 const testimonials = [
    {
      quote:
        "Timothy transformed our outdated website into a sleek, responsive platform that perfectly represents our brand. His attention to detail and ability to bring our ideas to life exceeded all expectations. We immediately saw an increase in user engagement after launch.",
      name: "Sherri Chung",
      designation: "Product Manager at Beam",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Working with timothy was effortless - he&apos;s communicative, reliable, and delivers high-quality solutions on time. I&apos;d trust him with any project, big or small.",
      name: "Finnegan Daniels",
      designation: "CTO at FLJ Solutions",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Timothy built a custom web solution that streamlined our operations and improved customer satisfaction. He's a problem-solver who genuinely cares about delivering results. His professionalism and creativity made the entire process smooth from start to finish.",
      name: "James Clearfield",
      designation: "Operations Director at Park Seafood",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

export default function Testimonials() {
  return (
    <section id="testimonials">
        <Header title='Testimonials'/>
<AnimatedTestimonials testimonials={testimonials} autoplay={true}/>
    </section>
  )
}


