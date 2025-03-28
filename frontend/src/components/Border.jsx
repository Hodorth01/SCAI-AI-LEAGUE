import React from "react";

const Border = ({ children }) => {
  return (
    <div className="border-container">
      {children}
    </div>
  );
};

export default Border;

/* border */
// .border-container {
//   position: relative;
//   padding: 10px; 
//   background: var(--background-primary)!important;
//   color: white;
//   overflow: hidden; /* Ensure the border doesn't overflow */
//   display: inline-block; /* Ensure it fits the content */
// }

// .border-container::before {
//   content: "";
//   position: absolute;
//   top: -50%;
//   left: -50%;
//   width: 200%;
//   height: 200%;
//   background: linear-gradient(
//     0deg,
//     transparent,
//     #8a2be2,
//     #7700ff,
//     transparent
//   ); /* Gradient colors */
//   animation: rotateBorder 4s linear infinite; /* Continuous rotation */
//   z-index: 0; /* Ensure it's behind the content */
//   transition: all 0.5s ease; /* Smooth transition for hover effect */
// }

// .border-container::after {
//   content: "";
//   position: absolute;
//   top: 3px; /* Adjust to match border thickness */
//   left: 3px; /* Adjust to match border thickness */
//   right: 3px; /* Adjust to match border thickness */
//   bottom: 3px; /* Adjust to match border thickness */
//   background: var(--background-primary)!important;
//   z-index: 1; /* Ensure it's above the gradient */
//   transition: all 0.5s ease; /* Smooth transition for hover effect */
// }

// /* Keyframes for rotating the border */
// @keyframes rotateBorder {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }

// /* Hover effect */
// .border-container:hover::before {
//   animation-play-state: paused; /* Pause the animation on hover */
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(45deg, #8a2be2, #7700ff); /* Static gradient border */
//   opacity: 0;
// }

// /* Glowing effect for static border */
// .border-container:hover {
//   box-shadow: 0 0 10px #8a2be2, 0 0 20px #7700ff; /* Glowing effect */
// }

// /* Inner content styling */
// .border-container > * {
//   position: relative;
//   z-index: 2; /* Ensure content is above the borders */
// }
