import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { registerServiceWorker } from "~/utils";

import routes from "~/routes";
import PrivateRoute from "~/components/PrivateRoute";

import { DefaultLayout } from "~/layouts";

import { AuthContextProvider } from "./contexts";

import GlobalStyle from "~/components/GlobalStyle";

function App() {
  registerServiceWorker();

  return (
    <GlobalStyle>
      <AuthContextProvider>
        <div className="App">
          <Router>
            <Routes>
              {routes.map((route, index) => {
                const Private = route.private ? PrivateRoute : Fragment;
                const Layout = route.layout ? route.layout : DefaultLayout;
                const Component = route.component;

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Private>
                        <Layout>
                          <Component {...route.props} />
                        </Layout>
                      </Private>
                    }
                  />
                );
              })}
            </Routes>
          </Router>
        </div>
      </AuthContextProvider>
    </GlobalStyle>
  );
}

export default App;
