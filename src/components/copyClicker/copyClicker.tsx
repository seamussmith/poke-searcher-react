import React from 'react'

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
    }
    render()
    {
        return (
            <span
            className="search__share-result tooltip"
            data-hover-txt="Click to copy"
            onClick={function(){}}
            >
                {/* ${document.location.origin + document.location.pathname}?pkmn=${result.name} */}
            </span>
        )
    }
}
