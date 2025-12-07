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

const BioTextField = styled(StyledTextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f8f9f8',
    minHeight: '116px',
    alignItems: 'flex-start',
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

interface Step3Data {
  bio: string;
  specialties: string[];
}

interface Step3SpecialtiesProps {
  data: Partial<Step3Data>;
  updateData: (updates: Partial<Step3Data>) => void;
}

export default function Step3Specialties({ data, updateData }: Step3SpecialtiesProps) {
  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ bio: event.target.value });
  };

  const handleSpecialtiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert comma-separated string to array
    const specialtiesArray = event.target.value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    updateData({ specialties: specialtiesArray });
  };

  return (
    <Box>
      <StepDescription>
        This is used for your personal chef profile.
      </StepDescription>
      
      <BioTextField
        label="Bio"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={data.bio || ''}
        onChange={handleBioChange}
        placeholder="Tell us about yourself and your culinary experience..."
      />
      
      <StyledTextField
        label="Specialties"
        variant="outlined"
        fullWidth
        value={data.specialties?.join(', ') || ''}
        onChange={handleSpecialtiesChange}
        placeholder="e.g., Italian, Vegan, Gluten-Free (comma separated)"
        helperText="Enter your culinary specialties separated by commas"
        sx={{
          '& .MuiFormHelperText-root': {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '12px',
            color: '#666',
            marginLeft: 0,
          }
        }}
      />
    </Box>
  );
}