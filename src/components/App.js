import React, { Component } from "react";
import PokeCalls from "./pokecalls/PokeCalls";
import SearchBar from "./searchBar/SearchBar";
import Detail from "./detail/Detail";
import NavBar from "./navbar/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorMessage from "./errorMessage/ErrorMessage";
import Loading from "./loading/Loading";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeFilters: [],
    };
  }

  handleFilters = (typeFilters) => {
    console.log("yuh");
    if (!typeFilters) {
      this.setState({ typeFilters: [] });
    }
    this.setState({ typeFilters: typeFilters });
  };

  render() {
    return (
      <>
        <Navigation />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div>
            <NavBar props={this.props} handleFilter={this.handleFilters} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <PokeCalls
                    filterList={this.state.typeFilters}
                    handleFilter={this.handleFilters}
                  />
                )}
              />
              <Route exact path="/detail/:name" component={Detail} />
              <Route exact path="/loadTest" component={Loading} />
              <Route component={ErrorMessage} />
            </Switch>
          </div>
        </BrowserRouter>
        <Footer />
      </>
    );
  }
}

export default App;
