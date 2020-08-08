import React from "react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";

const MY_API_KEY = "AIzaSyBZ6_3SQ3pQC-YX9Sdf3fArZou0i1vrY8Y"; // how to get key - step are below

export default class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: ""
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value });
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    console.log(geocodedPrediction, originalPrediction); // eslint-disable-line
    console.warn(" values ", geocodedPrediction.formatted_address);
    this.setState({ search: "", value: geocodedPrediction.formatted_address });
  };

  handleNoResult = () => {
  };

  handleStatusUpdate = status => {
  };

  render() {
    const { search, value } = this.state;
    return (
      <ReactGoogleMapLoader
        params={{
          key: MY_API_KEY,
          libraries: "places,geocode"
        }}
        render={googleMaps =>
          googleMaps && (
            <ReactGooglePlacesSuggest
              googleMaps={googleMaps}
              autocompletionRequest={{
                input: search
                // Optional options
                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
              }}
              // Optional props
              onNoResult={this.handleNoResult}
              onSelectSuggest={this.handleSelectSuggest}
              onStatusUpdate={this.handleStatusUpdate}
              textNoResults="My custom no results text" // null or "" if you want to disable the no results item
              customRender={prediction => (
                <div className="customWrapper">
                  {prediction
                    ? prediction.description
                    : "My custom no results text"}
                </div>
              )}
            >
              <input
                type="text"
                value={value}
                placeholder="Search a location"
                onChange={this.handleInputChange}
              />
            </ReactGooglePlacesSuggest>
          )
        }
      />
    );
  }
}
