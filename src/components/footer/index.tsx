import React from "react";
import './index.css'
import '../navbar/navbar.css'
import { MiniNavbar, Navbar, NavbarLink, NavbarListItem, NavbarUList } from "../navbar"

function Footer()
{
    return (
        <footer>
            <p className="footer__content">
                <i className="far fa-copyright"></i> copyright 2021 lolololol
            </p>
            <p className="footer__content">
                A <a className="--animated-underline" href="https://github.com/seamussmith">Seamus Smith</a> website powered by PokeAPI.
            </p>
            <MiniNavbar>
                <NavbarUList>
                    <NavbarListItem>
                        <NavbarLink href="https://github.com/seamussmith/poke-searcher-react">
                        <i className="fab fa-github --force-inheritence"></i> github</NavbarLink>
                    </NavbarListItem>
                    <NavbarListItem>
                        <NavbarLink href="https://www.youtube.com/watch?v=G4z9yW72A1o">
                        <i className="fas fa-angry --force-inheritence"></i> get rickrolled</NavbarLink>
                    </NavbarListItem>
                    <NavbarListItem>
                        <NavbarLink href="https://pokeapi.co/">
                        <i className="fas fa-server --force-inheritence"></i> PokeAPI</NavbarLink>
                    </NavbarListItem>
                </NavbarUList>
            </MiniNavbar>
        </footer>
    )
}

export default Footer
