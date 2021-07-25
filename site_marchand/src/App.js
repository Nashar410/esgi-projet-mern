import "./App.css";
import Page from "./components/Page";
import Header from "./components/Header";
import ShowItem from "./components/Cart/ShowItem";
import Credentials from "./components/Admin/Credentials";
import CredentialProvider from "./contexts/CredentialContext";
import ListProvider from "./contexts/ListContext";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import GuardedRoute from './components/GuardedRoute.js';
import 'w3-css/w3.css';

function App() {

    const isLogged = () => !!localStorage.getItem("credential");

    return (
        <div className="App">
            <BrowserRouter>
                <CredentialProvider>
                    <Header/>
                    <div className="w3-container w3-margin">
                        <Switch>
                            <Route exact path='/'  >
                                {!isLogged() && <Credentials />}
                                {isLogged() && <Redirect to="/panier" />}
                            </Route>
                            <ListProvider>
                                <Route path='/panier' component={Page} auth={isLogged} />
                                <GuardedRoute  path='/items/:id' component={ShowItem} auth={isLogged} />
                            </ListProvider>
                        </Switch>

                    </div>

                </CredentialProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
