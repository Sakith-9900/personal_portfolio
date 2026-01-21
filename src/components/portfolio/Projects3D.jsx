import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce solution with real-time inventory, AI-powered recommendations, and seamless checkout experience.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&h=400&fit=crop',
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    color: '#00d4ff',
  },
  {
    title: 'Health & Fitness App',
    description: 'Mobile-first fitness tracking application with workout plans, nutrition logging, and social features for community motivation.',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=400&fit=crop',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
    color: '#a855f7',
  },
  {
    title: 'AI Content Studio',
    description: 'Creative platform leveraging AI to generate marketing content, social media posts, and brand assets automatically.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    techStack: ['Python', 'OpenAI', 'React', 'FastAPI'],
    liveUrl: '#',
    githubUrl: '#',
    color: '#22c55e',
  },
  {
    title: 'Real Estate Portal',
    description: 'Property listing platform with virtual tours, mortgage calculator, and AI-powered property matching.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    techStack: ['Vue.js', 'Django', 'Three.js', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    color: '#f59e0b',
  },
];

export default function Projects3D() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCard, setFlippedCard] = useState(null);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setFlippedCard(null);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setFlippedCard(null);
  };

  return (
    <section id="projects" className="relative py-32 bg-[#0a0a1a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative">
          {/* Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-20 pointer-events-none px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevProject}
              className="pointer-events-auto p-3 rounded-full bg-gray-800/80 border border-gray-700 text-white hover:border-cyan-500/50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextProject}
              className="pointer-events-auto p-3 rounded-full bg-gray-800/80 border border-gray-700 text-white hover:border-cyan-500/50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Cards Container */}
          <div className="flex justify-center items-center min-h-[500px] perspective-1000">
            {projects.map((project, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;
              const isFlipped = flippedCard === index;
              
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? {
                    opacity: Math.abs(offset) <= 1 ? 1 : 0,
                    scale: isActive ? 1 : 0.85,
                    x: offset * 320,
                    z: isActive ? 0 : -100,
                    rotateY: offset * -15,
                  } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`absolute w-full max-w-md cursor-pointer ${Math.abs(offset) > 1 ? 'pointer-events-none' : ''}`}
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => isActive && setFlippedCard(isFlipped ? null : index)}
                >
                  <div
                    className="relative w-full transition-transform duration-700"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front of card */}
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div 
                        className="absolute -inset-1 opacity-50 blur-xl"
                        style={{ backgroundColor: project.color }}
                      />
                      <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-700/50">
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                          <div 
                            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: `${project.color}cc` }}
                          >
                            {index + 1} / {projects.length}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech) => (
                              <span 
                                key={tech}
                                className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <p className="text-xs text-cyan-400 text-center">Click to flip for details</p>
                        </div>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div 
                        className="absolute -inset-1 opacity-50 blur-xl"
                        style={{ backgroundColor: project.color }}
                      />
                      <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                        
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <span 
                                key={tech}
                                className="px-4 py-2 text-sm rounded-lg text-white"
                                style={{ backgroundColor: `${project.color}30`, border: `1px solid ${project.color}50` }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-4 mt-8">
                          <a
                            href={project.liveUrl}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                          <a
                            href={project.githubUrl}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-600 text-white font-medium hover:bg-gray-800 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-12">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setFlippedCard(null);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-cyan-400' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}