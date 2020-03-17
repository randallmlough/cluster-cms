import React, { useRef, useState, useEffect } from "react";
import { Icon } from "../UI";
import AnonUser from "./anon-user.png";

const UserMenuDropdown = props => {
  const { children } = props;

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
    <div className="relative h-full" ref={dropdownContainer}>
      <button
        className={
          "flex h-full items-stretch with-chevron text-white px-3 hover:bg-black-600" +
          (isOpen ? " bg-black-600" : "")
        }
        onClick={() => setIsOpen(prev => !prev)}
      >
        <img src={AnonUser} className="h-8 rounded-full mr-3" />
        <Icon
          icon="chevron-down"
          size="xs"
          className={
            "chevron self-center" + (isOpen ? " text-primary-500" : "")
          }
        />
      </button>
      {isOpen && children && (
        <div className="absolute mr-2 mt-2 right-0">{children}</div>
      )}
    </div>
  );
};

export default UserMenuDropdown;
