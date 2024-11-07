import { Card, CardContent, Typography } from '@mui/material';

interface Props {
  author: string;
  content: string;
  date: string;
}

const PostCard = (props: Props) => {
  const { author, content, date } = props;
  return (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          @{author}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(date).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
