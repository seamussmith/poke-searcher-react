import './index.css'

// Loading spinner by https://loading.io/css/

export default function LoadingSpinner(props: {
    visible: boolean
})
{
    return (
        <div className="lds-ring" style={{
            display: props.visible?"inline-block":"none"
        }}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
