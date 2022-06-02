import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
const Message = (props) => {



    return (<>
        {props.alerta ? <><div className='p-2 m-2 rounded-xl rounded-xl mx-auto text-center align-middle font-bold text-white bg-red-600'>{props.mensaje}</div></> : <><div className='p-2 m-2 align-middle text-center rounded-xl mx-auto font-bold text-white bg-blue-600'>{props.mensaje}</div></>}
    </>

    )
}

export default Message