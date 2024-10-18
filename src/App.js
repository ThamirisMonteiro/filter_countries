import React, { useState, useEffect } from 'react';

import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setfilteredPopulation] = useState([]);
  const [userFilter, setuserFilter] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch('https://restcountries.com/v3.1/all');
      let allCountries = await res.json();

      allCountries = allCountries.map(
        ({ name, numericCode, flags, population }) => {
        console.log(flags.png);
          return {
            id: numericCode,
            name: name.common,
            filterName: name.common.toLowerCase(),
            flags: flags.png,
            population,
          };
        }
      );

      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
    };
    getCountries();
  }, []);

  const calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);
    return totalPopulation;
  };

  const handleChangeFilter = (newText) => {
    setuserFilter(newText);
    const filterLowerCase = newText.toLowerCase();
    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = calculateTotalPopulationFrom(filteredCountries);
    setFilteredCountries(filteredCountries);
    setfilteredPopulation(filteredPopulation);
  };

  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>Filter Countries</h1>
      <Header
        filter={userFilter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
