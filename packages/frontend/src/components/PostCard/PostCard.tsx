import { useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { format, formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

interface PostCardProps {
  postId: string;
  author: string;
  content: string;
  date: string; // Ensure this is an ISO string or date-compatible format
  commentCount: number;
  isInRootFeed?: boolean; // Optional prop to determine if the post is in the root feed
}

export default function PostCard({
  postId,
  author,
  content,
  date,
  commentCount,
  isInRootFeed = true,
}: PostCardProps) {
  const [anchorElEdit, setAnchorElEdit] = useState<null | HTMLElement>(null);
  const handleOpenEditMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElEdit(event.currentTarget);
  };
  const handleCloseEditMenu = () => {
    setAnchorElEdit(null);
  };

  // Convert the date to a Date object
  const postDate = new Date(date);

  // Format the date for the tooltip (e.g., "November 16, at 7:30pm")
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
        action={
          !isInRootFeed && (
            <>
              <IconButton onClick={handleOpenEditMenu}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="edit-menu"
                anchorEl={anchorElEdit}
                open={Boolean(anchorElEdit)}
                onClose={handleCloseEditMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleCloseEditMenu}>Edit</MenuItem>
                <MenuItem onClick={handleCloseEditMenu}>Delete</MenuItem>
              </Menu>
            </>
          )
        }
      />
      <CardContent sx={{ pt: 1 }}>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-line',
            fontSize: isInRootFeed ? undefined : '1.2rem',
            lineHeight: isInRootFeed ? undefined : 1.5,
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
      {isInRootFeed ? (
        <CardActionArea component={Link} to={`/post-details/${postId}`}>
          {cardContent}
        </CardActionArea>
      ) : (
        cardContent
      )}
    </Card>
  );
}
