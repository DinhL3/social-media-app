import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Stack, // Add this import
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { format, formatDistanceToNow } from 'date-fns';
import YouChip from '../shared/YouChip';

interface CommentCardProps {
  commentId: string;
  author: string;
  authorId: string; // Add this
  loggedInUserId: string | null; // Add this
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
  const [anchorElEdit, setAnchorElEdit] = useState<null | HTMLElement>(null);
  const handleOpenEditMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElEdit(event.currentTarget);
  };
  const handleCloseEditMenu = () => {
    setAnchorElEdit(null);
  };

  // Check if the logged-in user is the comment author
  const isCommentOwner = loggedInUserId === authorId;

  const postDate = new Date(date);

  // Format the date for the tooltip (e.g., "November 16, at 7:30pm")
  const formattedDate = format(postDate, "MMMM d, 'at' h:mma");

  // Calculate the relative time for display (e.g., "39m ago")
  const relativeTime = formatDistanceToNow(postDate, { addSuffix: true });

  return (
    <Card
      variant="outlined"
      sx={{ borderColor: isCommentOwner ? 'tealLight.main' : undefined }}
    >
      <CardHeader
        sx={{ pb: 0 }}
        avatar={
          <AccountCircleIcon
            sx={{
              fontSize: 48,
              color: 'peach.main',
            }}
          />
        }
        title={
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle1" color="tealDark.main">
              @{author}
            </Typography>
            {isCommentOwner && <YouChip />}
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
          isCommentOwner ? (
            <>
              <IconButton onClick={handleOpenEditMenu}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="comment-edit-menu"
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
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
}
