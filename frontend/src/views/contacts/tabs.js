import React, { useState } from "react";

export const Tabs = ({ children, ...props }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = tab => {
    setActiveTab(tab);
  };

  return (
    <>
      <ul className="mx-3 border-b border-gray-400 flex mb-5">
        {children.map(child => {
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ul>
      <div {...props}>
        {children.map(child => {
          if (child.props.label !== activeTab) return undefined;
          return child;
        })}
      </div>
    </>
  );
};

const Tab = ({ activeTab, label, onClick }) => {
  return (
    <li>
      <button
        className="focus:outline-none"
        type="button"
        onClick={() => onClick(label)}
      >
        <div className="px-5 text-sm mb-3 hover:text-black-300">{label}</div>
        {activeTab === label && (
          <div
            className="bg-black-500 bg-dark-500 h-1 rounded-full w-full"
            style={{ marginBottom: -2 }}
          ></div>
        )}
      </button>
    </li>
  );
};
