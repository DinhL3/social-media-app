import { Card, CardContent, Typography, Box } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

interface Props {
  author: string;
  content: string;
  date: string;
  commentsCount: number;
}

const PostCard = (props: Props) => {
  const { author, content, date, commentsCount } = props;
  return (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          @{author}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="caption" color="text.secondary">
            {new Date(date).toLocaleString()}
          </Typography>
          <Box display="flex" alignItems="center" color="text.secondary">
            <CommentIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="caption">
              {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
