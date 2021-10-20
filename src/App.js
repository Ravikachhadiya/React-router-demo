import React from "react";
import { Link, useHistory } from "react-router-dom";
import ROUTES, { RenderRoutes } from "./Routes";

function App() {
  const history = useHistory();

  function logout() {
    localStorage.removeItem("user");
    history.push("/");
  }

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "stretch" }}>
      <div style={{ flex: 0.3, backgroundColor: "#f2f2f2" }}>
        {displayRouteMenu(ROUTES)}
        <button onClick={logout}>Log Out</button>
      </div>
      <div>
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
}

export default App;
/**
 * Render a nested hierarchy of route configs with unknown depth/breadth
 */
function displayRouteMenu(routes) {
  /**
   * Render a single route as a list item link to the config's pathname
   */
  function singleRoute(route) {
    return (
      <li key={route.key}>
        <Link to={route.path}>
          {route.key} ({route.path})
        </Link>
      </li>
    );
  }

  // loop through the array of routes and generate an unordered list
  return (
    <ul>
      {routes.map(route => {
        // if this route has sub-routes, then show the ROOT as a list item and recursively render a nested list of route links
        if (route.routes) {
          return (
            <React.Fragment key={route.key}>
              {singleRoute(route)}
              {displayRouteMenu(route.routes)}
            </React.Fragment>
          );
        }

        // no nested routes, so just render a single route
        return singleRoute(route);
      })}
    </ul>
  );
}