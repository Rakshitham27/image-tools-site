// import React, { useState } from "react";

// const CompressImage = () => {
//   const [imageSrc, setImageSrc] = useState(null);
//   const [compressedImage, setCompressedImage] = useState(null);
//   const [quality, setQuality] = useState(0.7); // default 70% quality

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => setImageSrc(event.target.result);
//     reader.readAsDataURL(file);
//   };

//   const compress = () => {
//     const img = new Image();
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);
//       const compressed = canvas.toDataURL("image/jpeg", quality);
//       setCompressedImage(compressed);
//     };

//     img.src = imageSrc;
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "40px" }}>
//       <h2>Compress Image</h2>
//       <input type="file" accept="image/*" onChange={handleUpload} />
//       <br />
//       <br />
//       <label>Compression Quality (0.1 - 1): </label>
//       <input
//         type="number"
//         step="0.1"
//         value={quality}
//         min="0.1"
//         max="1"
//         onChange={(e) => setQuality(parseFloat(e.target.value))}
//       />
//       <br />
//       <br />
//       <button onClick={compress}>Compress</button>
//       {compressedImage && (
//         <>
//           <div>
//             <img
//               src={compressedImage}
//               alt="Compressed"
//               style={{ width: "300px", marginTop: "20px" }}
//             />
//           </div>
//           <a href={compressedImage} download="compressed.jpg">
//             <button>Download</button>
//           </a>
//         </>
//       )}
//     </div>
//   );
// };

// export default CompressImage;
