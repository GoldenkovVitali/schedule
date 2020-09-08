import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './mapBlock.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidmlydGFsIiwiYSI6ImNrYWlpODNqbTAxMHUyeG13NHpkZnYwNXMifQ.Y8602VcUdPFt6jpTLC4Q8w';
 
class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    lng: 27.56,
    lat: 53.9,
    zoom: 11
    };
    }
    componentDidMount() {
      const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      attributionControl: false,
      showUserLocation: true,
      });
 
      map.on('move', () => {
      this.setState({
      lng: map.getCenter().lng.toFixed(4),
      lat: map.getCenter().lat.toFixed(4),
      zoom: map.getZoom().toFixed(2),
      });
      if (this.marker) this.marker.remove();
      this.marker = new mapboxgl.Marker().setLngLat([this.state.lng, this.state.lat]).addTo(map);
      });  
   
      this.marker = new mapboxgl.Marker(
      ).setLngLat([this.state.lng, this.state.lat]).addTo(map);
    }
      
  render() {
   const { lng, lat, zoom } = this.state;
    return (
      <div>
         <div>
           <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
         </div>
         <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
  }
}


export default class MapBlock extends Component {
  state = {
    checked: false,
  }

  onChange = (event) => {
    const isChecked = event.target.checked;

    this.setState({
      checked: isChecked,
    })
  }

  render() {
    const { TextArea } = Input;
    const { isEdited } = this.props;
    const { checked } = this.state;


    if (!isEdited && !checked) {
      return null;
    }

    return (
      <div className='description-block'>
        { isEdited ? 
        <Checkbox 
          className='description-block__checkbox' 
          onChange={this.onChange}
          checked={checked}
        /> : null }
         <SimpleMap />
      </div>
    )
  }
}      
