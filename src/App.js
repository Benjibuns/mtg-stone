import Home from "./pages/home";
import "./styles/main.scss";
import Icons from "./helpers/icons";
import SignUp from "./pages/sign-up";
import LogIn from "./pages/log-in";
import Profile from "./pages/profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [loggedInStatus, setLoggedInStatus] = useState("Hello");

  Icons();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home loggedInStatus={loggedInStatus} userId={userId} />
          </Route>
          <Route path="/sign-up" component={SignUp} />
          <Route path="/log-in">
            <LogIn
              setLoggedInStatus={setLoggedInStatus}
              setUserId={setUserId}
            />
          </Route>
          <Route path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
