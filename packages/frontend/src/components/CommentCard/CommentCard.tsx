import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PostHeader from '../shared/PostHeader';
import { modalBoxStyle } from '../../styles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { updateComment, deleteComment } from '../../features/post/postSlice';

interface CommentCardProps {
  commentId: string;
  postId: string;
  author: string;
  authorId: string;
  loggedInUserId: string | null;
  content: string;
  date: string;
}

export default function CommentCard({
  commentId,
  postId,
  author,
  authorId,
  loggedInUserId,
  content,
  date,
}: CommentCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDelete = () => {
    dispatch(deleteComment({ postId, commentId }));
    handleCloseModal();
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditedContent(content);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  const handleEditSave = () => {
    dispatch(
      updateComment({
        postId,
        commentId,
        content: editedContent,
      }),
    );
    setIsEditing(false);
  };

  const isCommentOwner = loggedInUserId === authorId;

  return (
    <Card
      variant="outlined"
      sx={{ borderColor: isCommentOwner ? 'tealLight.main' : undefined }}
    >
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="Confirm comment deletion"
        aria-describedby="Confirm comment deletion"
      >
        <Box sx={modalBoxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete this comment?
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              color="peach"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="tealDark"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>

      <PostHeader
        author={author}
        date={date}
        isOwner={isCommentOwner}
        onEdit={handleEditStart}
        onDelete={handleOpenModal}
      />
      <CardContent sx={{ pt: 1 }}>
        {isEditing ? (
          <Box component="form" noValidate>
            <TextField
              fullWidth
              multiline
              minRows={2}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                color="tealDark"
                onClick={handleEditCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="tealDark"
                onClick={handleEditSave}
              >
                Save
              </Button>
            </Stack>
          </Box>
        ) : (
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-line',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            {content}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
