import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper, event;
  beforeAll(() => {
    event = mockData[0]; // Mock event prop
    EventWrapper = shallow(<Event event={event} />);
  });

  beforeEach(() => {
    EventWrapper.setState({ show: false });
  });

  test("render text input", () => {
    expect(EventWrapper.find(".Event")).toHaveLength(1);
  });

  test('show extra info when user clicks on "Details" button', () => {
    EventWrapper.find(".detailsBtn").simulate("click");
    expect(EventWrapper.find(".EventDetail")).toHaveLength(1);
  });

  test('hide extra info when user clicks on "Details" button', () => {
    EventWrapper.setState({ show: true });
    EventWrapper.find(".detailsBtn").simulate("click");
    expect(EventWrapper.find(".EventDetail")).toHaveLength(0);
  });

  test("show extra info with teh following details", () => {
    EventWrapper.find(".detailsBtn").simulate("click");

    expect(EventWrapper.find(".event__summary")).toHaveLength(1);
    expect(EventWrapper.find(".event__location")).toHaveLength(1);
    expect(EventWrapper.find(".event__end")).toHaveLength(1);
    expect(EventWrapper.find(".event__str")).toHaveLength(1);
  });
});
