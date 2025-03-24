import React, { forwardRef, useRef, useEffect } from "react";

const About = forwardRef((props, ref) => {
  const contentRef = useRef(null); // Ref to measure content height

  useEffect(() => {
    // Function to update the background and foreground height
    const updateLayerHeights = () => {
      const contentHeight = contentRef.current.offsetHeight; // Get content height
      const viewportHeight = window.innerHeight; // Get viewport height
      const layerHeight = Math.max(contentHeight, viewportHeight); // Use the larger value

      // Set the height of the background and foreground layers
      if (ref?.backgroundLayerRef?.current) {
        ref.backgroundLayerRef.current.style.height = `${layerHeight}px`;
      }
      if (ref?.foregroundLayerRef?.current) {
        ref.foregroundLayerRef.current.style.height = `${layerHeight}px`;
      }
    };

    // Update the height on mount and window resize
    updateLayerHeights();
    window.addEventListener("resize", updateLayerHeights);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", updateLayerHeights);
    };
  }, [ref]);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Layer (Moves Slower) */}
      <div
        ref={ref?.backgroundLayerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto", // Default height (will be updated dynamically)
          background: "#151515",
          zIndex: 1,
        }}
      ></div>

      {/* Foreground Layer (Moves Faster) */}
      <div
        ref={ref?.foregroundLayerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh", // Default height (will be updated dynamically)
          zIndex: 2,
        }}
      ></div>

      {/* Content Layer (Stays Steady) */}
      <div
        className="px-0 mx-0 pt-2"
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 3, // Ensure the content is above the background and foreground layers
          color: "white",
          display: "flex",
          alignItems: "center", // Vertically center the content
        }}
      >
        <div className="container-fluid px-0 mx-0">
          <div className="row align-items-center px-0 mx-0 justify-content-between">
            {/* Image Column */}
            <div className="col-sm-12 col-md-12 col-lg-5 mx-0 px-0">
              <div
                className="image-holder mx-0 px-0 mb-5"
                style={{
                  width: "100%",
                  height: "auto",
                  overflow: "hidden",
                }}
              >
                <img
                  src="images/image.png"
                  alt="About Us"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover", // Ensure the image covers the container
                  }}
                />
              </div>
            </div>

            {/* Text Column */}
            <div className="col-sm-12 col-md-12 col-lg-6 pe-5">
              {/* Title */}
              <div className="colordText"
                style={{
                  color: "#732ACB",
                  fontSize: "21px",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  wordWrap: "break-word",
                }}
              >
                ABOUT US
              </div>

              {/* Main Heading */}
              <div>
                <span
                  style={{
                    color: "white",
                    fontSize: "48px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    textTransform: "capitalize",
                    wordWrap: "break-word",
                  }}
                >
                  We Bring{" "}
                </span>
                <span className="colordText"
                  style={{
                    color: "#732ACB",
                    fontSize: "48px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    textTransform: "capitalize",
                    wordWrap: "break-word",
                  }}
                >
                  Innovative
                </span>
                <span
                  style={{
                    color: "white",
                    fontSize: "48px",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                    textTransform: "capitalize",
                    wordWrap: "break-word",
                  }}
                >
                  {" "}
                  ideas to Sports.
                </span>
              </div>

              {/* Subheading */}
              <div 
                style={{
                  textAlign: "center",
                  color: "#732ACB",
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  textTransform: "capitalize",
                  letterSpacing: "0.12em",
                  wordWrap: "break-word",
                  margin: "10px 0", // Add margin for spacing
                }}
              >
                At SEED, we’re rewriting the rules of tennis training with AI precision
              </div>

              {/* Description */}
              <div
                style={{
                  color: "white",
                  fontSize: "26px",
                  fontFamily: "Poppins",
                  fontWeight: "300",
                  letterSpacing: "0.04em",
                  wordWrap: "break-word",
                  margin: "10px 0", // Add margin for spacing
                }}
              >
                Imagine courts wired with smart vision, capturing every sprint, swing, and strategy. Our AI doesn’t just watch—it learns. It dissects your speed, decodes shot accuracy, and maps your game’s DNA with pixel-perfect heatmaps. No guesswork. No gear. Just raw data sharpened into actionable edge.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default About;