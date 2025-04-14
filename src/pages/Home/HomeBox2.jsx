import { useEffect, useRef, useState } from "react";
import styles from "./HomeBox2.module.css";

function TransactionBox() {
  const paragraphRef = useRef(null);
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsParagraphVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (paragraphRef.current) {
      observer.observe(paragraphRef.current);
    }

    return () => {
      if (paragraphRef.current) {
        observer.unobserve(paragraphRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${styles.mainbox} flex flex-col md:flex-row items-center justify-between p-6 md:p-12`}
    >
      {/* Left Content - Image */}
      <div
        className={`${styles.leftcontent} flex justify-center w-full md:w-1/2`}
      >
        <img
          src="/pesonl.png"
          alt="Transaction Preview"
          className="w-full md:w-auto max-w-[90%] md:max-w-[400px] lg:max-w-[450px] object-contain"
        />
      </div>

      {/* Right Content - Text */}
      <div
        className={`${styles.rightcontent} w-full md:w-1/2 text-center md:text-left max-w-lg`}
      >
        <h1>
          Wonderful and Effortless <br />
          way to view your <br />
          <span className="text-red-300">transactions.</span>
        </h1>
        <p
          ref={paragraphRef}
          className={`${styles.paragraph} ${
            isParagraphVisible ? styles["in-view"] : ""
          }`}
        >
          Simplifying your life with <br />
          easy to manage expenses tracker.
        </p>
      </div>
    </div>
  );
}

export default TransactionBox;
