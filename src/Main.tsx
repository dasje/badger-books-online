import React, { FC } from "react";

interface MainProps {
  title: string;
}

const Main: FC<MainProps> = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

export default Main;
