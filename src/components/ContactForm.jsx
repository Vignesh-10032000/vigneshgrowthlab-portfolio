import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check, ShieldAlert, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import {
  CONTACT,
  BRAND,
  CONTACT_SERVICE_OPTIONS,
} from '../data/portfolioData';
import { waLink } from '../utils/whatsapp';

const BUDGET_OPTIONS = [
  {
    id: 'Basic',
    title: 'Basic',
    desc: 'Starter websites — from ₹8,000',
    highlight: false
  },
  {
    id: 'Professional',
    title: 'Professional',
    badge: 'Recommended',
    desc: 'For growing businesses seeking scale',
    highlight: true
  },
  {
    id: 'Premium',
    title: 'Premium',
    desc: 'POS, automation & custom apps',
    highlight: false
  }
];

const SERVICE_OPTIONS = CONTACT_SERVICE_OPTIONS;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    businessName: '',
    budget: 'Professional',
    websiteType: 'Business Website',
    selectedServices: ['Website Development'],
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(service);
      const updated = exists
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service];
      return { ...prev, selectedServices: updated };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const formattedServices = formData.selectedServices.length > 0
      ? formData.selectedServices.map((s) => `• ${s}`).join('\n')
      : '• Not specified';

    const rawMessage = `*NEW ENQUIRY — VIGNESH GROWTH LAB*
────────────────────────────
*Client Name:* ${formData.name.trim()}
*WhatsApp:* ${formData.whatsapp.trim()}
*Email:* ${formData.email.trim()}
*Business/Brand:* ${formData.businessName.trim() || 'N/A'}
────────────────────────────
*Selected Budget:* ${formData.budget}
*Website Type:* ${formData.websiteType}
────────────────────────────
*Services Required:*
${formattedServices}
────────────────────────────
*Project Details:*
${formData.description.trim() || 'No additional details provided.'}
────────────────────────────
_Sent via ${BRAND.name} Web Portal_`;

    const whatsappUrl = waLink(rawMessage);

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank');
    }, 400);
  };

  return (
    <section id="contact" className="py-28 bg-[#050505] relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col items-start space-y-4 mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#4B72E8]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#4B72E8] animate-ping"></span>
            <span className="text-[#4B72E8] font-bold">FINALE</span>
            <span className="text-white/40">|</span>
            <span>START YOUR PROJECT TODAY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            LET&apos;S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B72E8] via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(75,114,232,0.4)]">
              SOMETHING GREAT TOGETHER.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-3xl">
            Tell Vignesh about your project goals and budget. You&apos;ll get a free 30-min strategy call — honest advice, no sales pitch.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            data-aos="fade-right"
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="glass-card p-8 rounded-3xl border-white/10 bg-[#141414]/90 shadow-2xl">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#4B72E8] mb-6">
                Direct Contact Channels
              </h3>
              
              <div className="space-y-6">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/50 uppercase block font-bold">WhatsApp / Direct Line</span>
                    <span className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">{CONTACT.phoneDisplay}</span>
                  </div>
                </a>

                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-[#4B72E8]/10 border border-[#4B72E8]/30 text-[#4B72E8]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/50 uppercase block font-bold">Official Email</span>
                    <span className="text-sm font-bold text-white group-hover:text-[#4B72E8] break-all">{CONTACT.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/50 uppercase block font-bold">Location</span>
                    <span className="text-sm font-bold text-white">{CONTACT.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border-white/10 bg-[#141414]/80 flex items-start gap-4 shadow-xl">
              <div className="p-2.5 rounded-xl bg-[#4B72E8]/10 text-[#4B72E8] border border-[#4B72E8]/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">Proposal in 24 Hours</h4>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Free 30-min strategy call. Custom proposal in 24 hours — fixed price, clear scope, no hidden costs.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 glass-card p-6 sm:p-10 rounded-3xl border-white/10 bg-[#141414]/95 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                    Your Name <span className="text-[#4B72E8]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className={`w-full bg-[#050505] border ${
                      errors.name ? 'border-red-500' : 'border-white/10 focus:border-[#4B72E8]'
                    } rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 font-mono`}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400 font-mono flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                    WhatsApp Number <span className="text-[#4B72E8]">*</span>
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 9876543210"
                    className={`w-full bg-[#050505] border ${
                      errors.whatsapp ? 'border-red-500' : 'border-white/10 focus:border-[#4B72E8]'
                    } rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 font-mono`}
                  />
                  {errors.whatsapp && (
                    <span className="text-xs text-red-400 font-mono flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> {errors.whatsapp}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                    Email Address <span className="text-[#4B72E8]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john@brand.com"
                    className={`w-full bg-[#050505] border ${
                      errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#4B72E8]'
                    } rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 font-mono`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400 font-mono flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                    Business / Brand Name <span className="text-white/40 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g. ABC Store"
                    className="w-full bg-[#050505] border border-white/10 focus:border-[#4B72E8] rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                  Select Project Budget Range <span className="text-[#4B72E8]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {BUDGET_OPTIONS.map((opt) => {
                    const selected = formData.budget === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setFormData({ ...formData, budget: opt.id })}
                        className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 relative flex flex-col justify-between ${
                          selected
                            ? 'bg-[#1c1c1c] border-[#4B72E8] shadow-[0_0_20px_rgba(75,114,232,0.3)] ring-1 ring-[#4B72E8]'
                            : 'bg-[#050505] border-white/10 hover:border-white/20'
                        }`}
                      >
                        {opt.badge && (
                          <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-extrabold uppercase bg-[#4B72E8] text-white shadow-md">
                            {opt.badge}
                          </span>
                        )}

                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-base font-bold font-heading ${selected ? 'text-[#4B72E8]' : 'text-white'}`}>
                            {opt.title}
                          </span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selected ? 'border-[#4B72E8] bg-[#4B72E8]' : 'border-white/20'}`}>
                            {selected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                          </div>
                        </div>

                        <p className="text-xs text-white/60 font-light leading-tight">
                          {opt.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                  Project Type <span className="text-[#4B72E8]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Business Website', 'E-commerce Website', 'Retail POS', 'WhatsApp AI Automation'].map((type) => {
                    const selected = formData.websiteType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, websiteType: type })}
                        className={`py-3.5 px-5 rounded-xl border text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-between ${
                          selected
                            ? 'bg-[#4B72E8]/10 border-[#4B72E8] text-[#4B72E8]'
                            : 'bg-[#050505] border-white/10 text-white hover:border-white/20'
                        }`}
                      >
                        <span>{type}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selected ? 'border-[#4B72E8] bg-[#4B72E8]' : 'border-white/20'}`}>
                          {selected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                  Services Required <span className="text-white/40 text-[10px]">(Select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((service) => {
                    const selected = formData.selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-2 ${
                          selected
                            ? 'bg-[#4B72E8] border-[#4B72E8] text-white shadow-md font-bold'
                            : 'bg-[#050505] border-white/10 text-white/70 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        <span>{service}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                  Project Description & Requirements
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell Vignesh about your business goals, timelines, or reference websites..."
                  className="w-full bg-[#050505] border border-white/10 focus:border-[#4B72E8] rounded-xl p-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="netflix-red-btn w-full py-4 rounded-xl text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(75,114,232,0.6)] hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <span>Opening WhatsApp...</span>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 fill-current" />
                    Send Enquiry on WhatsApp ({CONTACT.phoneDisplay})
                  </>
                )}
              </button>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;
