import React from "react";
import "./App.css";
import {
  withScriptjs,
  GoogleMap,
  Marker,
  withGoogleMap,
} from "react-google-maps";
import { compose, withProps } from "recompose";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    )}
  </GoogleMap>
));

///////

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
            <i className="fa fa-search"></i>
          </span>
        </div>

        <div className="align_Map_address">
          <div className="map_box">
            <MyMapComponent isMarkerShown />
          </div>
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
