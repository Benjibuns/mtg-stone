import Home from "./pages/home";
import "./styles/main.scss";
import Icons from "./helpers/icons";
import SignUp from "./pages/sign-up";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  Icons();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
