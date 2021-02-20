import React, {useState} from 'react';
import Select from 'react-select'
import './App.css';
import countries from './countries';

const GetCountriesData = () => {
    const [people, setPeople] = useState(23503349);
    const [language, setLanguage] = useState(['中文 (Zhōngwén)']);
    const [capital, setCapital] = useState('Taipei');
    const [currencies, setCurrencies] = useState(['TWD']);
    const [timezones, setTimezones] = useState(['UTC+08:00']);
    const [alpha3Code, setAlpha3Code] = useState('twn');
    const [peopleValue, setPeopleValue] = useState(true);
    const [languageValue, setLanguageValue] = useState(true);
    const [capitalValue, setCapitalValue] = useState(true);
    const [currenciesValue, setCurrenciesValue] = useState(true);
    const [timezonesValue, setTimezonesValue] = useState(true);

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
      .then((res) => res.json())
      .then((data) => {
        const countryElement = data[0];
        console.log('currenciesData === ', data[0]);
        setPeople(()=>countryElement.population);
        //setLanguage(()=>countryElement.language[0].name);
        setAlpha3Code(()=>countryElement.alpha3Code.toLowerCase());
        setCapital(()=>countryElement.capital);
        setTimezones(()=>countryElement.timezones[0]);
        setCurrencies(()=>countryElement.currencies[0].code);
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
    const formatGroupLabel = options => (
      <div style={groupStyles}>
        <span>{options.label}</span>
        <span style={groupBadgeStyles}>{options.options.length}</span>
      </div>
    );
  return (
    <div className="app">
      <div className="country">
        <img className="country__img" src={`https://restcountries.eu/data/${alpha3Code}.svg`} />
          <div className="country__data">
            <Select
              defaultValue={countries[213]}
              options={countries}
              formatGroupLabel={formatGroupLabel}
              onChange={(e)=>fetchCountriesData(e.value)}         
            />
            <h4 className="country__region"></h4>
            {peopleValue? <></>:<p className="country__row"><span>👫</span>{thousandComma(people)}</p>} 
            {/* {languageValue? <></>:<p className="country__row"><span>🗣</span>{language}</p>} */}
            {capitalValue? <></>:<p className="country__row"><span>🏠</span>{capital}</p>}
            {currenciesValue? <></>:<p className="country__row"><span>💰</span>{currencies}</p>}
            {timezonesValue? <></>:<p className="country__row"><span>✈️</span>{timezones}</p>}
          </div>
      </div>
      <div className="container">
          <div type="button" className="optionBtn" onClick={() => setPeopleValue(!peopleValue)}>👫People</div>
          {/* <div type="button" className="optionBtn" onClick={() => setLanguageValue(!languageValue)}>🗣Language</div> */}
          <div type="button" className="optionBtn" onClick={() => setCapitalValue(!capitalValue)}>🏠Capital</div>
          <div type="button" className="optionBtn" onClick={() => setCurrenciesValue(!currenciesValue)}>💰Currencies</div>
          <div type="button" className="optionBtn" onClick={() => setTimezonesValue(!timezonesValue)}>✈️Timezones</div>
      </div>
    </div>
  );}


export default GetCountriesData;
