import React from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StepDescription = styled(Typography)({
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#47624f',
  textAlign: 'center',
  marginBottom: '24px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '24px',
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
  '& .MuiOutlinedInput-input': {
    padding: '16px 14px',
  },
});

interface Step1Data {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface Step1PersonalInfoProps {
  data: Step1Data;
  updateData: (updates: Partial<Step1Data>) => void;
}

export default function Step1PersonalInfo({ data, updateData }: Step1PersonalInfoProps) {
  const handleChange = (field: keyof Step1Data) => (event: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ [field]: event.target.value });
  };

  return (
    <Box>
      <StepDescription>
        This is used for basic account management.
      </StepDescription>
      
      <Stack direction="row" spacing={2} mb={3}>
        <StyledTextField
          label="First name"
          variant="outlined"
          fullWidth
          required
          value={data.firstName}
          onChange={handleChange('firstName')}
        />

        <StyledTextField
          label="Last name"
          variant="outlined"
          fullWidth
          required
          value={data.lastName}
          onChange={handleChange('lastName')}
        />
      </Stack>
      
      <StyledTextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        required
        value={data.email}
        onChange={handleChange('email')}
      />
      
      <StyledTextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        required
        value={data.password}
        onChange={handleChange('password')}
      />
    </Box>
  );
}
