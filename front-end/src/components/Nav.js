import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Nav = ({ location: { pathname }, logged_in, setCurrentUser }) => {
  let logout =  () => {
    setCurrentUser(null)
    localStorage.clear()
  }
  return (
    <Menu pointing secondary size="huge">
      {logged_in ? (
        <Fragment>
          <Menu.Item
            as={NavLink}
            to="/profile"
            name="Home"
            active={pathname === "/profile"}
          />
          <Menu.Item
            name='Messages'
            
            // onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Trips'
            
            // onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Rentals'
            
            // onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item to="/logout" name="Logout" onClick={logout} />
          </Menu.Menu>
        </Fragment>
      ) : (
        <Menu.Item
          as={NavLink}
          to="/login"
          name="Login"
          active={pathname === "/login"}
        />
      )}
    </Menu>
  );
};

export default withRouter(Nav);


