import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import views
import Auth from "./views/Auth";
import LinkCard  from './views/LinkCard'
import Note from './views/Note'
import Circle from './views/Circle'
import Profile from './views/Profile'
//import component
import Landing from "./components/layouts/Landing";
import ProtectedRoute from './components/routing/ProtectedRoute'
// //import context
import AuthContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Auth {...props} authRoute="register" />}
          />
          <ProtectedRoute exact path="/linkcard" component={LinkCard} />
          <ProtectedRoute exact path="/note" component={Note} />
          <ProtectedRoute exact path="/circle" component={Circle} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
