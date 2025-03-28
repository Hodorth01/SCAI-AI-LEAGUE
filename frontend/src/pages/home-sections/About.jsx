import React, { forwardRef, useRef, useEffect } from "react";

const About = forwardRef((props, ref) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const updateLayerHeights = () => {
      const contentHeight = contentRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const layerHeight = Math.max(contentHeight, viewportHeight);

      if (ref?.backgroundLayerRef?.current) {
        ref.backgroundLayerRef.current.style.height = `${layerHeight}px`;
      }
      if (ref?.foregroundLayerRef?.current) {
        ref.foregroundLayerRef.current.style.height = `${layerHeight}px`;
      }
    };

    updateLayerHeights();
    window.addEventListener("resize", updateLayerHeights);

    return () => {
      window.removeEventListener("resize", updateLayerHeights);
    };
  }, [ref]);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Layer */}
      <div className="backgroundLayer" ref={ref?.backgroundLayerRef}></div>

      {/* Foreground Layer */}
      <div className="foregroundLayer" ref={ref?.foregroundLayerRef}></div>

      {/* Content Layer */}
      <div className="px-0 mx-0 pt-2 contentLayer" ref={contentRef}>
        <div className="container-fluid px-0 mx-0">
          <div className="row align-items-center px-0 mx-0 justify-content-between">
            {/* Image Column */}
            <div className="col-sm-12 col-md-12 col-lg-5 mx-0 px-0">
              <div className="image-holder mx-0 px-0 mb-5">
                <img className="img" src="images/image.png" alt="About Us" />
              </div>
            </div>

            {/* Text Column */}
            <div className="col-sm-12 col-md-12 col-lg-6 pe-5">
              <div className="colordText text-label">
                ABOUT US
              </div>

              <div>
                <span className="text-heading-lg">
                  We Bring{" "}
                </span>
                <span className="colordText text-heading-lg">
                  Innovative
                </span>
                <span className="text-heading-lg">
                  {" "}
                  ideas to Sports.
                </span>
              </div>

              <div className="text-body-lg mt-3">
                At SEED, we're rewriting the rules of tennis training with AI precision
              </div>

              <div className="text-body-md mt-3">
                Imagine courts wired with smart vision, capturing every sprint, swing, and strategy. Our AI doesn't just watch—it learns. It dissects your speed, decodes shot accuracy, and maps your game's DNA with pixel-perfect heatmaps. No guesswork. No gear. Just raw data sharpened into actionable edge.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default About;