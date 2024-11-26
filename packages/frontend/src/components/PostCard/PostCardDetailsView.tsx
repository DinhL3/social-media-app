import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PostHeader from '../shared/PostHeader';

interface PostCardProps {
  postId: string;
  author: string;
  authorId: string;
  loggedInUserId: string | null;
  content: string;
  date: string;
  commentCount: number;
}

export default function PostCardDetailsView({
  author,
  authorId,
  loggedInUserId,
  content,
  date,
  commentCount,
}: PostCardProps) {
  const isPostOwner = loggedInUserId === authorId;

  const cardContent = (
    <>
      <PostHeader
        author={author}
        date={date}
        isOwner={isPostOwner}
        onEdit={() => {
          /* handle edit */
        }}
        onDelete={() => {
          /* handle delete */
        }}
      />
      <CardContent sx={{ pt: 1 }}>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-line',
            fontSize: '1.2rem',
            lineHeight: 1.5,
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
      {cardContent}
    </Card>
  );
}
