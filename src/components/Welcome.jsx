// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";

// const words = ["friend", "manager", "helper", "advisor"];

// export default function ExpenseMate() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % words.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex items-center justify-center h-screen flex-col text-center">
//       <motion.h1
//         className="text-6xl md:text-8xl font-bold"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         style={{ fontFamily: "Dancing Script, cursive" }}
//       >
//         EXPENSEMATE
//       </motion.h1>
//       <motion.p
//         className="text-3xl md:text-5xl mt-4 text-gray-700"
//         key={index}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         your money - {words[index]}
//       </motion.p>
//     </div>
//   );
// }
