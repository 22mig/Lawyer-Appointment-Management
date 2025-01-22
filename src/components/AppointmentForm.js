import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookAppointment } from '../actions/lawyerActions';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const AppointmentForm = () => {
  const [lawyerId, setLawyerId] = useState(''); // Selected lawyer ID
  const [timeSlot, setTimeSlot] = useState(''); // Selected time slot
  const dispatch = useDispatch();
  const { lawyers } = useSelector((state) => state.lawyers);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const lawyer = lawyers.find((lawyer) => lawyer.id === parseInt(lawyerId));
    if (!lawyer) {
      alert('Lawyer not found.');
      return;
    }

    if (!lawyer.availability.includes(timeSlot)) {
      alert('This time slot is not available.');
      return;
    }

    const appointment = {
      timeSlot,
      cost: lawyer.costPerAppointment,
    };

    dispatch(bookAppointment(parseInt(lawyerId), appointment));
    alert('Appointment booked successfully!');
    setLawyerId('');
    setTimeSlot('');
  };

  // Get the currently selected lawyer's availability
  const selectedLawyer = lawyers.find((lawyer) => lawyer.id === parseInt(lawyerId));

  return (
    <Box sx={{ maxWidth: 600, margin: '2rem auto' }}>
      <Card sx={{ boxShadow: 3, borderRadius: '12px', padding: '1rem' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom textAlign="center" color="primary">
            Book an Appointment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Select Lawyer */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Select Lawyer
                </Typography>
                <Select
                  fullWidth
                  value={lawyerId}
                  onChange={(e) => setLawyerId(e.target.value)}
                  displayEmpty
                  variant="outlined"
                >
                  <MenuItem value="" disabled>
                    -- Select Lawyer --
                  </MenuItem>
                  {lawyers.map((lawyer) => (
                    <MenuItem key={lawyer.id} value={lawyer.id}>
                      {lawyer.name} ({lawyer.specialty})
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* Select Time Slot */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Select Time Slot
                </Typography>
                <Select
                  fullWidth
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  disabled={!selectedLawyer} // Disable if no lawyer is selected
                >
                  <MenuItem value="" disabled>
                    {selectedLawyer ? '-- Select Time Slot --' : 'Select a Lawyer First'}
                  </MenuItem>
                  {selectedLawyer &&
                    selectedLawyer.availability.map((slot, index) => (
                      <MenuItem key={index} value={slot}>
                        {slot}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ padding: '0.75rem', fontWeight: 'bold' }}
                  disabled={!lawyerId || !timeSlot} // Disable if lawyer or time slot is not selected
                >
                  Book Appointment
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AppointmentForm;
