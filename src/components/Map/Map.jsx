import React from 'react';
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvents,
} from 'react-leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

const MyMap = (props) => {
	const { markers, setMarkers } = props;

	// добавление и рендер маркеров
	const LocationMarkers = () => {
		useMapEvents({
			click(e) {
				const { lat, lng } = e.latlng;
				const number = markers.length + 1;
				const marker = {
					name: number,
					position: [lat, lng],
				};
				setMarkers([...markers, marker]);
			},
		});

		return (
			<>
				{markers.map((marker) => (
					<Marker
						position={marker.position}
						icon={
							new Icon({
								iconUrl: markerIconPng,
								iconSize: [25, 41],
								iconAnchor: [12, 41],
							})
						}
						key={marker.name}
					>
						<Popup>Точка {marker.name}</Popup>
					</Marker>
				))}
			</>
		);
	};

	return (
		<section className="Map-wrapper">
			<MapContainer
				center={{ lat: 46.349, lng: 48.0415 }}
				zoom={11}
				scrollWheelZoom={false}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<LocationMarkers />
			</MapContainer>
		</section>
	);
};

export default MyMap;
