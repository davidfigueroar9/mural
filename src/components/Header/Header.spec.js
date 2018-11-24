import React from 'react';
import { shallow } from '../../../enzyme';
import { Header } from './Header';

describe('Header', () => {
  let onChangeColor;
  let onDelete;
  let onOrder;

  beforeEach(() => {
    onChangeColor = jest.fn();
    onDelete = jest.fn();
    onOrder = jest.fn();
  });

  it('should render the header correctly', () => {
    const wrapper = shallow(
      <Header
        onChangeColor={onChangeColor}
        selected={4}
        onDelete={onDelete}
        onOrder={onOrder}
      />,
    );
    expect(wrapper.find('.Header').length).toEqual(1);
    expect(wrapper.find('img').length).toEqual(1);
  });

  it('should call the handle correctly', () => {
    const eventClick = {
      stopPropagation: jest.fn(),
    };
    const eventDoubleClick = {
      stopPropagation: jest.fn(),
    };
    const wrapper = shallow(
      <Header
        onChangeColor={onChangeColor}
        selected={4}
        onDelete={onDelete}
        onOrder={onOrder}
      />,
    );
    const instance = wrapper.instance();
    wrapper.find('.Header').first().simulate('click', eventClick);
    wrapper.find('.Header').first().simulate('doubleclick', eventDoubleClick);

    expect(instance.state.openInstructions).toBe(false);
    instance.onToggleInstructions();
    expect(instance.state.openInstructions).toBe(true);

    expect(instance.state.openColorPicker).toBe(false);
    instance.onToggleColorPicker();
    expect(instance.state.openColorPicker).toBe(true);

    expect(eventClick.stopPropagation).toBeCalled();
    expect(eventDoubleClick.stopPropagation).toBeCalled();
  });
});
