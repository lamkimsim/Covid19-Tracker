import {
	GET_SPECIFIC_COUNTRY,
	GET_HISTORICAL_DATA_BY_COUNTRY,
	GET_HISTORICAL_GLOBAL,
	GET_COUNTRY_LIST,
	SET_LOADING,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};

		case GET_SPECIFIC_COUNTRY:
			return {
				...state,
				countryCase: action.payload,
				loading: false,
			};

		case GET_HISTORICAL_DATA_BY_COUNTRY:
			return {
				...state,
				historicalDataByCountry: action.payload,
				historicalGlobal: null,
				loading: false,
			};

		case GET_HISTORICAL_GLOBAL:
			return {
				...state,
				historicalDataByCountry: null,
				historicalGlobal: action.payload,
				loading: false,
			};

		case GET_COUNTRY_LIST:
			return {
				...state,
				countryList: action.payload,
				loading: false,
			};

		default:
			return state;
	}
};
