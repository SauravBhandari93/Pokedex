import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading/Loading";
import {
  Text,
  Tag,
  TagLabel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
} from "@chakra-ui/react";
import "./DetailTyping.css";
import Card from "../../card/Card";

const DetailTyping = ({ types, abilities }) => {
  const [typesData, setTypesData] = useState();
  const [abilitiesData, setAbilitiesData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    setLoading(true);
    const typesArray = [];
    for (const { type } of types) {
      const { data } = await axios.get(type.url);
      typesArray.push(data);
    }
    const totalEffectives = getEffectives(typesArray);
    setTypesData(totalEffectives);
    const abilitiesArray = [];
    for (const { ability, is_hidden } of abilities) {
      const { data } = await axios.get(ability.url);
      const abilityData = buildAbility(data, is_hidden);
      abilitiesArray.push(abilityData);
    }
    setAbilitiesData(abilitiesArray);
    setLoading(false);
  };

  const buildAbility = (data, is_hidden) => {
    const { effect_entries } = data;
    const englishAbility = effect_entries.find(
      ({ language }) => language.name === "en"
    );
    return {
      hiddenAbility: is_hidden,
      abilityText: englishAbility.short_effect,
      name: data.name,
    };
  };

  const covertToArrayOfNames = (array) => {
    return array.map(({ name }) => name);
  };

  const getEffectives = (types) => {
    const typeEffectives = types.reduce((acc, type) => {
      // group all effectives together
      const { damage_relations } = type;
      const {
        double_damage_to,
        double_damage_from,
        half_damage_from,
        half_damage_to,
        no_damage_from,
      } = damage_relations;
      acc.superEffective = acc.superEffective
        ? acc.superEffective.concat(covertToArrayOfNames(double_damage_to))
        : covertToArrayOfNames(double_damage_to);

      acc.superWeak = acc.superWeak
        ? acc.superWeak.concat(covertToArrayOfNames(double_damage_from))
        : covertToArrayOfNames(double_damage_from);

      acc.halfWeak = acc.halfWeak
        ? acc.halfWeak.concat(covertToArrayOfNames(half_damage_from))
        : covertToArrayOfNames(half_damage_from);

      acc.halfEffective = acc.halfEffective
        ? acc.halfEffective.concat(covertToArrayOfNames(half_damage_to))
        : covertToArrayOfNames(half_damage_to);
      acc.noDamageTo = acc.noDamageTo
        ? acc.noDamageTo.concat(covertToArrayOfNames(no_damage_from))
        : covertToArrayOfNames(no_damage_from);
      return acc;
    }, {});

    typeEffectives.superEffective = typeEffectives.superEffective.filter(
      (name) => {
        return !typeEffectives.halfEffective.includes(name);
      }
    );
    typeEffectives.superWeak = typeEffectives.superWeak.filter((name) => {
      return (
        !typeEffectives.halfWeak.includes(name) &&
        !typeEffectives.noDamageTo.includes(name)
      );
    });

    typeEffectives.halfEffective = typeEffectives.halfEffective.filter(
      (name) => {
        return !typeEffectives.superEffective.includes(name);
      }
    );

    typeEffectives.halfWeak = typeEffectives.halfWeak.filter((name) => {
      return !typeEffectives.superWeak.includes(name);
    });
    const typeEffectivesWithoutDupes = Object.entries(typeEffectives).reduce(
      (acc, [key, item]) => {
        acc[key] = [...new Set(item)];
        return acc;
      },
      {}
    );
    return typeEffectivesWithoutDupes;
  };
  if (loading || !typesData) {
    return <Loading />;
  }
  return (
    <div>
      <Card header="Type effectiveness" type="types">
        <div>
          <Text mb="1rem">2x weak against</Text>
          <div className="types-list-container">
            {typesData.superWeak.map((name) => {
              return (
                <Tag
                  bgColor={`type.${name}`}
                  key={name}
                  size="lg"
                  variant="solid"
                  borderRadius="full"
                >
                  <TagLabel key={name} textTransform="capitalize">
                    {name}
                  </TagLabel>
                </Tag>
              );
            })}
          </div>
        </div>
      </Card>
      <Card type="abilities" header="Abilities">
        <Accordion allowMultiple>
          {abilitiesData.map(({ abilityText, hiddenAbility, name }) => {
            return (
              <AccordionItem key={name}>
                <h2>
                  <AccordionButton>
                    <Box textTransform="capitalize" flex="1" textAlign="left">
                      {name}
                      {hiddenAbility ? (
                        <Badge ml="1rem" colorScheme="purple">
                          Hidden Ability
                        </Badge>
                      ) : null}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{abilityText}</AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Card>
    </div>
  );
};

export default DetailTyping;
