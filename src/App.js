import React, { useState, useEffect } from "react";
import LinkList from "./components/LinkList";
import LinkForm from "./components/LinkForm";
import { AppContext } from "./app-context";

import "./App.css";

export const loadContext = React.createContext();

function App() {
  const [links, setLinks] = useState([]);
  const loadLinks = async () => {
    try {
      const res = await fetch("/.netlify/functions/getLinks");
      const links = await res.json();
      setLinks(links);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <AppContext.Provider value={loadLinks}>
      <div className="container py-5">
        <h1 className="text-center mb-5"> List O' Links</h1>
        <LinkForm />
        <LinkList links={links} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
