import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown);

const Icon = props => {
  const { icon, variant = "fas", ...rest } = props;
  return <FontAwesomeIcon icon={[variant, icon]} {...rest} />;
};

export default Icon;
