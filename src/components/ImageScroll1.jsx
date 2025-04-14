import { useState, useEffect } from "react";

function ScrollImageChange({ images, scrollStep = 300 }) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newIndex = Math.min(
        Math.floor(scrollPosition / scrollStep),
        images.length - 1
      );
      setImageIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [images.length, scrollStep]);

  return (
    <div className=" flex justify-center items-center">
      <img
        src={images[imageIndex]}
        alt="Scrolling Image"
        className="w-[100%] md:w-[100%] lg:w-[100%] max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] 
        rounded-lg shadow-lg transition-transform duration-500 hover:scale-110 hover:opacity-75"
      />
    </div>
  );
}

export default ScrollImageChange;
