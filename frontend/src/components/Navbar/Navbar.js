import React from "react";
import { ReactComponent as Mark } from "./mark.svg";
import { Link, NavLink, useHistory } from "react-router-dom";
import { mainMenu } from "../../menus";
import UserMenuDropdown from "./UserMenuDropdown";
import Menu from "./Menu";
import { removeUserSessionAction } from "../../actions";
import { connect } from "react-redux";
import "./Navbar.css";

const Navbar = props => {
  const { removeSession } = props;

  const handleLogout = e => {
    e.preventDefault();
    removeSession();
  };
  return (
    <header className="bg-black-500">
      <div>
        <div className="relative flex items-stretch justify-between">
          {/* MOBILE MENU TO GO HERE AT SOME POINT */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex h-full px-3 hover:bg-black-600 items-center"
              >
                <Mark className="block h-10 w-auto fill-current text-primary-500" />
              </Link>
            </div>
            <div className="hidden sm:block">
              <nav className="h-full">
                <Menu menu={mainMenu} />
              </nav>
            </div>
            <div className="flex ml-auto">
              <div className="bg-gray-100 h-8 mx-3 opacity-25 self-center w-px"></div>
              <div className="h-full">
                <UserMenuDropdown>
                  <div className="bg-white border border-gray-400 p-3 rounded w-64">
                    <button
                      className="text-secondary-500 hover:text-secondary-700"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                </UserMenuDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapDispatchToProps = dispatch => ({
  removeSession: () => dispatch(removeUserSessionAction())
});

export default connect(null, mapDispatchToProps)(Navbar);
