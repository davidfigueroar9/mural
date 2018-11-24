import React from 'react';
import { shallow } from '../../../enzyme';
import Instructions from './Instructions';

describe('Instructions', () => {
  it('should render the correct Instructions', () => {
    const wrapper = shallow(
      <Instructions />,
    );
    expect(wrapper.find('.Instructions').length).toEqual(1);
  });
});
