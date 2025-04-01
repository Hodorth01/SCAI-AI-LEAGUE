 const Button = ()=>{
    return(
                
                <div className="d-flex gap-3 mt-3" style={{maxWidth:"800px", justifySelf:"center"}}>
                <Border>
                  <div
                    style={{
                      paddingLeft: 25,
                      paddingRight: 25,
                      paddingTop: 10,
                      paddingBottom: 10,
                      justifyContent: "start",
                      alignItems: "start",
                      gap: 10,
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 17,
                        fontFamily: "Poppins",
                        fontWeight: "400",
                        textTransform: "uppercase",
                        letterSpacing: 2.46,
                        wordWrap: "break-word",
                      }}
                      className="btn p-0"
                    >
                      GET IN TOUCH
                    </div>
                  </div>
                </Border>
              </div>
    )
 }