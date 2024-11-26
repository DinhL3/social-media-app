import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import PostHeader from '../shared/PostHeader';
import { modalBoxStyle } from '../../styles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { deletePost } from '../../features/post/postSlice';

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
  postId,
  author,
  authorId,
  loggedInUserId,
  content,
  date,
  commentCount,
}: PostCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDelete = () => {
    dispatch(deletePost({ postId, userId: loggedInUserId! }));
    handleCloseModal();
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
        onEdit={() => {
          /* handle edit */
        }}
        handleDelete={handleOpenModal} // Pass handleOpenModal to PostHeader
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
