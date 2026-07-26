export default function ContactPage() {
  return (

    <div className="sub-page" style={{ padding: '120px 20px', background: 'var(--bg-body, #f9fafb)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '44px', fontWeight: '700', color: 'var(--text-primary, #0f172a)', textAlign: 'center', marginBottom: '20px' }}>Contact Us</h1>
        
        <p style={{ fontSize: '18px', color: '#334155', textAlign: 'center', marginBottom: '40px' }}>
          Have questions? Reach out to us anytime.
        </p>
        
        <form className="page-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input type="text" placeholder="Your Name" style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border-color, #e2e8f0)', background: 'var(--bg-card, #ffffff)', color: 'var(--text-primary, #0f172a)', fontSize: '16px' }} />
          <input type="email" placeholder="Your Email" style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border-color, #e2e8f0)', background: 'var(--bg-card, #ffffff)', color: 'var(--text-primary, #0f172a)', fontSize: '16px' }} />
          <textarea rows="5" placeholder="Message" style={{ padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border-color, #e2e8f0)', background: 'var(--bg-card, #ffffff)', color: 'var(--text-primary, #0f172a)', fontSize: '16px', resize: 'vertical' }}></textarea>
          <button className="primary-btn" style={{ padding: '16px', borderRadius: '40px', border: 'none', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff', fontSize: '18px', fontWeight: '600', cursor: 'pointer' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
}