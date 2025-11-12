import React, { useState, useRef, useEffect } from "react";
import { removeBackground } from "@imgly/background-removal";

const AIBackgroundColorChanger = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [bgColor, setBgColor] = useState("#00ffcc");
  const [startIndex, setStartIndex] = useState(0);
  const canvasRef = useRef(null);

  const colors = [
    "#ffffff",
    "#000000",
    "#F5F5F5",
    "#E0E0E0",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#607D8B",
    "#E91E63",
    "#F44336",
    "#B71C1C",
    "#880E4F",
    "#4A148C",
    "#1A237E",
    "#0D47A1",
    "#004D40",
    "#33691E",
    "#827717",
    "#BF360C",
    "#3E2723",
    "#212121",
  ];

  const visibleColors = colors.slice(startIndex, startIndex + 5);

  const handleNext = () => {
    if (startIndex + 5 < colors.length) setStartIndex(startIndex + 1);
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProcessedImage(null);
    const reader = new FileReader();
    reader.onload = () => setOriginalImage(reader.result);
    reader.readAsDataURL(file);

    try {
      const blob = await removeBackground(file);
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (err) {
      console.error("Background removal failed:", err);
    }
  };

  const drawWithColor = (color) => {
    const canvas = canvasRef.current;
    if (!canvas || !processedImage) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = processedImage;

    img.onload = () => {
      const maxWidth = 500;
      const ratio = img.width / img.height;
      canvas.width = maxWidth;
      canvas.height = maxWidth / ratio;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  useEffect(() => {
    if (processedImage) drawWithColor(bgColor);
  }, [processedImage, bgColor]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "image_with_new_background.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        color: "#333",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "40px 20px",
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
        🎨 Background Color Changer
      </h1>

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

      {originalImage && !processedImage && (
        <p style={{ color: "#222" }}>⏳ Processing… Please wait</p>
      )}

      {processedImage && (
        <>
          {/* 🎨 Scrollable Color Selector */}
          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              style={{
                background: "#9C27B0",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                width: "45px",
                height: "45px",
                fontSize: "22px",
                cursor: "pointer",
                opacity: startIndex === 0 ? 0.5 : 1,
              }}
            >
              ❮
            </button>

            <div
              style={{
                display: "flex",
                gap: "10px",
                transition: "0.3s ease",
              }}
            >
              {visibleColors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setBgColor(color)}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px",
                    backgroundColor: color,
                    boxShadow:
                      bgColor === color
                        ? "0 0 12px rgba(0,0,0,0.5)"
                        : "0 0 5px rgba(0,0,0,0.2)",
                    transform: bgColor === color ? "scale(1.1)" : "scale(1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                ></div>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={startIndex + 5 >= colors.length}
              style={{
                background: "#2196F3",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                width: "45px",
                height: "45px",
                fontSize: "22px",
                cursor: "pointer",
                opacity: startIndex + 5 >= colors.length ? 0.5 : 1,
              }}
            >
              ❯
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <canvas
              ref={canvasRef}
              style={{
                width: "350px",
                height: "auto",
                border: "2px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            ></canvas>
          </div>

          <button
            onClick={handleDownload}
            style={{
              marginTop: "25px",
              padding: "12px 20px",
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
            💾 Download Image
          </button>
        </>
      )}
    </div>
  );
};

export default AIBackgroundColorChanger;
