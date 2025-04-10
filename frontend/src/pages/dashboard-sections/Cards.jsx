const Card = ({title,amount,increase ,icon})=>{
    return(
        <div className="card">
            <div className="card-body p-3">
                <div className="row">
                    <div className="col-8">
                        <div className="numbers">
                            <p className="text-sm mb-0 text-uppercase font-weight-bold">{title}</p>
                            <h5 className="font-weight-bolder">
                            {amount}
                            </h5>
                            <p className="mb-0">
                                <span className="text-success text-sm font-weight-bolder">{increase} </span>
                                since last month
                            </p>
                        </div>
                    </div>
                    <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow-primary text-center justify-content-center" >
                            <img className="d-flex " src={icon} width={48} height={48}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card