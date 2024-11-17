import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { format, formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  author: string;
  content: string;
  date: string; // Ensure this is an ISO string or date-compatible format
  commentCount: number;
}

export default function PostCard({
  author,
  content,
  date,
  commentCount,
}: PostCardProps) {
  // Convert the date to a Date object
  const postDate = new Date(date);

  // Format the date for the tooltip (e.g., "November 16, at 7:30pm")
  const formattedDate = format(postDate, "MMMM d, 'at' h:mma");

  // Calculate the relative time for display (e.g., "39m ago")
  const relativeTime = formatDistanceToNow(postDate, { addSuffix: true });

  return (
    <Card>
      <CardActionArea>
        <CardContent>
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
          <Stack direction="row" justifyContent="flex-end">
            <Box display="flex" gap={1} color="text.secondary">
              <ChatBubbleOutlineOutlinedIcon fontSize="small" />
              <Typography variant="caption">{commentCount}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
