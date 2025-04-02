import ServiceCard from "../../components/ServiceCard";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Services = () => {
  const { sectionRef, addToHeadingRefs, addToTextRefs, addToCardRefs } = useScrollAnimation();

  return (
    <div className="container py-5" ref={sectionRef}>
      <div className="row">
        {/* Left Column - Text Content */}
        <div className="col-12 col-xl-6 mb-5 mb-xl-0">
          <div className="d-flex flex-column h-100">
            <div className="d-inline-block" ref={addToHeadingRefs}>
              <div className="colordText text-label">
                our services
              </div>
            </div>
            <h1 className="text-white text-heading-lg mb-3" ref={addToHeadingRefs}>
              Unlock Your Game with <span className="colordText">SEED</span> Insights
            </h1>
            <p className="text-white text-body-lg mb-4" ref={addToTextRefs}>
              From grassroots to grand slams, SEED isn't just tracking tennis—we're rewriting how it's played, watched, and judged. Ready to play smarter?
            </p>
          </div>
        </div>

        {/* Right Column - Cards */}
        <div className="col-12 col-xl-6">
          <div className="row justify-content-start gx-4 gy-4">
            {/* First row of cards */}
            <div className="col-12 d-flex flex-wrap justify-content-xl-start justify-content-center">
              <div className="mx-2 mb-4" ref={addToCardRefs}>
                <ServiceCard
                  icon="./icons/heatmaps.png"
                  title="heatmaps" 
                  description="Visualize a player's positioning and activity on the field."
                />
              </div>
              <div className="mx-2 mb-4" ref={addToCardRefs}>
                <ServiceCard
                  icon="./icons/speed.png"
                  title="Speed" 
                  description="Tracks a player's pace during matches."
                />                            
              </div>
            </div>
            {/* Second row of cards */}
            <div className="col-12 d-flex flex-wrap justify-content-xl-start justify-content-center">
              <div className="mx-2 mb-4" ref={addToCardRefs}>
                <ServiceCard
                  icon="./icons/ux.png"
                  title="insights" 
                  description="Evaluates past performances to identify trends and patterns."
                />                                
              </div>
              <div className="mx-2 mb-4" ref={addToCardRefs}>
                <ServiceCard
                  icon="./icons/shot.png"
                  title="shot placements" 
                  description="Visualize a player's shot accuracy on the field and learn new patterns."
                />                                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;