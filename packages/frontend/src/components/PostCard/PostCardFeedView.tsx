import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
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
  imageUrl?: string; // Add imageUrl
}

export default function PostCardFeedView({
  postId,
  author,
  content,
  date,
  commentCount,
  authorId,
  loggedInUserId,
  imageUrl,
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
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}
          gutterBottom
        >
          {content}
        </Typography>
        {imageUrl && (
          <Box
            sx={{
              width: '100%',
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={`http://localhost:5000${decodeURIComponent(imageUrl)}`}
              alt="Post image"
              style={{
                maxWidth: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </Box>
        )}
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
