import logo from '../../assets/logo.png';

export default function Header() {
	return (
		<div className='header'>
			<img
				src={logo}
				alt='AIRO Logo'
				className='header__logo'
			/>
			<div className='header__search'>
				<div className='switch'>
					<input
						type='checkbox'
						id='toggle'
						className='switch-input'
					/>
					<label
						htmlFor='toggle'
						className='slider'
					></label>
				</div>
			</div>
		</div>
	);
}
