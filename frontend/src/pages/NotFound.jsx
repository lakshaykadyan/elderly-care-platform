import { Link } from "react-router-dom";

export default function NotFound() {

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >

      <div
        style={{
          textAlign: "center",
          maxWidth: "500px",
        }}
      >

        <h1
          style={{
            fontSize: "90px",
            color: "#4f6df5",
            marginBottom: "10px",
          }}
        >
          404
        </h1>

        <h2>

          Page Not Found

        </h2>

        <p
          style={{
            margin: "20px 0",
            color: "#666",
          }}
        >

          Sorry, the page you're looking for doesn't exist.

        </p>

        <Link to="/">

          <button className="primary-btn">

            🏠 Back to Home

          </button>

        </Link>

      </div>

    </div>

  );

}