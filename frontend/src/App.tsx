import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';

// Import pages (to be created)
// import Dashboard from '@/pages/Dashboard';
// import Clients from '@/pages/Clients';
// import Recipes from '@/pages/Recipes';
// import MealPlans from '@/pages/MealPlans';

const theme = createTheme({
  palette: {
    primary: {
      main: '#47624f', // Primary green from Figma
    },
    secondary: {
      main: '#c96e3d', // Orange accent from Figma
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9f8',
    },
    text: {
      primary: '#3c3f3a',
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* Future routes will be added here */}
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;