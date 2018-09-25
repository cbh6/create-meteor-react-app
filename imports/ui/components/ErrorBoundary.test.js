import React from 'react';
import { configure, shallow } from 'enzyme';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import ErrorBoundary from './ErrorBoundary';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('ErrorBoundary', () => {
    it('should render', () => {
      const item = shallow(<ErrorBoundary />);
      chai.assert(!item.hasClass('error'));
      chai.expect(item.containsMatchingElement(<div />)).to.equal(false);
    });
  });
}
