import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Sakith-9900', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sakith-gunarathna-581334352/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/home', label: 'Twitter' },
  { icon: Mail, href: 'sakithmandira@gmail.com', label: 'Email' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer3D() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050510] border-t border-gray-800/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-cyan-500/5 to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Scroll to top button */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Sakith.dev
              </span>
            </motion.h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Full-Stack Developer & UI/UX Designer crafting digital experiences that make a difference.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="p-2.5 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:border-cyan-500/30 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <a 
                    href={link.href}
                    className="text-gray-500 hover:text-cyan-400 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-cyan-400 transition-colors" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-white font-medium mb-4">Stay Updated</h4>
            <p className="text-gray-500 text-sm mb-4">
              Get notified about my latest projects and tech insights.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-cyan-500/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Sakith Mandira. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React & Three.js
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </footer>
  );
}