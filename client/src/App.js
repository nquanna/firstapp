import GlobalStyle from "~/components/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "~/pages/Auth";
import Landing from "~/pages/Landing";

function App() {
  return (
    <GlobalStyle>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/login" element={<Auth isLogin />}></Route>
            <Route path="/register" element={<Auth isLogin={false} />}></Route>
          </Routes>
        </Router>
      </div>
    </GlobalStyle>
  );
}

export default App;
