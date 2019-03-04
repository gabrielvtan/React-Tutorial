import React from 'react';

import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

// This will be our specific test file for NavigationItems
// it needs to have the syntax NavigationsItems.test.js
// This is automatically avaibale in test command - it takes 2 arguments
// first is description of the test, 2nd argument is the actual test
describe('<NavigationItems />', ()=> {
    // Here we will add a helper function which runs before each test
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<NavigationItems/>)
    }) ;

    // it() allows you to write an individual test and it also takes 2 arguments 
    // 1st is description, 2nd is the testing function 
    it('should render two <NavigationItems /> elements if not authenticated', () => {
        // Here we will use shallow in order to test 
        // now we write our expectation of the wrapper which is to find a specific element within NavigationItems
        // Here we will check if NavigationItem has 2 routes 
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    // Now we will run a test which allows us to check if 3 routes are available if the user is authenticated
    // we will need to import isAuthenticated
    it('should render three <NavigationItems /> elements if authenticated', () => {
        // wrapper =shallow(<NavigationItems isAuthenticated/>);
        // Here is special syntax for the wrapper 
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render Logout element if authenticated', () => {
        // Here we will test to see if logout renders if authenticated
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});

