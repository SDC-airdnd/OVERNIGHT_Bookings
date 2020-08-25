/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Info from '../client/src/components/Info.jsx';
import Form from '../client/src/components/Form.jsx';
import Date from '../client/src/components/Date.jsx';
import Guest from '../client/src/components/Guest.jsx';
import Cost from '../client/src/components/Cost.jsx';
import BookingSummary from '../client/src/components/BookingSummary.jsx';
import GuestPicker from '../client/src/components/GuestPicker.jsx';
import Calendar from '../client/src/components/Calendar.jsx';
import MonthNav from '../client/src/components/MonthNav.jsx';


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

// Info component
describe('Info component', () => {
  test('<Info /> component exists', () => {
    const component = shallow(<Info />);
    expect(component.exists()).toBe(true);
  });
});


// Form component
describe('Form component and child components', () => {
  test('<Form /> component exists', () => {
    const component = shallow(<Form />);
    expect(component.exists()).toBe(true);
  });

  test('renders <Date /> component', () => {
    const component = shallow(<Date />);
    expect(component).toHaveLength(1);
  });

  test('renders <Guest /> component', () => {
    const component = shallow(<Guest />);
    expect(component).toHaveLength(1);
  });
  test('renders <BookingSummary /> component', () => {
    const component = shallow(<BookingSummary />);
    expect(component).toHaveLength(1);
  });
  test('renders <Cost /> component', () => {
    const component = shallow(<Cost />);
    expect(component).toHaveLength(1);
  });
});

describe('Button in Form component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Form />);
  });


  test('It renders BookingSummary component on \'book\' button click', () => {
    component.setState({ checkIn: '01/01/1990', checkOut: '01/01/1990', guestSelected: true }, () => {
      component.find('.book').simulate('click');
      expect(component.state('bookingSummaryExpand')).toEqual(true);
    });
  });
  test('It renders BookingSummary component on with bookButtonClick', () => {
    const formInstance = component.instance();
    formInstance.setState({ checkIn: '01/01/1990', checkOut: '01/01/1990', guestSelected: true });
    formInstance.bookButtonClick();
    expect(formInstance.state.bookingSummaryExpand).toEqual(true);
  });
});

// Date component
describe('Date component', () => {
  test('<Date /> component exists', () => {
    const component = shallow(<Date />);
    expect(component.exists()).toBe(true);
  });
  test('renders <Calendar /> component', () => {
    const component = shallow(<Calendar />);
    expect(component).toHaveLength(1);
  });

  test('It renders Calendar component on \'check-in\' input click', () => {
    const handleCheckinClickedStub = sinon.spy();
    const handleCheckoutClickedStub = sinon.spy();
    const component = shallow(<Date
      handleCheckinClicked={handleCheckinClickedStub}
      handleCheckoutClicked={handleCheckoutClickedStub}
      checkInClicked={false}
      checkOutClicked
    />);
    component.find('.check-in').simulate('click');
    expect(handleCheckinClickedStub.calledOnce).toBe(true);
    expect(component.state('calendarExpanded')).toEqual(true);
  });

  // test('It renders Calendar component on \'check-out\' input click', () => {
  //   const handleCheckinClickedStub = sinon.spy();
  //   const handleCheckoutClickedStub = sinon.spy();
  //   const component = shallow(<Date
  //     handleCheckinClicked={handleCheckinClickedStub}
  //     handleCheckoutClicked={handleCheckoutClickedStub}
  //     checkInClicked
  //     checkOutClicked
  //   />);
  //   component.find('.check-out').simulate('click');
  //   expect(handleCheckoutClickedStub.calledOnce).toBe(true);
  //   expect(component.state('calendarExpanded')).toEqual(true);
  // });

  test('It should not render Calendar component when calendarExpanded state is false', () => {
    const component = shallow(<Date />);
    component.setState({ calendarExpanded: false }, () => {
      expect(component.find('datePicker')).toHaveLength(0);
    });
  });

  test('It should not render Calendar component when closeCalendar called', () => {
    const component = shallow(<Date />);
    const dateInstance = component.instance();
    dateInstance.setState({ calendarExpanded: true });
    dateInstance.closeCalendar();
    expect(dateInstance.state.calendarExpanded).toEqual(false);
  });
});

// Guest component

// describe('Guest component', () => {
//   test('<Guest /> component exists', () => {
//     const component = shallow(<Guest guest={'"{}"'} />);
//     expect(component.exists()).toBe(true);
//   });
//   test('renders <GuestPicker /> component', () => {
//     const component = shallow(<GuestPicker />);
//     expect(component).toHaveLength(1);
//   });
// });

// Cost component
describe('Cost component', () => {
  test('<Cost /> component exists', () => {
    const component = shallow(<Cost />);
    expect(component.exists()).toBe(true);
  });
});
