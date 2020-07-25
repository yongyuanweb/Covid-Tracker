import React,{useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,

}from "@material-ui/core";
import './App.css';

function App() {
  //State to set all the countries as the menuItem
  const[countries,setCountries]=useState([]);
  //State to set default menuItem
  const[country,setCountry]=useState('WorldWide');
  //STATE=How to write a variable in REACT <<<<<<<
  //USEEFFECT= Run a piece of code
  //Based on a given condition 

  useEffect(()=>{
    //async -> send a request a server,wait for it and do something with info
    //The Code  inside here will run once 
    //when the component loads and not again
    const getCountriesData=async()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=>response.json())
      .then((data)=>{
        const countries=data.map((country)=>(
          {
          name:country.country,//United State, Japan ,China ,France
           value:country.countryInfo.iso2 //UK,USA,CN,FR
        }
      ));
      setCountries(countries);
    })
  }
  getCountriesData(); 
},[]);


//Stick the selected dropDown Item to the be the default Item 
const onCountryChange =async(event)=>{
 const countryCode=event.target.value; 
 setCountry(countryCode);
}
  return (
    <div className="App">
     <div className="app_header">

     

     <h1>Covid 19 Tracker</h1>
     <FormControl className="app_dropdown">
       <Select
        variant="outlined"
        value={country}
        onChange={onCountryChange}>

       {/*loop through all the countries and and show dropdown of the options */}
       
       <MenuItem value='WorldWide'>WorldWide</MenuItem>
       {countries.map((country) =>(
         <MenuItem value={country.value}>{country.name}</MenuItem>
         ))}
      {/* <MenuItem value="worldwide">worldwode</MenuItem>
       <MenuItem value="worldwide">worldwode</MenuItem>
       <MenuItem value="worldwide">worldwode</MenuItem>
       <MenuItem value="worldwide">worldwode</MenuItem> */}
       </Select>

     </FormControl>
     </div>
     {/*Header*/}
     {/*Title+Select input dropdown field */}
     {/*InfoBox*/}
     {/*InfoBox*/}
     {/*InfoBox*/}

     {/*Table*/}
     {/*Graph*/}
     {/*Map*/}
    </div>
  );
}

export default App;
