import React, {useState} from 'react';
import './App.css';

const GetCountriesData = () => {
    const [country, setCountry] = useState('Taiwan');
    const [people, setPeople] = useState(23000000);
    const [language, setLanguage] = useState('Chinese');
    const [currencies, setCurrencies] = useState([]);
    const [alpha3Code, setAlpha3Code] = useState('twn');
    
    // fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //   const countryElement = data[0];
    //   setCountry(()=>countryElement.name);
    //   setPeople(()=>countryElement.population);
    //   setAlpha3Code(()=>countryElement.alpha3Code.toLowerCase());
    //   setLanguage(()=>countryElement.capital);
    //   setCurrencies(()=>countryElement.currencies.code);
    //   });

    const fetchCountriesData = (props) => {
      fetch(`https://restcountries.eu/rest/v2/name/${props}`)
      .then((response) => response.json())
      .then((data, language, currencies) => {
        //console.log('data === ', data);
        const countryElement = data[0];
        console.log('currenciesData === ', data[0]);
        setCountry(()=>countryElement.name);
        setPeople(()=>countryElement.population);
        setAlpha3Code(()=>countryElement.alpha3Code.toLowerCase());
        setLanguage(()=>countryElement.capital);
        setCurrencies(()=>countryElement.currencies.code);
        });
    };

    
     
  return (
    <div className="App">
      <div className="country">
    <img className="country__img" src={`https://restcountries.eu/data/${alpha3Code}.svg`} />
    <div className="country__data">
      <h3 className="country__name">{country}</h3>
      <button onClick={() => fetchCountriesData('taiwan')}>
        Taiwan
      </button>
      <button onClick={() => fetchCountriesData('japan')}>
        Japan
      </button>
      <button onClick={() => fetchCountriesData('canada')}>
        Canada
      </button>
      <button onClick={() => fetchCountriesData('usa')}>
        USA
      </button>
      <h4 className="country__region"></h4>
      <p className="country__row"><span>👫</span>{people}</p>
      <p className="country__row"><span>🗣️</span>{language}</p>
      <p className="country__row"><span>💰</span>{currencies}</p>
    </div>
  </div>
    </div>
  );}


export default GetCountriesData;
