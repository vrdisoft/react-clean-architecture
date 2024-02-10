import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useForm, FormProvider } from 'react-hook-form';

import { Post } from "@/Domain/Models/Post";
import { TextFieldController } from "@/Presentation/UI/Components/TextFieldController";
import { useCreatePost } from "@/Domain/UseCases/useCreatePost";
import { PostRepositoryImpl } from "@/Data/Repositories/PostRepositoryImpl";
import { PostDataSourceImpl } from "@/Data/DataSources/Post/PostDataSourceImpl";
import { useUpdatePost } from "@/Domain/UseCases/useUpdatePost";

type FormValues = Post

type AddEditPostProps = {
  onShowAddPost: (show: boolean) => void;
  postItem?: Post;
}

export function AddEditPost({ onShowAddPost, postItem }: AddEditPostProps) {
  const formProvider = useForm<FormValues>({ mode: "onChange", reValidateMode: "onSubmit" });
  const { handleSubmit, formState, reset } = formProvider

  const createPost = useCreatePost(
    new PostRepositoryImpl(new PostDataSourceImpl())
  );

  const updatePost = useUpdatePost(
    new PostRepositoryImpl(new PostDataSourceImpl())
  );

  React.useEffect(() => {
    if (postItem) {
      reset({ title: postItem.title, body: postItem.body, id: postItem.id, userId: postItem.userId });
    }
  }, [postItem]);


  const onSubmit = (data: FormValues) => {
    if (postItem) {
      updatePost.mutate(
        { ...data },
        {
          onSuccess: () => {
            resetForm()
          },
        }
      );
    }
    else {
      createPost.mutate(
        { ...data },
        {
          onSuccess: () => {
            resetForm()
          },
        }
      );
    }

  };

  const onCancel = () => {
    resetForm();
  }

  const resetForm = () => {
    reset({ title: "", body: "" });
    onShowAddPost(false);
  }

  return (
    <Paper
      sx={{
        mt: 2,
        borderRadius: "16px",
        backgroundColor: "action.disabled",
        boxShadow: "none",
        p: 2,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            margin: 0,
            fontWeight: "500",
            fontSize: "0.75rem",
            lineHeight: "1.57",
          }} >
          {` ${postItem ? "Edit Post" : "Add Post"} `}
        </Typography>
      </Box>
      <FormProvider {...formProvider}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} >
              <TextFieldController name="title"
                rules={{
                  required: { value: true, message: 'title is required' },
                }}
                size="small"
                label="Title"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} >
              <TextFieldController name="body"
                rules={{
                  required: { value: true, message: 'body is required' },
                }}
                size="small"
                label="Body"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              padding: 0,
              gap: "8px",
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
              onClick={onCancel}
            >
              {"cancel"}
            </Button>
            <Button
              variant="contained"
              color="warning"
              disabled={!formState.isValid}
              type="submit"
              sx={{
                fontWeight: "500",
                fontSize: "0.696429rem",
                lineHeight: "1.75",
              }}
              size="small"

            >
              {` ${postItem ? "edit Post" : "submit Post"} `}
            </Button>
          </Box>
        </form>
      </FormProvider >
    </Paper>
  );
}

