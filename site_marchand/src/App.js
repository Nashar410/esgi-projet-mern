import logo from "./logo.svg";
import "./App.css";
import Button from "./components/lib/Button";
import Page from "./components/Page";
import Header from "./components/Header";
import ShowItem from "./components/Cart/ShowItem";
import Credentials from "./components/Admin/Credentials";
import CredentialProvider from "./contexts/CredentialContext";
import ListProvider from "./contexts/ListContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Button className="test" onClick={() => console.log("foo")} title="foo" />
      <Button onClick={(event) => console.log("hello")} title="hello" />
      <Button
        onClick={(event) => console.log(event)}
        title={true}
        variant="rounded"
      />
      <Button onClick={(event) => console.log("clicked")} title={10} />
      <BrowserRouter>
        <CredentialProvider>
          <Switch>
            <Route exact path="/account">
              <Header />
              <Credentials />
            </Route>
            <ListProvider>
              <Route exact path="/">
                <Page />
              </Route>
              <Route exact path="/items/:id">
                <Header />
                <ShowItem />
              </Route>
            </ListProvider>
          </Switch>
        </CredentialProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
