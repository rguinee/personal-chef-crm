import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages (to be created)
// import Dashboard from '@/pages/Dashboard';
// import Clients from '@/pages/Clients';
// import Recipes from '@/pages/Recipes';
// import MealPlans from '@/pages/MealPlans';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green for food/nature theme
    },
    secondary: {
      main: '#FF6F00', // Orange accent
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <div style={{ 
                padding: '20px', 
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif'
              }}>
                <h1>🍽️ Personal Chef CRM</h1>
                <p>Welcome to your CRM, Recipe Manager, and Meal Planner!</p>
                <div style={{ marginTop: '20px' }}>
                  <h2>Coming Soon:</h2>
                  <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                    <li>📊 Client Management Dashboard</li>
                    <li>📋 Recipe Library</li>
                    <li>🗓️ Meal Planning Tools</li>
                    <li>💰 Pricing & Billing</li>
                    <li>📈 Analytics & Reports</li>
                  </ul>
                </div>
              </div>
            } />
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