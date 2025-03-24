const Services = ()=>{
    return(
        <div style={{width: 589, height: 551, paddingBottom: 37, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'inline-flex'}}>
            <div style={{width: 201, height: 35, color: '#732ACB', fontSize: 21, fontFamily: 'Poppins', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 3.04, wordWrap: 'break-word'}}>our services</div>
            <div style={{ display: "flex", alignItems: "center", lineHeight: "59.76px", wordWrap: "break-word" }}>
            {/* First Part: "Unlock Your Game with" */}
            <span
                style={{
                color: "white",
                fontSize: "48px",
                fontFamily: "Poppins",
                fontWeight: "700",
                textTransform: "capitalize",
                }}
            >
                Unlock Your Game with{" "}
            </span>

            {/* Middle Part: "SEED" */}
            <span
                style={{
                color: "#732ACB",
                fontSize: "48px",
                fontFamily: "Poppins",
                fontWeight: "700",
                textTransform: "capitalize",
                }}
            >
                SEED
            </span>

            {/* Last Part: "Insights" */}
            <span
                style={{
                color: "white",
                fontSize: "48px",
                fontFamily: "Poppins",
                fontWeight: "700",
                textTransform: "capitalize",
                }}
            >
                {" "}
                Insights
            </span>
            </div>
            <div style={{width: 589, height: 132, color: 'white', fontSize: 26, fontFamily: 'Poppins', fontWeight: '300', lineHeight: 43.29, letterSpacing: 1.04, wordWrap: 'break-word'}}>From grassroots to grand slams, SEED isn’t just tracking tennis—we’re rewriting how it’s played, watched, and judged. Ready to play smarter?"</div>
            <div style={{width: 145, height: 47}} />
            <div style={{width: 145, paddingLeft: 21, paddingRight: 21, paddingTop: 10, paddingBottom: 10, borderRadius: 2, outline: '3px #732ACB solid', outlineOffset: '-3px', justifyContent: 'center', alignItems: 'center', gap: 23, display: 'inline-flex'}}>
                <div style={{textAlign: 'center', color: 'white', fontSize: 17, fontFamily: 'Poppins', fontWeight: '400', textTransform: 'uppercase', letterSpacing: 2.46, wordWrap: 'break-word'}}>VIEW ALL</div>
            </div>
        </div>
    )
}
export default Services