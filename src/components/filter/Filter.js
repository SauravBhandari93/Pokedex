import React, { useRef, useState, useEffect } from "react";
import "./Filter.css";
import {
  Checkbox,
  CheckboxGroup,
  Grid,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";

const Filter = ({ handleFilter, handleFilterClick, location }) => {
  const [filterBoxes, setFilterBoxes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const handleFilterChange = (checkboxValues = []) => {
    setFilterBoxes(checkboxValues);
  };
  const submitFilters = (event) => {
    event.preventDefault();
    const typeFilters = filterBoxes;
    handleFilter(typeFilters);
    setShowFilters(false);
    handleFilterClick();
  };

  const handleClearFilters = () => {
    setFilterBoxes([]);
    handleFilter([]);
    setShowFilters(false);
    handleFilterClick();
  };

  const types = [
    "fire",
    "water",
    "ice",
    "dragon",
    "fighting",
    "flying",
    "grass",
    "rock",
    "ground",
    "fairy",
    "poison",
    "dark",
    "ghost",
    "electric",
    "steel",
    "bug",
    "normal",
    "psychic",
  ];
  return (
    <div className="filter-container">
      <Popover isOpen={showFilters}>
        {location.pathname === "/" && (
          <PopoverTrigger>
            <Button
              colorScheme="red"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter
            </Button>
          </PopoverTrigger>
        )}
        <PopoverContent
          w="fit-content"
          color="white"
          bgColor="red.700"
          borderColor="red.700"
        >
          <PopoverBody>
            <CheckboxGroup value={filterBoxes} onChange={handleFilterChange}>
              <Grid templateColumns="repeat(2, 1fr)" gap="4px">
                {types.map((type, i) => {
                  return (
                    <Checkbox
                      style={{ textTransform: "capitalize" }}
                      value={type}
                      key={type}
                    >
                      {type}
                    </Checkbox>
                  );
                })}
              </Grid>
            </CheckboxGroup>
            <div className="filter-btn-container">
              <Button colorScheme="facebook" onClick={submitFilters}>
                Done
              </Button>
              <Button colorScheme="facebook" onClick={handleClearFilters}>
                Clear
              </Button>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Filter;
