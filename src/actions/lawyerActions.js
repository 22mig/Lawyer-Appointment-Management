export const bookAppointment = (lawyerId, appointment) => ({
  type: 'BOOK_APPOINTMENT',
  payload: { lawyerId, appointment },
});
