import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import './navigationStyle.css';

export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white style"  to="/">Home</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white style"  to="/department">Department</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white style"   to="/employee">Employee</NavLink>
                    </Nav>

                </Navbar.Collapse>

            </Navbar>
        );
    }
}

