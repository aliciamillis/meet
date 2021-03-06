import React from "react";
import { shallow } from "enzyme";

import NumberOfEvents from "../NumberOfEvents";

describe('<Event /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents length="2" />);
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('NumberOfEvents'));
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.eventCount').prop('value')).toBe('2');
  });

  test('render text input and input change onChange', () => {
    NumberOfEventsWrapper.find('.eventCount').simulate('change', {
      target: { value: '32' },
    });
    expect(NumberOfEventsWrapper.find('.eventCount').prop('value')).toBe('32');
  });
});