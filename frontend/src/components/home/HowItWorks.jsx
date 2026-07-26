const steps = [
  {
    number: "01",
    title: "Create Account",
    desc: "Sign up and create your secure ElderlyCare account.",
    icon: "👤",
  },
  {
    number: "02",
    title: "Choose Service",
    desc: "Select the healthcare or caregiving service you need.",
    icon: "📋",
  },
  {
    number: "03",
    title: "Caregiver Assigned",
    desc: "Our verified caregiver is assigned instantly.",
    icon: "🧑‍⚕️",
  },
  {
    number: "04",
    title: "Receive Care",
    desc: "Enjoy professional elderly care at your doorstep.",
    icon: "❤️",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section">
      <div className="container"> 
        <h2>How It Works</h2>

        <p>
          Getting quality elderly care has never been this simple.
        </p>

        <div className="how-grid">

          {steps.map((step, index) => (

            <div className="how-card" key={index}>

              <div className="step-number">
                {step.number}
              </div>

              <div className="step-icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.desc}</p>

            </div>

          ))} 
        </div>
      </div>

    </section>
  );
}