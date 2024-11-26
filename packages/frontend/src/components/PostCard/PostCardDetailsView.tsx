import { useState } from 'react';
import {
  Box,
  Card,
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
import YouChip from '../shared/YouChip';

interface PostCardProps {
  postId: string;
  author: string;
  authorId: string; // Add this
  loggedInUserId: string | null; // Add this
  content: string;
  date: string; // Ensure this is an ISO string or date-compatible format
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

  // Add this check
  const isPostOwner = loggedInUserId === authorId;

  const cardContent = (
    <>
      <CardHeader
        sx={{ pb: 0 }}
        avatar={
          <AccountCircleIcon sx={{ fontSize: 48, color: 'peach.main' }} />
        }
        title={
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle1" color="tealDark.main">
              @{author}
            </Typography>
            {isPostOwner && <YouChip />}
          </Stack>
        }
        subheader={
          <Tooltip title={formattedDate}>
            <span style={{ display: 'inline-block' }}>
              <Typography variant="subtitle2" color="text.secondary">
                {relativeTime}
              </Typography>
            </span>
          </Tooltip>
        }
        action={
          isPostOwner ? ( // Only show edit menu if user owns the post
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
          ) : null
        }
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
