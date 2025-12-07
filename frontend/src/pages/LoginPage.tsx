import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import BrandWordmark from '../components/BrandWordmark';
import { useAuth } from '../contexts/AuthContext';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  gap: '48px',
}));

const LoginCard = styled(Card)({
  width: '500px',
  border: '1px solid #a4a9a3',
  borderRadius: '8px',
  boxShadow: 'none',
  backgroundColor: '#ffffff',
});

const LoginCardContent = styled(CardContent)({
  padding: '24px !important',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '15px',
    textTransform: 'uppercase',
    letterSpacing: '0.46px',
    color: '#3c3f3a',
    fontWeight: 'normal',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f8f9f8',
    height: '58px',
    borderRadius: '4px',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #47624f',
    },
  },
});

const LoginButton = styled(Button)({
  backgroundColor: '#c96e3d', // accent color
  color: '#f8f9f8',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '15px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.46px',
  padding: '16px 24px',
  borderRadius: '4px',
  height: '58px',
  '&:hover': {
    backgroundColor: '#b5613a',
  },
});

const ActionsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

const ActionLink = styled(Link)({
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '15px',
  color: '#3c3f3a',
  textTransform: 'uppercase',
  letterSpacing: '0.46px',
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    color: '#47624f',
  },
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, loading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard'); // We'll create this later
    }
  }, [user, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
      toast.error('Login failed: ' + error.message);
    } else {
      toast.success('Welcome back!');
      navigate('/dashboard');
    }
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password page
    toast.info('Forgot password feature coming soon!');
  };

  return (
    <StyledContainer maxWidth={false}>
      <BrandWordmark />

      <LoginCard>
        <LoginCardContent>
          {error && (
            <Alert severity="error" sx={{ marginBottom: '16px' }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <StyledTextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            
            <StyledTextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            
            <LoginButton 
              type="submit" 
              fullWidth
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Log in'}
            </LoginButton>
          </Box>

          <ActionsBox>
            <ActionLink onClick={handleCreateAccount}>
              Create an account
            </ActionLink>
            <ActionLink onClick={handleForgotPassword}>
              Forgot password
            </ActionLink>
          </ActionsBox>
        </LoginCardContent>
      </LoginCard>
    </StyledContainer>
  );
}
