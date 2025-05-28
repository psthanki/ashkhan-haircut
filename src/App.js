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
    
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      
      console.log('Confirmation email sent to:', formData.email);
      
      setTimeout(() => {
        window.open('https://calendly.com/pratiksthanki/30min', '_blank');
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
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e293b 0%, #374151 50%, #000000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: '#10b981',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Mail size={32} color="white" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            Confirmation Sent!
          </h2>
          <p style={{ color: '#d1d5db', marginBottom: '16px' }}>
            We've sent a confirmation email to <span style={{ color: '#60a5fa' }}>{formData.email}</span>
          </p>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>
            Opening Calendly to book your appointment...
          </p>
          <button
            onClick={() => window.open('https://calendly.com/pratiksthanki/30min', '_blank')}
            style={{
              width: '100%',
              background: '#2563eb',
              color: 'white',
              fontWeight: '600',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.background = '#2563eb'}
          >
            Book Now on Calendly
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #374151 50%, #000000 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Scissors size={24} color="white" />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              ASHKHAN Haircut
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d1d5db' }}>
            <Phone size={16} />
            <span style={{ fontSize: '14px' }}>(555) 123-4567</span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr',
          gap: '48px',
          alignItems: 'start'
        }}>
          
          {/* Left Side - Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '16px',
                lineHeight: '1.2'
              }}>
                Professional Haircuts & Styling
              </h2>
              <p style={{
                fontSize: '20px',
                color: '#d1d5db',
                marginBottom: '24px'
              }}>
                Experience premium grooming services with ASHKHAN's expert touch
              </p>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#fbbf24',
                marginBottom: '24px'
              }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
                <span style={{ color: '#d1d5db', marginLeft: '8px' }}>4.9/5 (120+ reviews)</span>
              </div>
            </div>

            {/* Services */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
                Our Services
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {services.map((service) => (
                  <div key={service.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px'
                  }}>
                    <div>
                      <h4 style={{ color: 'white', fontWeight: '500', margin: 0 }}>{service.name}</h4>
                      <p style={{
                        color: '#9ca3af',
                        fontSize: '14px',
                        margin: '4px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Clock size={12} />
                        {service.duration}
                      </p>
                    </div>
                    <span style={{ color: '#60a5fa', fontWeight: '600' }}>{service.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Hours */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  <MapPin size={16} />
                  <h4 style={{ fontWeight: '600', margin: 0 }}>Location</h4>
                </div>
                <p style={{ color: '#d1d5db', fontSize: '14px', margin: 0 }}>
                  123 Main Street<br />
                  Downtown, NY 10001
                </p>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  <Clock size={16} />
                  <h4 style={{ fontWeight: '600', margin: 0 }}>Hours</h4>
                </div>
                <p style={{ color: '#d1d5db', fontSize: '14px', margin: 0 }}>
                  Mon-Sat: 9AM-7PM<br />
                  Sunday: 10AM-5PM
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '32px'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Calendar size={48} color="#60a5fa" style={{ margin: '0 auto 16px' }} />
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '8px'
              }}>
                Book Your Appointment
              </h2>
              <p style={{ color: '#d1d5db' }}>
                Fill out the form below and we'll confirm your booking
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#d1d5db',
                  marginBottom: '8px'
                }}>
                  Service *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id} style={{ background: '#374151' }}>
                      {service.name} - {service.price}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  width: '100%',
                  background: isLoading ? '#6b7280' : 'linear-gradient(45deg, #2563eb, #8b5cf6)',
                  color: 'white',
                  fontWeight: '600',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  transform: 'scale(1)'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    <span>Sending Confirmation...</span>
                  </div>
                ) : (
                  'Book Appointment'
                )}
              </button>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                After submitting, you'll receive a confirmation email and be redirected to Calendly to select your preferred time slot.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          input::placeholder {
            color: #9ca3af;
          }
          
          input:focus, select:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
          }
        `}
      </style>
    </div>
  );
}
