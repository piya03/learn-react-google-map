import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="">
        <button>Open Google Map</button>
      </div>
      <div className="container">
        <div>
          <input
            type="text"
            className="searchBox"
            placeholder="Search Your Location"
          />
          <span className="icon">
            <i class="fa fa-search"></i>
          </span>
        </div>

        <div className="align_Map_address">
          <div className="map_box">Here Google MAP</div>
          <div className="address_inputs">
            <input
              type="text"
              placeholder="Current Location"
              className="current_location"
            />
            <input type="text" placeholder="Pincode" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
