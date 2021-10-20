import React from "react";
import { Route, Switch, Redirect } from "react-router-dom"; // <-- New code
import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardContent from "./pages/DashboardContent";

const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: Login },
  {
    path: "/app",
    key: "APP",
    component: props => {
      if (!localStorage.getItem("user")) {
        alert("You need to log in to access app routes");
        return <Redirect to={"/"} />;
      }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: "/app/page",
        key: "APP_PAGE",
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
  { path: "/Dashboard", key: "DASHBOARD", exact: true, component: Dashboard },
  { path: "/Dashboard/:id", key: "DASHBOARD_CONTENT_WITH_ID", exact: false, component: DashboardContent },
  { path: "/home", key: "HOME", exact: true, component: Home },
  { path: "/about", key: "ABOUT", exact: true, component: About },

];

export default ROUTES;

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
}

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}