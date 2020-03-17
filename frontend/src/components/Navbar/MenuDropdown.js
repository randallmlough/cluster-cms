import React, { useRef, useState, useEffect } from "react";
import { Icon } from "../UI";

const NavbarDropdown = props => {
  const { buttonText, children } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownContainer = useRef();
  useEffect(() => {
    function dropdownListener(e) {
      if (!dropdownContainer || !dropdownContainer.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", dropdownListener);
    return () => {
      document.removeEventListener("mousedown", dropdownListener);
    };
  }, [dropdownContainer]);
  return (
    <div className="relative" ref={dropdownContainer}>
      <button
        className={
          "font-thin hover:bg-black-600 px-3 py-4 text-sm text-white with-chevron" +
          (isOpen ? " bg-black-600" : "")
        }
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="mr-2">{buttonText}</span>
        <Icon
          icon="chevron-down"
          size="xs"
          className={"chevron" + (isOpen ? " text-primary-500" : "")}
        />
      </button>
      {isOpen && children && <div className="absolute">{children}</div>}
    </div>
  );
};

export default NavbarDropdown;
