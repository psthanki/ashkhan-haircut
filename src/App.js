import React, { useState } from 'react';
import { Calendar, Scissors, Mail, Phone, MapPin, Clock, Star, ChevronRight, ChevronLeft, Check, User, CreditCard } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'haircut',
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    { id: 'haircut', name: 'Classic Haircut', price: '$25', duration: '30 min', description: 'Professional cut with styling' },
    { id: 'beard', name: 'Beard Trim', price: '$15', duration: '20 min', description: 'Precision beard trimming' },
    { id: 'combo', name: 'Haircut + Beard', price: '$35', duration: '45 min', description: 'Complete grooming package' },
    { id: 'styling', name: 'Hair Styling', price: '$20', duration: '25 min', description: 'Professional styling service' }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'
  ];

  const steps = [
    { number: 1, title: 'Service', icon: Scissors },
    { number: 2, title: 'Date & Time', icon: Calendar },
    { number: 3, title: 'Contact Info', icon: User },
    { number: 4, title: 'Confirmation', icon: Check }
  ];

  // Generate available dates (next 14 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) { // Exclude Sundays
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceSelect = (serviceId) => {
    setFormData({ ...formData, service: serviceId });
  };

  const handleDateSelect = (date) => {
    setFormData({ ...formData, date: date.toISOString().split('T')[0] });
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, time });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Here you would integrate with Google Sheets API
      // Example Google Sheets integration:
      /*
      const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: services.find(s => s.id === formData.service)?.name,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
          timestamp: new Date().toISOString()
        })
      });
      */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setIsLoading(false);
      
      console.log('Booking data:', formData);
      console.log('Data would be saved to Google Sheets');
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.service;
      case 2: return formData.date && formData.time;
      case 3: return formData.name && formData.email && formData.phone;
      default: return true;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
          <div className="bg-white/5 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Appointment Details</h3>
            <div className="space-y-2 text-left">
              <p className="text-gray-300"><span className="text-white font-medium">Service:</span> {services.find(s => s.id === formData.service)?.name}</p>
              <p className="text-gray-300"><span className="text-white font-medium">Date:</span> {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-gray-300"><span className="text-white font-medium">Time:</span> {formData.time}</p>
              <p className="text-gray-300"><span className="text-white font-medium">Name:</span> {formData.name}</p>
            </div>
          </div>
          <p className="text-gray-300 mb-6">
            A confirmation email has been sent to <span className="text-blue-400">{formData.email}</span>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Scissors size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ASHKHAN</h1>
              <p className="text-sm text-gray-300">Premium Hair Salon</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-300">
              <Phone size={16} />
              <span className="text-sm">(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin size={16} />
              <span className="text-sm">123 Main St, NY</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${index < steps.length - 1 ? 'pr-4' : ''}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted ? 'bg-green-500' : isActive ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-600'
                    }`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="hidden md:block">
                      <p className={`text-sm font-medium ${isActive || isCompleted ? 'text-white' : 'text-gray-400'}`}>
                        Step {step.number}
                      </p>
                      <p className={`text-xs ${isActive || isCompleted ? 'text-gray-300' : 'text-gray-500'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight size={16} className="text-gray-500 ml-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Choose Your Service</h2>
              <p className="text-gray-300 mb-8">Select the service you'd like to book</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                      formData.service === service.id
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                      <span className="text-2xl font-bold text-blue-400">{service.price}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{service.description}</p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock size={14} className="mr-2" />
                      {service.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Select Date & Time</h2>
              <p className="text-gray-300 mb-8">Choose your preferred appointment slot</p>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Available Dates</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {availableDates.map((date, index) => (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(date)}
                        className={`p-4 rounded-xl text-left transition-all duration-200 ${
                          formData.date === date.toISOString().split('T')[0]
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-semibold">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-sm">
                          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Available Times</h3>
                  <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        disabled={!formData.date}
                        className={`p-3 rounded-lg text-sm transition-all duration-200 ${
                          formData.time === time
                            ? 'bg-blue-500 text-white'
                            : formData.date
                            ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                            : 'bg-gray-600/50 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {!formData.date && (
                    <p className="text-gray-400 text-sm mt-2">Please select a date first</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Contact Information</h2>
              <p className="text-gray-300 mb-8">We'll use this info to confirm your appointment</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Special Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requests or notes..."
                    rows={3}
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Confirm Your Booking</h2>
              <p className="text-gray-300 mb-8">Please review your appointment details</p>
              
              <div className="bg-white/5 rounded-2xl p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Service Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="text-white font-medium">Service:</span> {services.find(s => s.id === formData.service)?.name}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">Price:</span> {services.find(s => s.id === formData.service)?.price}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">Duration:</span> {services.find(s => s.id === formData.service)?.duration}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Appointment Time</h3>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="text-white font-medium">Date:</span> {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">Time:</span> {formData.time}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span className="text-white font-medium">Name:</span> {formData.name}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-white font-medium">Email:</span> {formData.email}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-white font-medium">Phone:</span> {formData.phone}
                    </p>
                    {formData.notes && (
                      <p className="text-gray-300">
                        <span className="text-white font-medium">Notes:</span> {formData.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Continue</span>
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isLoading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Confirming...</span>
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    <span>Confirm Booking</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="text-yellow-400" size={20} />
              <h3 className="text-lg font-semibold text-white">4.9/5 Rating</h3>
            </div>
            <p className="text-gray-300 text-sm">Over 500+ satisfied customers</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="text-blue-400" size={20} />
              <h3 className="text-lg font-semibold text-white">Quick Service</h3>
            </div>
            <p className="text-gray-300 text-sm">Professional cuts in 30 minutes</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="text-green-400" size={20} />
              <h3 className="text-lg font-semibold text-white">Prime Location</h3>
            </div>
            <p className="text-gray-300 text-sm">Downtown with easy parking</p>
          </div>
        </div>
      </div>
    </div>
  );
}
