import React, {useState, useImperativeHandle} from "react";


const Togglable = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)



    const childrendivstyle = {
        display: visible ? '' : 'none'
    }
    const buttondivstyle = {
        display: visible ? 'none' : ''
    }

    const createHandle = ()=>{
        return{
            toggleVisibility: ()=>{
                setVisible(!visible)
            }
        }
    }
    useImperativeHandle(ref,createHandle)

    return (
        <div>
            <div>
                <button style={buttondivstyle} onClick={() => {
                    setVisible(true)
                }}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={childrendivstyle}>
                {props.children}
                <button onClick={() => {
                    setVisible(false)
                }}>cancel
                </button>
            </div>

        </div>
    )
})

export default Togglable