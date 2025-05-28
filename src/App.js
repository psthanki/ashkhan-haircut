import React, { useState } from 'react';
import { Calendar, Scissors, Mail, Phone, MapPin, Clock, Star } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'haircut'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    { id: 'haircut', name: 'Classic Haircut', price: '$25', duration: '30 min' },
    { id: 'beard', name: 'Beard Trim', price: '$15', duration: '20 min' },
    { id: 'combo', name: 'Haircut + Beard', price: '$35', duration: '45 min' },
    { id: 'styling', name: 'Hair Styling', price: '$20', duration: '25 min' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate email sending
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      
      // Send confirmation email (placeholder for actual implementation)
      console.log('Confirmation email sent to:', formData.email);
      
      // Open Calendly after form submission
      setTimeout(() => {
        window.open('https://calendly.com/ashkhan-haircut', '_blank');
      }, 1500);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Confirmation Sent!</h2>
          <p className="text-gray-300 mb-4">
            We've sent a confirmation email to <span className="text-blue-400">{formData.email}</span>
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Opening Calendly to book your appointment...
          </p>
          <button
            onClick={() => window.open('https://calendly.com/ashkhan-haircut', '_blank')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Book Now on Calendly
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">ASHKHAN Haircut</h1>
            </div>
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Professional Haircuts & Styling
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Experience premium grooming services with ASHKHAN's expert touch
              </p>
              
              <div className="flex items-center space-x-2 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} classNam
