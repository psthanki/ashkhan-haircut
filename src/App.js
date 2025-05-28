{/* ... (previous code remains unchanged) ... */}

{currentStep === 3 && (
  <div>
    {/* ... (name, email, phone inputs remain unchanged) ... */}
    
    {/* Special Notes Textarea */}
    <div>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: '#d1d5db',
        marginBottom: '8px'
      }}>
        Special Notes (Optional)
      </label>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleInputChange}
        placeholder="Any special requests or notes..."
        rows={3}
        style={{
          width: '100%',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          color: 'white',
          fontSize: '16px',
          outline: 'none',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box',
          resize: 'vertical'
        }}
        onFocus={(e) => {
          e.target.style.border = '1px solid #3b82f6';
          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
        }}
        onBlur={(e) => {
          e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  </div>
)}

{currentStep === 4 && (
  <div>
    <h2 style={{
      fontSize: '32px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '8px',
      margin: '0 0 8px 0'
    }}>
      Confirm Your Booking
    </h2>
    <p style={{
      color: '#d1d5db',
      marginBottom: '32px',
      margin: '0 0 32px 0'
    }}>
      Review your appointment details
    </p>
    
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '32px'
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: 'white',
        marginBottom: '24px',
        margin: '0 0 24px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Scissors size={20} />
        {services.find(s => s.id === formData.service)?.name}
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px'
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#d1d5db',
            marginBottom: '12px',
            margin: '0 0 12px 0'
          }}>
            <Calendar size={16} />
            <span style={{ fontSize: '14px' }}>Date & Time</span>
          </div>
          <div style={{ color: 'white', fontWeight: '500' }}>
            {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
          <div style={{ color: '#d1d5db' }}>
            {formData.time}
          </div>
        </div>
        
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#d1d5db',
            marginBottom: '12px',
            margin: '0 0 12px 0'
          }}>
            <User size={16} />
            <span style={{ fontSize: '14px' }}>Customer</span>
          </div>
          <div style={{ color: 'white', fontWeight: '500' }}>
            {formData.name}
          </div>
          <div style={{ color: '#d1d5db', fontSize: '14px' }}>
            {formData.email}
          </div>
          <div style={{ color: '#d1d5db', fontSize: '14px' }}>
            {formData.phone}
          </div>
        </div>
        
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#d1d5db',
            marginBottom: '12px',
            margin: '0 0 12px 0'
          }}>
            <CreditCard size={16} />
            <span style={{ fontSize: '14px' }}>Payment</span>
          </div>
          <div style={{ color: 'white', fontWeight: '500' }}>
            Pay at Salon
          </div>
          <div style={{ color: '#d1d5db', fontSize: '14px' }}>
            {services.find(s => s.id === formData.service)?.price}
          </div>
        </div>
      </div>
      
      {formData.notes && (
        <div style={{ marginTop: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#d1d5db',
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            <span style={{ fontSize: '14px' }}>Special Notes</span>
          </div>
          <div style={{
            color: '#d1d5db',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '12px'
          }}>
            {formData.notes}
          </div>
        </div>
      )}
    </div>
    
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ color: '#d1d5db', fontSize: '14px' }}>Total Amount</div>
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>
          {services.find(s => s.id === formData.service)?.price}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Clock size={16} color="#d1d5db" />
        <span style={{ color: '#d1d5db' }}>
          {services.find(s => s.id === formData.service)?.duration}
        </span>
      </div>
    </div>
  </div>
)}

{/* Navigation Buttons */}
<div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '32px'
}}>
  <button
    onClick={prevStep}
    disabled={currentStep === 1}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#d1d5db',
      fontWeight: '500',
      padding: '12px 24px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      opacity: currentStep === 1 ? 0.5 : 1,
      transition: 'all 0.2s ease'
    }}
    onMouseOver={e => {
      if (currentStep !== 1) {
        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
      }
    }}
    onMouseOut={e => {
      if (currentStep !== 1) {
        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
      }
    }}
  >
    <ChevronLeft size={16} />
    Back
  </button>
  
  <button
    onClick={currentStep === 4 ? handleSubmit : nextStep}
    disabled={!canProceed() || isLoading}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
      color: 'white',
      fontWeight: '600',
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      cursor: canProceed() ? 'pointer' : 'not-allowed',
      opacity: canProceed() ? 1 : 0.5,
      transition: 'all 0.2s ease',
      transform: 'scale(1)'
    }}
    onMouseOver={e => {
      if (canProceed()) {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.background = 'linear-gradient(45deg, #2563eb, #7c3aed)';
      }
    }}
    onMouseOut={e => {
      if (canProceed()) {
        e.target.style.transform = 'scale(1)';
        e.target.style.background = 'linear-gradient(45deg, #3b82f6, #8b5cf6)';
      }
    }}
  >
    {isLoading ? (
      'Processing...'
    ) : currentStep === 4 ? (
      <>
        Confirm Booking
        <Check size={18} />
      </>
    ) : (
      <>
        Next
        <ChevronRight size={18} />
      </>
    )}
  </button>
</div>

{/* ... (rest of the code remains unchanged) ... */}
