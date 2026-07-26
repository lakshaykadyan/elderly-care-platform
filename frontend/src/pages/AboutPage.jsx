export default function AboutPage() {
  return (

    <div className="sub-page" style={{ padding: '120px 20px', background: 'var(--bg-body, #f9fafb)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '44px', fontWeight: '700', color: 'var(--text-primary, #0f172a)', marginBottom: '30px' }}>About ElderlyCare</h1>
        
        <p style={{ fontSize: '18px', color: '#334155', lineHeight: '1.8', marginBottom: '40px' }}>
          ElderlyCare is a trusted platform connecting seniors with verified caregivers, 
          healthcare professionals, and emergency support. Our mission is to ensure 
          safety, comfort, and dignity for every elderly individual.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span className="page-tag" style={{ background: 'var(--bg-card, #fff)', padding: '12px 24px', borderRadius: '60px', border: '1px solid var(--border-color, #e2e8f0)', color: 'var(--text-primary, #0f172a)' }}>✅ Verified Caregivers</span>
          <span className="page-tag" style={{ background: 'var(--bg-card, #fff)', padding: '12px 24px', borderRadius: '60px', border: '1px solid var(--border-color, #e2e8f0)', color: 'var(--text-primary, #0f172a)' }}>🛡️ Secure &amp; Private</span>
          <span className="page-tag" style={{ background: 'var(--bg-card, #fff)', padding: '12px 24px', borderRadius: '60px', border: '1px solid var(--border-color, #e2e8f0)', color: 'var(--text-primary, #0f172a)' }}>❤️ Compassionate Care</span>
        </div>
      </div>
    </div>
  );
}