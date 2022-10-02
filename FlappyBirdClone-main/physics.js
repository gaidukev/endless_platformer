import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";

import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => {
      if (t.type === "move" && t.delta.pageY > 5) {
        console.log("MOVE DOWN");
      } else if (t.type === "move" && t.delta.pageY < -5) {
        console.log("MOVE UP");
      }

      {
        return (
          (t.type === "move" && t.delta.pageY > 5) ||
          (t.type === "move" && t.delta.pageY < -5)
        );
        //return t.type === "press" || (t.type=== "move" && t.delta.pageY > 5) || (t.type === "move" && t.delta.pageY < -5);
      }
    })
    .forEach((t) => {
      if (t.delta.pageY < -30) {
        Matter.Body.setVelocity(entities.Bird.body, {
          x: 0,
          y: -8,
        });
      }
    });

  Matter.Engine.update(engine, time.delta);

  for (let index = 1; index <= 2; index++) {
    if (
      entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${index}`].point
    ) {
      entities[`ObstacleTop${index}`].point = true;
      dispatch({ type: "new_point" });
    }

    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos
      );

      entities[`ObstacleTop${index}`].point = false;
    }

    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
      x: -3,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: -3,
      y: 0,
    });
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    if (
      !event.pairs.some((pair) => {
        return (
          (pair.bodyA.label === "Bird" && pair.bodyB.label === "Floor") ||
          (pair.bodyA.label === "Floor" && pair.bodyB.label === "Bird")
        );
      }) &&
      event.pairs.length === 1
    ) {
      dispatch({ type: "game_over" });
    }
  });
  return entities;
};
export default Physics;
