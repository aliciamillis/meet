import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import Event from '../Event';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';


describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("should render NumberOfEvents component", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});


describe("<App /> integration", () => {
  let AppWrapper;
  afterAll(() => {
    AppWrapper.unmount();
  });
  test("get list of events after the user selects a city", async () => {
    AppWrapper = mount(<App />);
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    CitySearchWrapper.instance().handleItemClicked("Berlin, Germany");

    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);

    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(
      "Berlin, Germany"
    );
  });

  test("change state after getting list of events", async () => {
    const AppWrapper = shallow(<App />);
    AppWrapper.instance().updateEvents("");
    await AppWrapper.update();

    expect(await AppWrapper.state("events")).toStrictEqual(mockData);
  });

  test("render correct list of events", () => {
    AppWrapper = mount(<App />);
    AppWrapper.setState({
      events: mockData,
    });
    // console.log(AppWrapper.state().events.length);
    // console.log(AppWrapper.find(".Event").length);
    // expect(AppWrapper.find(".Event")).toHaveLength(mockData.length);

    expect(AppWrapper.find(".Event")).toHaveLength(mockData.length);
  });
});
