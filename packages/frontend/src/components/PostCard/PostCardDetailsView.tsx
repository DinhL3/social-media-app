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
  CardMedia,
} from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import PostHeader from '../shared/PostHeader';
import { modalBoxStyle } from '../../styles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { deletePost, updatePost } from '../../features/post/postSlice';

interface PostCardDetailsViewProps {
  postId: string;
  author: string;
  authorId: string;
  loggedInUserId: string | null;
  content: string;
  date: string;
  commentCount: number;
  visibility: 'friends' | 'public';
  imageUrl?: string;
}

export default function PostCardDetailsView({
  postId,
  author,
  authorId,
  loggedInUserId,
  content,
  date,
  commentCount,
  visibility,
  imageUrl,
}: PostCardDetailsViewProps) {
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDelete = () => {
    dispatch(deletePost({ postId, userId: loggedInUserId! }));
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
      updatePost({
        postId,
        content: editedContent,
        visibility,
        userId: loggedInUserId!,
      }),
    );
    setIsEditing(false);
  };

  const isPostOwner = loggedInUserId === authorId;

  const cardContent = (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="Confirm post deletion"
        aria-describedby="Confirm post deletion"
      >
        <Box sx={modalBoxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete this post?
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
        isOwner={isPostOwner}
        onEdit={handleEditStart}
        onDelete={handleOpenModal}
      />
      {imageUrl && (
        <CardMedia
          component="img"
          height="500"
          image={imageUrl ? `http://localhost:5000${imageUrl}` : undefined} // Adjust the base URL as needed
          alt="Post image"
        />
      )}
      <CardContent sx={{ pt: 1 }}>
        {isEditing ? (
          <Box component="form" noValidate>
            <TextField
              fullWidth
              multiline
              minRows={3}
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
          <>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-line',
                fontSize: '1.2rem',
                lineHeight: 1.5,
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
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
          </>
        )}
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
