import React from 'react';
import { shallow } from '../../../enzyme';
import { Board } from './Board';

jest.mock('../Note', () => 'Note');
jest.mock('../Header', () => 'Header');

describe('Board', () => {
  let onAddNote;
  let unSelectAll;
  let onSelectedNote;
  let onCopy;
  let onPaste;
  const notesIds = [
    'id1', 'id2', 'id3',
  ];

  beforeEach(() => {
    onAddNote = jest.fn();
    unSelectAll = jest.fn();
    onSelectedNote = jest.fn();
    onCopy = jest.fn();
    onPaste = jest.fn();
  });

  it('should render correctly the header and 3 notes', () => {
    const wrapper = shallow(
      <Board
        notes={notesIds}
        onAddNote={onAddNote}
        unSelectAll={unSelectAll}
        onSelectedNote={onSelectedNote}
        onCopy={onCopy}
        onPaste={onPaste}
      />,
    );
    expect(wrapper.find('Header').length).toEqual(1);
    expect(wrapper.find('Note').length).toEqual(3);
  });

  it('should call the corrects function on clicks', () => {
    const wrapper = shallow(
      <Board
        notes={notesIds}
        onAddNote={onAddNote}
        unSelectAll={unSelectAll}
        onSelectedNote={onSelectedNote}
        onCopy={onCopy}
        onPaste={onPaste}
      />,
    );
    wrapper.find('div').simulate('click');
    expect(unSelectAll).toBeCalled();

    wrapper.find('div').simulate('doubleclick');
    expect(onAddNote).toBeCalled();
  });

  it('should change the multiple value when the shiftKey is true', () => {
    const event = {
      shiftKey: true,
    };
    const wrapper = shallow(
      <Board
        notes={notesIds}
        onAddNote={onAddNote}
        unSelectAll={unSelectAll}
        onSelectedNote={onSelectedNote}
        onCopy={onCopy}
        onPaste={onPaste}
      />,
    );
    // should start been false
    expect(wrapper.instance().multiple).toBe(false);

    // trigger keyboard event
    wrapper.find('div').simulate('keydown', event);
    expect(wrapper.instance().multiple).toBe(true);

    // trigger keyboard event to make false the multiple variable
    wrapper.find('div').simulate('keyup', event);
    expect(wrapper.instance().multiple).toBe(false);
  });

  it('should call onCopy with the ctrlKey or metaKey + C', () => {
    const eventCtrl = {
      ctrlKey: true,
      keyCode: 67,
    };
    const eventMetaKey = {
      metaKey: true,
      keyCode: 67,
    };
    const wrapper = shallow(
      <Board
        notes={notesIds}
        onAddNote={onAddNote}
        unSelectAll={unSelectAll}
        onSelectedNote={onSelectedNote}
        onCopy={onCopy}
        onPaste={onPaste}
      />,
    );

    // trigger keyboard event
    wrapper.find('div').simulate('keydown', eventCtrl);
    expect(onCopy).toBeCalled();

    // trigger keyboard event
    wrapper.find('div').simulate('keydown', eventMetaKey);
    expect(onCopy).toBeCalled();
  });

  it('should call onPaste with the ctrlKey or metaKey + C', () => {
    const eventCtrl = {
      ctrlKey: true,
      keyCode: 86,
    };
    const eventMetaKey = {
      metaKey: true,
      keyCode: 86,
    };
    const wrapper = shallow(
      <Board
        notes={notesIds}
        onAddNote={onAddNote}
        unSelectAll={unSelectAll}
        onSelectedNote={onSelectedNote}
        onCopy={onCopy}
        onPaste={onPaste}
      />,
    );

    // trigger keyboard event
    wrapper.find('div').simulate('keydown', eventCtrl);
    expect(onPaste).toBeCalled();

    // trigger keyboard event
    wrapper.find('div').simulate('keydown', eventMetaKey);
    expect(onPaste).toBeCalled();
  });

  it('should set the correct mouse position', () => {
    const event = {
      pageX: 100,
      pageY: 100,
    };

    const wrapper = shallow(
      <Board
        notes={notesIds}
        onAddNote={onAddNote}
        unSelectAll={unSelectAll}
        onSelectedNote={onSelectedNote}
        onCopy={onCopy}
        onPaste={onPaste}
      />,
    );

    // trigger keyboard event
    wrapper.find('div').simulate('mousemove', event);
    expect(wrapper.instance().mousePosition).toEqual({ x: event.pageX, y: event.pageY });
  });
});
