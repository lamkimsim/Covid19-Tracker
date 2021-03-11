import React, { Fragment, useContext, useEffect } from 'react';
import CountryContext from '../../context/country/countryContext';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const Search = (props) => {
	// Material UI
	const classes = useStyles();

	// Context API
	const countryContext = useContext(CountryContext);
	const {
		getSpecificCountry,
		getCountryList,
		getHistoricDataByCountry,
		countryList,
	} = countryContext;

	// Use Effect
	useEffect(() => {
		getSpecificCountry('Global');
		getCountryList();
		getHistoricDataByCountry('Global');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (e) => {
		getSpecificCountry(e.target.value);
		getHistoricDataByCountry(e.target.value);
	};

	return (
		<Fragment>
			<FormControl variant='outlined' className={classes.formControl}>
				<InputLabel htmlFor='outlined-country-native-simple'>
					Country
				</InputLabel>
				<Select native label='country' onChange={handleChange}>
					<option aria-label='None' value='' />
					<option aria-label='None' value={'Global'}>
						Global
					</option>
					{countryList.map((country) => (
						<option value={`${country}`} key={country}>
							{country}
						</option>
					))}
				</Select>
			</FormControl>
		</Fragment>
	);
};

export default Search;
