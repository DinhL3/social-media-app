import {
  CardHeader,
  Stack,
  Link as MuiLink,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';
import YouChip from './YouChip';
import TimeDisplay from './TimeDisplay';

interface PostHeaderProps {
  author: string;
  date: string;
  isOwner: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export default function PostHeader({
  author,
  date,
  isOwner,
  onEdit,
  onDelete,
  showActions = true,
}: PostHeaderProps) {
  const [anchorElEdit, setAnchorElEdit] = useState<null | HTMLElement>(null);

  const handleOpenEditMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElEdit(event.currentTarget);
  };

  const handleCloseEditMenu = () => {
    setAnchorElEdit(null);
  };

  const handleEdit = () => {
    handleCloseEditMenu();
    onEdit?.();
  };

  const handleDelete = () => {
    handleCloseEditMenu();
    onDelete?.();
  };

  return (
    <CardHeader
      sx={{ pb: 0 }}
      avatar={<AccountCircleIcon sx={{ fontSize: 48, color: 'peach.main' }} />}
      title={
        <Stack direction="row" spacing={1} alignItems="center">
          <MuiLink
            component={Link}
            to={`/profile/${author}`}
            variant="subtitle1"
            color="tealDark.main"
            underline="hover"
          >
            @{author}
          </MuiLink>
          {isOwner && <YouChip />}
        </Stack>
      }
      subheader={<TimeDisplay date={date} />}
      action={
        showActions && isOwner ? (
          <>
            <IconButton onClick={handleOpenEditMenu}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElEdit}
              open={Boolean(anchorElEdit)}
              onClose={handleCloseEditMenu}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </>
        ) : null
      }
    />
  );
}
