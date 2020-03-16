import React from "react";
import { ReactComponent as Mark } from "./mark.svg";
import { ReactComponent as Logo } from "./logo.svg";
import { Link, NavLink } from "react-router-dom";
import { mainMenu } from "../../menus";
const Navbar = props => {
  return (
    <header className="bg-secondary-500">
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* MOBILE MENU TO GO HERE AT SOME POINT */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/">
                <Mark className="block lg:hidden h-8 w-auto" />
                <Logo className="hidden lg:block h-8 w-auto" />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <nav className="flex">
                <ul>
                  {Object.values(mainMenu).map((menuItem, idx) => (
                    <li>
                      <NavLink
                        key={idx}
                        exact
                        to={menuItem.path}
                        className=""
                        activeClassName=""
                      >
                        {menuItem.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
