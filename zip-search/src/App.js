import React, { Component } from 'react';
import './App.css';


function City(props) {

  return (
  <div className="city-container">
    <div className = "header">{props.city.City}, {props.city.State}</div>
    <div className = "content">
      <ul>
        <li>State: {props.city.State}</li> 
        <li>Location: ({props.city.Lat}, {props.city.Long})</li>
        <li>Population (estimated): {props.city.EstimatedPopulation}</li>
        <li>Total Wages: {props.city.TotalWages}</li>
      </ul>
    </div>
  </div>);
}

function ZipSearchField(props) {
  
  let handleInputChange = (value) =>{
    if(value.length > 4){
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${value}`)
      .then(response => response.json())
      .then(cities => props.saveCities(cities))
    }
  }
  
  return (
  <div className="zip-input">
    <b>Zip Code: </b>
    <input onChange={(event) => handleInputChange(event.target.value)}/>
  </div>);
}


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      cities: []
    }
  }

  saveCities(cities){
    this.setState({cities})
  }

  render() {
    let cityList = [];
    for (let ii = 0; ii < this.state.cities.length; ii++) {
      cityList.push(
        <City city={this.state.cities[ii]}/>
      );
    }
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField saveCities={(city) => this.saveCities(city)}/>
        <div>
          
          {cityList}
          
        </div>
      </div>
    );
  }
}

export default App;
