import { forwardRef, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "./Flipbook.css";

const Page = forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <div className="page-image-container">{props.children}</div>
        <div className="page-footer">{props.number}</div>
      </div>
    </div>
  );
});

const Flipbook = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isHovered, setIsHovered] = useState(false);
  const bookRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    const imageModules = import.meta.glob("../assets/resources/*.webp", {
      eager: true,
    });
    const imagePaths = Object.values(imageModules).map((mod) => mod.default);
    setImages(imagePaths);
    setLoading(false);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (loading || images.length === 0) return;

    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        if (bookRef.current) {
          bookRef.current.pageFlip().flipNext();
        }
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [loading, images, isHovered]);

  if (loading) {
    return <div className="loading">Cargando album...</div>;
  }

  return (
    <section
      className="flipbook-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="book-container">
        <HTMLFlipBook
          width={750}
          height={1000}
          size="stretch"
          minWidth={300}
          maxWidth={2000}
          minHeight={400}
          maxHeight={2000}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="album-web"
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          ref={bookRef}
        >
          {images.map((img, index) => (
            <Page key={index} number={index + 1}>
              <img src={img} alt={`Recuerdo ${index + 1}`} loading="lazy" />
            </Page>
          ))}
        </HTMLFlipBook>
      </div>
    </section>
  );
};

export default Flipbook;
