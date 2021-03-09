import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents } from './api';
import './nprogress.css';
import NumberOfEvents from './NumberOfEvents';
// import Login from './Login';
import EventGenre from './EventGenre';
import { Container, Card } from 'react-bootstrap';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


class App extends Component {
  state = {
    events: [],
    currentLocation: "all",
    locations: [],
    filtered: [],
    numberOfEvents: 32,
  };


  componentDidMount() {
    this.mounted = true;
    getEvents().then((response) => {
      if (this.mounted) {
        this.setState({
          events: response.events,
          locations: response.locations,
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((response) => {
      const { currentLocation, numberOfEvents } = this.state;
      const locationEvents =
        currentLocation === "all"
          ? response.events
          : response.events.filter((event) => event.location === location);

      let events = [];
      if (!locationEvents.length) {
        events = response.events.slice(0, numberOfEvents);
      } else {
        events = locationEvents.slice(0, numberOfEvents);
      }

      return this.setState({
        filtered: events,
        currentLocation: location,
      });
    });
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return { city, number };
    })
    return data;
  };

  updateNumberOfEvents = (number) => {
    this.setState({ numberOfEvents: number });
    this.updateEvents("");
  };

  render() {
    let { filtered, locations, events, numberOfEvents } = this.state
    return (
      <Container>
        <h1 className="app-name">Meet App</h1>
        {/* <Login /> */}
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents}
          length={numberOfEvents} />
        <h4>Events each day</h4>
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis allowDecimals={false} type="number" dataKey="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={filtered.length ? filtered : events} />
      </Container>
    );
  }
}

export default App;