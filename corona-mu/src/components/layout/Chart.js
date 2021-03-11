import React, { useContext } from 'react';
import CountryContext from '../../context/country/countryContext';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

// ReChart
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from 'recharts';
import Spinner from './Spinner';

const Chart = () => {
	const countryContext = useContext(CountryContext);
	const { historicalDataByCountry, historicalGlobal, loading } = countryContext;

	if (loading) {
		return <Spinner />;
	} else {
		if (historicalGlobal) {
			// Set Global Chart
			let cases = Object.entries(historicalGlobal.cases).map((e) => ({
				date: e[0],
				value: e[1],
			}));

			let recovered = Object.entries(historicalGlobal.recovered).map((e) => ({
				date: e[0],
				value: e[1],
			}));

			let deaths = Object.entries(historicalGlobal.deaths).map((e) => ({
				date: e[0],
				value: e[1],
			}));

			return (
				<Grid container spacing={4} alignItems='center' direction='column'>
					<Grid item xs={12} md={4}>
						<Typography variant='h4'>Total Cases</Typography>
						<LineChart
							width={400}
							height={300}
							data={cases}
							margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
						>
							<Line type='monotone' dataKey='value' stroke='#8884d8' />
							<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
							<XAxis dataKey='date' />
							<YAxis type='number' domain={['auto', 'auto']} />
							<Tooltip />
						</LineChart>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant='h4'>Total Recoverd</Typography>
						<LineChart
							width={400}
							height={300}
							data={recovered}
							margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
						>
							<Line type='monotone' dataKey='value' stroke='#00FF00' />
							<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
							<XAxis dataKey='date' />
							<YAxis type='number' domain={['auto', 'auto']} />
							<Tooltip />
						</LineChart>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant='h4'>Total Deaths</Typography>
						<LineChart
							width={400}
							height={300}
							data={deaths}
							margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
						>
							<Line type='monotone' dataKey='value' stroke='#FF0000' />
							<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
							<XAxis dataKey='date' />
							<YAxis type='number' domain={['auto', 'auto']} />
							<Tooltip />
						</LineChart>
					</Grid>
				</Grid>
			);
		} else if (historicalDataByCountry) {
			let countryCases = Object.entries(
				historicalDataByCountry.timeline.cases
			).map((e) => ({
				date: e[0],
				value: e[1],
			}));

			let countryRecovered = Object.entries(
				historicalDataByCountry.timeline.recovered
			).map((e) => ({
				date: e[0],
				value: e[1],
			}));

			let countryDeaths = Object.entries(
				historicalDataByCountry.timeline.deaths
			).map((e) => ({
				date: e[0],
				value: e[1],
			}));

			return (
				<Grid container spacing={5}>
					<Grid item xs>
						<Typography variant='h4'>Total Cases</Typography>
						<LineChart
							width={400}
							height={300}
							data={countryCases}
							margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
						>
							<Line type='monotone' dataKey='value' stroke='#8884d8' />
							<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
							<XAxis dataKey='date' />
							<YAxis type='number' domain={['auto', 'auto']} />
							<Tooltip />
						</LineChart>
					</Grid>
					<Grid item xs>
						<Typography variant='h4'>Total Recoverd</Typography>
						<LineChart
							width={400}
							height={300}
							data={countryRecovered}
							margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
						>
							<Line type='monotone' dataKey='value' stroke='#00FF00' />
							<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
							<XAxis dataKey='date' />
							<YAxis type='number' domain={['auto', 'auto']} />
							<Tooltip />
						</LineChart>
					</Grid>
					<Grid item xs>
						<Typography variant='h4'>Total Deaths</Typography>
						<LineChart
							width={400}
							height={300}
							data={countryDeaths}
							margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
						>
							<Line type='monotone' dataKey='value' stroke='#FF0000' />
							<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
							<XAxis dataKey='date' />
							<YAxis type='number' domain={['auto', 'auto']} />
							<Tooltip />
						</LineChart>
					</Grid>
				</Grid>
			);
		} else {
			return null;
		}
	}
};

export default Chart;
