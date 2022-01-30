import React, { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import "./NavBar.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select,
  Button,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
} from "@chakra-ui/react";

import { withRouter } from "react-router";
import SearchBar from "../searchBar/SearchBar";
import Filter from "../filter/Filter";

const NavBar = ({ history, handleFilter, location }) => {
  const [showNav, setShowNav] = useState();

  const handleClick = () => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", 1);
    history.push(`?page=1`);
    setShowNav(false);
  };
  return (
    <nav className="navBar">
      <Box bg="gray.600" h="60px">
        <div className={"main-nav"}>
          <ul className={"main-nav-list"}>
            <li>
              <Link fontWeight="600" color="white" as={ReactRouterLink} to="/">
                Home
              </Link>
            </li>
            <li></li>
            <li>
              <div className="searchBarContainer">
                <SearchBar handleSearchClick={handleClick} />
                <Filter
                  handleFilter={handleFilter}
                  handleFilterClick={handleClick}
                  location={location}
                />
              </div>
            </li>
          </ul>
        </div>
        <Drawer
          isOpen={showNav}
          placement="right"
          onClose={() => setShowNav(false)}
        >
          <DrawerOverlay>
            <DrawerCloseButton />
            <DrawerContent>
              <DrawerBody>
                <Link to="/">
                  <Button
                    colorScheme="facebook"
                    mb="2"
                    variant="ghost"
                    onClick={() => setShowNav(!showNav)}
                  >
                    Home
                  </Button>
                </Link>
              </DrawerBody>
              <DrawerFooter>
                <div className="searchBarContainer">
                  <SearchBar handleSearchClick={handleClick} />
                  <Filter
                    handleFilter={handleFilter}
                    handleFilterClick={handleClick}
                    location={location}
                  />
                </div>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </nav>
  );
};
export default withRouter(NavBar);
