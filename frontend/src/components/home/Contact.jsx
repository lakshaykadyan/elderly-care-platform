export default function Contact() {
  return (
    <section className="contact-section">

      <div className="contact-info">

        <h2>Contact Us</h2>

        <p>
          We'd love to hear from you. Feel free to contact our support team.
        </p>

        <div className="contact-details">

          <p><strong>📍 Address:</strong> New Delhi, India</p>

          <p><strong>📞 Phone:</strong> +91 9876543210</p>

          <p><strong>✉ Email:</strong> support@elderlycare.com</p>

        </div>

      </div>

      <form className="contact-form">

        <input
          type="text"
          placeholder="Your Name"
        />

        <input
          type="email"
          placeholder="Your Email"
        />

        <textarea
          rows="6"
          placeholder="Your Message"
        ></textarea>

        <button>
          Send Message
        </button>

      </form>

    </section>
  );
}