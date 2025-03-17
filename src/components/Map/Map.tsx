import { useEffect, useState } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
	useMapEvents,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Spinner from '../Spinner/Spinner';
import * as L from 'leaflet';
import PopupInfo from '../PopupInfo/PopupInfo';
import CustomButton from './CustomButton';
import axios from 'axios';

const Map = () => {
	const [position, setPosition] = useState<[number, number] | null>(null);
	const [airData, setAirData] = useState<any>(null); // Use any or specific type for airData
	const [markers, setMarkers] = useState<[number, number][]>([]);
	const [locations, setLocations] = useState<string[]>([
		'Strada Vasile Lupu 99 Iasi',
		'Strada Han Tatar 3, Iasi',
	]);

	const getCoordinatesFromAddress = async (address: string) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/search`,
				{
					params: {
						q: address,
						format: 'json',
						addressdetails: 1,
						limit: 1,
					},
				}
			);

			const data = response.data;
			if (data && data[0]) {
				const { lat, lon } = data[0];
				return [parseFloat(lat), parseFloat(lon)];
			}
			return null;
		} catch (error) {
			console.error('Error getting coordinates:', error);
			return null;
		}
	};

	useEffect(() => {
		const fetchLocations = async () => {
			const locationMarkers: any[] = [];

			for (let i = 0; i < locations.length; i++) {
				const coords = await getCoordinatesFromAddress(locations[i]);
				if (coords) {
					locationMarkers.push(coords);
				}
			}

			setMarkers(locationMarkers);
		};

		fetchLocations();
	}, [locations]);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setPosition([latitude, longitude]);
				},
				(error) => {
					console.error('Error getting geolocation: ', error);
					const fallbackPosition: [number, number] = [40.7128, -74.006]; // New York City
					setPosition(fallbackPosition);
				}
			);
		} else {
			const fallbackPosition: [number, number] = [40.7128, -74.006];
			setPosition(fallbackPosition);
			alert('Geolocation is not supported by this browser.');
		}
	}, []);

	if (!position) {
		return <Spinner />;
	}

	let airDataPM = airData?.iaqi?.pm10?.v ?? '';

	const defaultIcon = L.divIcon({
		className: 'custom-marker',
		html: `
      <svg width="36" height="52" viewBox="0 0 36 52" xmlns="http://www.w3.org/2000/svg">
        <path fill="url(#marker-gradient)" fill-rule="evenodd" clip-rule="evenodd" 
          d="M18 52C18 52 36 34.8302 36 18.1509C36 8.12645 27.9411 0 18 0C8.05887 0 0 8.12645 0 18.1509C0 34.8302 18 52 18 52ZM18 30C24.6274 30 30 24.6274 30 18C30 11.3726 24.6274 6 18 6C11.3726 6 6 11.3726 6 18C6 24.6274 11.3726 30 18 30Z" />
        <circle cx="18" cy="18" r="12" fill="#FFFFFF" />
        <text x="18" y="18" fill="#000000" font-size="10" font-weight="600" 
          text-anchor="middle" dominant-baseline="middle">${airDataPM}</text>
        <defs>
          <linearGradient id="marker-gradient" gradientTransform="rotate(180)">
            <stop offset="0%" stop-color="#ACF254" />
            <stop offset="100%" stop-color="#20944E" />
          </linearGradient>
        </defs>
      </svg>
    `,
		iconSize: [36, 52],
		iconAnchor: [18, 52],
		popupAnchor: [0, 300],
	});

	let iconSvg = `<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				cx='8'
				cy='8'
				r='4'
				stroke='url(#paint0_linear_1_14989)'
				stroke-width='4'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_1_14989'
					x1='8'
					y1='2'
					x2='8'
					y2='14'
					gradientUnits='userSpaceOnUse'
				>
					<stop stop-color='#ACF254' />
					<stop
						offset='1'
						stop-color='#51B72E'
					/>
				</linearGradient>
			</defs>
		</svg>`;

	const popupIcon = L.divIcon({
		className: 'popup-marker',
		html: `${iconSvg}`,
		iconSize: [16, 16],
		iconAnchor: [16, 16],
		popupAnchor: [0, 300],
	});

	const handleMapClick = (latlng: [number, number]) => {
		setMarkers((prev) => [...prev, latlng]);
	};

	const MapClickHandler = ({
		onMapClick,
	}: {
		onMapClick: (latlng: [number, number]) => void;
	}) => {
		useMapEvents({
			click: (e) => {
				const { lat, lng } = e.latlng;
				onMapClick([lat, lng]);
			},
		});
		return null;
	};

	return (
		<div style={{ height: `93vh`, width: '100%', zIndex: 1 }}>
			<MapContainer
				center={position as LatLngExpression}
				zoom={25}
				style={{ height: '100%', width: '100%' }}
				zoomControl={false}
			>
				<ZoomControl position='bottomright' />
				<TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />

				<Marker
					position={position as LatLngExpression}
					icon={defaultIcon}
				>
					<Popup>
						<PopupInfo
							position={position}
							setAirData={setAirData}
						/>
					</Popup>
				</Marker>

				{markers.map((marker, index) => (
					<Marker
						key={index}
						position={marker}
						icon={popupIcon}
					>
						<Popup>
							<PopupInfo
								position={marker}
								setAirData={setAirData}
							/>
						</Popup>
					</Marker>
				))}

				<CustomButton position={position as LatLngExpression} />
				<MapClickHandler onMapClick={handleMapClick} />
			</MapContainer>
		</div>
	);
};

export default Map;
