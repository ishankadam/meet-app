import React, { createContext, useState, useContext } from "react";

const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [linkCreated, setLinkCreated] = useState(false);

  return (
    <LinkContext.Provider value={{ linkCreated, setLinkCreated }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLink = () => {
  return useContext(LinkContext);
};
