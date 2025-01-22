import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppointmentForm from './components/AppointmentForm';
import AppointmentHistory from './components/AppointmentHistory';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Lawyer Appointment Management
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Book Appointment
          </Button>
          <Button color="inherit" component={Link} to="/history/">
            View History
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Routes>
          <Route path="/" element={<AppointmentForm />} />
          <Route path="/history/:id" element={<AppointmentHistory />} />
          <Route path="/history" element={<AppointmentHistory />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
