import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { AiOutlineEdit,AiFillDelete } from 'react-icons/ai'

import { Post } from "@/Domain/Models/Post";
import { Stack } from "@mui/material";
import { AddEditPost } from "./AddEditPost";
import { useDeletePost } from "@/Domain/UseCases/useDeletePost";
import { PostRepositoryImpl } from "@/Data/Repositories/PostRepositoryImpl";
import { PostDataSourceImpl } from "@/Data/DataSources/Post/PostDataSourceImpl";

type PostItemProps = {
  item: Post;
}

export function PostItem({ item }: PostItemProps) {
  const [showEditPost, setShowEditPost] = React.useState(false);
  const onClickEditPost = () => {
    setShowEditPost(true);
  }
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const deletePost = useDeletePost(
    new PostRepositoryImpl(new PostDataSourceImpl())
  );

  const onDeletPost = () => {
    deletePost.mutate(
      { ...item },
      {
        onSuccess: () => {
          handleCloseModal()
        },
      }
    );
  }

  return (
    <Paper
      sx={{
        borderRadius: "16px",
        backgroundColor: "action.selected",
        boxShadow: "none",
        p: 2,
      }}
    >
      <Collapse in={!showEditPost}>
        {!showEditPost && <Grid container spacing={1}>
          <Grid item >
            <Stack
              sx={{
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  gap: 2,
                }}
              >
                <Typography variant="body1">{item.title}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <Typography variant="caption">{item.body}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <Button
                  variant="text"
                  color="warning"
                  startIcon={<AiOutlineEdit size={16} />}
                  size="small"
                  onClick={onClickEditPost}
                  disabled={showEditPost}
                >
                  edit
                </Button>
                <Button
                  variant="text"
                  color="error"
                  startIcon={<AiFillDelete size={16}/>}
                  size="small"
                  onClick={handleOpenModal}
                >
                  {"delete"}
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>}
      </Collapse>
      <Collapse in={showEditPost}>
        {showEditPost && <AddEditPost
          onShowAddPost={(show: boolean) => { setShowEditPost(show) }}
          postItem={item}
        />}
      </Collapse>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={{
          display: "flex",
          alignItems: "center",
          height: '100dvh',
          justifyContent: "center",
        }}>
          <Box sx={{
            bgcolor: 'GrayText',
            height: 120,
            width: 500,
            p: 2,
            borderRadius: 4
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {"are you sure?"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "20px",
                justifyContent: "end",
              }}
            >
              <Button
                variant="outlined"
                color="warning"
                sx={{
                  fontWeight: "500",
                  fontSize: "0.696429rem",
                  lineHeight: "1.75",
                }}
                size="small"
                onClick={handleCloseModal}
              >
                {"cancel"}
              </Button>
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={onDeletPost}
              >
                {"delete"}
              </Button>
            </Box>
          </Box>
        </Stack>
      </Modal>
    </Paper>
  );
}
