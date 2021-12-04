import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import views
import Auth from "./views/Auth";
import LinkCard from "./views/LinkCard";
import Note from "./views/Note";
import Circle from "./views/Circle";
import Author from "./views/Author";
import Profile from "./views/Profile";
//import component
import Landing from "./components/layouts/Landing";
import ProtectedRoute from "./components/routing/ProtectedRoute";
//import context
import AuthContextProvider from "./contexts/AuthContext";
import LinkCardContextProvider from "./contexts/LinkCardContext";
import NoteContextProvider from "./contexts/NoteContext";
import ProfileContextProvider from "./contexts/ProfileContext";

function App() {
  return (
    <AuthContextProvider>
      <LinkCardContextProvider>
        <NoteContextProvider>
          <ProfileContextProvider>
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
                <ProtectedRoute exact path="/author" component={Author} />
                <ProtectedRoute exact path="/profile" component={Profile} />
              </Switch>
            </Router>
          </ProfileContextProvider>
        </NoteContextProvider>
      </LinkCardContextProvider>
    </AuthContextProvider>
  );
}

export default App;
