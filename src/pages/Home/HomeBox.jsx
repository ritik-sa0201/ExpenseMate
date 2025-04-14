import { useEffect, useRef, useState } from "react";
import styles from "./HomeBox.module.css";

function HomeBox() {
  const rightContentRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (rightContentRef.current) {
      observer.observe(rightContentRef.current);
    }

    return () => {
      if (rightContentRef.current) {
        observer.unobserve(rightContentRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${styles.mainbox} flex flex-col md:flex-row items-center justify-between p-6 md:p-12`}
    >
      {/* Left Content */}
      <div
        className={`${styles.leftcontent} text-center md:text-left max-w-lg`}
      >
        <div className={styles.content}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            MANAGE YOUR EXPENSES IN THE{" "}
            <span className="text-blue-500  ">BEST</span> WAY POSSIBLE.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-4">
            expenseMate lets you manage and track your expenses with the best
            modern visuals and tools.
          </p>
        </div>
        <button className="mt-6 px-6 py-3 w-full sm:w-auto bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>

      {/* Right Content with Image */}
      <div
        ref={rightContentRef}
        className={`${styles.rightcontent} ${
          isInView ? styles["in-view"] : ""
        } w-full md:w-1/2 flex justify-center mt-8 md:mt-0`}
      >
        <img
          src="/phone2.png"
          alt="Expense Tracker App"
          className="w-4/5 sm:w-3/5 md:w-full max-w-xs md:max-w-md"
        />
      </div>
    </div>
  );
}

export default HomeBox;
