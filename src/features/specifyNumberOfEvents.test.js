import React from 'react';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test('When user has not specified a number, 32 is the default number', ({ given, when, then }) => {
    given('user hasn’t specified a number', () => {

    });

    let AppWrapper;
    when('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see 32 events shown by default', () => {
      AppWrapper.update();
      expect((AppWrapper.find('.event')).length).toBeLessThanOrEqual(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('user hasn’t specified a number', () => {
      AppWrapper = mount(<App />);
    });

    when('the user can change number of events', () => {
      const numberOfEvents = { target: { value: 10 } };
      AppWrapper.find('.number-of-events').simulate('change', numberOfEvents);
    });

    then('the user should see event element with given number of events user choose', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.setState({ numberOfEvents: 10 });
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
    });
  });

});