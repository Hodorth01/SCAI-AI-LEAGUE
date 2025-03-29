import StepCard from "../../components/StepCard";

const Steps = () => {
    return (
        <div className="py-5">
            {/* Heading */}
            <div className="d-flex justify-content-center mb-5">
                <h1 className="text-white text-heading-lg">
                    <span className="colordText">Master </span>
                    In Three Steps!
                </h1>
            </div>
            
            {/* Cards Container */}

            <div className="steps-container row justify-content-center w-100  mx-0">
                <div className="row">

                    {/* Card 1 - will stack on mobile, 3 across on desktop */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
                        <StepCard icon="./icons/checkIn.png" title="1. Check in"/>
                    </div>
                    
                    {/* Card 2 */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
                        <StepCard icon="./icons/play.png" title="2. Play"/>
                    </div>
                    
                    {/* Card 3 */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
                        <StepCard icon="./icons/thrive.png" title="3. Thrive!"/>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Steps;