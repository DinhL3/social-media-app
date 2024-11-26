import { Card, CardContent, Typography } from '@mui/material';
import PostHeader from '../shared/PostHeader';

interface CommentCardProps {
  commentId: string;
  author: string;
  authorId: string;
  loggedInUserId: string | null;
  content: string;
  date: string;
}

export default function CommentCard({
  author,
  authorId,
  loggedInUserId,
  content,
  date,
}: CommentCardProps) {
  const isCommentOwner = loggedInUserId === authorId;

  return (
    <Card
      variant="outlined"
      sx={{ borderColor: isCommentOwner ? 'tealLight.main' : undefined }}
    >
      <PostHeader
        author={author}
        date={date}
        isOwner={isCommentOwner}
        onEdit={() => {
          /* handle edit */
        }}
        onDelete={() => {
          /* handle delete */
        }}
      />
      <CardContent sx={{ pt: 1 }}>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
}
