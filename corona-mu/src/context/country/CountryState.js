import React, { useReducer } from 'react';
import axios from 'axios';
import CountryContext from './countryContext';
import CountryReducer from './countryReducer';
import {
	GET_SPECIFIC_COUNTRY,
	GET_HISTORICAL_GLOBAL,
	GET_HISTORICAL_DATA_BY_COUNTRY,
	GET_COUNTRY_LIST,
	SET_LOADING,
} from '../types';

const CountryState = (props) => {
	const initialState = {
		countryList: [],
		lastday: 60,
		countryCase: '',
		historicalGlobal: null,
		historicalDataByCountry: null,
		loading: false,
	};

	const [state, dispatch] = useReducer(CountryReducer, initialState);

	// Get covid case from specific country
	const getSpecificCountry = async (country) => {
		let url = `https://corona.lmao.ninja/v2/countries/${country}?yesterday&strict`;

		setLoading();
		if (country === 'Global') {
			url = 'https://corona.lmao.ninja/v2/all?yesterday';
		}
		const res = await axios.get(url);

		dispatch({
			type: GET_SPECIFIC_COUNTRY,
			payload: res.data,
		});
	};

	// Get historical case from specific country
	const getHistoricDataByCountry = async (country) => {
		let url = `https://corona.lmao.ninja/v2/historical/${country}?lastdays=${state.lastday}`;

		setLoading();
		if (country === 'Global') {
			url = `https://corona.lmao.ninja/v2/historical/all?lastdays=${state.lastday}`;

			const res = await axios.get(url);

			dispatch({
				type: GET_HISTORICAL_GLOBAL,
				payload: res.data,
			});
		} else {
			const res = await axios.get(url);

			dispatch({
				type: GET_HISTORICAL_DATA_BY_COUNTRY,
				payload: res.data,
			});
		}
	};

	// Get country lists
	const getCountryList = async () => {
		const res = await axios.get(
			'https://corona.lmao.ninja/v2/countries?yesterday&sort'
		);

		const countryList = res.data.map((a) => a.country);

		dispatch({
			type: GET_COUNTRY_LIST,
			payload: countryList,
		});
	};

	// Set loading
	const setLoading = () => {
		dispatch({ type: SET_LOADING });
	};

	return (
		<CountryContext.Provider
			value={{
				countryList: state.countryList,
				lastday: state.lastday,
				countryCase: state.countryCase,
				historicalDataByCountry: state.historicalDataByCountry,
				historicalGlobal: state.historicalGlobal,
				loading: state.loading,
				getSpecificCountry,
				getHistoricDataByCountry,
				getCountryList,
				setLoading,
			}}
		>
			{props.children}
		</CountryContext.Provider>
	);
};

export default CountryState;
