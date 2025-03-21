import React from 'react';
import Spinner from '../Spinner/Spinner';

interface ProgressBarProps {
	value: number;
	maxRange: number;
	title: string;
	height: number;
	width: number;
	colorStart: string;
	colorEnd: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	value,
	maxRange,
	title,
	height,
	width,
	colorStart,
	colorEnd,
}) => {
	if (!value) return <Spinner />;

	let setValue = value;

	if (value > 10) {
		setValue = 10;
	}

	const radius = 35;
	const strokeWidth = 7;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset =
		circumference - (setValue / maxRange) * circumference;

	return (
		<div className='svg-main'>
			<div className='svg-main__first'>
				<svg
					width={height}
					height={width}
					viewBox='0 0 82 82'
					xmlns='http://www.w3.org/2000/svg'
					className='progress-bar'
				>
					<defs>
						<linearGradient
							id='progress-gradient'
							x1='0%'
							y1='0%'
							x2='100%'
							y2='100%'
						>
							<stop
								offset='0%'
								stopColor={colorStart}
							/>
							<stop
								offset='100%'
								stopColor={colorEnd}
							/>
						</linearGradient>
					</defs>

					<circle
						cx='41'
						cy='41'
						r={radius}
						stroke='#313131'
						strokeWidth='3'
						fill='none'
					/>

					<circle
						cx='41'
						cy='41'
						r={radius}
						stroke='url(#progress-gradient)'
						strokeWidth={strokeWidth}
						fill='none'
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap='round'
						className='progress-bar-circle'
					/>
				</svg>
			</div>
			<div className='svg-main__second'>
				<span className='svg-main__second__value'>{value}</span>
				<span className='svg-main__second__title'> {title}</span>
			</div>
		</div>
	);
};

export default ProgressBar;
