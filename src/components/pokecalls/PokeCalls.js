import PokeGrid from "./../pokegrid/PokeGrid";
import Pages from "./../pages/Pages";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./../loading/Loading";
import ErrorMessage from "./../errorMessage/ErrorMessage";
import { withRouter } from "react-router";
import { createStandaloneToast, Box, Text, Button } from "@chakra-ui/react";
import "./PokeCalls.css";

const PokeCalls = ({ filterList, history, handleFilter }) => {
  const toast = createStandaloneToast();
  const [pokemon, setPokemon] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [sliceNum, setSliceNum] = useState(0);
  const [error, setError] = useState(null);
  const [newPokemonList, setNewPokemonList] = useState([]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (filterList.length > 0) {
      handleFilterList();
    } else {
      fetchPokemon();
    }
  }, [filterList]);

  useEffect(() => {
    fetchPokemon();
  }, [sliceNum]);

  const handleFilterList = async () => {
    let regexPat = /\/pokemon\/(\d+)\//;
    let endNum;
    let startNum;
    let currentUrlParams = new URLSearchParams(window.location.search);
    let currentPageNum = currentUrlParams.get("page");
    currentPageNum = parseInt(currentPageNum);
    let pokeList = [];
    setSorted(false);
    setNewPokemonList([]);

    if (filterList.length < 1) {
      fetchPokemon();
    }
    if (!currentPageNum) {
      endNum = 20;
      startNum = 0;
    } else {
      endNum = currentPageNum * 20;
      startNum = endNum - 20;
    }

    let filterPromises = filterList.map((filter) =>
      axios.get(`https://pokeapi.co/api/v2/type/${filter}/`)
    );
    await Promise.all(filterPromises).then((all) => {
      const data = all.map((result) => result.data.pokemon);
      data.forEach((poke) =>
        poke.map((pokemon) => pokeList.push(pokemon.pokemon))
      );
    });

    pokeList.map((poke) => {
      let id = poke.url.match(regexPat)[1];
      return (poke["id"] = id);
    });
    let cutPokemon;

    if (startNum > pokeList.length) {
      cutPokemon = pokeList.slice(0, 20);
      renderToast();
      console.log("yooooooooo");
    } else {
      cutPokemon = pokeList.slice(startNum, endNum);
      setNewPokemonList(cutPokemon);
      setSorted(true);
    }
  };

  const handleBackToBeginning = () => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", 1);
    history.push(`?page=1`);
    if (filterList.length < 1) {
      console.log("ouibacobcbcb");
      fetchPokemon();
    } else {
      handleFilterList();
    }
    toast.closeAll();
  };

  const renderToast = () => {
    return toast({
      position: "top-right",
      variant: "right-accent",
      isClosable: true,
      render: () => (
        <Box borderRadius="16px" color="gray.800" p={3} bgColor="gray.200">
          <Text pb="1rem">Oops! You've reached the end of the line!</Text>
          <Button colorScheme="facebook" onClick={handleBackToBeginning}>
            {" "}
            Go back to beginning
          </Button>
        </Box>
      ),
    });
  };

  const getEndOfFilterList = (currentPageNum) => {
    let endNum;
    let startNum;
    if (!currentPageNum) {
      endNum = 20;
      startNum = 0;
    } else {
      endNum = currentPageNum * 20;
      startNum = endNum - 20;
    }
    console.log(startNum);
    console.log(newPokemonList.length);
    console.log(startNum > newPokemonList.length);
    return startNum > newPokemonList.length;
  };

  const handlePagesClick = (direction) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    let currentPageNum = currentUrlParams.get("page");
    currentPageNum = parseInt(currentPageNum);
    console.log(currentPageNum);
    console.log(direction);
    if (currentPageNum === 56 && direction === "next") {
      console.log("indci");
      return renderToast();
    }

    if (
      filterList.length > 0 &&
      currentPageNum >= 1 &&
      getEndOfFilterList(currentPageNum)
    ) {
      console.log("filter list");
      return renderToast();
    }

    setSorted(false);
    if (!currentPageNum) {
      currentPageNum = 1;
    }
    if (direction === "next") {
      currentPageNum = currentPageNum + 1;
    } else if (direction === "prev" && currentPageNum !== 1) {
      currentPageNum = currentPageNum - 1;
    } else {
      currentPageNum = 1;
    }
    currentUrlParams.set("page", currentPageNum);
    history.push(`?page=${currentPageNum}`);

    if (filterList.length < 1) {
      console.log("ouibacobcbcb");
      fetchPokemon();
      console.log(`true`, true);
    } else {
      handleFilterList();
    }
  };

  const fetchPokemon = async () => {
    let offsetNum = 0;
    let regexPat = /\/pokemon\/(\d+)\//;
    let currentUrlParams = new URLSearchParams(window.location.search);
    let currentPageNum = currentUrlParams.get("page");
    if (currentPageNum > 56) {
    }
    if (!currentPageNum) {
      offsetNum = 0;
    } else {
      offsetNum = currentPageNum * 20 - 20;
    }
    setSorted(false);
    setPokemonList([]);
    setNewPokemonList([]);
    //Fetches pokemon
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offsetNum}`
    );
    let pokemon = res.data.results;
    pokemon.map((pokemon) => {
      let id = pokemon.url.match(regexPat)[1];
      return (pokemon["id"] = id);
    });

    setSorted(true);
    setPokemonList(pokemon);
  };

  if (!sorted) {
    return (
      <div className="loadingContainer">
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="error">
        <ErrorMessage />
      </div>
    );
  }
  if (newPokemonList.length > 0) {
    return (
      <div>
        <PokeGrid pokemonList={newPokemonList} />
        <Pages handlePagesClick={handlePagesClick} />
      </div>
    );
  }
  return (
    <div>
      <PokeGrid pokemonList={pokemonList} />
      <Pages handlePagesClick={handlePagesClick} />
    </div>
  );
};
export default withRouter(PokeCalls);
