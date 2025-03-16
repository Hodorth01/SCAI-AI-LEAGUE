const Logo = ()=>{
    const style = {
        width: 222, height: 66, textAlign: 'center',  fontSize: 50, fontFamily: 'Poppins', 
        fontWeight: '600', textTransform: 'uppercase', wordWrap: 'break-word',
        background:"linear-gradient(to right, purple ,blue)",
        backgroundClip:"text",
        color:"transparent"
    }

    return(
        <div style={style}>
            SEED<br/>
        </div>

    )
}
export default Logo