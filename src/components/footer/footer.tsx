import React from "react";
import './footer.css'
import '../navbar/navbar.css'

class Footer extends React.Component
{
    render()
    {
        return (
            <footer>
                <p className="footer__content">
                    <i className="far fa-copyright"></i> copyright 2021 lolololol
                </p>
                <p className="footer__content">
                    A <a className="--animated-underline" href="https://github.com/seamussmith">Seamus Smith</a> website powered by PokeAPI.
                </p>
                <nav className="navbar navbar--minature footer__content">
                    <ul className="navbar__ulist">
                        <li className="navbar__ulist-item">
                            <a className="navbar__link" href="https://github.com/seamussmith/PollsProject">
                            <i className="fab fa-github --force-inheritence"></i> github</a>
                        </li>
                        <li className="navbar__ulist-item">
                            <a className="navbar__link" href="https://www.youtube.com/watch?v=G4z9yW72A1o">
                            <i className="fas fa-angry --force-inheritence"></i> get rickrolled</a>
                        </li>
                        <li className="navbar__ulist-item">
                            <a className="navbar__link" href="https://pokeapi.co/">
                            <i className="fas fa-server --force-inheritence"></i> PokeAPI</a>
                        </li>
                    </ul>
                </nav>
            </footer>
        )
    }
}

export default Footer
