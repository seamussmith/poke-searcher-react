import React from 'react'
import copy from 'copy-to-clipboard'
import './copyClicker.css'

type CopyClicker_props = {
    copy_txt: string
}
type CopyClicker_state = {
    hover_txt: string
}
class CopyClicker extends React.Component<CopyClicker_props, CopyClicker_state>
{
    constructor(props: CopyClicker_props)
    {
        super(props)
        this.state = {
            hover_txt: "Click to copy"
        }
        this.onClick = this.onClick.bind(this)
    }
    onClick()
    {
        this.setState({
            hover_txt: "Copied!"
        })
        copy(this.props.copy_txt)
        window.setTimeout(() => {
            this.setState({
                hover_txt: "Click to copy"
            })
        }, 500)
    }
    render()
    {
        return (
            <span
            className="search__share-result tooltip"
            data-hover-txt={this.state.hover_txt}
            onClick={this.onClick}>
                {this.props.copy_txt}
            </span>
        )
    }
}

export default CopyClicker
