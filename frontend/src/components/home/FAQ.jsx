import { useState } from "react";

const faqData = [
  {
    question: "How do I book a caregiver?",
    answer:
      "Simply create an account, choose your required service, and submit a care request.",
  },
  {
    question: "Are caregivers verified?",
    answer:
      "Yes. Every caregiver is verified by the admin before becoming available.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes. You can cancel any pending booking from your dashboard.",
  },
  {
    question: "Is my medical information secure?",
    answer:
      "Absolutely. Your information is securely stored and only accessible to authorized personnel.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2>Frequently Asked Questions</h2>

        <p>
          Everything you need to know before using ElderlyCare.
        </p>

        <div className="faq-container">

          {faqData.map((item, index) => (

            <div className="faq-item" key={index}>

              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                {item.question}

                <span>
                  {openIndex === index ? "-" : "+"}
                </span>

              </button>

              {openIndex === index && (
                <div className="faq-answer">
                  {item.answer}
                </div>
              )}

            </div>

          ))}

        </div>
      </div>
    </section>
  );
}