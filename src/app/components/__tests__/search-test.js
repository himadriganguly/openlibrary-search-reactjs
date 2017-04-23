jest.unmock('../SearchPage'); // Tells Jest not to mock App.
import SearchPage from '../SearchPage';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

describe('SearchPage', () => {
  it('mounts successfully', () => {
    let app = TestUtils.renderIntoDocument(<SearchPage />);
    expect(app.state.docs).toEqual([]);
    expect(app.state.searching).toEqual(false);
  })

  it('starts searching when user enters search term and clicks submit', () => {
    let app = TestUtils.renderIntoDocument(<SearchPage />);
    let inputNode = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
    inputNode.value = "Dan Brown";
    TestUtils.Simulate.change(inputNode);
    let submitButton = TestUtils.findRenderedDOMComponentWithTag(app, 'button');
    TestUtils.Simulate.click(submitButton);
    expect(app.state.searching).toEqual(true);
    expect(app.state.searchCompleted).toEqual(false);
  })

  it('starts searching when user enters search term and clicks submit',
    () => {
    let app = TestUtils.renderIntoDocument(<SearchPage />);
    let inputNode = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
    inputNode.value = "Dan Brown";
    TestUtils.Simulate.change(inputNode);
    let submitButton = TestUtils.findRenderedDOMComponentWithTag(app, 'button');
    TestUtils.Simulate.click(submitButton);
    expect(app.state.searching).toEqual(true);
    expect(app.state.searchCompleted).toEqual(false);
    let spinner = TestUtils.scryRenderedDOMComponentsWithClass(app, 'fa-spinner');
    expect(spinner).toBeTruthy();
  })
});
