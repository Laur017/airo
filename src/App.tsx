import './App.css';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
// import Settings from './components/Settings/Settings';

function App() {
	return (
		<div className='app'>
			<Header />
			<div className='main'>
				{/* <Settings /> */}
				<Map />
			</div>
		</div>
	);
}
export default App;
