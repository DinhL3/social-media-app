import { Chip } from '@mui/material';

export default function YouChip() {
  return (
    <Chip
      label="You"
      size="small"
      sx={{
        height: 20,
        fontSize: '0.75rem',
        backgroundColor: 'peach.light',
        color: 'tealDark.main',
      }}
    />
  );
}
