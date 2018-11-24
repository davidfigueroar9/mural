import React from 'react';
import { shallow } from '../../../enzyme';
import { Note } from './Note';

describe('Note', () => {
  let onUpdateNote;
  let onSelectedNote;

  beforeEach(() => {
    onUpdateNote = jest.fn();
    onSelectedNote = jest.fn();
  });

  it('should render correct note text', () => {
    const props = {
      id: 'id1',
      text: 'some cool note',
      selected: false,
      color: '#FFFFFF',
      position: {
        x: 100,
        y: 100,
      },
    };
    const wrapper = shallow(
      <Note
        {...props}
        onUpdateNote={onUpdateNote}
        onSelectedNote={onSelectedNote}
      />,
    );
    expect(wrapper.contains(<p>some cool note</p>)).toBeTruthy();
  });

  it('should call the correct function onclick and doubleclick', () => {
    const event = {
      stopPropagation: () => {},
    };
    const props = {
      id: 'id1',
      text: 'some cool note',
      selected: false,
      color: '#FFFFFF',
      position: {
        x: 100,
        y: 100,
      },
    };
    const wrapper = shallow(
      <Note
        {...props}
        onUpdateNote={onUpdateNote}
        onSelectedNote={onSelectedNote}
      />,
    );
    wrapper.find('.content').first().simulate('click', event);
    expect(onSelectedNote).toBeCalledWith(props.id);

    // Before doubleclick
    expect(wrapper.instance().state.editMode).toBe(false);

    // After doubleclick
    wrapper.find('.content').first().simulate('doubleclick', event);
    expect(wrapper.instance().state.editMode).toBe(true);
  });


  it('should call the correct function extractPositionDelta', () => {
    const event = {
      pageX: 10,
      pageY: 10,
    };
    const props = {
      id: 'id1',
      text: 'some cool note',
      selected: false,
      color: '#FFFFFF',
      position: {
        x: 100,
        y: 100,
      },
    };
    const wrapper = shallow(
      <Note
        {...props}
        onUpdateNote={onUpdateNote}
        onSelectedNote={onSelectedNote}
      />,
    );

    const instance = wrapper.instance();
    expect(instance.previousLeft).toBe(0);
    expect(instance.previousTop).toBe(0);
    instance.extractPositionDelta(event);
    expect(instance.previousLeft).toBe(event.pageX);
    expect(instance.previousTop).toBe(event.pageY);
  });

  it('should call the correct function Moving', () => {
    const event = {
      pageX: 10,
      pageY: 10,
    };
    const props = {
      id: 'id1',
      text: 'some cool note',
      selected: false,
      color: '#FFFFFF',
      position: {
        x: 100,
        y: 100,
      },
    };
    const wrapper = shallow(
      <Note
        {...props}
        onUpdateNote={onUpdateNote}
        onSelectedNote={onSelectedNote}
      />,
    );

    const instance = wrapper.instance();
    instance.state.isDragging = true;
    expect(instance.previousLeft).toBe(0);
    expect(instance.previousTop).toBe(0);
    instance.onMove(event);
    expect(onUpdateNote).toBeCalled();
    expect(instance.previousLeft).toBe(event.pageX);
    expect(instance.previousTop).toBe(event.pageY);
  });
});
