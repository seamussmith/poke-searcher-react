import React from 'react'
import copy from 'copy-to-clipboard'
import './copyClicker.css'

type CopyClicker_props = {
    copyTxt: string
}
type CopyClicker_state = {
    hoverTxt: string
}
class CopyClicker extends React.Component<CopyClicker_props, CopyClicker_state>
{
    constructor(props: CopyClicker_props)
    {
        super(props)
        this.state = {
            hoverTxt: "Click to copy"
        }
        this.onClick = this.onClick.bind(this)
    }
    onClick()
    {
        this.setState({
            hoverTxt: "Copied!"
        })
        copy(this.props.copyTxt)
        window.setTimeout(() => {
            this.setState({
                hoverTxt: "Click to copy"
            })
        }, 500)
    }
    render()
    {
        return (
            <span
            className="copy-clicker tooltip"
            data-hover-txt={this.state.hoverTxt}
            onClick={this.onClick}>
                {this.props.copyTxt}
            </span>
        )
    }
}

export default CopyClicker
