import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment by clicking on the 'Book Appointment' button in the header or on your dashboard. Simply fill in the details and submit."
  },
  {
    question: "Can I cancel my appointment?",
    answer: "Yes, you can cancel your appointment from the 'My Appointments' section. Please try to cancel at least 24 hours in advance."
  },
  {
    question: "What should I bring for my first visit?",
    answer: "Please bring your ID, insurance card, and any medical reports or history you have. This helps our doctors provide the best care."
  },
  {
    question: "Are there any emergency services available?",
    answer: "Yes, our hospital provides 24/7 emergency services. You can contact our emergency number or visit the ER immediately."
  }
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors hover:bg-gray-50"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-700">{faq.question}</span>
                <span className="text-blue-600">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
