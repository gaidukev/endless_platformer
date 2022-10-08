import Matter from "matter-js";
import React from "react";
import { View, Image, ImageBackground } from "react-native";

const Bird = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;
  const source_image = "./dino_sprite.png"; //heighBody > 40 ? "./dino_sprite.png" : "./dino_sprite.png";

  return (
    <View
      style={{
        // borderWidth: 1,
        // borderColor: color,
        // borderStyle: "solid",
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
      <Image
        source={require(source_image)}
        resizeMode="cover"
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 1,
        }}
      />
    </View>
  );
};

export default (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bird" }
    // {
    //   render: {
    //     sprite: {
    //       texture: ".../frontend/models/dino_sprite.png",
    //       xScale: 2,
    //       yScale: 2,
    //     },
    //   },
    // }
  );
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird />,
  };
};
