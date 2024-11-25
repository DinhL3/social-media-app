import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { format, formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

interface PostCardFeedViewProps {
  postId: string;
  author: string;
  content: string;
  date: string; // Ensure this is an ISO string or date-compatible format
  commentCount: number;
}

export default function PostCardFeedView({
  postId,
  author,
  content,
  date,
  commentCount,
}: PostCardFeedViewProps) {
  const postDate = new Date(date);
  const formattedDate = format(postDate, "MMMM d, 'at' h:mma");

  // Calculate the relative time for display (e.g., "39m ago")
  const relativeTime = formatDistanceToNow(postDate, { addSuffix: true });

  const cardContent = (
    <>
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
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-line',
          }}
          gutterBottom
        >
          {content}
        </Typography>
        <Stack direction="row" justifyContent="flex-end">
          <Box display="flex" gap={1} color="text.secondary">
            <ChatBubbleOutlineOutlinedIcon fontSize="small" />
            <Typography variant="caption">{commentCount}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </>
  );

  return (
    <Card
      sx={{
        width: '100%',
      }}
    >
      <CardActionArea component={Link} to={`/post-details/${postId}`}>
        {cardContent}
      </CardActionArea>
    </Card>
  );
}