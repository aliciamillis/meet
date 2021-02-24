import React from 'react';
import App from '../App';
import { mount, shallow } from 'enzyme';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {

  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppWrapper;
    given('list event element has been loaded', () => {
      AppWrapper = mount(<App />);

    });

    when('the user hasn’t clicked details button yet', () => {

    });

    then('the event element is collapsed by default', () => {
      expect(AppWrapper.find('.event__description')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppWrapper;
    given('app is loaded with list of events', () => {
      AppWrapper = mount(<App />);
      AppWrapper.update();
    });

    when('the user clicks on details button', () => {
      AppWrapper.update();
      AppWrapper.find('.detailsBtn').at(0).simulate('click');
    });

    then('the element should open to show details', () => {
      expect(AppWrapper.find('.event__description')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let AppWrapper;
    given('app is loaded and expanded', () => {
      AppWrapper = mount(<App />);
    });

    when('the user clicks on hide details button', () => {
      AppWrapper.update();
      AppWrapper.find('.detailsBtn').at(0).simulate('click');
    });

    then('element should collapse, hiding details', () => {
      expect(AppWrapper.find('.event__description').hostNodes()).toHaveLength(0);
    });
  });

});