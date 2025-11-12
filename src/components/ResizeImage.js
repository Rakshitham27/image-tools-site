// import React, { useState } from "react";
// import imageCompression from "browser-image-compression";

// const ResizeImage = () => {
//   const [originalImage, setOriginalImage] = useState(null);
//   const [compressedImage, setCompressedImage] = useState(null);
//   const [targetSizeKB, setTargetSizeKB] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setOriginalImage(URL.createObjectURL(file));
//       setCompressedImage(null);
//     }
//   };

//   const handleResize = async (e) => {
//     e.preventDefault();
//     if (!originalImage || !targetSizeKB) return;

//     setLoading(true);
//     try {
//       // Recreate File from the uploaded image
//       const response = await fetch(originalImage);
//       const blob = await response.blob();
//       const file = new File([blob], "uploaded.png", { type: blob.type });

//       const options = {
//         maxSizeMB: targetSizeKB / 1024, // Convert KB to MB
//         useWebWorker: true,
//       };

//       const compressedFile = await imageCompression(file, options);
//       const compressedSrc = URL.createObjectURL(compressedFile);
//       setCompressedImage(compressedSrc);
//     } catch (error) {
//       console.error("Compression failed:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "40px" }}>
//       <h2>Resize Image by File Size (KB)</h2>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       <br />
//       <br />
//       <input
//         type="number"
//         placeholder="Enter target size (KB)"
//         value={targetSizeKB}
//         onChange={(e) => setTargetSizeKB(e.target.value)}
//       />
//       <br />
//       <br />
//       <button onClick={handleResize} disabled={loading}>
//         {loading ? "Processing..." : "Resize"}
//       </button>

//       {/* Show original image */}
//       {originalImage && (
//         <div>
//           <h3>Original Image</h3>
//           <img
//             src={originalImage}
//             alt="Original"
//             style={{ width: "300px", marginTop: "10px" }}
//           />
//         </div>
//       )}

//       {/* Show resized image */}
//       {compressedImage && (
//         <>
//           <div>
//             <h3>Resized Image (~{targetSizeKB} KB)</h3>
//             <img
//               src={compressedImage}
//               alt="Compressed"
//               style={{ width: "300px", marginTop: "10px" }}
//             />
//           </div>
//           <a href={compressedImage} download="resized.png">
//             <button>Download</button>
//           </a>
//         </>
//       )}
//     </div>
//   );
// };

// export default ResizeImage;
import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const ResizeImage = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [targetSizeKB, setTargetSizeKB] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalImage(URL.createObjectURL(file));
      setCompressedImage(null);
    }
  };

  const handleResize = async (e) => {
    e.preventDefault();
    if (!originalImage || !targetSizeKB) return;

    setLoading(true);
    try {
      const response = await fetch(originalImage);
      const blob = await response.blob();
      const file = new File([blob], "uploaded.png", { type: blob.type });

      const options = {
        maxSizeMB: targetSizeKB / 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const compressedSrc = URL.createObjectURL(compressedFile);
      setCompressedImage(compressedSrc);
    } catch (error) {
      console.error("Compression failed:", error);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "40px 20px",
        color: "#333",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "20px",
          fontWeight: "600",
          color: "#222",
        }}
      >
        🖼️ Resize Image
      </h1>

      {/* Upload Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          marginBottom: "25px",
          padding: "8px",
          color: "#333",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      />

      {/* Input for target size */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Enter target size (KB)"
          value={targetSizeKB}
          onChange={(e) => setTargetSizeKB(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #aaa",
            width: "220px",
            fontSize: "15px",
          }}
        />
      </div>

      <button
        onClick={handleResize}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.background = "#0056b3")}
        onMouseOut={(e) => (e.target.style.background = "#007bff")}
      >
        {loading ? "Processing..." : "⚙️ Resize"}
      </button>

      {/* Image Display Section */}
      <div
        style={{
          display: "flex",
          justifyContent: compressedImage ? "center" : "center",
          alignItems: "flex-start",
          marginTop: "40px",
          gap: "40px",
          flexWrap: "wrap",
          transition: "all 0.3s ease",
        }}
      >
        {/* Original Image */}
        {originalImage && (
          <div
            style={{
              transform: compressedImage
                ? "translateX(-30px)"
                : "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          >
            <h3>Original</h3>
            <img
              src={originalImage}
              alt="Original"
              style={{
                width: "250px",
                borderRadius: "10px",
                border: "2px solid #ccc",
                marginTop: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        )}

        {/* Compressed Image */}
        {compressedImage && (
          <div>
            <h3>Resized (~{targetSizeKB} KB)</h3>
            <img
              src={compressedImage}
              alt="Compressed"
              style={{
                width: "250px",
                borderRadius: "10px",
                border: "2px solid #ccc",
                marginTop: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />
            <br />
          </div>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <a href={compressedImage} download="resized.png">
          <button
            style={{
              padding: "10px 18px",
              fontSize: "15px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1e7e34")}
            onMouseOut={(e) => (e.target.style.background = "#28a745")}
          >
            💾 Download
          </button>
        </a>
      </div>
    </div>
  );
};

export default ResizeImage;
