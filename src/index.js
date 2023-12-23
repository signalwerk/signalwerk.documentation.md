import React from "react";
import useFetch from "./utils/useFetch"; // adjust the path as necessary
import { typeProcessor } from "../../signalwerk.documentation.md/src/components";
import config from "../../../src/config.jsx";

  console.log("load config", config);

// import React from "react";
// import ReactDOM from "react-dom";
import { hydrateRoot } from "react-dom/client";

const App = () => {
  const path = window.location.pathname;

  // Replace 'your-api-url' with the actual URL
  const { data, loading, error } = useFetch(`/api/${path}/index.json`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <>{typeProcessor(data, config)}</>;
};

// This is a basic example and can be expanded based on your application's needs.

const Main = () => (
  <React.StrictMode>
    <App /> {/* Your main App component */}
  </React.StrictMode>
);

// In a typical client-side setup, you would use ReactDOM.render.
// For server-side rendering, this file is bundled and run through a server rendering process.
const container = document.getElementById("root");

const root = hydrateRoot(container, <Main />);
