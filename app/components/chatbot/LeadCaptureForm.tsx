'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { LeadData } from '@/lib/chatbot/types';

interface LeadCaptureFormProps {
  onSubmit: (data: Partial<LeadData>) => void;
  onClose: () => void;
}

export default function LeadCaptureForm({ onSubmit, onClose }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mb-4 bg-gray-50 rounded-2xl p-6 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary-600">
          Let&apos;s Connect
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close form"
        >
          <X size={20} />
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Share your details and our team will reach out within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-primary-600">*</span>
          </label>
          <input
            type="text"
            id="lead-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-primary-600">*</span>
          </label>
          <input
            type="email"
            id="lead-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
            placeholder="you@company.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="lead-company" className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            id="lead-company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
            placeholder="Your company name"
          />
        </div>

        {/* Interest */}
        <div>
          <label htmlFor="lead-interest" className="block text-sm font-medium text-gray-700 mb-1">
            I&apos;m interested in
          </label>
          <select
            id="lead-interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-gray-900 transition-colors"
          >
            <option value="">Select an option</option>
            <option value="beginner-stream">Beginner Stream (Free)</option>
            <option value="pro-plan">Pro Plan</option>
            <option value="team-training">Team Training</option>
            <option value="enterprise">Enterprise Solutions</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Sending...</span>
          ) : (
            <>
              <Send size={18} />
              <span>Send</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
