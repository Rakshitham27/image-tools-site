// import React, { useState } from "react";
// import { jsPDF } from "jspdf";

// const ConvertToPDF = () => {
//   const [imageSrc, setImageSrc] = useState(null);

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (event) => setImageSrc(event.target.result);
//     reader.readAsDataURL(file);
//   };

//   const convertToPDF = () => {
//     const pdf = new jsPDF();
//     pdf.addImage(imageSrc, "PNG", 10, 10, 180, 160);
//     pdf.save("image.pdf");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "40px" }}>
//       <h2>Convert Image to PDF</h2>
//       <input type="file" accept="image/*" onChange={handleUpload} />
//       <br />
//       <br />
//       {imageSrc && (
//         <>
//           <img src={imageSrc} alt="preview" style={{ width: "300px" }} />
//           <br />
//           <br />
//           <button onClick={convertToPDF}>Convert to PDF</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ConvertToPDF;
import React, { useState } from "react";
import { jsPDF } from "jspdf";

const ConvertToPDF = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setImageSrc(event.target.result);
    reader.readAsDataURL(file);
  };

  const convertToPDF = () => {
    if (!imageSrc) return;
    const pdf = new jsPDF();
    // Fit image to A4-ish area while keeping aspect ratio
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const pageWidth = 190; // jsPDF unit mm for content area (A4 margin)
      const pageHeight = 260;
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const w = imgWidth * ratio;
      const h = imgHeight * ratio;
      pdf.addImage(imageSrc, "PNG", (210 - w) / 2, 10, w, h); // center horizontally
      pdf.save("image.pdf");
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          width: 420,
          backgroundColor: "#ffffff",
          padding: "36px 36px",
          borderRadius: 16,
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 30 }}>🧾</span>
          <h1
            style={{ fontSize: 22, margin: 0, fontWeight: 600, color: "#222" }}
          >
            Convert Image to PDF
          </h1>
        </div>

        <p style={{ color: "#666", marginTop: 10, marginBottom: 20 }}>
          Upload an image and download it as a PDF (keeps aspect ratio).
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            borderRadius: 10,
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#333",
            cursor: "pointer",
            marginBottom: 20,
          }}
        />

        {imageSrc && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <img
                src={imageSrc}
                alt="preview"
                style={{
                  width: 260,
                  height: "auto",
                  borderRadius: 10,
                  border: "1px solid #e6e6e6",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                }}
              />
            </div>

            <button
              onClick={convertToPDF}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                fontSize: 15,
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#0056b3")}
              onMouseOut={(e) => (e.target.style.background = "#007bff")}
            >
              📄 Convert to PDF
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConvertToPDF;
