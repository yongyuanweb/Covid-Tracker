import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./ultil";
function App() {
  //State to set all the countries as the menuItem
  const [countries, setCountries] = useState([]);
  //State to set default menuItem
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  //STATE=How to write a variable in REACT <<<<<<<
  //USEEFFECT= Run a piece of code
  //Based on a given condition

  useEffect(() => {
    //async -> send a request a server,wait for it and do something with info
    //The Code  inside here will run once
    //when the component loads and not again
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United State, Japan ,China ,France
            value: country.countryInfo.iso2, //UK,USA,CN,FR
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //Stick the selected dropDown Item to the be the default Item
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    //"https://disease.sh/v3/covid-19/all
    //"https://disease.sh/v3/covid-19/countries"/[COUNTRY_CODE]

    const url =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };
  console.log(countryInfo);
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1> Covid 19 Tracker </h1>{" "}
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              {/*loop through all the countries and and show dropdown of the options */}
              <MenuItem value="WorldWide"> WorldWide </MenuItem>{" "}
              {countries.map((country) => (
                <MenuItem value={country.value}> {country.name} </MenuItem>
              ))}{" "}
              {/* <MenuItem value="worldwide">worldwode</MenuItem>
             <MenuItem value="worldwide">worldwode</MenuItem>
             <MenuItem value="worldwide">worldwode</MenuItem>
             <MenuItem value="worldwide">worldwode</MenuItem> */}{" "}
            </Select>
          </FormControl>{" "}
        </div>{" "}
        {/*Title+Select input dropdown field */}{" "}
        <div className="app_stats">
          <InfoBox
            title="Coronaviurs Cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />{" "}
          <InfoBox
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />{" "}
          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />{" "}
        </div>{" "}
        <Map />
      </div>{" "}
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>WorldWide new Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
