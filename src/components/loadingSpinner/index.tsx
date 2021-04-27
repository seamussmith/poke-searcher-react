import './index.css'

// Loading spinner by https://loading.io/css/

export default function LoadingSpinner(props: {
    visible: boolean
})
{
    return (
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
