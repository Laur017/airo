import { useEffect, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Spinner from '../Spinner/Spinner';
import * as L from 'leaflet';
import PopupInfo from '../PopupInfo/PopupInfo';
import axios from 'axios';

const CustomButton = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    const mapZoomControl = document.querySelector(
      ".leaflet-control-zoom.leaflet-bar"
    );
    if (!mapZoomControl) return;

    const existingButton = document.querySelector(".leaflet-custom-button");
    if (existingButton) {
      existingButton.remove();
    }

    const button = document.createElement("button");
    button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 13H3.05493C3.51608 17.1716 6.82838 20.4839 11 20.9451V23H13V20.9451C17.1716 20.4839 20.4839 17.1716 20.9451 13H23V11H20.9451C20.4839 6.82838 17.1716 3.51608 13 3.05493V1H11V3.05493C6.82838 3.51608 3.51608 6.82838 3.05493 11H1V13ZM5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12ZM12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z" fill="#ffffff"/>
        </svg>
    `;
    button.className = "leaflet-custom-button";
    button.onclick = () => {
      map.setView(position, 25);
    };

    mapZoomControl?.appendChild(button);
  }, [map, position]);

  return null;
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

const Map = () => {
	const [position, setPosition] = useState<[number, number] | null>(null);
	const [markers, setMarkers] = useState<[number, number][]>([]);
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setPosition([latitude, longitude]);
				},
				(error) => {
					console.error('Error getting geolocation: ', error);
					setPosition([40.7128, -74.006]); // Fallback to New York City
				}
			);
		} else {
			alert('Geolocation is not supported by this browser.');
		}
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const latitude = position ? position[0] : null;
			const longitude = position ? position[1] : null;

			if (latitude && longitude) {
				const url = `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${'cab1e7b2713e097b0447eddb77043d80e2515c98'}`;

				try {
					const response = await axios.get(url);
					if (response.data.status === 'ok') {
						setData(response.data.data);
					} else {
						setError('Failed to fetch data');
					}
				} catch (err) {
					console.error(err);
					setError('Error fetching data');
				} finally {
					setLoading(false);
				}
			}
		};

		fetchData();
	}, [position]);

	const getAddress = async (lat: number, lng: number) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
			);
			if (response.data && response.data.address) {
				return response.data.address;
			} else {
				throw new Error('Address not found');
			}
		} catch (error) {
			console.error('Error getting address:', error);
			return 'Unknown Address';
		}
	};

	if (!position) {
		return <Spinner />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const customDivIcon = L.divIcon({
		className: 'custom-marker',
		html: `
      <svg width="36" height="52" viewBox="0 0 36 52" xmlns="http://www.w3.org/2000/svg">
        <path fill="url(#marker-gradient)" fill-rule="evenodd" clip-rule="evenodd" 
          d="M18 52C18 52 36 34.8302 36 18.1509C36 8.12645 27.9411 0 18 0C8.05887 0 0 8.12645 0 18.1509C0 34.8302 18 52 18 52ZM18 30C24.6274 30 30 24.6274 30 18C30 11.3726 24.6274 6 18 6C11.3726 6 6 11.3726 6 18C6 24.6274 11.3726 30 18 30Z" />
        <circle cx="18" cy="18" r="12" fill="#FFFFFF" />
        <text x="18" y="18" fill="#000000" font-size="10" font-weight="600" 
          text-anchor="middle" dominant-baseline="middle">7</text>
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

	const handleMapClick = async (latlng: [number, number]) => {
		if (latlng && latlng[0] !== undefined && latlng[1] !== undefined) {
			const address = await getAddress(latlng[0], latlng[1]);
			setMarkers((prev) => [...prev, latlng]);
			return address;
		} else {
			console.error('Invalid coordinates:', latlng);
		}
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
					icon={customDivIcon}
				>
					<Popup>
						<PopupInfo
							position={position}
							getAddress={handleMapClick}
							data={data}
						/>
					</Popup>
				</Marker>

				{markers.map((marker, index) => (
					<Marker
						key={index}
						position={marker}
						icon={customDivIcon}
					>
						<Popup>
							<PopupInfo
								position={marker}
								getAddress={handleMapClick}
								data={data}
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
