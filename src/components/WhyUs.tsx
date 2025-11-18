import React from 'react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    icon: 'fas fa-clock',
    title: 'Fast Turnaround',
    description: 'Quick delivery without compromising quality'
  },
  {
    icon: 'fas fa-star',
    title: 'High-Quality Printing',
    description: 'Top-notch printing with sharp, vibrant colors'
  },
  {
    icon: 'fas fa-dollar-sign',
    title: 'Affordable Pricing',
    description: 'Competitive rates with premium service'
  },
  {
    icon: 'fas fa-handshake',
    title: 'Reliable Customer Support',
    description: 'Dedicated team to assist you at every step'
  }
];

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="why-us py-20 bg-white text-center px-5%">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Us?</h2>
      <div className="features grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature bg-gray-50 p-8 rounded-lg transition-transform duration-300 hover:-translate-y-2"
          >
            <i className={`${feature.icon} text-3xl text-secondary mb-4`}></i>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};