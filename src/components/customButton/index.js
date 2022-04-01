const CustomButton = ({children, onClick}) =>{
    return (
        <button  onClick={onClick}>{children}</button>
    )
}

export default CustomButton;