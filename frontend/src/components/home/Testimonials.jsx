const reviews = [
  {
    name: "Rahul Sharma",
    role: "Patient Family",
    review:
      "Excellent home nursing service. The caregiver was very professional and caring.",
    rating: "★★★★★",
  },
  {
    name: "Priya Gupta",
    role: "Daughter",
    review:
      "The platform made it very easy to find a trusted caregiver for my parents.",
    rating: "★★★★★",
  },
  {
    name: "Ankit Singh",
    role: "Patient",
    review:
      "Highly recommended. Very supportive staff and quick response.",
    rating: "★★★★★",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonial-section">
      <div className="container">
        <h2>What Our Families Say</h2>

        <p>
          Trusted by families who care about their loved ones.
        </p>

        <div className="testimonial-grid">

          {reviews.map((item, index) => (

            <div className="testimonial-card" key={index}>

              <div className="testimonial-rating">
                {item.rating}
              </div>

              <p className="testimonial-review">
                "{item.review}"
              </p>

              <h3>{item.name}</h3>

              <span>{item.role}</span>

            </div>

          ))}

        </div>
      </div>
    </section>
  );
}