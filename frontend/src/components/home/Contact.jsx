import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you. Feel free to contact our support team.</p>
        <div className="contact-details">
          <p><MapPin size={16} style={{ display: "inline", marginRight: "4px" }} /> Address: New Delhi, India</p>
          <p><Phone size={16} style={{ display: "inline", marginRight: "4px" }} /> Phone: +91 9876543210</p>
          <p><Mail size={16} style={{ display: "inline", marginRight: "4px" }} /> Email: support@elderlycare.com</p>
        </div>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea rows="6" placeholder="Your Message"></textarea>
        <button>Send Message</button>
      </form>
    </section>
  );
}