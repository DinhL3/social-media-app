import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from 'react-router-dom';
import PostHeader from '../shared/PostHeader';

interface PostCardFeedViewProps {
  postId: string;
  author: string;
  content: string;
  date: string; // Ensure this is an ISO string or date-compatible format
  commentCount: number;
  authorId?: string;
  loggedInUserId?: string | null;
}

export default function PostCardFeedView({
  postId,
  author,
  content,
  date,
  commentCount,
  authorId,
  loggedInUserId,
}: PostCardFeedViewProps) {
  const isPostOwner = loggedInUserId === authorId;

  const cardContent = (
    <>
      <PostHeader
        author={author}
        date={date}
        isOwner={isPostOwner}
        showActions={false}
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
