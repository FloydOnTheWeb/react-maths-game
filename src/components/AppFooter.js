import React, { Component } from "react";
import { Navbar, Container, NavbarBrand } from "react-bootstrap";

class AppFooter extends Component {
  render() {
    return (
      <div className="fixed-bottom">
        <Navbar>
          <Container>
            <NavbarBrand className="text-muted brand-logo">
              &copy; FloydOnTheWeb
            </NavbarBrand>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppFooter;
