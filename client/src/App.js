import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalStyle from "~/components/GlobalStyle";

import { publicRoutes } from "~/routes";

import DefaultLayout from "~/layouts/DefaultLayout";

import { AuthContextProvider, AuthHandlerContextProvider } from "./contexts";

function App() {
  return (
    <GlobalStyle>
      <AuthContextProvider>
        <AuthHandlerContextProvider>
          <div className="App">
            <Router>
              <Routes>
                {publicRoutes.map((route, index) => {
                  const Layout = DefaultLayout;
                  const Component = route.component;

                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Component {...route.props} />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>
            </Router>
          </div>
        </AuthHandlerContextProvider>
      </AuthContextProvider>
    </GlobalStyle>
  );
}

export default App;
