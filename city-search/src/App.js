import React, { Component } from 'react';
import './App.css';


function ZipCode(props) {
  
  return (
  <div className="ZipCode-container">
    <div className = "content">
      <ul>
        <li>Zipcode: {props.ZipCode} {props.nameTest} </li> 
      </ul>
    </div>
  </div>);
}

function CitySearchField(props) {
  
  let handleInputChange = (value) =>{
    if(value.length > 0){
      value = value.toUpperCase()
      fetch(`http://ctp-zip-api.herokuapp.com/city/${value}`)
      .then(response => response.json())
      .then(zipCodes => props.saveZipCodes(zipCodes))
    }
    
  }
  
  return (
  <div className="city-input">
    <b>City Name </b>
    <input onChange={(event) => handleInputChange(event.target.value)}/>
  </div>);
}


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      zipCodes: []
    }
  }

  saveZipCodes(zipCodes){
    this.setState({zipCodes})
  }

  render() {
    let cityList = [];
    for (let ii = 0; ii < this.state.zipCodes.length; ii++) {
      cityList.push(
        <ZipCode ZipCode={this.state.zipCodes[ii]} />
      );
    }
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField saveZipCodes={(zipCodes) => this.saveZipCodes(zipCodes)}/>
        <div>

          {cityList}
          
        </div>
      </div>
    );
  }
}

export default App;
