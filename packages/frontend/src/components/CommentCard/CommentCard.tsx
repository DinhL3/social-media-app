import { Card, Stack, Tooltip, Typography } from '@mui/material';
import { format, formatDistanceToNow } from 'date-fns';

interface CommentCardProps {
  commentId: string;
  author: string;
  content: string;
  date: string;
}

export default function CommentCard({
  author,
  content,
  date,
}: CommentCardProps) {
  const postDate = new Date(date);

  // Format the date for the tooltip (e.g., "November 16, at 7:30pm")
  const formattedDate = format(postDate, "MMMM d, 'at' h:mma");

  // Calculate the relative time for display (e.g., "39m ago")
  const relativeTime = formatDistanceToNow(postDate, { addSuffix: true });

  return (
    <Card variant="outlined">
      <Stack direction="row" gap={1} alignItems="center">
        <Typography variant="subtitle1" color="tealDark.main">
          @{author}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          ·
        </Typography>
        <Tooltip title={formattedDate}>
          <Typography variant="subtitle2" color="text.secondary">
            {relativeTime}
          </Typography>
        </Tooltip>
      </Stack>

      <Typography variant="body1" sx={{ mt: 1 }} gutterBottom>
        {content}
      </Typography>
    </Card>
  );
}
