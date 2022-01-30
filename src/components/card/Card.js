import React from "react";
import { Text, Divider, Heading } from "@chakra-ui/react";
const Card = ({ type, header, children }) => {
  return (
    <div className={`${type}-container`}>
      <div className={`${type}-container-header`}>
        <Heading mb="1rem">{header}</Heading>
        <Divider />
      </div>
      <div className={`${type}-container-body`}>{children}</div>
    </div>
  );
};

export default Card;
