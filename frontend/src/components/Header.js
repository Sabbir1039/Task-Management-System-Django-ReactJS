import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/userAuthContext";

function Header() {
  const {userData, isLoggedIn, handleLogOut} = useContext(UserContext);

  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userData && userData.id) {
    setUsername(userData.username);
    setImage(userData.image);
  } else {
    setUsername('Guest');
    setImage('#');
  }
}, [userData]);


  const toggleIconStyle = {
      fontSize: "1rem", // Adjust the font size as needed
  };
  return (
      <div className="m-0 p-0">
          <header className="bg-dark p-1 text-center">
              <Navbar.Brand href="#home" className="fs-4 text-light">
                  Task Management App
              </Navbar.Brand>
          </header>
          <Navbar expand="sm" bg="info" variant="dark">
              <Container>
                { isLoggedIn ? 
                    <Navbar.Brand href="/">
                        <img src={image} alt="Logo" style={{ marginRight: '10px', height: '30px' }} />
                        {username}
                    </Navbar.Brand>
                :
                <div></div>
                }
                
                  <Navbar.Toggle className="bg-dark my-1 ms-2" aria-controls="navbar-nav" style={toggleIconStyle}/>
                  <Navbar.Collapse id="navbar-nav">
                      <Nav className="mx-start text-center nav">
                          <NavLink className="btn btn-sm mx-1 btn-secondary my-1 my-sm-0" to="/">
                              Home
                          </NavLink>

                          { isLoggedIn ? 
                          <>
                              <NavLink className="btn btn-sm mx-1 btn-secondary my-1 my-sm-0" to="/create-task">
                                  Add Task
                              </NavLink>
                              <NavLink className="btn btn-sm mx-1 btn-secondary my-1 my-sm-0" to="/profile">
                                  Profile
                              </NavLink>
                              <NavLink onClick={handleLogOut} className="btn btn-sm mx-1 btn-secondary my-1 my-sm-0" to="/logout">
                                  Logout
                              </NavLink>
                          </> 
                          :
                          <>
                          <NavLink className="btn btn-sm mx-1 btn-secondary my-1 my-sm-0" to="/login">
                              Login
                          </NavLink>
                          <NavLink className="btn btn-sm mx-1 btn-secondary my-1 my-sm-0" to="/register">
                              Register
                          </NavLink>
                          </>
                          }
                          
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
      </div>
  );
}

export default Header;
