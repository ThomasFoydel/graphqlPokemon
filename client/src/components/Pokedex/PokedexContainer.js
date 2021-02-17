import React, { useContext } from 'react';
import { gql } from 'apollo-boost';
import Pokedex from 'components/Pokedex/Pokedex';
import { useQuery } from '@apollo/react-hooks';
import { useSpring, animated, config } from 'react-spring';

import { CTX } from 'context/Store';

const makePokeQuery = (id) => {
  return gql`
  {
     pokemon(id: "${id}") {
      id
      name
      classification
      types
      resistant
      weaknesses
      maxCp
      maxHP
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      fleeRate
      evolutions {
        id
        name
      }
      previousEvolutions {
        id
        name
      }
      # attacks {
      #   special {
      #     name
      #     type
      #     damage
      #   }
      #   fast {
      #     name
      #     type
      #     damage
      #   }
      }
    }
  }
`;
};

export default function PokedexContainer({ pokemonList }) {
  const [appState] = useContext(CTX);

  const { loading, data } = useQuery(
    makePokeQuery(appState.currentPokemonNumber)
  );
  let fetchedPokemon;
  if (data && data.pokemon) {
    fetchedPokemon = data.pokemon;
  }

  const animationProps = useSpring({
    position: 'absolute',
    zIndex: 8,
    marginLeft: '50%',
    transform: appState.currentPokemonNumber
      ? 'translateX(-50%)'
      : 'translateX(-290%)',
    // config: { tension: 180, friction: 12, mass: 2 },
    // },
  });

  return (
    <div className='pokedex-container'>
      <animated.div style={animationProps}>
        <Pokedex pokemonData={fetchedPokemon} pokemonList={pokemonList} />
      </animated.div>
    </div>
  );
}
