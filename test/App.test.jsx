/* eslint-disable import/extensions */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import Info from '../client/src/components/Info.jsx';
import Form from '../client/src/components/Form.jsx';
import App from '../client/src/App.jsx';

const fakeDataRoom = {
  cleaning_fee: 5,
  createdAt: '2019-05-25T17:36:05.000Z',
  id: 1,
  max_guest: '{"adults":6,"children":3,"infants":2}',
  max_night: 3,
  min_night: 1,
  num_reviews: 6,
  price: 76,
  ratings: '4.6',
  roomname: "Viva Funk's Loft",
  service_fee: 5,
  tax: 10,
  updatedAt: '2019-05-25T17:36:05.000Z',
};

const fakeDataBooking = [
  {
    id: 1, email: 'Chad_Schuppe71@yahoo.com', guests: '{"adults":null,"children":null,"infants":null}', check_in: '2019-06-21T07:00:00.000Z', check_out: '2019-06-22T07:00:00.000Z', roomId: 1, updatedAt: '2019-05-25T17:42:50.000Z',
  },
  {
    id: 2, email: 'Oswaldo90@yahoo.com', guests: '{"adults":null,"children":null,"infants":null}', check_in: '2019-06-05T07:00:00.000Z', check_out: '2019-06-08T07:00:00.000Z', roomId: 1, updatedAt: '2019-05-25T17:42:50.000Z',
  },
  {
    id: 3, email: 'Charlene.White@yahoo.com', guests: '{"adults":null,"children":null,"infants":null}', check_in: '2019-07-16T07:00:00.000Z', check_out: '2019-07-19T07:00:00.000Z', roomId: 1, updatedAt: '2019-05-25T17:42:50.000Z',
  },
];

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  ok: true,
  json: () => data,
}));


describe('App component', () => {
  test('<App /> component exists', () => {
    const component = shallow(<App />);
    expect(component.exists()).toBe(true);
  });
  test('renders <Info/> component', () => {
    const component = shallow(<Info />);
    expect(component).toHaveLength(1);
  });
  test('renders <Form/> component', () => {
    const component = shallow(<Form />);
    expect(component).toHaveLength(1);
  });
  test('App renders props correctly', () => {
    const component = shallow(<App name="app" />);
    expect(component.instance().props.name).toBe('app');
  });
});

describe('Display App by rendering state', () => {
  let component;
  beforeEach(() => {
    component = shallow(<App />);
  });
  test('It renders empty div on x button click', () => {
    const button = component.find('.xbutton');
    button.simulate('click');
    expect(component.state().rendering).toEqual(false);
  });

  test('It renders empty div when rendering state is false', () => {
    component.setState({ rendering: false }, () => {
      expect(component.find(App)).toHaveLength(0);
    });
  });

  test('handleRendering updates roomInfo state properly', () => {
    const appInstance = component.instance();
    appInstance.handleRendering();
    expect(appInstance.state.rendering).toEqual(false);
  });
});

describe('function updateRoomState and updateBookedDates', () => {
  let component;
  beforeEach(() => {
    component = shallow(<App />);
  });

  test('updateRoomState updates roomInfo state properly', () => {
    const appInstance = component.instance();
    appInstance.updateRoomState(fakeDataRoom);
    expect(appInstance.state.roomInfo.roomname).toEqual("Viva Funk's Loft");
    expect(appInstance.state.roomInfo.price).toEqual(76);
  });

  test('updateBookedDates updates bookedDates state properly', () => {
    const appInstance = component.instance();
    appInstance.updateBookedDates(fakeDataBooking);
    expect(appInstance.state.bookedDates.length).toEqual(7);
    expect(appInstance.state.bookedDates[0].toString().slice(0, 15)).toEqual('Fri Jun 21 2019');
  });
});
