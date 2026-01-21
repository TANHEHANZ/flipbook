import React, { forwardRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './Flipbook.css';

const Page = forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <div className="page-image-container">
          {props.children}
        </div>
        <div className="page-footer">{props.number}</div>
      </div>
    </div>
  );
});

const Flipbook = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageModules = import.meta.glob('../assets/resources/*.webp', { eager: true });
    const imagePaths = Object.values(imageModules).map((mod) => mod.default);
    console.log("Images found:", imagePaths.length);
    setImages(imagePaths);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Cargando album...</div>;
  }

  return (      
      <section className="flipbook-wrapper">
        <div className="book-container">
          <HTMLFlipBook
            width={550}
            height={733}
            size="stretch"
            minWidth={280}
            maxWidth={800}
            minHeight={400}
            maxHeight={1200}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="album-web"
            startPage={0}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true} 
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
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
