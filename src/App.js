import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/addUser" component={AddEditUser} />
        <Route  path="/editUser/:id" component={AddEditUser} />
        <Route  path="/userInfo/:id" component={UserInfo} />
        <Route  path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
