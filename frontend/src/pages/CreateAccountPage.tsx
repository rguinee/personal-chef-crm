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
} from '@mui/material';
import { styled } from '@mui/material/styles';

// We'll create these step components after seeing your Figma designs
import Step1PersonalInfo from '../components/account-creation/Step1PersonalInfo';
import Step2BusinessInfo from '../components/account-creation/Step2BusinessInfo';
import Step3Specialties from '../components/account-creation/Step3Specialties';

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

const Wordmark = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  textAlign: 'center',
  marginBottom: '16px',
});

const BrandTitle = styled(Typography)({
  fontFamily: "'Goudy Bookletter 1911', serif",
  fontSize: '48px',
  lineHeight: '48px',
  color: '#2f4c38',
  margin: 0,
});

const BrandSubtitle = styled(Typography)({
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#47624f',
  margin: 0,
});

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

  const handleBackToLogin = () => {
    navigate('/');
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
      <Wordmark>
        <BrandTitle variant="h1" as="h1">
          Previsto
        </BrandTitle>
        <BrandSubtitle variant="h2" as="h2">
          Personal Chef Ops
        </BrandSubtitle>
      </Wordmark>

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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            {activeStep === 0 ? (
              <Button
                variant="text"
                onClick={handleBackToLogin}
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.46px',
                  color: '#3c3f3a',
                }}
              >
                Back to Login
              </Button>
            ) : (
              <Button
                variant="text"
                onClick={handleBack}
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.46px',
                  color: '#3c3f3a',
                }}
              >
                Back
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                backgroundColor: '#c96e3d',
                color: '#f8f9f8',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '15px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.46px',
                padding: '12px 24px',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#b5613a',
                },
              }}
            >
              {activeStep === steps.length - 1 ? 'Create Account' : 'Next'}
            </Button>
          </Box>
        </CreateAccountCardContent>
      </CreateAccountCard>
    </StyledContainer>
  );
}
