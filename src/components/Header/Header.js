import React from "react";
import { NavLink } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import "./Header.css"
import Logo from '../../Assets/logo.png'
const Header = () =>{
    return(
        <div className="Navigation">
            <Navbar style={{
                backgroundColor:'#D70F64',
                height:'70px',

            }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <img src={Logo} alt="logo" width="80px" />
                </NavbarBrand>
                <Nav className="mr-md-5">
                    <NavItem>
                        <NavLink exact to="/"  className="NavLink" >Burger Builder</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/Orders"  className="NavLink" >Orders</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact to="/Checkout"  className="NavLink" >Checkout</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}
export default Header;