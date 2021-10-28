import { useState } from "react";
import Home from "./Pages/Home";
import Holidays from "./Pages/Holidays";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./Components/App Components/NavigationBar";

export default function App() {
  const defaultLanguage = navigator.language.slice(0, 2);

  const getLanguage = localStorage.getItem("lang");

  const [selectLanguage, setSelectLanguage] = useState(
    getLanguage || defaultLanguage
  );

  localStorage.setItem("lang", selectLanguage);

  return (
    <>
      <NavigationBar
        selectLanguage={selectLanguage}
        defaultLanguage={defaultLanguage}
        setSelectLanguage={setSelectLanguage}
      />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/holidays">
            <Holidays language={selectLanguage} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
