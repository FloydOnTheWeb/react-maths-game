import React, { Component } from 'react'; 
import { Navbar} from 'react-bootstrap';

class AppHeader extends Component {

    render() {
        return (
            <div className="Header">
                <Navbar expand="lg" variant="light" bg="light">
                    <Navbar.Brand href="/">Mathematical Challenge</Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}

export default AppHeader
