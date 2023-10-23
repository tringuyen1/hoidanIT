import React from "react";

export interface IProps {
  name?: string;
  age?: number;
  info?: {
    gender?: string;
    address?: string;
  };
  children: React.ReactNode;
}

const InputTodo = (props: IProps) => {
  const { age } = props;
  return (
    <>
      <div className="container mt-5">{age}</div>
      {props.children}
    </>
  );
};

export default InputTodo;
