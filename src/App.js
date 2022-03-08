import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditContact from "./components/EditContact";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <ContactForm />
            <ContactList />
          </Route>
          <Route path="/edit/:id">
            <EditContact />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
