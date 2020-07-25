import React, { useState, useEffect, useRef } from "react";
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
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  console.log("props", props);
  const ref = useRef(null);
  React.useEffect(() => {
    props.myRef.current = ref.current;
  }, [ref.current]);
  return (
    <GoogleMap
      ref={ref}
      defaultZoom={8}
      defaultCenter={props.latLng || { lat: -34.397, lng: 150.644 }}
    >
      {props.isMarkerShown && <Marker position={props.latLng} />}
    </GoogleMap>
  );
});

///////
function App() {
  const [addressOption, setAddressOption] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [pincode, setPincode] = useState();
  const [show, setShow] = useState(true);
  const myRef = useRef(null);

  async function onChange(e) {
    const { value } = e.target;
    const url = `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_API_KEY}&q=${value}`;

    if (value.length > 3) {
      const res = await fetch(url).then((res) => res.json());

      setAddressOption(res);
    }
  }

  useEffect(() => {
    console.log("ref", myRef.current);
  }, []);
  const optionSelect = (addressOption || [])?.map((each) => {
    return {
      label: each?.display_name || "",
      value: each?.place_id,
      ...each,
    };
  });
  console.log("App -> myRef", myRef);
  console.log("App -> optionSelect", optionSelect);
  return (
    <div className="App">
      <div className="container">
        <div
          style={{
            position: "relative",
          }}
        >
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
          {show && (
            <ul>
              {optionSelect.map((each, i) => {
                return (
                  <li
                    onClick={(e) => {
                      setShow(false);
                      setSelectedValue(each);
                      setInputVal(each?.display_name);
                      // if (each) {
                      //   console.log("App -> selectedValue", selectedValue);
                      //   myRef.current.setCenter(
                      //     window.google.maps.LatLng(
                      //       parseInt(each?.lat),
                      //       parseInt(each?.lon)
                      //     )
                      //   );
                      // }
                    }}
                    key={i}
                    value={each.value}
                  >
                    {each.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="align_Map_address">
          <div className="map_box">
            <MyMapComponent
              myRef={myRef}
              isMarkerShown
              latLng={
                selectedValue
                  ? {
                      lat: parseInt(selectedValue?.lat),
                      lng: parseInt(selectedValue?.lon),
                    }
                  : null
              }
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
