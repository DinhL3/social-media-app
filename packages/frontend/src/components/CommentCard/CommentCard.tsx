import {
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
      <CardHeader
        sx={{ pb: 0 }}
        avatar={
          <AccountCircleIcon sx={{ fontSize: 48, color: 'peach.main' }} />
        }
        title={
          <Typography variant="subtitle1" color="tealDark.main">
            @{author}
          </Typography>
        }
        subheader={
          <Tooltip title={formattedDate}>
            <Typography variant="subtitle2" color="text.secondary">
              {relativeTime}
            </Typography>
          </Tooltip>
        }
      />
      <CardContent sx={{ pt: 1 }}>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
}
