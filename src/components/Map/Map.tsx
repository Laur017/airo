import { useEffect, useState } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Spinner from '../Spinner/Spinner';
import * as L from 'leaflet';
import PopupInfo from '../PopupInfo/PopupInfo';
import CustomButton from './CustomButton';
import axios from 'axios';

interface MapProps {
	locations: string[];
}

const Map = ({ locations }: MapProps) => {
	const [position, setPosition] = useState<[number, number] | null>(null);
	const [markers, setMarkers] = useState<
		{ coords: [number, number]; airData: any; address: any }[]
	>([]);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setPosition([latitude, longitude]);
				},
				(error) => {
					console.error('Error getting geolocation: ', error);
					setPosition([40.7128, -74.006]);
				}
			);
		} else {
			setPosition([40.7128, -74.006]); // Default fallback
			alert('Geolocation is not supported by this browser.');
		}
	}, []);

	console.log('POSITION:', position);

	const fetchCoordinatesFromAddress = async (address: string) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/search`,
				{ params: { q: address, format: 'json', addressdetails: 1, limit: 1 } }
			);
			if (response.data.length > 0) {
				const { lat, lon } = response.data[0];
				return [parseFloat(lat), parseFloat(lon)];
			}
		} catch (error) {
			console.error('Error fetching coordinates:', error);
		}
		return null;
	};

	const fetchAirQualityData = async (lat: number, lon: number) => {
		try {
			const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${
				import.meta.env.VITE_API_KEY
			}`;
			const response = await axios.get(url);
			if (response.data.status === 'ok') {
				return response.data.data;
			}
		} catch (error) {
			console.error('Error fetching air quality data:', error);
		}
		return null;
	};

	const fetchAddressFromCoordinates = async (lat: number, lon: number) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/reverse`,
				{ params: { lat, lon, format: 'json' } }
			);
			if (response.data && response.data.address) {
				return response.data.address;
			}
		} catch (error) {
			console.error('Error fetching address:', error);
		}
		return null;
	};

	useEffect(() => {
		// Fetch data for all locations and generate markers
		const fetchMarkers = async () => {
			const markerData: any[] = [];
			for (const location of locations) {
				const coords = await fetchCoordinatesFromAddress(location);
				if (coords) {
					const [lat, lon] = coords;

					// Fetch air quality and address data for each location
					const airData = await fetchAirQualityData(lat, lon);
					const address = await fetchAddressFromCoordinates(lat, lon);

					markerData.push({ coords: [lat, lon], airData, address });
				}
			}
			setMarkers(markerData);
		};

		if (locations.length > 0) {
			fetchMarkers();
		}
	}, [locations]);

	const [defaultVal, setDefaultVal] = useState<any>(null); // State for air quality data
	const [defaultAddress, setDefaultAddress] = useState<any>(null); // State for address
	const [error, setError] = useState<string | null>(null); // State for error handling

	useEffect(() => {
		// Define the async logic within the useEffect
		const loadDefaultData = async (position: [number, number] | null) => {
			try {
				if (!position) return; // Exit if position is null
				const defaultVal = await fetchAirQualityData(position[0], position[1]); // Fetch air quality data
				const defaultAddress = await fetchAddressFromCoordinates(
					position[0],
					position[1]
				); // Fetch address data

				// Update states with fetched data
				setDefaultVal(defaultVal);
				setDefaultAddress(defaultAddress);
			} catch (error) {
				console.error('Error fetching default data:', error);
				setError('Failed to load data'); // Update error state if fetching fails
			}
		};

		loadDefaultData(position); // Call the function and pass the position
	}, [position]);

	// Default icon for markers
	const defaultIcon = L.divIcon({
		className: 'custom-marker',
		html: `<svg width="36" height="52" viewBox="0 0 36 52" xmlns="http://www.w3.org/2000/svg"> <path fill="url(#marker-gradient)" fill-rule="evenodd" clip-rule="evenodd" d="M18 52C18 52 36 34.8302 36 18.1509C36 8.12645 27.9411 0 18 0C8.05887 0 0 8.12645 0 18.1509C0 34.8302 18 52 18 52ZM18 30C24.6274 30 30 24.6274 30 18C30 11.3726 24.6274 6 18 6C11.3726 6 6 11.3726 6 18C6 24.6274 11.3726 30 18 30Z" /> <circle cx="18" cy="18" r="12" fill="#FFFFFF" /> <text x="18" y="18" fill="#000000" font-size="10" font-weight="600" text-anchor="middle" dominant-baseline="middle">${
			defaultVal?.iaqi?.pm10?.v || ''
		}</text> <defs> <linearGradient id="marker-gradient" gradientTransform="rotate(180)"> <stop offset="0%" stop-color="#ACF254" /> <stop offset="100%" stop-color="#20944E" /> </linearGradient> </defs> </svg> `,
		iconSize: [36, 52],
		iconAnchor: [18, 52],
		popupAnchor: [0, -52],
	});

	const generateIconSvg = (pmValue: number) => {
		if (pmValue > 10) {
			return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="4" stroke="url(#paint0_linear_1_14989)" stroke-width="4"/>
<defs>
<linearGradient id="paint0_linear_1_14989" x1="8" y1="2" x2="8" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#ACF254"/>
<stop offset="1" stop-color="#51B72E"/>
</linearGradient>
</defs>
</svg>
`;
		} else if (pmValue < 10 && pmValue > 5) {
			return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="4" stroke="url(#paint0_linear_1_14994)" stroke-width="4"/>
<defs>
<linearGradient id="paint0_linear_1_14994" x1="8" y1="2" x2="8" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#F2B354"/>
<stop offset="1" stop-color="#B75F2E"/>
</linearGradient>
</defs>
</svg>
`;
		} else {
			return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="4" stroke="url(#paint0_linear_1_14997)" stroke-width="4"/>
<defs>
<linearGradient id="paint0_linear_1_14997" x1="8" y1="2" x2="8" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#F27A54"/>
<stop offset="1" stop-color="#F02121"/>
</linearGradient>
</defs>
</svg>
`;
		}
	};

	// If no position yet, return loading spinner
	if (!position) {
		return <Spinner />;
	}

	return (
		<div style={{ height: `93vh`, width: '100%', zIndex: 1 }}>
			<MapContainer
				center={position as LatLngExpression}
				zoom={13}
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
							popupData={{
								airData: defaultVal,
								address: defaultAddress,
							}}
						/>
					</Popup>
				</Marker>

				{markers.map((marker, index) => {
					const pmValue = marker.airData?.aqi;
					if (pmValue) {
						console.log('PM10 value for marker:', pmValue); // Debugging log
						return (
							<Marker
								key={index}
								position={marker.coords}
								icon={L.divIcon({
									className: `popup-marker-${index}`,
									html: generateIconSvg(pmValue),
									iconSize: [16, 16],
									iconAnchor: [16, 16],
									popupAnchor: [0, 300],
								})}
							>
								<Popup>
									<PopupInfo
										popupData={{
											airData: marker.airData,
											address: marker.address,
										}}
									/>
								</Popup>
							</Marker>
						);
					}
					return null;
				})}

				<CustomButton position={position as LatLngExpression} />
			</MapContainer>
		</div>
	);
};

export default Map;
