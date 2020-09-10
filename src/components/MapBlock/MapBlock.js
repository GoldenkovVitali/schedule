/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
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
      zoom: 11,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
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
    ).setLngLat([lng, lat]).addTo(map);
  }

  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div>
        <div>
          <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
        </div>
        <div
          ref={(el) => {
            this.mapContainer = el;
            return this.mapContainer;
          }}
          className="mapContainer"
        />
      </div>
    );
  }
}

export default class MapBlock extends Component {
  render() {
    return (
      <div className="map-block">
        <SimpleMap />
      </div>
    );
  }
}
