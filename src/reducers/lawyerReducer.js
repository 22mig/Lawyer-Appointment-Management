import { lawyers } from '../data/lawyers';

const initialState = {
  lawyers: [...lawyers],
};

const lawyerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BOOK_APPOINTMENT':
      return {
        ...state,
        lawyers: state.lawyers.map((lawyer) => {
          if (lawyer.id === action.payload.lawyerId) {
            // Check if the appointment is already booked
            const isAlreadyBooked = lawyer.appointments.some(
              (appointment) => appointment.timeSlot === action.payload.appointment.timeSlot
            );

            if (isAlreadyBooked) {
              alert('This time slot is already booked.');
              return lawyer; // Return lawyer as-is if the slot is already booked
            }

            // Add new appointment and remove the time slot from availability
            return {
              ...lawyer,
              appointments: [...lawyer.appointments, action.payload.appointment],
              availability: lawyer.availability.filter(
                (slot) => slot !== action.payload.appointment.timeSlot
              ),
            };
          }
          return lawyer; // Return lawyer as-is if not the targeted one
        }),
      };
    default:
      return state;
  }
};

export default lawyerReducer;
