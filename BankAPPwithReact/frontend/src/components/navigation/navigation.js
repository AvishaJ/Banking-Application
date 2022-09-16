import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useNavigate} from "react-router-dom";
import axios from "axios";
import img from '../../download.png'
import  './navigation.css'
function Navigation({ userName, role }) {
    let navigate = new useNavigate();
    const handleMyLogout = () => {
        axios.post('http://localhost:8082/api/v1/logout').then((resp)=> {
            navigate('/');
        });
    };

    if (role === "banker") {
        const createBankPath = "/CreateBank/" + userName
        const allBankPath = "/AllBank/" + userName
        const createCustomerPath = "/CreateCustomer/" + userName
        const allCustomerPath = "/AllCustomer/" + userName

        return (
                <Navbar className="fixed-top" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={img} className = "img" alt = "logo"></img> &nbsp;
                        {userName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <NavDropdown title="Bank" id="basic-nav-dropdown">
                                <NavDropdown.Item href={createBankPath}>Create Bank</NavDropdown.Item>
                                <NavDropdown.Divider style={{background : "grey"}}/>
                                <NavDropdown.Item href={allBankPath}>All Bank</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        
                        <Nav className="me-auto">

                            <NavDropdown title="User"  id="basic-nav-dropdown">
                                <NavDropdown.Item href={createCustomerPath} >Create User</NavDropdown.Item>
                                <NavDropdown.Divider style={{background : "grey"}}/>
                                <NavDropdown.Item href={allCustomerPath} >All User</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <div className='pull-right' >
                            <ul className="nav navbar-nav">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={handleMyLogout} style={{ backgroundColor: "orange" }}>Logout</button>
                                
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    } else {
        const allAccountPath = "/AllAccount/" + userName
        const createAllBank1Path = "/AllBank1/" + userName
        return (

            // 
            <Navbar className="fixed-top" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={img} className = "img" alt = "logo"></img> &nbsp;
                        {userName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <NavDropdown title="Bank" id="collasible-nav-dropdown">
                                <NavDropdown.Item href={createAllBank1Path}>All Bank</NavDropdown.Item>
                                
                            </NavDropdown>

                            <NavDropdown title="Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item href={allAccountPath}>All Account</NavDropdown.Item>
                                
                            </NavDropdown>

                        </Nav>
                        <div className='pull-right' >
                            <ul className="nav navbar-nav">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;

                        <button className="btn btn-primary" onClick={handleMyLogout} style={{ backgroundColor: "orange" }}>Logout</button>
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

}
export default Navigation
