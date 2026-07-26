export default function Features() {
  const features = [
    {
      title: "24/7 Care",
      text: "Professional caregivers available anytime."
    },
    {
      title: "Emergency Support",
      text: "Instant emergency assistance for seniors."
    },
    {
      title: "Health Monitoring",
      text: "Track health and daily activities in real-time."
    },
    {
      title: "Verified Caregivers",
      text: "Background verified and experienced professionals."
    }
  ];

  return (
    <section className="features">

      <div className="container">

        <h2>Why Choose ElderlyCare?</h2>

        <div className="feature-grid">

          {features.map((item, index) => (

            <div className="feature-card" key={index}>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}