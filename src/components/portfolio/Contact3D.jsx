import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Github, Linkedin, Mail, Twitter, Send, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Sakith-9900', color: '#fff' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sakith-gunarathna-581334352/', color: '#0077b5' },
  { icon: Twitter, label: 'Twitter', href: 'https://x.com/home', color: '#1da1f2' },
  { icon: Mail, label: 'Email', href: 'sakithmandira@gmail.com', color: '#ea4335' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'sakithmandira@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+94 77 007 6363' },
  { icon: MapPin, label: 'Location', value: 'Colombo,Srilanka' },
];

export default function Contact3D() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully!', {
      description: "I'll get back to you as soon as possible.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-32 bg-[#0a0a1a] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have a project in mind? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      boxShadow: `0 10px 30px ${social.color}40`
                    }}
                    className="group relative p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
                  >
                    <social.icon
                      className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                      style={{ color: social.color }}
                    />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.label}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-gray-600/50 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-cyan-500/10">
                    <info.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{info.label}</p>
                    <p className="text-white">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="relative">
              {/* Form glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50" />

              <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
                <div className="space-y-6">
                  {/* Name Input */}
                  <motion.div
                    animate={focusedField === 'name' ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className="w-full bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-12 rounded-xl"
                        required
                      />
                      {focusedField === 'name' && (
                        <motion.div
                          layoutId="inputGlow"
                          className="absolute inset-0 -z-10 rounded-xl bg-cyan-500/10 blur-md"
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Email Input */}
                  <motion.div
                    animate={focusedField === 'email' ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <div className="relative">
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        className="w-full bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-12 rounded-xl"
                        required
                      />
                      {focusedField === 'email' && (
                        <motion.div
                          layoutId="inputGlow"
                          className="absolute inset-0 -z-10 rounded-xl bg-cyan-500/10 blur-md"
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Message Input */}
                  <motion.div
                    animate={focusedField === 'message' ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <label className="block text-sm font-medium text-gray-400 mb-2">Your Message</label>
                    <div className="relative">
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell me about your project..."
                        rows={5}
                        className="w-full bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-xl resize-none"
                        required
                      />
                      {focusedField === 'message' && (
                        <motion.div
                          layoutId="inputGlow"
                          className="absolute inset-0 -z-10 rounded-xl bg-cyan-500/10 blur-md"
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium rounded-xl relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}