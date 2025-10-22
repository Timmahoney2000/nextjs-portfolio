import React from 'react';
import Header from '../reuseable-components/Header';
import { AnimatedTestimonials } from './animated-testimonials';

 const testimonials = [
    {
      quote:
        "Timothy transformed our outdated website into a sleek, responsive platform that perfectly represents our brand. His attention to detail and ability to bring our ideas to life exceeded all expectations. We immediately saw an increase in user engagement after launch.",
      name: "Sherri Chung",
      designation: "Product Manager at Beam",
      src: "/images/sherri-chung.jpg",
    },
    {
      quote:
        "Working with timothy was effortless - he is communicative, reliable, and delivers high-quality solutions on time. I would trust him with any project, big or small.",
      name: "Finnegan Daniels",
      designation: "CTO at FLJ Solutions",
      src: "/images/finn-daniels.jpg",
    },
    {
      quote:
        "Timothy built a custom web solution that streamlined our operations and improved customer satisfaction. He's a problem-solver who genuinely cares about delivering results. His professionalism and creativity made the entire process smooth from start to finish.",
      name: "J.K. Owens",
      designation: "Operations Director at Park Seafood",
      src: "/images/jk-owens.jpg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "David Dameron",
      designation: "Site Lead at Unisys",
      src: "/images/david-dameron.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/images/lisa-thompson.jpg",
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


