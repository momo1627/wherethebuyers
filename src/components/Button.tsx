import * as React from 'react'
type Props = {
    type:string;
    style:React.CSSProperties;
    buttonStyle:string;
    onClick(e: React.MouseEvent<HTMLElement>):void;
}
const Button:React.SFC<Props> = ({type,style,buttonStyle,onClick:click, children}) =>{
    return (
        <button type={type} style={style} className={buttonStyle} onClick={click}>{children}</button>
    )
}
export default Button