import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
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

interface Step2Data {
  businessName: string;
  businessAddress: string;
  lastName: string;
  phone: string;
}

interface Step2BusinessInfoProps {
  data: Partial<Step2Data>;
  updateData: (updates: Partial<Step2Data>) => void;
}

export default function Step2BusinessInfo({ data, updateData }: Step2BusinessInfoProps) {
  const handleChange = (field: keyof Step2Data) => (event: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ [field]: event.target.value });
  };

  return (
    <Box>
      <StepDescription>
        This is used to manage your culinary business (grocery orders and delivery).
      </StepDescription>
      
      <StyledTextField
        label="Business name"
        variant="outlined"
        fullWidth
        value={data.businessName || ''}
        onChange={handleChange('businessName')}
      />
      
      <StyledTextField
        label="Business address"
        variant="outlined"
        fullWidth
        value={data.businessAddress || ''}
        onChange={handleChange('businessAddress')}
      />
      
      <StyledTextField
        label="Phone"
        variant="outlined"
        fullWidth
        value={data.phone || ''}
        onChange={handleChange('phone')}
      />
    </Box>
  );
}
