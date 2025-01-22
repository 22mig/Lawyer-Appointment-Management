import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
} from '@mui/material';

const AppointmentHistory = () => {
  const { id } = useParams(); // Get lawyer ID from URL (optional)
  const { lawyers } = useSelector((state) => state.lawyers);
  const navigate = useNavigate();

  // Default to the first lawyer if no ID is provided
  const initialLawyerId = id ? parseInt(id) : lawyers[0]?.id || null;
  const [selectedLawyerId, setSelectedLawyerId] = useState(initialLawyerId);

  const selectedLawyer = lawyers.find((lawyer) => lawyer.id === selectedLawyerId);

  // Handle lawyer selection from dropdown
  const handleLawyerChange = (event) => {
    const newLawyerId = parseInt(event.target.value);
    setSelectedLawyerId(newLawyerId);
    navigate(`/history/${newLawyerId}`); // Update the URL dynamically
  };

  if (!selectedLawyer) {
    return (
      <Typography variant="h5" sx={{ mt: 5 }} textAlign="center">
        Lawyer not found!
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '2rem auto' }}>
      <Card sx={{ boxShadow: 3, borderRadius: '10px' }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Appointment History
          </Typography>

          {/* Dropdown to select a lawyer */}
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Select Lawyer:
          </Typography>
          <Select
            fullWidth
            value={selectedLawyerId}
            onChange={handleLawyerChange}
            variant="outlined"
          >
            {lawyers.map((lawyer) => (
              <MenuItem key={lawyer.id} value={lawyer.id}>
                {lawyer.name} ({lawyer.specialty})
              </MenuItem>
            ))}
          </Select>

          {/* Lawyer Details */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Lawyer: {selectedLawyer.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Specialty: {selectedLawyer.specialty}
          </Typography>

          {/* Appointment List */}
          <Typography variant="h6" gutterBottom>
            Appointments:
          </Typography>
          <List>
            {selectedLawyer.appointments.length > 0 ? (
              selectedLawyer.appointments.map((appointment, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={appointment.timeSlot}
                      secondary={`Cost: ₹${appointment.cost}`}
                    />
                  </ListItem>
                  {index < selectedLawyer.appointments.length - 1 && <Divider />}
                </div>
              ))
            ) : (
              <Typography variant="body1">No appointments yet!</Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AppointmentHistory;
