import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadUsersStart, searchUserStart } from "../redux/actions";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBCollapse,
  MDBNavbarItem,
  MDBBtn,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const [keywords, setKeywords] = useState("");
  const [showBasic, setShowBasic] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(searchUserStart(keywords));
    setKeywords("");
  };

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-white">
            <span style={{ marginRight: "10px" }}>
              <MDBIcon fas icon="book-open"></MDBIcon>
            </span>
            Contact
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="text-white"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="/addUser" className="text-white">
                    AddUsers
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="/about" className="text-white">
                    About
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <form onSubmit={handleSubmit} className="d-flex input-group w-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Search Name..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <MDBBtn color="dark" type="submit">
                Search
              </MDBBtn>
           
            </form>
            <MDBBtn
                color="info"
                style={{marginLeft: "4px"}}
                type="submit"
                onClick={() => dispatch(loadUsersStart())}
              >
                Reset
              </MDBBtn>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
