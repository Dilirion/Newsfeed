import React from 'react';
import './Error.css';

export const Error = () => {
  return (
    <div role="status" className="Error">
      <h1 className="Error__title">Oops! Что-то пошло не так</h1>
      <p className="Error__text">Не волнуйтесь, мы уже в курсе и чиним проблему</p>
    </div>
  );
};
