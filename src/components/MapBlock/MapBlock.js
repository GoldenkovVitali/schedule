/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './mapBlock.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidmlydGFsIiwiYSI6ImNrYWlpODNqbTAxMHUyeG13NHpkZnYwNXMifQ.Y8602VcUdPFt6jpTLC4Q8w';

export default class MapBlock extends Component {
  componentDidMount() {
    const { lng, lat, zoom } = this.props;
    const { changeMapData } = this.props;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
      attributionControl: false,
      showUserLocation: true,
    });

    map.on('move', () => {
      changeMapData(map.getCenter().lng.toFixed(4),
        map.getCenter().lat.toFixed(4),
        map.getZoom().toFixed(2));
      if (this.marker) this.marker.remove();
      this.marker = new mapboxgl.Marker().setLngLat([this.props.lng, this.props.lat]).addTo(map);
    });
    this.marker = new mapboxgl.Marker(
    ).setLngLat([lng, lat]).addTo(map);
  }

  render() {
    const { lng, lat, zoom, isEdited } = this.props;
    
    return (
      <div className={isEdited ? "map-block_edited" : "map-block"}>

        <div>
          <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
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
