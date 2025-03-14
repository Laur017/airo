import { LatLngExpression, LatLng } from 'leaflet';
import { useEffect, useState } from 'react';

interface PopupInfoProps {
	position: LatLngExpression | undefined;
	getAddress: any;
	data: any;
}

export default function PopupInfo({
	position,
	getAddress,
	data,
}: PopupInfoProps) {
	if (!position) {
		return <p>Location not available</p>;
	}

	let lat: number;
	let lng: number;

	if (Array.isArray(position)) {
		[lat, lng] = position;
	} else if (position instanceof LatLng) {
		lat = position.lat;
		lng = position.lng;
	} else {
		return <p>Invalid position</p>;
	}

	const [address, setAddress] = useState<any>(null);

	useEffect(() => {
		const fetchAddress = async () => {
			try {
				const resolvedAddress = await getAddress(position);
				setAddress(resolvedAddress);
			} catch (error) {
				console.error('Error fetching address:', error);
			}
		};

		fetchAddress();
	}, []);

	return (
		<div className='info'>
			<div className='info__top'>
				<div className='info__top__left'>
					<span className='info__top__left__val'>{data.iaqi.pm10.v}</span>
					<span className='info__top__left__pm'>PM2.5</span>
				</div>
				<div className='info__top__right'>
					<span className='info__top__right__title'>Air Conditioner</span>
					<div className='info__top__right__address'>
						<svg
							width='12'
							height='12'
							viewBox='0 0 36 52'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fill='#ffffff'
								fillRule='evenodd'
								clipRule='evenodd'
								d='M18 52C18 52 36 34.8302 36 18.1509C36 8.12645 27.9411 0 18 0C8.05887 0 0 8.12645 0 18.1509C0 34.8302 18 52 18 52ZM18 30C24.6274 30 30 24.6274 30 18C30 11.3726 24.6274 6 18 6C11.3726 6 6 11.3726 6 18C6 24.6274 11.3726 30 18 30Z'
							/>
						</svg>
						<div className='info__top__right__address__name'>
							{address?.road} {address?.house_number}
						</div>
					</div>
				</div>
			</div>
			<div className='info__bottom'>
				<div className='info__bottom__box'>
					<span className='info__bottom__box__name'>CO2</span>
					<span className='info__bottom__box__value'>{data.iaqi.p.v}</span>
				</div>
				<div className='info__bottom__box'>
					<span className='info__bottom__box__name'>Temp</span>
					<span className='info__bottom__box__value'>
						{data.iaqi.t.v}&deg;C
					</span>
				</div>
				<div className='info__bottom__box'>
					<span className='info__bottom__box__name'>Metrics</span>
					<span className='info__bottom__box__value'>{data.idx}</span>
				</div>
			</div>
		</div>
	);
}
