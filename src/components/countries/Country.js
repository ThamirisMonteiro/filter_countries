import React from 'react';
import css from './countries.module.css';

export default function Country({ country }) {
  const { name, flags } = country;
  return (
    <div className={`${css.country} ${css.border}`}>
      <img className={css.flags} src={flags} alt={name} />
      <span className={css.countryName}>{name}</span>
    </div>
  );
}

