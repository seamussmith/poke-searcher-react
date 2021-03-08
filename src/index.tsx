import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Footer from './components/footer/footer'

async function main()
{
    const pokeList = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=9999")
                            .then(blob => blob.json())
    ReactDOM.render(
        <React.StrictMode>
            <App pokemonIndex={pokeList}/>
            <Footer />
        </React.StrictMode>,
        document.getElementById('root')
    )
}
main()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
