import { Tooltip, Typography } from '@mui/material';
import { format, formatDistanceToNow } from 'date-fns';

interface TimeDisplayProps {
  date: string;
}

export default function TimeDisplay({ date }: TimeDisplayProps) {
  const postDate = new Date(date);
  const formattedDate = format(postDate, "MMMM d, 'at' h:mma");
  const relativeTime = formatDistanceToNow(postDate, { addSuffix: true });

  return (
    <Tooltip title={formattedDate}>
      <span style={{ display: 'inline-block' }}>
        <Typography variant="subtitle2" color="text.secondary">
          {relativeTime}
        </Typography>
      </span>
    </Tooltip>
  );
}
