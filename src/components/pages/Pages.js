import React from "react";
import "./Pages.css";
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pages = ({ handlePagesClick }) => {
  return (
    <div className="pokeButtons">
      <IconButton
        onClick={() => handlePagesClick("prev")}
        icon={<ChevronLeftIcon />}
        className="paginationBtn"
        colorScheme="red"
        size="lg"
        borderRadius="16px"
        aria-label="previous button"
      />

      <IconButton
        onClick={() => handlePagesClick("next")}
        className="paginationBtn"
        icon={<ChevronRightIcon />}
        colorScheme="red"
        borderRadius="16px"
        size="lg"
        aria-label="next button"
      />
    </div>
  );
};
export default Pages;
