import React from "react";
import { createRoot } from "react-dom/client";
import useFetch from "../utils/useFetch"; // adjust the path as necessary
import { typeProcessor } from "../../../signalwerk.documentation.md/src/components";
import config from "../../../../src/config.jsx";
import settings from "../../../../src/settings.json";

const App = () => {
  const path = window.location.pathname;

  const { data, loading, error } = useFetch(`/api/${path}/index.json`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <>{typeProcessor(data, { config, settings })}</>;
};

const Main = () => (
  <React.StrictMode>
    <App /> {/* Your main App component */}
  </React.StrictMode>
);

const container = document.getElementById("root");
// const root = hydrateRoot(container, <Main />); // hydrate instead of render
const root = createRoot(container);
root.render(<Main />);
