import React, {useState} from 'react';
import Select from 'react-select'
import './App.css';

const GetCountriesData = () => {
    const [country, setCountry] = useState('Taiwan');
    const [people, setPeople] = useState(23000000);
    const [capital, setCapital] = useState('Taipei');
    const [currencies, setCurrencies] = useState([]);
    const [alpha3Code, setAlpha3Code] = useState('twn');

    var thousandComma = function (number) {
      var num = number.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(num)) {
          num = num.replace(pattern, "$1,$2");
      }
      return num;
  }
    const fetchCountriesData = (props) => {
      fetch(`https://restcountries.eu/rest/v2/name/${props}`)
      .then((response) => response.json())
      .then((data) => {
        const countryElement = data[0];
        console.log('currenciesData === ', data[0]);
        setCountry(()=>countryElement.name);
        setPeople(()=>countryElement.population);
        setAlpha3Code(()=>countryElement.alpha3Code.toLowerCase());
        setCapital(()=>countryElement.capital);
        setCurrencies(()=>countryElement.currencies.code);
        });
    };
    const groupStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };
    const groupBadgeStyles = {
      backgroundColor: '#EBECF0',
      borderRadius: '2em',
      color: '#172B4D',
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1',
      minWidth: 1,
      padding: '0.16666666666667em 0.5em',
      textAlign: 'center',
    };
    const options = [
      { value: 'taiwan', label: 'Taiwan' },
      { value: 'japan', label: 'Japan' },
      { value: 'canada', label: 'Canada' },
      { value: 'usa', label: 'USA' }
    ]
    const formatGroupLabel = options => (
      <div style={groupStyles}>
        <span>{options.label}</span>
        <span style={groupBadgeStyles}>{options.options.length}</span>
      </div>
    );
     
  return (
    <div className="App">
      <div className="country">
    <img className="country__img" src={`https://restcountries.eu/data/${alpha3Code}.svg`} />
    <div className="country__data">
      <h3 className="country__name">{country}</h3>
      <Select
        defaultValue={options[0]}
        options={options}
        formatGroupLabel={formatGroupLabel}
        onChange={(e)=>fetchCountriesData(e.value)}          
      />
      <h4 className="country__region"></h4>
      <p className="country__row"><span>👫</span>{thousandComma(people)}</p>
      <p className="country__row"><span>🗣️</span>{capital}</p>
      <p className="country__row"><span>💰</span>{currencies}</p>
    </div>
  </div>
    </div>
  );}


export default GetCountriesData;
