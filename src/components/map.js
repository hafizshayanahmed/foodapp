// import { GoogleMap, Marker } from "react-google-maps"
import React from "react"

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { render } from "react-dom";

class map extends React.Component {

    constructor(){
        super()
        this.state = {
            lat: null,
            lng: null
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            })
        })
    }
    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={16}
                defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
            >
                {props.isMarkerShown && <Marker draggable={true} onDragEnd={(v)=> console.log(v.latLng.lat(),v.latLng.lng())} position={{ lat: this.state.lat, lng: this.state.lng }} />}
            </GoogleMap>
        ))
        console.log(this.state.lat, this.state.lng)
        return (
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

export default map