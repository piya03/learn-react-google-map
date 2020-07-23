import React, { useState, useEffect } from "react";
import "./App.css";
import {
  withScriptjs,
  GoogleMap,
  Marker,
  withGoogleMap,
} from "react-google-maps";
import { compose, withProps } from "recompose";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

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
  const [addressOption, setAddressOption] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [pincode, setPincode] = useState();
  const [show, setShow] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  async function onChange(e) {
    const { value } = e.target;
    const url = `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_API_KEY}&q=${value}`;

    if (value.length > 3) {
      const res = await fetch(url).then((res) => res.json());

      setAddressOption(res);
    }
  }

  const optionSelect = addressOption?.map((each) => {
    return {
      label: each?.display_name || "",
      value: each?.place_id,
      ...each,
    };
  });

  // const save = optionSelect.map((each, i) => {
  //   return setLatitude(each?.lat), setLongitude(each?.lon);
  // });
  console.log("App -> optionSelect", optionSelect);
  return (
    <div className="App">
      <div className="container">
        <div>
          <input
            type="text"
            className="searchBox"
            placeholder="Search Your Location"
            onChange={(e) => {
              onChange(e);
              setShow(true);
              setInputVal(e.target.value);
            }}
            value={inputVal}
          />
          <span className="icon">
            <i className="fa fa-search"></i>
          </span>
        </div>

        {/* /////////// */}
        {show && (
          <ul
            onClick={(e) => {
              setShow(false);
              setInputVal(e.target.innerText);
            }}
          >
            {optionSelect.map((each, i) => {
              return (
                <li key={i} value={each.value}>
                  {each.label}
                </li>
              );
            })}
          </ul>
        )}

        <div className="align_Map_address">
          <div className="map_box">
            <MyMapComponent
              isMarkerShown
              latitude={latitude}
              longitude={longitude}
            />
          </div>
          <div className="address_inputs">
            <textarea
              className="current_location"
              value={inputVal}
              placeholder="Current Location"
              rows={5}
            />
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
