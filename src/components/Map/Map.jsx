import React, { useState } from 'react';
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvent,
	useMapEvents,
} from 'react-leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

const MyMap = (props) => {
	const { data } = props;
	const [markers, setMarkers] = useState(props.data);

	const LocationMarkers = () => {
		// добавление маркеров с карты
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

		console.log(markers.length);

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
				{/* {data.map((point) => console.log(point))}
				{data.map((point) => (
					// console.log(point),
					<Marker
						position={point.position}
						icon={
							new Icon({
								iconUrl: markerIconPng,
								iconSize: [25, 41],
								iconAnchor: [12, 41],
							})
						}
						key={point.name}
					/>
				))} */}
			</MapContainer>
		</section>
	);
};

export default MyMap;
