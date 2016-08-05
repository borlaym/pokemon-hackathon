import SampleReducer from '../client/js/reducers/Sample';
import { TITLE_CHANGED } from '../client/js/constants/ActionTypes';

describe('Sample reducer', function() {


  it('should change the title on TITLE_CHANGED', function() {
    var action = {
      type: TITLE_CHANGED,
      text: 'Test string'
    };
    var result = SampleReducer({ title: 'Starting title' }, action);
    expect(result.title).to.equal(action.text);
  });


  it('shoudn\'t change the title when another type of action runs', function() {
    var action = {
      type: 'FAKE_TITLE_CHANGED_TYPE',
      text: 'Another title'
    };
    var startingTitle = 'Starting title';
    var result = SampleReducer({ title: startingTitle}, action);
    expect(result.title).to.equal(startingTitle);
  });
  

});