import React, { useState, useRef } from 'react'
import copy from 'copy-to-clipboard'
import './index.css'
import '../tooltip/tooltip.css'

const INITAL_TXT = "Click to copy!"
const CLICKED_TXT = "Copied!"
function CopyClicker(props: {
    copyTxt: string
})
{
    const [hoverTxt, setHoverTxt] = useState(INITAL_TXT)
    const timeoutid = useRef(-1)
    const onClick = () => {
        window.clearTimeout(timeoutid.current)
        setHoverTxt(CLICKED_TXT)
        copy(props.copyTxt)
        timeoutid.current =
            window.setTimeout(() => {
                setHoverTxt(INITAL_TXT)
            }, 500)
    }
    return (
        <span
        className="copy-clicker tooltip"
        data-hover-txt={hoverTxt}
        onClick={onClick}>
            {props.copyTxt}
        </span>
    )
}

export default CopyClicker
