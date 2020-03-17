import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../UI";
import NavbarDropdown from "./MenuDropdown";

const Menu = props => {
  const { menu } = props;

  return (
    <ul className="flex h-full items-stretch">
      {Object.values(menu).map((menuItem, idx) => (
        <li className="flex items-stretch">
          {menuItem.children ? (
            <NavbarDropdown key={idx} buttonText={menuItem.text}>
              <ul className="bg-black-600 py-5 z-40">
                {Object.values(menuItem.children).map((childrenItems, idx) => (
                  <li className="w-40">
                    <NavLink
                      key={idx}
                      exact
                      to={childrenItems.path}
                      className="block font-thin hover:bg-black-500 px-3 py-3 text-sm text-white w-full with-chevron"
                      activeClassName="bg-black-500"
                    >
                      <span className="mr-1">{childrenItems.text}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </NavbarDropdown>
          ) : (
            <NavLink
              key={idx}
              exact
              to={menuItem.path}
              className="font-thin hover:bg-black-600 px-3 py-4 text-sm text-white with-chevron"
              activeClassName="bg-black-600"
            >
              <span className="mr-1">{menuItem.text}</span>
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
