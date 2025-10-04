// src/CountryInfo.js
import React, { useState } from 'react';
import axios from 'axios';

function CountryInfo() {
  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState('');

  const fetchCountryData = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      setCountryData(response.data[0]);
      setError('');
    } catch (err) {
      setError('Country not found');
      setCountryData(null);
    }
  };

  return (
    <div className="container">
      <h1>Country Information</h1>
      <input
        type="text"
        placeholder="Enter country name"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
      />
      <button onClick={fetchCountryData}>Get Country Info</button>

      {error && <p>{error}</p>}

      {countryData && (
        <div className="country-info">
          <h2>{countryData.name.common}</h2>
          <p><strong>Capital:</strong> {countryData.capital?.[0]}</p>
          <p><strong>Region:</strong> {countryData.region}</p>
          <p><strong>Subregion:</strong> {countryData.subregion}</p>
          <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
          <p><strong>Area:</strong> {countryData.area.toLocaleString()} km²</p>
          
          <p><strong>Currency:</strong> {Object.values(countryData.currencies || {}).map(c => `${c.name} (${c.symbol})`).join(', ')}</p>
          <p><strong>Languages:</strong> {Object.values(countryData.languages || {}).join(', ')}</p>
          <p><strong>Timezones:</strong> {countryData.timezones.join(', ')}</p>
          <p><strong>Borders:</strong> {countryData.borders ? countryData.borders.join(', ') : 'None'}</p>
          <p><strong>Continent:</strong> {countryData.continents.join(', ')}</p>

          <img src={countryData.flags.svg} alt={`${countryData.name.common} flag`} className="flag" />
          
          {countryData.coatOfArms && countryData.coatOfArms.svg && (
            <div>
              <h3>Coat of Arms</h3>
              <img src={countryData.coatOfArms.svg} alt={`${countryData.name.common} coat of arms`} className="coat-of-arms" />
            </div>
          )}
          
          <p><a href={`https://www.google.com/maps/search/?api=1&query=${countryData.name.common}`} target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
        </div>
      )}
    </div>
  );
}

export default CountryInfo;
