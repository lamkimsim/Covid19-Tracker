import React, { Fragment, useContext } from 'react';
import CountryContext from '../../context/country/countryContext';
import globalImage from '../../images/global_lite.png';
import CountUp from 'react-countup';
import Spinner from './Spinner';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		height: 150,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginTop: 20,
		marginBottom: 15,
	},
	recover: {
		color: green,
	},
});

const Overview = () => {
	const classes = useStyles();

	// Context API
	const countryContext = useContext(CountryContext);
	const { countryCase, loading } = countryContext;

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				{countryCase && (
					<Grid container spacing={3}>
						<Grid item xs={3}>
							<Card className={classes.root} variant='outlined'>
								<CardContent>
									{countryCase.countryInfo !== undefined ? (
										<img
											src={`${countryCase.countryInfo.flag}`}
											alt='Country'
										></img>
									) : (
										<img src={globalImage} alt='Global'></img>
									)}
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card className={classes.root} variant='outlined'>
								<CardContent>
									<Typography variant='h5' color='textPrimary' gutterBottom>
										New Confirmed Cases
									</Typography>
									<Typography
										variant='h4'
										className={classes.pos}
										color='textPrimary'
									>
										<CountUp
											start={0}
											end={countryCase.todayCases}
											duration={1.5}
											separator=','
										/>
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card className={classes.root} variant='outlined'>
								<CardContent>
									<Typography variant='h5' color='primary' gutterBottom>
										New Recovered
									</Typography>
									<Typography
										variant='h4'
										className={classes.pos}
										color='primary'
									>
										<CountUp
											start={0}
											end={countryCase.todayRecovered}
											duration={1}
											separator=','
										/>
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card className={classes.root} variant='outlined'>
								<CardContent>
									<Typography variant='h5' color='error' gutterBottom>
										New Death
									</Typography>
									<Typography
										variant='h4'
										className={classes.pos}
										color='error'
									>
										<CountUp
											start={0}
											end={countryCase.todayDeaths}
											duration={0.5}
											separator=','
										/>
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				)}
			</Fragment>
		);
	}
};

export default Overview;
