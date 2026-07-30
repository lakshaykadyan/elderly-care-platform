import BackButton from "../components/common/BackButton";
import { Shield, Users, Heart, Award, CheckCircle, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="sub-page" style={{
      padding: "120px 20px",
      background: "var(--bg-body)",
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div className="container" style={{
        maxWidth: "900px",
        margin: "0 auto",
        width: "100%",
      }}>
        <BackButton />

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{
            fontSize: "44px",
            fontWeight: "700",
            color: "var(--text-primary)",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}>
            <Heart size={36} style={{ color: "var(--primary)" }} />
            About ElderlyCare
          </h1>
          <p style={{
            fontSize: "18px",
            color: "var(--text-secondary)",
            maxWidth: "650px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}>
            ElderlyCare is a trusted platform connecting seniors with verified caregivers,
            healthcare professionals, and emergency support. Our mission is to ensure
            safety, comfort, and dignity for every elderly individual.
          </p>
        </div>

        {/* Mission / Vision Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          marginBottom: "48px",
        }}>
          {[
            { icon: <Shield size={28} />, title: "Trusted & Verified", desc: "All caregivers are background verified and experienced." },
            { icon: <Users size={28} />, title: "Community First", desc: "We build a supportive community for seniors and families." },
            { icon: <Award size={28} />, title: "Quality Care", desc: "Committed to delivering compassionate and professional care." },
          ].map((item, i) => (
            <div key={i} style={{
              background: "var(--bg-card)",
              padding: "28px 24px",
              borderRadius: "20px",
              border: "1px solid var(--border-color)",
              textAlign: "center",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
              e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "rgba(79,70,229,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                margin: "0 auto 16px",
                border: "1px solid rgba(79,70,229,0.06)",
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "var(--text-primary)",
                marginBottom: "8px",
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                margin: 0,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div style={{
          background: "var(--bg-card)",
          padding: "32px 28px",
          borderRadius: "20px",
          border: "1px solid var(--border-color)",
        }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--text-primary)",
            textAlign: "center",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}>
            <CheckCircle size={24} style={{ color: "var(--primary)" }} />
            Why Choose ElderlyCare?
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px 32px",
          }}>
            {[
              "100% Verified Caregivers",
              "24/7 Emergency Support",
              "Transparent Pricing",
              "Real-time Service Tracking",
              "Secure & Private",
              "Compassionate Care",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "15px",
                color: "var(--text-secondary)",
                padding: "6px 0",
              }}>
                <CheckCircle size={18} style={{ color: "#22c55e", flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "24px",
            textAlign: "center",
            paddingTop: "20px",
            borderTop: "1px solid var(--border-color)",
          }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              color: "var(--text-muted)",
            }}>
              <Clock size={16} />
              Available 24/7 for your loved ones
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}