

function User({children,k="black"}){
    return(
        <div style={{border:"2px solid black",padding:"2rem",margin:"2rem",color:k}}>
            {children}
        </div>
    )
}
export default User;