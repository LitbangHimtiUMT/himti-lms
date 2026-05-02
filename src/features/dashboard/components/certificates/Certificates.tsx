// import React from "react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import { FaDownload, FaPrint } from "react-icons/fa";
// import { Button } from "../../../_global/components/Button";
// import { Poppins } from "../../../_global/components/Text";

// interface CertificateProps {
//   studentName: string;
//   courseName: string;
//   completionDate: string;
//   certificateId: string;
//   organizer?: string;
// }

// export const Certificate: React.FC<CertificateProps> = ({
//   studentName,
//   courseName,
//   completionDate,
//   certificateId,
//   organizer = "HIMTI BINUS University",
// }) => {
//   const certificateRef = React.useRef<HTMLDivElement>(null);

//   const handleDownloadPDF = async () => {
//     try {
//       if (!certificateRef.current) return;

//       // 1. Clone element dan hapus semua kelas Tailwind yang mengandung oklch
//       const element = certificateRef.current.cloneNode(true) as HTMLElement;
//       console.log(element);
//       document.body.appendChild(element);
//       element.style.position = "absolute";
//       element.style.left = "-9999px";

//       // 2. Hapus semua kelas OKLCH dari elemen
//       const removeOKLCHClasses = (el: HTMLElement) => {
//         el.className = el.className.replace(
//           /\b(?:bg-|text-|border-|from-|to-|via-)oklch\([^)]+\)/g,
//           ""
//         );
//         el.childNodes.forEach((child) => {
//           if (child.nodeType === Node.ELEMENT_NODE) {
//             removeOKLCHClasses(child as HTMLElement);
//           }
//         });
//       };
//       removeOKLCHClasses(element);

//       // 3. Ganti warna inline styles yang mengandung oklch
//       const replaceOKLCHStyles = (el: HTMLElement) => {
//         const style = el.getAttribute("style");
//         if (style && style.includes("oklch")) {
//           el.setAttribute(
//             "style",
//             style.replace(/oklch\([^)]+\)/g, (match) => {
//               // Konversi ke hex (fallback ke putih jika gagal)
//               try {
//                 return oklchToHex(match);
//               } catch {
//                 return "#ffffff";
//               }
//             })
//           );
//         }
//         el.childNodes.forEach((child) => {
//           if (child.nodeType === Node.ELEMENT_NODE) {
//             replaceOKLCHStyles(child as HTMLElement);
//           }
//         });
//       };
//       replaceOKLCHStyles(element);

//       // 4. Gunakan html2canvas dengan config khusus
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#ffffff",
//         ignoreElements: () => {
//           // Skip elemen tertentu jika perlu
//           return false;
//         },
//       });

//       // 5. Generate PDF
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: "a4",
//       });

//       const imgData = canvas.toDataURL("image/png");
//       const imgWidth = 297; // Lebar A4 dalam mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

//       // 6. Bersihkan
//       document.body.removeChild(element);

//       // 7. Simpan PDF
//       pdf.save(`HIMTI_Certificate_${certificateId}.pdf`);
//     } catch (error) {
//       console.error("PDF Generation Error:", error);
//       alert(
//         "Failed to generate certificate. Please try again or contact support."
//       );
//     }
//   };

//   // Fungsi konversi OKLCH ke HEX yang lebih baik
//   const oklchToHex = (oklchStr: string): string => {
//     // Implementasi aktual akan membutuhkan library konversi warna
//     // Ini adalah fallback sederhana:
//     if (oklchStr.includes("oklch(95% 0.03 260)")) return "#f0f4ff"; // biru muda
//     if (oklchStr.includes("oklch(40% 0.2 260)")) return "#1e40af"; // biru tua
//     return "#ffffff"; // fallback ke putih
//   };

//   const handlePrint = () => {
//     if (!certificateRef.current) return;
//     const printWindow = window.open("", "_blank");
//     if (printWindow) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Certificate - ${studentName}</title>
//             <style>
//               @media print {
//                 @page { size: landscape; margin: 0; }
//                 body { margin: 0; }
//               }
//             </style>
//           </head>
//           <body>
//             ${certificateRef.current.innerHTML}
//             <script>
//               window.onload = function() {
//                 setTimeout(function() {
//                   window.print();
//                   window.close();
//                 }, 500);
//               };
//             </script>
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-6">
//       {/* Certificate Template */}
//       <div
//         ref={certificateRef}
//         className="w-full max-w-4xl bg-white border-2 border-gold-500 shadow-xl rounded-lg overflow-hidden"
//       >
//         <div className="relative p-8 text-center">
//           {/* Certificate Background Design */}
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50 z-0"></div>
//           <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600"></div>

//           {/* Certificate Content */}
//           <div className="relative z-10">
//             {/* Header */}
//             <div className="mb-8">
//               {/* <img
//                 src="/assets/himti-logo.png"
//                 alt="HIMTI Logo"
//                 className="h-20 mx-auto mb-4"
//               /> */}
//               <h2 className="text-3xl font-bold text-blue-800">
//                 CERTIFICATE OF COMPLETION
//               </h2>
//               <p className="text-gray-600 mt-2">This is to certify that</p>
//             </div>

//             {/* Student Name */}
//             <h1 className="text-5xl font-bold text-blue-900 my-8 border-b-2 border-blue-200 pb-4 inline-block px-12">
//               {studentName}
//             </h1>

//             {/* Course Info */}
//             <div className="mb-8">
//               <p className="text-lg text-gray-700">
//                 has successfully completed the course
//               </p>
//               <h3 className="text-2xl font-semibold text-blue-800 mt-2">
//                 "{courseName}"
//               </h3>
//             </div>

//             {/* Details */}
//             <div className="grid grid-cols-2 gap-8 mt-12 mb-8">
//               <div>
//                 <p className="text-gray-600">Date</p>
//                 <p className="font-medium">{completionDate}</p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Certificate ID</p>
//                 <p className="font-medium">{certificateId}</p>
//               </div>
//             </div>

//             {/* Signatures */}
//             <div className="flex justify-between mt-16 pt-8 border-t-2 border-gray-200">
//               <div className="text-center">
//                 <div className="h-16 w-48 mx-auto border-b-2 border-gray-400 mb-2"></div>
//                 <p className="text-sm text-gray-600">Director of HIMTI</p>
//               </div>
//               <div className="text-center">
//                 <div className="h-16 w-48 mx-auto border-b-2 border-gray-400 mb-2"></div>
//                 <p className="text-sm text-gray-600">Course Instructor</p>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-8 text-xs text-gray-500">
//               <p>This certificate is issued by {organizer}</p>
//               <p>Verify at: https://lms.himti.or.id/verify/{certificateId}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <Button variant="primary" onClick={handleDownloadPDF}>
//           <div className="flex items-center gap-2">
//             <FaDownload className="mr-2" />
//             <Poppins>Download PDF</Poppins>
//           </div>
//         </Button>
//         <Button variant="secondary" onClick={handlePrint}>
//           <div className="flex items-center gap-2">
//             <FaPrint className="mr-2" />
//             <Poppins>Print Certificate</Poppins>
//           </div>
//         </Button>
//       </div>
//     </div>
//   );
// };
