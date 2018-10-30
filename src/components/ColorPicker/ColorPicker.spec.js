import React from 'react';
import { shallow } from '../../../enzyme';
import ColorPicker from './ColorPicker';
import colors from './colors.json';

describe('ColorPicker', () => {
  it('should render the number of colors', () => {
    const onClick = () => {};
    const wrapper = shallow(
      <ColorPicker
        onPick={onClick}
      />,
    );
    expect(wrapper.find('.color-item').length).toBe(colors.length);
  });

  it('should call onClick with correct value', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <ColorPicker
        onPick={onClick}
      />,
    );
    wrapper.find('.color-item').first().simulate('click');
    expect(onClick).toBeCalledWith(colors[0]);
  });
});
