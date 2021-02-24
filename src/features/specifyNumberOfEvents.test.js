import React from 'react';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {

  test('When user has not specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppWrapper;
    given('user hasn’t specified a number', () => {
      AppWrapper = mount(<App />);

    });


    when('app is loaded', () => {

    });

    then('the user should see 32 events shown by default', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state('length')).toEqual(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('user hasn’t specified a number', () => {
      AppWrapper = mount(<App />);
    });

    when('the user can change number of events', () => {
      AppWrapper.update();
      const eventNumber = { target: { value: 2 } };
      AppWrapper.find('.eventCount').simulate('change', eventNumber);
    });

    then('the user should see event element with given number of events user choose', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event').hostNodes()).toHaveLength(2);
    });
  });

});