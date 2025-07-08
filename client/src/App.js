import GlobalStyle from "~/components/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultLayout from "~/layouts/DefaultLayout";

import { publicRoutes } from "~/routes";

import Auth from "~/pages/Auth";
import Landing from "~/pages/Landing";

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
                        <Component />
                      </Layout>
                    }
                  />
                );
              })}
              <Route path="/" element={<Landing />}></Route>
              <Route path="/login" element={<Auth routerPath="login" />}></Route>
              <Route path="/register" element={<Auth routerPath="register" />}></Route>
            </Routes>
          </Router>
        </div>
      </AuthContextProvider>
    </GlobalStyle>
  );
}

export default App;
