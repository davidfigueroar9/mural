import React from 'react';
import { shallow } from '../../../enzyme';
import ButtonHeader from './ButtonHeader';

describe('ButtonHeader', () => {
  it('should render the correct icon', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <ButtonHeader
        icon="info"
        onClick={onClick}
      />,
    );
    expect(wrapper.contains(<i className="material-icons">info</i>)).toBeTruthy();
  });

  it('should render the correct children', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <ButtonHeader
        icon="info"
        onClick={onClick}
      >
        some cool text
      </ButtonHeader>,
    );
    expect(wrapper.contains(<p>some cool text</p>)).toBeTruthy();
  });

  it('should click on function correctly', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <ButtonHeader
        icon="info"
        onClick={onClick}
      />,
    );
    wrapper.find('div').simulate('click');
    expect(onClick).toBeCalled();
  });
});
