export const mainMenu = {
  dashboard: {
    type: "link",
    text: "Dashboard",
    path: "/",
    icon: ""
  },
  contacts: {
    type: "dropdown",
    text: "Contacts",
    path: "/contacts",
    icon: "",
    children: {
      contacts: {
        text: "Contacts",
        path: "/contacts",
        icon: ""
      }
    }
  }
};
