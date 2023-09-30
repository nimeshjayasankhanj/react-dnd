import update from "immutability-helper";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { NativeTypes } from "react-dnd-html5-backend";

import { Box } from "./Box";
import { Dustbin } from "./Dustbin";

interface BoxState {
  id: number;
  name: string;
}

export interface DustbinSpec {
  accepts: string[];
  lastDroppedItem: any;
}
export interface BoxSpec {
  name: string;
  type: string;
}
export interface ContainerState {
  droppedBoxNames: string[];
  dustbins: DustbinSpec[];
  boxes: BoxSpec[];
}

const Container: FC = memo(function Container() {
  const [configurations, setConfigurations] = useState<any[]>([
    {
      place: "Back Pocket",
      players: [
        { id: null, name: null },
        { id: null, name: null },
        { id: null, name: null },
      ],
    },
    {
      place: "Half Back Flank",
      players: [
        { id: null, name: null },
        { id: null, name: null },
        { id: null, name: null },
      ],
    },
  ]);

  const [players, setPlayers] = useState<BoxState[]>([
    { id: 1, name: "Marcus Bontempelli" },
    { id: 2, name: "Sam Taylor" },
    { id: 3, name: "Lance Franklin" },
  ]);

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([]);

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = useCallback(
    (
      playerIndex: number,
      item: { id: number; name: string },
      placeIndex: number
    ) => {
      const { id, name } = item;

      const playerObject = players.find((value) => value.id == id);
      setPlayers(players.filter((player) => player.id !== id));
      const alreadyPlacedPlayer =
        configurations[placeIndex].players[playerIndex];
      if (alreadyPlacedPlayer.id != null) {
        // setPlayers((player) => ({
        //   ...player,
        //   alreadyPlacedPlayer,
        // }));
        setPlayers((player) => [...player, alreadyPlacedPlayer]);
      }

      setConfigurations(
        update(configurations, {
          [placeIndex]: {
            players: {
              [playerIndex]: {
                $set: playerObject,
              },
            },
          },
        })
      );
    },
    [droppedBoxNames, configurations]
  );
  console.log(players);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ overflow: "hidden", clear: "both" }}>
        {players.map((data, index) => (
          <Box
            name={data.name}
            id={data.id}
            isDropped={isDropped(data.name)}
            key={index}
          />
        ))}
      </div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        {configurations.map((place, placeIndex) => {
          return (
            <>
              <div>{place.place}</div>
              {place.players.map((value2: any, playerIndex: any) => {
                return (
                  <Dustbin
                    onDrop={(item) => handleDrop(playerIndex, item, placeIndex)}
                    key={placeIndex}
                    value={value2}
                  />
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
});

export default Container;
