const ShotPlacement = ({result})=>{
    return(
            <div className=" ">
                <h6 className="">Shot placement</h6>
                <img className= "d-flex w-100 " src={result} alt="heat map" />
            </div>
    )
}
export default ShotPlacement