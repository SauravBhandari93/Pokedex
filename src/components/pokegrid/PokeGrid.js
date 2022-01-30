import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./pokegrid.css";
import Detail from "./../detail/Detail";
import { Image, Text } from "@chakra-ui/react";

export default class PokeGrid extends Component {
  render() {
    return (
      <section className="pokeGridContainer">
        {this.props.pokemonList.map(({ name, id }) => (
          <Link key={id} to={`/detail/${name}`}>
            <div className="pokeGridItemContainer" key={id}>
              <Image
                boxSize={{ sm: "200px", md: "200px", lg: "200px" }}
                objectFit="cover"
                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${id
                  .toString()
                  .padStart(3, "0")}.png`}
                alt={`${name} sprite`}
                fallbackSrc={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              />
              <Text color="gray.800" fontSize="lg" className="pokeName">
                {name} #{id}
              </Text>
            </div>
          </Link>
        ))}
        <Route exact path="detail/:name" component={Detail} />
      </section>
    );
  }
}
