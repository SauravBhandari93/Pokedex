import React from "react";
import { Text } from "@chakra-ui/react";
import "./DetailAbout.css";

const DetailAbout = ({ height, weight }) => {
  const getHeight = () => {
    const heightInInches = height * 3.937;
    const heightInFeet = heightInInches.toFixed(0) / 12;
    const remainingInches = heightInInches.toFixed(0) % 12;
    return `${heightInFeet.toFixed(0)}.${remainingInches.toFixed(0)}`;
  };
  const weightInPounds = weight / 4.536;
  return (
    <div className="about-weight-height-container">
      <Text>Height</Text>
      <Text>{getHeight()} ft</Text>
      <Text>Weight</Text>
      <Text>{weightInPounds.toFixed(2)} lb</Text>
    </div>
  );
};

export default DetailAbout;
