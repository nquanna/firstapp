import GlobalStyle from "~/components/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { publicRoutes } from "~/routes";

import DefaultLayout from "~/layouts/DefaultLayout";

import AuthContextProvider from "./contexts";

function App() {
  return (
    <GlobalStyle>
      <AuthContextProvider>
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
      </AuthContextProvider>
    </GlobalStyle>
  );
}

export default App;
