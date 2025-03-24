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
          height: "100vh", // Default height (will be updated dynamically)
          background: "linear-gradient(180deg, #151515, #0a0a0a)",
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
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 3, // Ensure the content is above the background and foreground layers
          padding: "20px",
          color: "white",
          display: "flex",
          alignItems: "center", // Vertically center the content
        }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            {/* Image Column */}
            <div className="col-sm-12 col-md-12 col-lg-5">
              <div
                className="image-holder w-100"
                style={{
                  width: "100%",
                  height: "auto",
                  overflow: "hidden",
                  borderRadius: "10px", // Optional: Add rounded corners
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
            <div className="col-sm-12 col-md-12 col-lg-7">
              {/* Title */}
              <div
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
                <span
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

              {/* Button */}
              <div
                style={{
                  padding: "10px 25px",
                  borderRadius: "2px",
                  outline: "3px #732ACB solid",
                  outlineOffset: "-3px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  display: "inline-flex",
                  marginTop: "20px", // Add margin for spacing
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: "17px",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    wordWrap: "break-word",
                  }}
                >
                  READ MORE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default About;