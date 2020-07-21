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
  console.log("App -> addressOption", addressOption);

  async function onChange(e) {
    const { value } = e.target;
    const url = `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_API_KEY}&q=${value}`;

    if (value.length > 3) {
      const res = await fetch(url).then((res) => res.json());
      // res.map((each) => {
      //   console.log("onChange -> each", each.address.name);
      //   setAddressOption.push(...addressOption, each.address.name);
      // });
      setAddressOption(res);
      console.log(res);
    }
  }

  const optionSelect = addressOption.map((each) => {
    return {
      label: each?.display_name || "",
      value: each?.place_id,
      ...each,
    };
  });
  console.log("App -> optionSelect", optionSelect);
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
            onChange={onChange}
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

/**
 *   <PlacesAutocomplete
            value={inputAddress.address}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,

              getSuggestionItemProps,
              loading,
            }) => {
              console.log("App -> suggestions", suggestions);
              return (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }}
          </PlacesAutocomplete>
 */
