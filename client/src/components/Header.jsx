import React from "react";

import { useLocation } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, InputGroup, Form } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";

import { logout } from "../slices/authSlice";
import { removeFilter, setFilter } from "../slices/adSlice";

const Header = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [search, setSearch] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = () => {
    if (search === "") {
      dispatch(removeFilter("search"));
      return;
    }
    dispatch(setFilter({ key: "search", value: search }));
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>P2P Marketplace</Navbar.Brand>
          </LinkContainer>
          {location.pathname === "/" && (
            <Navbar.Text className="flex my-auto h-fit py-0">
              <InputGroup onSubmit={handleSubmit} className="cursor-pointer">
                <InputGroup.Text id="search" onClick={handleSubmit}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  value={search}
                  placeholder="Search ad..."
                  aria-label="Search ad"
                  aria-describedby="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Navbar.Text>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="max-w-fit">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <LinkContainer to="/manage" className="mr-4">
                    <Nav.Link>Manage your ad</Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    title={userInfo.name}
                    id="username"
                    className="[&>*:last-child]:left_inset [&>*:last-child]:right-0"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="!flex items-center">
                      <FaSignInAlt />
                      <div className="ml-2">Sign In</div>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link className="!flex items-center">
                      <FaSignOutAlt />
                      <div className="ml-2">Sign Up</div>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
