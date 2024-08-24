import { useState, useEffect } from 'react';
import axios from 'axios';

function ResultCountries({ result, setCountrySelected }) {
    const handleClickShow = (e) => {
        e.preventDefault();
        setCountrySelected(e.target.value);
    };

    if (result.length === 0) return null;

    if (result.length >= 10)
        return (
            <div>
                {' '}
                <p>Too many matches, specify another filter</p>
            </div>
        );

    if (result.length > 1 && result.length < 10) {
        return (
            <ul>
                {result.map((r, i) => (
                    <li key={i}>
                        {r}{' '}
                        <button onClick={handleClickShow} value={r}>
                            show
                        </button>
                    </li>
                ))}
            </ul>
        );
    }

    if (result.data) {
        let country = result.data;

        return (
            <div>
                <ul style={{ listStyle: 'none' }}>
                    <li>
                        <h2>{country.name.common}</h2>
                    </li>
                    <li>
                        <h4>Capital: {country.capital}</h4>
                    </li>
                    <li>
                        <img src={country.flags.png} alt={country.flags.alt} />
                    </li>

                    <li>
                        Languages:{' '}
                        <ul>
                            {Object.values(country.languages).map((lan, i) => (
                                <li key={i}>{lan}</li>
                            ))}
                        </ul>
                    </li>

                    <li>Population: {country.population}</li>

                    <li>
                        {' '}
                        <h3>Weather in {country.name.common}</h3>
                    </li>
                    <li>
                        temperature{' '}
                        {Number(country.weather.main.temp - 273.15).toFixed(2)}°
                        celcius
                    </li>

                    <li>
                        <img
                            src={`https://openweathermap.org/img/wn/${country.weather.weather[0].icon}@2x.png`}
                            alt='weather icon'
                        />
                    </li>
                    <li>wind {country.weather.wind.speed} m/s</li>
                </ul>
            </div>
        );
    }
}

function App() {
    const [countryInput, setCountryInput] = useState('');
    const [allCountries, setAllCountries] = useState([]);
    const [response, setResponse] = useState('');
    const [countrySelected, setCountrySelected] = useState('');

    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';
    const api_key = import.meta.env.VITE_WEATHER_KEY;

    const handleChangeCountry = (e) => {
        e.preventDefault();
        setCountryInput(e.target.value);
    };

    const handleSelectCountry = (country) => {
        setCountrySelected(country);
    };

    //Initial load to local state of all countries names
    useEffect(() => {
        axios
            .get(`${baseUrl}/all`)
            .then((response) =>
                setAllCountries(response.data.map((d) => d.name.common))
            );
    }, []);

    //input of country name. if no input, blank response. if result is one, assign country. else, set response as array of names
    useEffect(() => {
        if (!countryInput) {
            setResponse('');
            setCountrySelected('');
            return;
        } else {
            let result = allCountries.filter((c) =>
                c.toLowerCase().includes(countryInput.toLowerCase())
            );

            if (result.length === 1) {
                setCountrySelected(result);
            } else {
                setResponse(result);
                setCountrySelected('');
            }
        }
    }, [countryInput]);

    //if a country is selected, fetch full info and call the weather api. set as response.
    useEffect(() => {
        let countryResponse;
        let weatherResponse;

        async function selectCountry() {
            try {
                setResponse('');
                countryResponse = await axios.get(
                    `${baseUrl}name/${countrySelected}`
                );
                weatherResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${countryResponse.data.latlng[0]}&lon=${countryResponse.data.latlng[1]}&appid=${api_key}`
                );

                countryResponse.data.weather = weatherResponse.data;

                setResponse(countryResponse);
            } catch (error) {
                console.log(error);
            }
        }

        if (countrySelected) selectCountry();
    }, [countrySelected]);

    return (
        <>
            find countries :
            <input
                id='country-input'
                type='text'
                value={countryInput}
                onChange={handleChangeCountry}
            />
            <ResultCountries
                result={response}
                setCountrySelected={handleSelectCountry}></ResultCountries>
        </>
    );
}

export default App;
