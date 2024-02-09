import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import Icon from "@/Core/components/icon/Icon";
import { Post } from "@/Domain/Models/Post";
import { Stack } from "@mui/material";

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

  const onDeletPost = () => {

  }

  return (
    <Paper
      sx={{
        borderRadius: "16px",
        backgroundColor: "action.selected",
        boxShadow: "none",
        padding: "16px",
      }}
    >
      <Grid container spacing={1}>
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
                startIcon={<Icon variation="Edit" />}
                size="small"
                onClick={onClickEditPost}
                disabled={showEditPost}
              >
                edit
              </Button>
              <Button
                variant="text"
                color="error"
                startIcon={<Icon variation="Delete" />}
                size="small"
                onClick={handleOpenModal}
              >
                {"delete"}
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Collapse in={showEditPost}>
        {/* <AddPost
          onShowAddPost={(show: boolean) => { setShowEditPost(show) }}
          PostItem={item}
        /> */}
      </Collapse>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {"areYouSure"}
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
      </Modal>
    </Paper>
  );
}
