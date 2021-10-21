 
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import Homepage from './pages/Homepage';
import DstvDashboard from 'pages/DstvDashboard';
import DstvDashboardLive from 'pages/DstvDashboardLive';



import DashboardOld from './pages/DashboardOld';
import DashLiveTV from 'pages/DashboardOld/DashLiveTV';

import DashboardNew from './pages/DashboardNew';

import DashboardChannels from './pages/DashboardChannels';
import ChannelPlayerPage from 'pages/DashboardChannels/ChannelPlayerPage';


import DashboardMoviesDetail from 'pages/DashboardMovies/MovieDetail';

import MoviesTrailerShaka from 'pages/DashboardMovies/Movies/MoviesTrailerShaka';

import DashboardMovies from 'pages/DashboardMovies';
import DashboardMoviesStream from 'pages/DashboardMovies/Movies';

import EpisodePlay from 'pages/DashboardTvShows/EpisodePlay';

import DashboardTvShows from 'pages/DashboardTvShows';
import SeriesDetail from 'pages/DashboardTvShows/SeriesDetail';



import DashMoviesShows from 'pages/DashboardOld/DashMoviesShows';

import PackagesPage from 'pages/PackagesPage';

import React, { useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import { refreshAccessToken } from 'store/reducers/authReducer';
import { useDispatch } from 'react-redux';
const cookies = new Cookies();


function App() {

	const dispatch = useDispatch();


	useEffect(()=>{
		
		

		const interval = setInterval(() => {

				const refresh_token = cookies.get("refresh_token")
				if (refresh_token){
					dispatch(refreshAccessToken(refresh_token))
				}
			
				console.log(refresh_token)
			}, 1800000);
		
		

	},[])

  return (

		<div className="App">

			<Router>
				<Switch>
          			<Route path="/about">          			
          			</Route>

          			<Route path="/users">
					  </Route>
					<Route path="/moviestrailer">
						<MoviesTrailerShaka />            			
          			</Route>
					<Route path="/dashboardold">
						<DashboardOld />
					</Route>
					<Route path="/dashLivetv">
						<DashLiveTV />
					</Route>
					<Route path="/dashLiveshows">
						<DashMoviesShows />
					</Route>
					<Route path="/dstvdashboard">
						<DstvDashboard />
					</Route>
					<Route path="/dstvdashboardlive">
						<DstvDashboardLive />
					</Route>
					<Route path="/series">
						<SeriesDetail />
					</Route>
					<Route path="/episodestream">
						<EpisodePlay />
					</Route>
					<Route path="/tvshowspage">
						<DashboardTvShows />
					</Route>
					<Route path="/moviespage">
						<DashboardMovies />
					</Route>
					<Route path="/moviesdetailpage">
						<DashboardMoviesDetail />
					</Route>
					<Route path="/moviestreampage">
						<DashboardMoviesStream />
					</Route>	
					<Route path="/channelspage">
						<DashboardChannels />
					</Route>
					<Route path="/channelsplayer">
						<ChannelPlayerPage />
					</Route>
					<Route path="/newdashboard">
						<DashboardNew />
					</Route>
					<Route path="/packagespage" >
            			<PackagesPage />
          			</Route>
          			<Route path="/" >
            			<Homepage />
          			</Route>
        		</Switch>
      
    		</Router>

		</div>
				);
				}

	export default App;
