import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Detail.css";
import Loading from "./../loading/Loading";
import ErrorMessage from "./../errorMessage/ErrorMessage";
import { Box, Text } from "@chakra-ui/layout";
import {
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tag,
  TagLabel,
  Divider,
} from "@chakra-ui/react";
import DetailAbout from "./detailAbout/DetailAbout";
import DetailStats from "./detailStats/DetailStats";
import DetailEvolutions from "./detailTyping/DetailTyping";

export const Detail = ({ location, match }) => {
  const [pokeData, setPokeData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAbility, setShowAbility] = useState(false);
  const [pokeSpeciesData, setPokeSpeciesData] = useState({});
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    fetchPokeName();
  }, [location.pathname]);

  const fetchPokeName = async () => {
    setError(false);
    setIsLoaded(false);
    const pokeName = match.params.name;
    const lowerCasePokeName = pokeName.toLowerCase();
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${lowerCasePokeName}/`
      );
      const { data: speciesData } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${data.id}/`
      );

      setPokeSpeciesData(speciesData);
      setPokeData(data);
      setIsLoaded(true);
    } catch (error) {
      setIsLoaded(true);
      setError(true);
      setErrorCode(error.request.status);
    }
  };
  const getFlavorText = () => {
    const flavorText = pokeSpeciesData.flavor_text_entries.find(
      ({ language }) => language.name === "en"
    );
    return flavorText.flavor_text;
  };

  if (!isLoaded) {
    return (
      <div className="loadingContainer">
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="detailError">
        <ErrorMessage errorCode={errorCode} pokeNames={match.params.name} />
      </div>
    );
  }
  if (isLoaded) {
    return (
      <Box
        className="detailContainer"
        bgColor="gray.50"
        color="gray.800"
        borderRadius="8px"
        maxW="800px"
      >
        <div className="pokeDetailHeader">
          <div className="detail-name-type-container">
            <Text fontSize="3xl" className="pokeDetailName">
              {pokeData.name}
            </Text>
            <div className="pokedetail-header-types-container">
              {pokeData.types.map(({ type }) => {
                return (
                  <Tag
                    bgColor={`type.${type.name}`}
                    key={type.name}
                    size="lg"
                    mr="8px"
                    ml="8px"
                    variant="solid"
                    borderRadius="full"
                  >
                    <TagLabel overflow="initial" textTransform="capitalize">
                      {type.name}
                    </TagLabel>
                  </Tag>
                );
              })}
            </div>
          </div>
          <Text fontSize="3xl" ml="auto">
            #{pokeData.id}
          </Text>
        </div>
        <Divider mb="1rem" />
        <div className="detail-body-container">
          <div className="pokeSpriteContainer">
            <Image
              objectFit="cover"
              boxSize="250px"
              src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokeData.id
                .toString()
                .padStart(3, "0")}.png`}
              alt={`${pokeData.name} sprite`}
            />
          </div>
          <div className="detail-summary-container">
            <Text p="1rem">{getFlavorText()}</Text>
            <Tabs variant="soft-rounded" mt="1rem" colorScheme="cyan">
              <TabList>
                <Tab>About</Tab>
                <Tab>Stats</Tab>
                <Tab>Types / Abilites</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <DetailAbout
                    height={pokeData.height}
                    weight={pokeData.weight}
                  />
                </TabPanel>
                <TabPanel>
                  <DetailStats stats={pokeData.stats} />
                </TabPanel>
                <TabPanel>
                  <DetailEvolutions
                    types={pokeData.types}
                    abilities={pokeData.abilities}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </Box>
    );
  }
};

export default Detail;
