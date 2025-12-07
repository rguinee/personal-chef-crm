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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BrandWordmark from '../components/BrandWordmark';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt:', { username, password });
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password page
    console.log('Navigate to forgot password');
  };

  return (
    <StyledContainer maxWidth={false}>
      <BrandWordmark />

      <LoginCard>
        <LoginCardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <StyledTextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <StyledTextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <LoginButton type="submit" fullWidth>
              Log in
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
