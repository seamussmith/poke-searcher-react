import styled from "styled-components";

export const Navbar = styled.nav`
    background: var(--layer-1);
    text-align: center;
    border-bottom: solid var(--layer-3) 2px;
    box-shadow: 0 1px 2px var(--shadow-color);
    padding: 18px 0;
`

export const NavbarLink = styled.a`
    position: relative;
    color: var(--link-color);
    font-size: 23pt;
    padding: 0px 10px;
    text-decoration: none;
    transition: all 0.10s;
    &:hover {
        color: var(--link-hover);
    }
    &:before {
        content: '';
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        border-bottom: solid var(--link-hover) 2px;
        border-radius: 20px;
        /* NEGATIVE PADDING!?!?!?? */
        margin: -0.3ch 0px;
        background-color: transparent;
        transition: all 0.30s ease;
        transform: scaleX(0);
    }
    &:hover::before {
        transform:scaleX(1);
    }
    @media (max-width: 1080px) {
        font-size: 18pt;
        padding: 0 2px;
    }
`

export const NavbarUList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: auto;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-flow: wrap row;
`

export const NavbarListItem = styled.li`
    margin: 0 10px;
`

export const MiniNavbar = styled(Navbar)`
    & ${NavbarLink} {
        padding: 0;
        font-size: 20px;
        background-color: transparent;
    }
    & ${NavbarUList} {
        flex-flow: wrap row;
    }
    & ${NavbarListItem} {
        margin: 0 10px;
    }
    border: 0;
    padding: 10px 20px;
    background-color: transparent;
    box-shadow: none;
`
