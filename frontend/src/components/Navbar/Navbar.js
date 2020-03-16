import React from "react";
import { ReactComponent as Mark } from "./mark.svg";
import { ReactComponent as Logo } from "./logo.svg";
import { Link, NavLink } from "react-router-dom";
import { mainMenu } from "../../menus";
const Navbar = props => {
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
                <ul className="flex h-full items-stretch">
                  {Object.values(mainMenu).map((menuItem, idx) => (
                    <li className="flex items-stretch">
                      <NavLink
                        key={idx}
                        exact
                        to={menuItem.path}
                        className="font-thin hover:bg-black-600 px-3 py-4 text-sm text-white"
                        activeClassName="bg-black-600"
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
