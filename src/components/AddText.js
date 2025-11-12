// import React, { useRef, useState } from "react";

// const AddTextPage = () => {
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [image, setImage] = useState(null);
//   const [text, setText] = useState("");
//   const [fontSize, setFontSize] = useState(24);
//   const [textColor, setTextColor] = useState("#000000");

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const img = new Image();
//     img.onload = () => {
//       setImage(img);
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);
//     };
//     img.src = URL.createObjectURL(file);
//   };

//   const handleAddText = (e) => {
//     if (!image) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(image, 0, 0);
//     ctx.font = `${fontSize}px Arial`;
//     ctx.fillStyle = textColor;
//     ctx.fillText(text, 50, 50);
//   };

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.download = "image_with_text.png";
//     link.href = canvasRef.current.toDataURL();
//     link.click();
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Add Text to Image</h2>
//       <input type="file" ref={fileInputRef} onChange={handleImageUpload} />
//       <br />
//       <br />
//       <canvas
//         ref={canvasRef}
//         style={{ maxWidth: "90%", border: "1px solid gray" }}
//       />
//       <div style={{ marginTop: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <input
//           type="color"
//           value={textColor}
//           onChange={(e) => setTextColor(e.target.value)}
//         />
//         <input
//           type="number"
//           value={fontSize}
//           onChange={(e) => setFontSize(e.target.value)}
//           min="10"
//           max="100"
//         />
//         <button onClick={handleAddText}>Add Text</button>
//         <button onClick={handleDownload}>Download</button>
//       </div>
//     </div>
//   );
// };

// export default AddTextPage;
import React, { useRef, useState, useEffect } from "react";

const AddTextPage = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [fontSize, setFontSize] = useState(24);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (image) drawCanvas();
  }, [image, text, textColor, textPosition, fontSize]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const displayWidth = 450;
    const scale = displayWidth / image.width;
    const displayHeight = image.height * scale;

    canvas.width = displayWidth;
    canvas.height = displayHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, displayWidth, displayHeight);

    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = textColor;
    ctx.textBaseline = "top";
    ctx.fillText(text, textPosition.x, textPosition.y);

    // draw dotted selection box
    if (text) {
      const textWidth = ctx.measureText(text).width;
      const textHeight = fontSize;
      ctx.strokeStyle = "#555";
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(textPosition.x, textPosition.y, textWidth, textHeight);

      // corner resize handle (bottom right)
      ctx.setLineDash([]);
      ctx.fillStyle = "#007bff";
      ctx.fillRect(
        textPosition.x + textWidth - 6,
        textPosition.y + textHeight - 6,
        10,
        10
      );
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => setImage(img);
    img.src = URL.createObjectURL(file);
  };

  const handleMouseDown = (e) => {
    if (!text) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext("2d");
    const textWidth = ctx.measureText(text).width;
    const textHeight = fontSize;

    // check for resize handle (bottom-right corner)
    if (
      x >= textPosition.x + textWidth - 10 &&
      x <= textPosition.x + textWidth + 10 &&
      y >= textPosition.y + textHeight - 10 &&
      y <= textPosition.y + textHeight + 10
    ) {
      setIsResizing(true);
    } else if (
      x >= textPosition.x &&
      x <= textPosition.x + textWidth &&
      y >= textPosition.y &&
      y <= textPosition.y + textHeight
    ) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging && !isResizing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging) {
      setTextPosition({ x, y });
    }

    if (isResizing) {
      const newSize = Math.max(10, Math.min(150, y - textPosition.y));
      setFontSize(newSize);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "image_with_text.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "60px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "30px",
          width: "90%",
          maxWidth: "700px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>
          🖋️ Add Text to Image
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#333",
            cursor: "pointer",
            marginTop: "-10px",
            marginBottom: "20px",
          }}
        />

        {image && (
          <>
            <canvas
              ref={canvasRef}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                cursor: "move",
                maxWidth: "100%",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "150px",
                }}
              />
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                style={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                }}
              />
              <input
                type="number"
                value={fontSize}
                min="10"
                max="150"
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{
                  width: "70px",
                  padding: "6px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              />
              <button
                onClick={handleDownload}
                style={{
                  padding: "10px 18px",
                  fontSize: "15px",
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
                💾 Download
              </button>
            </div>

            <p
              style={{
                fontSize: "13px",
                color: "#666",
                marginTop: "10px",
              }}
            >
              💡 Tip: Drag text to move | Drag the blue corner to resize | Or
              use the size box
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AddTextPage;
