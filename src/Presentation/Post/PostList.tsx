import { Paper, Typography, Button, Box, Collapse } from "@mui/material";
import { useFetchPosts } from "@/Domain/UseCases/useFetchPosts";
import { PostRepositoryImpl } from "@/Data/Repositories/PostRepositoryImpl";
import { PostDataSourceImpl } from "@/Data/DataSources/Post/PostDataSourceImpl";
import Icon from "@/Core/components/icon/Icon";
import { Loading } from "@/Core/components/loading";
import { useState } from "react";
import { PostItem } from "./PostItem";

const PostList = () => {
  const [showAddPost, setShowAddPost] = useState(false);
  const { posts, isFetchPostsLoading } = useFetchPosts(
    new PostRepositoryImpl(new PostDataSourceImpl())
  );

  return (
    <>
      {isFetchPostsLoading ? (
        <Loading />
      ) : (
        <>
          <Paper
            sx={{
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              boxShadow:
                "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px",
              mt: 12,
              p: 6,
              borderRadius: "16px",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                margin: "0px 0px 0.35em",
                fontWeight: "400",
                fontSize: "0.642rem",
                lineHeight: "1.66",
                display: "block",
                color: "rgb(121, 131, 142)",
              }}
            >

            </Typography>
            <Button
              variant="text"
              color="warning"
              size="small"
              startIcon={<Icon variation="Add" />}
              onClick={() => { setShowAddPost(true) }}
              disabled={showAddPost}
            >
              Add Post
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Collapse in={showAddPost}>
                {/* <AddPost onShowAddPost={(show: boolean) => { setShowAddPost(show) }} /> */}
              </Collapse>
              {posts?.map((post) => (
                <PostItem item={post} key={post.id} />
              ))}
            </Box>
          </Paper>
        </>
      )}
    </>
  );
}

export default PostList