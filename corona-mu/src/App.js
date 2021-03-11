import './App.css';
import CountryState from './context/country/CountryState';
import Search from './components/cases/Search';
import coronaImage from './images/image.png';
import Overview from './components/layout/Overview';
import Chart from './components/layout/Chart';

const App = () => {
	return (
		<CountryState>
			<div className='App'>
				<img src={coronaImage} alt='123' />
				<div>
					<Search />
					<Overview />
					<Chart />
				</div>
			</div>
		</CountryState>
	);
};

export default App;
