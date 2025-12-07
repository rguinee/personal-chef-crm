import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// We'll create these step components after seeing your Figma designs
import Step1PersonalInfo from '../components/account-creation/Step1PersonalInfo';
import Step2BusinessInfo from '../components/account-creation/Step2BusinessInfo';
import Step3Specialties from '../components/account-creation/Step3Specialties';
import BrandWordmark from '../components/BrandWordmark';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  gap: '32px',
  padding: '24px',
}));


const CreateAccountCard = styled(Card)({
  width: '100%',
  maxWidth: '600px',
  border: '1px solid #a4a9a3',
  borderRadius: '8px',
  boxShadow: 'none',
  backgroundColor: '#ffffff',
});

const CreateAccountCardContent = styled(CardContent)({
  padding: '32px !important',
});

const steps = ['Personal Information', 'Business Details', 'Specialties'];

interface UserFormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  
  // Step 2: Business Information
  businessName: string;
  businessAddress: string;
  
  // Step 3: Profile Information
  bio: string;
  specialties: string[];
}

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessName: '',
    businessAddress: '',
    bio: '',
    specialties: [],
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleDoThisLater = () => {
    // Skip remaining steps and create account with current data
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      // TODO: Implement account creation API call
      console.log('Creating account with data:', formData);
      
      // For now, navigate back to login
      // Later, this could navigate to a welcome page or auto-login
      navigate('/');
    } catch (error) {
      console.error('Account creation failed:', error);
    }
  };

  const updateFormData = (updates: Partial<UserFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Step1PersonalInfo
            data={{
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
              phone: formData.phone,
            }}
            updateData={updateFormData}
          />
        );
      case 1:
        return (
          <Step2BusinessInfo
            data={{
              businessName: formData.businessName,
              businessAddress: formData.businessAddress,
              lastName: formData.lastName,
              phone: formData.phone,
            }}
            updateData={updateFormData}
          />
        );
      case 2:
        return (
          <Step3Specialties
            data={{
              bio: formData.bio,
              specialties: formData.specialties,
            }}
            updateData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <StyledContainer maxWidth={false}>
      <BrandWordmark titleSize="small" />

      <CreateAccountCard>
        <CreateAccountCardContent>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: 'center',
              marginBottom: '24px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 'bold',
              color: '#3c3f3a',
            }}
          >
            Create Your Account
          </Typography>

          <Stepper activeStep={activeStep} sx={{ marginBottom: '32px' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent()}

          {/* Button Stack with Back and Next/Submit */}
          <Stack
            direction="row"
            spacing={2}
            mb={3}
            sx={{ marginTop: '32px', width: '100%' }}
          >
              <Button
                variant="outlined"
                onClick={activeStep === 0 ? handleCancel : handleBack}
                sx={{
                color: '#3c3f3a',
                borderColor: '#a4a9a3',
                backgroundColor: 'transparent',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '15px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.46px',
                padding: '16px 24px',
                borderRadius: '4px',
                height: '58px',
                '&:hover': {
                  backgroundColor: '#f8f9f8',
                  borderColor: '#47624f',
                },
              }}
              >
                Back
              </Button>
            
            <Button
              variant="contained"
              onClick={handleNext}
              fullWidth
              sx={{
                backgroundColor: '#c96e3d',
                color: '#f8f9f8',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '15px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.46px',
                padding: '16px 24px',
                borderRadius: '4px',
                height: '58px',
                flex: 1,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#b5613a',
                },
              }}
            >
              {activeStep === 0 ? 'Next (1 of 3)' : 
               activeStep === 1 ? 'Next (2 of 3)' : 
               'Submit (3 of 3)'}
            </Button>
          </Stack>

          {/* Text Links Below Button */}  
          {activeStep > 0 && (
              <Typography
                component="button"
                onClick={handleDoThisLater}
                sx={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '15px',
                  color: '#3c3f3a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.46px',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: '#47624f',
                  },
                  float: 'right',
                  mb: 3,
                }}
              >
                Do this later
              </Typography>
            )}
        </CreateAccountCardContent>
      </CreateAccountCard>
    </StyledContainer>
  );
}
