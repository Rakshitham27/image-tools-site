// import React from "react";
// import { useNavigate } from "react-router-dom";

// const MainPage = () => {
//   const navigate = useNavigate();
//   const options = [
//     { label: "Change Background Color", path: "/background-color" },
//     { label: "Resize Image", path: "/resize" },
//     { label: "Convert to PDF", path: "/convert-pdf" },
//     { label: "Add Text", path: "/add-text" },
//     { label: "Crop Image", path: "/crop" },
//   ];

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>🖼️ Image Editor</h1>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "15px",
//           width: "300px",
//           margin: "30px auto",
//         }}
//       >
//         {options.map((opt) => (
//           <button
//             key={opt.path}
//             onClick={() => navigate(opt.path)}
//             style={{
//               padding: "12px",
//               borderRadius: "8px",
//               border: "none",
//               backgroundColor: "#007bff",
//               color: "white",
//               fontSize: "16px",
//               cursor: "pointer",
//             }}
//           >
//             {opt.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MainPage;
import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const options = [
    { label: "🎨 Change Background Color", path: "/background-color" },
    { label: "🖼️ Resize Image", path: "/resize" },
    { label: "📄 Convert to PDF", path: "/convert-pdf" },
    { label: "✏️ Add Text", path: "/add-text" },
    { label: "✂️ Crop Image", path: "/crop" },
  ];

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px 50px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          width: "380px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "10px",
            color: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "40px" }}>🧠</span>
          <span style={{ fontWeight: "600" }}>Smart Image Editor</span>
        </h1>
        <p style={{ color: "#666", marginBottom: "30px", fontSize: "15px" }}>
          Edit your images quickly and easily — all in one place!
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {options.map((opt) => (
            <button
              key={opt.path}
              onClick={() => navigate(opt.path)}
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
