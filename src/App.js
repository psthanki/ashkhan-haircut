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
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="text-gray-300 ml-2">4.9/5 (120+ reviews)</span>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Our Services</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{service.name}</h4>
                      <p className="text-gray-400 text-sm flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.duration}
                      </p>
                    </div>
                    <span className="text-blue-400 font-semibold">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Hours */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-white mb-2">
                  <MapPin className="w-4 h-4" />
                  <h4 className="font-semibold">Location</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  123 Main Street<br />
                  Downtown, NY 10001
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-white mb-2">
                  <Clock className="w-4 h-4" />
                  <h4 className="font-semibold">Hours</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Mon-Sat: 9AM-7PM<br />
                  Sunday: 10AM-5PM
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Book Your Appointment</h2>
              <p className="text-gray-300">Fill out the form below and we'll confirm your booking</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id} className="bg-gray-800">
                      {service.name} - {service.price}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Confirmation...</span>
                  </div>
                ) : (
                  'Book Appointment'
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                After submitting, you'll receive a confirmation email and be redirected to Calendly to select your preferred time slot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
