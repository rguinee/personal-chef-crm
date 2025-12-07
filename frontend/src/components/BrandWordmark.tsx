import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Wordmark = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  textAlign: 'center',
});

const BrandTitle = styled(Typography)({
  fontFamily: "'Young Serif', serif",
  fontSize: '96px',
  fontWeight: 'normal',
  lineHeight: '64px',
  letterSpacing: '-0.05em',
  color: '#2f4c38', // darker-primary
  margin: 0,
});

const BrandSubtitle = styled(Typography)({
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#47624f', // primary
  margin: 0,
});

interface BrandWordmarkProps {
  titleSize?: 'large' | 'small';
  className?: string;
}

export default function BrandWordmark({ titleSize = 'large', className }: BrandWordmarkProps) {
  const isSmall = titleSize === 'small';
  
  return (
    <Wordmark className={className}>
      <BrandTitle 
        as="h1"
        sx={{
          fontSize: isSmall ? '48px' : '96px',
          lineHeight: isSmall ? '48px' : '64px',
        }}
      >
        Previsto
      </BrandTitle>
      <BrandSubtitle 
        as="h2"
        sx={{
          fontSize: isSmall ? '18px' : '32px',
        }}
      >
        Personal Chef Ops
      </BrandSubtitle>
    </Wordmark>
  );
}
