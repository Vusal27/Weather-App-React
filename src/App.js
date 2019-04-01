import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Result from "./components/result";
import "./App.css";

const API_KEY = "02b088cdfc3e02960f9df92df055cd92";

class App extends React.Component {

	state = {
		temp: undefined,
		city: undefined,
		country: undefined,
		sunrise: undefined,
		sunset: undefined,
		arror: undefined
	}

  	gettingWeather = async (e) => {
		e.preventDefault();
		let city = e.target.elements.city.value;
		e.target.elements.city.value = '';

		if (city) {
			const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);		
			const data = await api_url.json();
			if (data.cod === 200) {
				let sunrise = data.sys.sunrise*1000;
				let sunriseDate = new Date();
				sunriseDate.setTime(sunrise);
				let convertSunriseDate = `${sunriseDate.getHours()}:${sunriseDate.getMinutes()}:${sunriseDate.getSeconds()}`;
	
				let sunset = data.sys.sunset*1000;
				let sunsetDate = new Date();
				sunsetDate.setTime(sunset);
				
				let convertSunsetDate = `${sunsetDate.getHours()}:${sunsetDate.getMinutes()}:${sunsetDate.getSeconds()}`;
	
				this.setState({
					temp: data.main.temp,
					city: data.name,
					country: data.sys.country,
					sunrise: convertSunriseDate,
					sunset: convertSunsetDate,
					error: undefined
				});
			} else {
				this.setState({
					temp: undefined,
					city: undefined,
					country: undefined,
					sunrise: undefined,
					sunset: undefined,
					error: "Город не найден!"
				});
			}
		} else {
			this.setState({
				temp: undefined,
				city: undefined,
				country: undefined,
				sunrise: undefined,
				sunset: undefined,
				error: "Название города не введено!"
			});
		}		
 	}

  	render() {
    	return (
			<div className="wrapper">
				<Info />
				<div>
					<Form weatherMethod={this.gettingWeather} />
					<Result
					temp={this.state.temp}
					city={this.state.city}
					country={this.state.country}
					sunrise={this.state.sunrise}
					sunset={this.state.sunset}
					error={this.state.error}
					/>
				</div>
			</div>
    	);
  	}
}

export default App;