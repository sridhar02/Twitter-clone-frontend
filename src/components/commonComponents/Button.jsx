import React from 'react';
import css from './Button.module.css';

function PrimaryButton({ children }) {
  return <button className={css.button}>{children}</button>;
}

export default { PrimaryButton };
