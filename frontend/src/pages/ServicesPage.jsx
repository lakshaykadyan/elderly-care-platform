export default function ServicesPage() {
  const services = [
    { icon: '🏥', title: 'Home Nursing', desc: 'Professional care at home.' },
    { icon: '👨‍⚕️', title: 'Doctor Consult', desc: 'Online expert advice.' },
    { icon: '💊', title: 'Medicine Reminder', desc: 'Never miss a dose.' },
  ];

  return (

    <div className="sub-page" style={{ background: 'var(--bg-body, #f9fafb)', minHeight: '80vh', padding: '120px 20px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '44px', fontWeight: '700', color: 'var(--text-primary, #0f172a)', textAlign: 'center', marginBottom: '20px' }}>
          Our Services
        </h1>
        
        <p style={{ fontSize: '18px', color: '#334155', textAlign: 'center', maxWidth: '600px', margin: '0 auto 50px' }}>
          We provide a wide range of healthcare and caregiving services for seniors.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {services.map((service, i) => (
            <div key={i} className="page-card" style={{ background: 'var(--bg-card, #ffffff)', padding: '40px 30px', borderRadius: '24px', border: '1px solid var(--border-color, #e2e8f0)', textAlign: 'center' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>{service.icon}</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary, #0f172a)', marginBottom: '12px' }}>{service.title}</h3>
              <p style={{ color: '#334155', lineHeight: '1.7' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}