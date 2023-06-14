import { styled } from "@stitches/react";
import React, { useEffect } from "react";

const StyledButton = styled("button", {
  background: "#4b4be8",
  color: "#fff",
  padding: 12,
});

const Button = (props) => {
  useEffect(() => {
    console.log("Hello from MF Button !");
  }, []);
  return (
    <StyledButton>
      Button component - a Client-rendered React ModuleFederation component
    </StyledButton>
  );
};

export default Button;
