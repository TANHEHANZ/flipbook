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
    const imageModules = import.meta.glob('../assets/resources/*.{png,jpg,jpeg,JPG,jpeg}', { eager: true });
    const imagePaths = Object.values(imageModules).map((mod) => mod.default);
    setImages(imagePaths);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Cargando album...</div>;
  }

  return (      
      <section className="flipbook-wrapper">
        <div className="">
          <HTMLFlipBook
            width={550}
            height={733}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={420}
            maxHeight={1333}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="album-web"
            startPage={0}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={false}
            startZIndex={0}
            autoSize={true}
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
