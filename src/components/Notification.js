import React from "react";

const Notification = ({message, isError}) => {
    const msgStyle = {
        color: "green",
        border: "1px green solid",
        borderRadius: 10,
        textAlign: "center",
        padding: 5,
        marginBottom: 10
    }

    const errStyle = {
        ...msgStyle,
        color: "red",
        borderColor: "red",

    }

    let msg
    if(isError){
       msg =  message.response.data.error ? message.response.data.error : message.message
    } else {
        msg = message
    }

    return (
        !message ?
            null
            :
            <div style={isError ? errStyle : msgStyle}>
                {msg}
            </div>
    )
}

export default Notification