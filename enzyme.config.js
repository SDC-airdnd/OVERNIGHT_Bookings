import React from 'react';
import {
  shallow, render, mount, configure,
} from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
