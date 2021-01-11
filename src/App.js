import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import NoMatch from "./views/NoMatch";
import { About, DiscoverMovies, Home, MovieDetails } from "./views/viewIndex";
import { LinkContainer } from "react-router-bootstrap";
export default function App() {
  const history = useHistory();
  console.log(history.pathname);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>HomePage</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto" activeKey={history.pathname}>
          <LinkContainer to="/about">
            <Nav.Link eventKey="link-1">About Site</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/discover">
            <Nav.Link eventKey="link-2">Discover Movies</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>

      <Switch>
        <Route path="/movie/:movieID" component={MovieDetails} />
        <Route path="/about" component={About} />
        <Route path="/discover/:query" component={DiscoverMovies} />
        <Route path="/discover" component={DiscoverMovies} />
        <Route exact path="/" component={Home} />
        <Route path="/" component={NoMatch} />
      </Switch>
    </div>
  );
}
