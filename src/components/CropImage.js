// import React, { useState, useRef } from "react";
// import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";

// const CropImage = () => {
//   const [imageSrc, setImageSrc] = useState(null);
//   const [crop, setCrop] = useState();
//   const [completedCrop, setCompletedCrop] = useState();
//   const imgRef = useRef(null);
//   const previewCanvasRef = useRef(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (event) => setImageSrc(event.target.result);
//     reader.readAsDataURL(file);
//   };

//   const onImageLoad = (e) => {
//     const { width, height } = e.currentTarget;
//     setCrop(
//       centerCrop(
//         makeAspectCrop({ unit: "%", width: 90 }, 1, width, height),
//         width,
//         height
//       )
//     );
//   };

//   const onCropComplete = (c) => {
//     setCompletedCrop(c);
//     const image = imgRef.current;
//     const canvas = previewCanvasRef.current;
//     if (!image || !canvas || !c?.width || !c?.height) return;
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     const ctx = canvas.getContext("2d");
//     const pixelRatio = window.devicePixelRatio;
//     canvas.width = c.width * pixelRatio;
//     canvas.height = c.height * pixelRatio;
//     ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//     ctx.imageSmoothingQuality = "high";
//     ctx.drawImage(
//       image,
//       c.x * scaleX,
//       c.y * scaleY,
//       c.width * scaleX,
//       c.height * scaleY,
//       0,
//       0,
//       c.width,
//       c.height
//     );
//   };

//   const downloadCroppedImage = () => {
//     const link = document.createElement("a");
//     link.download = "cropped-image.png";
//     link.href = previewCanvasRef.current.toDataURL("image/png");
//     link.click();
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "40px" }}>
//       <h2>Crop Image</h2>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       <br />
//       <br />
//       {imageSrc && (
//         <>
//           <ReactCrop
//             crop={crop}
//             onChange={(c) => setCrop(c)}
//             onComplete={onCropComplete}
//             aspect={1}
//           >
//             <img
//               ref={imgRef}
//               alt="Crop me"
//               src={imageSrc}
//               style={{ maxWidth: "80%" }}
//               onLoad={onImageLoad}
//             />
//           </ReactCrop>

//           <br />
//           <h3>Preview:</h3>
//           <canvas
//             ref={previewCanvasRef}
//             style={{
//               border: "1px solid #ccc",
//               maxWidth: "80%",
//               marginBottom: "10px",
//             }}
//           ></canvas>
//           <br />
//           <button onClick={downloadCroppedImage}>Download Cropped Image</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CropImage;
import React, { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const CropImage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setImageSrc(event.target.result);
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop({ unit: "%", width: 90 }, 1, width, height),
        width,
        height
      )
    );
  };

  const onCropComplete = (c) => {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    if (!image || !canvas || !c?.width || !c?.height) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    canvas.width = c.width * pixelRatio;
    canvas.height = c.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      c.x * scaleX,
      c.y * scaleY,
      c.width * scaleX,
      c.height * scaleY,
      0,
      0,
      c.width,
      c.height
    );
  };

  const downloadCroppedImage = () => {
    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = previewCanvasRef.current.toDataURL("image/png");
    link.click();
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
          width: 900,
          backgroundColor: "#ffffff",
          padding: "36px",
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
          <span style={{ fontSize: 30 }}>✂️</span>
          <h1
            style={{ fontSize: 22, margin: 0, fontWeight: 600, color: "#222" }}
          >
            Crop Image
          </h1>
        </div>

        <p style={{ color: "#666", marginTop: 10, marginBottom: 20 }}>
          Upload and crop your image with live preview.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Crop Area */}
            <div
              style={{
                width: "45%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={onCropComplete}
                aspect={1}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imageSrc}
                  style={{
                    width: "100%",
                    maxWidth: "280px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>

            {/* Preview Area */}
            <div
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3 style={{ color: "#333", marginBottom: 10 }}>Preview:</h3>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  maxWidth: "280px",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                }}
              ></canvas>
            </div>
          </div>
        )}

        {imageSrc && (
          <button
            onClick={downloadCroppedImage}
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
            💾 Download Cropped Image
          </button>
        )}
      </div>
    </div>
  );
};

export default CropImage;
