import React, { useState, useEffect } from 'react';
import { Calendar, Scissors, Mail, Phone, MapPin, Clock, Star, Check, User } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1); // 1: service, 2: details, 3: calendly, 4: confirmation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'haircut'
  });
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    { id: 'haircut', name: 'Classic Haircut', price: '$25', duration: '30 min', icon: '✂️' },
    { id: 'beard', name: 'Beard Trim', price: '$15', duration: '20 min', icon: '🧔' },
    { id: 'combo', name: 'Haircut + Beard', price: '$35', duration: '45 min', icon: '✂️🧔' },
    { id: 'styling', name: 'Hair Styling', price: '$20', duration: '25 min', icon: '💈' },
    { id: 'color', name: 'Hair Coloring', price: '$60', duration: '60 min', icon: '🎨' },
    { id: 'treatment', name: 'Hair Treatment', price: '$45', duration: '40 min', icon: '💆' }
  ];

  const selectedService = services.find(s => s.id === formData.service);

  // Initialize Calendly widget
  useEffect(() => {
    if (step === 3) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [step]);

  const submitToGoogleSheets = () => {
    console.log('Submitting to Google Sheets:', formData);
    // In a real app: fetch('YOUR_GOOGLE_SCRIPT_URL', { method: 'POST', body: JSON.stringify(formData) });
  };

  const handleServiceSelect = (serviceId) => {
    setFormData({...formData, service: serviceId});
    setStep(2);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      submitToGoogleSheets();
    }, 800);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
      console.log('Confirmation email sent to:', formData.email);
    }, 1000);
  };

  if (step === 4) {
    return (
      <div className="confirmation-container">
        <div className="glass-card">
          <div className="icon-circle success">
            <Mail size={32} />
          </div>
          <h2>Booking Confirmed!</h2>
          <p>
            We've sent a confirmation to <span className="highlight">{formData.email}</span>
          </p>
          
          <div className="booking-summary">
            <h3>Your Appointment</h3>
            <div className="summary-item">
              <User size={18} />
              <span>{formData.name}</span>
            </div>
            <div className="summary-item">
              <Scissors size={18} />
              <span>{selectedService?.name}</span>
            </div>
            <div className="summary-item">
              <Calendar size={18} />
              <span>Date/Time Selected in Calendly</span>
            </div>
          </div>
          
          <button className="primary-btn" onClick={() => setStep(1)}>
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <div className="logo">
              <Scissors size={28} />
            </div>
            <h1>ASHKHAN Hair Studio</h1>
          </div>
          <div className="contact-info">
            <Phone size={18} />
            <span>(555) 123-4567</span>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="content-grid">
          {/* Left Side - Info */}
          <div className="info-section">
            <div className="hero">
              <h2>Premium Hair Services</h2>
              <p>
                Experience luxury grooming with our master stylists at ASHKHAN Hair Studio
              </p>
              
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#fbbf24" />
                ))}
                <span>4.9/5 (240+ reviews)</span>
              </div>
            </div>

            {/* Services Preview */}
            {step === 1 && (
              <div className="services-preview">
                <h3>Popular Services</h3>
                <div className="service-grid">
                  {services.slice(0, 4).map(service => (
                    <div key={service.id} className="service-card">
                      <div className="service-icon">{service.icon}</div>
                      <h4>{service.name}</h4>
                      <p>{service.price} • {service.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Service Summary */}
            {step > 1 && selectedService && (
              <div className="selected-service">
                <h3>Selected Service</h3>
                <div className="service-summary">
                  <div className="service-icon">{selectedService.icon}</div>
                  <div>
                    <h4>{selectedService.name}</h4>
                    <p>{selectedService.price} • {selectedService.duration}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Location & Hours */}
            <div className="info-cards">
              <div className="info-card">
                <div className="card-header">
                  <MapPin size={18} />
                  <h4>Location</h4>
                </div>
                <p>
                  123 Main Street<br />
                  Downtown, NY 10001
                </p>
              </div>
              
              <div className="info-card">
                <div className="card-header">
                  <Clock size={18} />
                  <h4>Hours</h4>
                </div>
                <p>
                  Mon-Sat: 9AM-7PM<br />
                  Sunday: 10AM-5PM
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Flow with Vertical Steps */}
          <div className="booking-section">
            <div className="booking-flow">
              {/* Vertical Step Indicator */}
              <div className="vertical-steps">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>
                  <div className="step-number">{step > 1 ? <Check size={16} /> : 1}</div>
                  <div className="step-content">
                    <h4>Select Service</h4>
                    <p>Choose your desired service</p>
                  </div>
                </div>
                
                <div className="step-connector"></div>
                
                <div className={`step ${step >= 2 ? 'active' : ''}`}>
                  <div className="step-number">{step > 2 ? <Check size={16} /> : 2}</div>
                  <div className="step-content">
                    <h4>Your Details</h4>
                    <p>Provide contact information</p>
                  </div>
                </div>
                
                <div className="step-connector"></div>
                
                <div className={`step ${step >= 3 ? 'active' : ''}`}>
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Schedule</h4>
                    <p>Pick date & time</p>
                  </div>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="step-content-area">
                {step === 1 && (
                  <div className="service-selection">
                    <div className="booking-header">
                      <Calendar size={36} />
                      <h2>Select a Service</h2>
                    </div>
                    
                    <div className="service-options">
                      {services.map(service => (
                        <div 
                          key={service.id}
                          className={`service-option ${formData.service === service.id ? 'selected' : ''}`}
                          onClick={() => handleServiceSelect(service.id)}
                        >
                          <div className="option-icon">{service.icon}</div>
                          <div className="option-details">
                            <h3>{service.name}</h3>
                            <p>{service.price} • {service.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="details-form">
                    <div className="booking-header">
                      <User size={36} />
                      <h2>Your Information</h2>
                      <p>We'll use this to confirm your appointment</p>
                    </div>
                    
                    <form onSubmit={handleDetailsSubmit}>
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        className="primary-btn"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="spinner"></div>
                        ) : (
                          'Continue to Scheduling'
                        )}
                      </button>
                    </form>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="calendly-container">
                    <div className="booking-header">
                      <Calendar size={36} />
                      <h2>Select Date & Time</h2>
                      <p>Choose a convenient time for your appointment</p>
                    </div
                    {/* ADD YOUR CALENDLY LINK HERE 👇 */}
    <div 
      className="calendly-inline-widget"
      data-url="https://calendly.com/pratiksthanki/30min" // 👈 Replace this with your link
        style={{ minWidth: '320px', height: '600px' }}
    />
  </div>
                    <div className="calendly-widget">
                      <div className="calendly-placeholder">
                        <div className="spinner"></div>
                        <p>Loading scheduling options...</p>
                      </div>
                    </div>
                    
                    <button 
                      className="primary-btn"
                      onClick={handleBookingComplete}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="spinner"></div>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --primary: #8b5cf6;
          --primary-dark: #7c3aed;
          --secondary: #0ea5e9;
          --dark: #1e293b;
          --darker: #0f172a;
          --light: #f8fafc;
          --gray: #94a3b8;
          --success: #10b981;
          --glass: rgba(255, 255, 255, 0.08);
          --glass-border: rgba(255, 255, 255, 0.18);
          --shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        body {
          background: linear-gradient(135deg, var(--darker) 0%, var(--dark) 100%);
          color: var(--light);
          min-height: 100vh;
        }
        
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        /* Header Styles */
        .app-header {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--glass-border);
          padding: 0 20px;
        }
        
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .logo {
          width: 44px;
          height: 44px;
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .logo svg {
          color: white;
        }
        
        .brand h1 {
          font-size: 1.4rem;
          font-weight: 700;
          background: linear-gradient(to right, #e0e7ff, #c7d2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .contact-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gray);
          font-size: 0.9rem;
        }
        
        /* Main Content */
        .main-content {
          flex: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 40px;
          align-items: start;
        }
        
        @media (max-width: 900px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Info Section */
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        .hero h2 {
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 16px;
          background: linear-gradient(to right, #e0e7ff, #c7d2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero p {
          font-size: 1.1rem;
          color: var(--gray);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        
        .rating {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .rating span {
          color: var(--gray);
          font-size: 0.9rem;
          margin-left: 8px;
        }
        
        /* Services Grid */
        .services-preview h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--light);
        }
        
        .service-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .service-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .service-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.4);
        }
        
        .service-icon {
          font-size: 1.8rem;
          margin-bottom: 12px;
        }
        
        .service-card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .service-card p {
          font-size: 0.9rem;
          color: var(--gray);
        }
        
        /* Selected Service */
        .selected-service {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 20px;
        }
        
        .selected-service h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--light);
        }
        
        .service-summary {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .service-summary .service-icon {
          font-size: 2.2rem;
          margin: 0;
          background: rgba(139, 92, 246, 0.15);
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .service-summary h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .service-summary p {
          font-size: 0.9rem;
          color: var(--gray);
        }
        
        /* Info Cards */
        .info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        
        .info-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 20px;
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: var(--light);
        }
        
        .card-header h4 {
          font-size: 1rem;
          font-weight: 600;
        }
        
        .info-card p {
          color: var(--gray);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        
        /* Booking Section */
        .booking-section {
          background: var(--glass);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
        }
        
        .booking-section:hover {
          border-color: rgba(139, 92, 246, 0.3);
        }
        
        .booking-flow {
          display: flex;
          min-height: 600px;
        }
        
        /* Vertical Steps */
        .vertical-steps {
          width: 220px;
          background: rgba(15, 23, 42, 0.4);
          border-right: 1px solid var(--glass-border);
          padding: 30px 20px;
        }
        
        .step {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 30px;
          position: relative;
        }
        
        .step.active {
          color: white;
        }
        
        .step:not(.active) {
          color: var(--gray);
        }
        
        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          flex-shrink: 0;
          z-index: 2;
        }
        
        .step.active .step-number {
          background: var(--primary);
          color: white;
        }
        
        .step-content h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .step-content p {
          font-size: 0.85rem;
          opacity: 0.8;
        }
        
        .step-connector {
          position: absolute;
          top: 32px;
          left: 16px;
          height: calc(100% + 10px);
          width: 2px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 1;
        }
        
        .step.active + .step-connector {
          background: var(--primary);
        }
        
        /* Step Content Area */
        .step-content-area {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
          max-height: 600px;
        }
        
        .booking-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .booking-header svg {
          color: var(--primary);
          margin-bottom: 16px;
        }
        
        .booking-header h2 {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .booking-header p {
          color: var(--gray);
          font-size: 0.95rem;
        }
        
        /* Service Selection */
        .service-options {
          padding: 10px 0;
        }
        
        .service-option {
          display: flex;
          align-items: center;
          padding: 18px 20px;
          background: rgba(15, 23, 42, 0.4);
          border-radius: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        
        .service-option:hover {
          transform: translateX(5px);
          border-color: rgba(139, 92, 246, 0.3);
        }
        
        .service-option.selected {
          background: rgba(139, 92, 246, 0.15);
          border-color: var(--primary);
        }
        
        .option-icon {
          font-size: 1.6rem;
          margin-right: 16px;
        }
        
        .option-details {
          flex: 1;
        }
        
        .option-details h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .option-details p {
          font-size: 0.9rem;
          color: var(--gray);
        }
        
        /* Form Styles */
        .details-form {
          padding: 10px 0;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--light);
          margin-bottom: 8px;
        }
        
        input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s ease;
        }
        
        input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
        }
        
        input::placeholder {
          color: var(--gray);
        }
        
        /* Button Styles */
        .primary-btn {
          width: 100%;
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          color: white;
          font-weight: 600;
          padding: 16px;
          border-radius: 12px;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
        }
        
        .primary-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        /* Calendly Container */
        .calendly-container {
          padding: 10px 0;
        }
        
        .calendly-widget {
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 24px;
          position: relative;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid var(--glass-border);
        }
        
        .calendly-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: var(--gray);
        }
        
        /* Confirmation Page */
        .confirmation-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, var(--darker) 0%, var(--dark) 100%);
        }
        
        .glass-card {
          background: var(--glass);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 40px;
          max-width: 500px;
          width: 100%;
          text-align: center;
          box-shadow: var(--shadow);
        }
        
        .icon-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }
        
        .icon-circle.success {
          background: rgba(16, 185, 129, 0.15);
          color: var(--success);
        }
        
        .glass-card h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: white;
        }
        
        .glass-card p {
          color: var(--gray);
          font-size: 1.1rem;
          margin-bottom: 32px;
          line-height: 1.6;
        }
        
        .highlight {
          color: var(--light);
          font-weight: 500;
        }
        
        .booking-summary {
          background: rgba(15, 23, 42, 0.4);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          text-align: left;
        }
        
        .booking-summary h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: white;
          text-align: center;
        }
        
        .summary-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--glass-border);
        }
        
        .summary-item:last-child {
          border-bottom: none;
        }
        
        .summary-item svg {
          color: var(--primary);
        }
        
        /* Spinner */
        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 12px;
          }
          
          .hero h2 {
            font-size: 1.8rem;
          }
          
          .service-grid {
            grid-template-columns: 1fr;
          }
          
          .booking-flow {
            flex-direction: column;
          }
          
          .vertical-steps {
            width: 100%;
            padding: 20px;
            display: flex;
            justify-content: center;
            gap: 20px;
            border-right: none;
            border-bottom: 1px solid var(--glass-border);
          }
          
          .step {
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 0;
          }
          
          .step-connector {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .booking-header h2 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
