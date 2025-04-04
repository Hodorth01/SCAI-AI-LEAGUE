import { Html } from "@react-three/drei";

const IntroText = () => {
  return (
    <Html
      position={[0, 1, 0]}
      center
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Line 1 */}
      <p className="introText"
        style={{
          color: "white",
          fontSize: "2.3rem",
          margin: 0,
          whiteSpace: 'nowrap',
          textAlign: 'center',
          lineHeight: 1
        }}
      >
        A NEW WAY OF
      </p>

      {/* Line 2 (colored text) */}
      <p className="introText colordText"
        style={{
          fontSize: "2.3rem",
          margin: 0,
          whiteSpace: 'nowrap',
          textAlign: 'center',
          lineHeight: 1
        }}
      >
        PLAYING
      </p>

      {/* Line 3 */}
      <p className="introText"
        style={{
          color: "white",
          fontSize: "2.3rem",
          margin: 0,
          whiteSpace: 'nowrap',
          textAlign: 'center',
          lineHeight: 1
        }}
      >
        SPORTS
      </p>
    </Html>
  );
};

export default IntroText;