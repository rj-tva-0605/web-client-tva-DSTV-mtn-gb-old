 
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
import Dashboard from './pages/DashboardOld';
import { useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import { refreshAccessToken } from 'store/reducers/authReducer';
import { useDispatch } from 'react-redux';
const cookies = new Cookies();


function App() {

	const dispatch = useDispatch();
	const timerIdRef = useRef(0)

	useEffect(()=>{
		
		if (timerIdRef.current){

		const interval = setInterval(() => {

				const refresh_token = cookies.get("refresh_token")
				if (refresh_token){
					dispatch(refreshAccessToken(refresh_token))
				}
			
				console.log(refresh_token)
			}, 1800000);
			return () => clearInterval(interval);
		}

	},[])

  return (

		<div className="App">

			<Router>
				<Switch>
          			<Route path="/about">          			
          			</Route>

          			<Route path="/users">            			
          			</Route>

					<Route path="/dashboard">
						<Dashboard />
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
