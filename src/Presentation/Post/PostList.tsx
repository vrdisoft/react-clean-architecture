import { Paper, Button, Box, Collapse, Pagination } from "@mui/material";
import { AiOutlinePlus, } from 'react-icons/ai'

import { useFetchPosts } from "@/Domain/UseCases/useFetchPosts";
import { PostRepositoryImpl } from "@/Data/Repositories/PostRepositoryImpl";
import { PostDataSourceImpl } from "@/Data/DataSources/Post/PostDataSourceImpl";
import { Loading } from "@/Presentation/UI/Components/Loading";
import { useState } from "react";
import { PostItem } from "./PostItem";
import { AddEditPost } from "./AddEditPost";
import { useNavigate, useParams } from "react-router-dom";

const PAGE_SIZE = 4
const PostList = () => {
  const [showAddPost, setShowAddPost] = useState(false);
  const { page: currentPage } = useParams()
  const navigate = useNavigate()
  const { posts, total, isFetchPostsLoading } = useFetchPosts(
    new PostRepositoryImpl(new PostDataSourceImpl()),
    currentPage ? Number(currentPage) : 1
  );
  const pageCount = Math.ceil((total ?? 0) / PAGE_SIZE)
  const onChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    if (page > 1) {
      navigate(`/posts/${page}`)
    } else {
      navigate(`/`)
    }
  }

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
              p: 3,
              borderRadius: "16px",
            }}
          >
            {(currentPage === '1' || !currentPage) && <Button
              variant="text"
              color="warning"
              size="small"
              startIcon={<AiOutlinePlus size={16}/>}
              onClick={() => { setShowAddPost(true) }}
              disabled={showAddPost}
            >
              Add Post
            </Button>}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Collapse in={showAddPost}>
                <AddEditPost onShowAddPost={(show: boolean) => { setShowAddPost(show) }} />
              </Collapse>
              {posts?.map((post) => (
                <PostItem item={post} key={post.id} />
              ))}
            </Box>
            {pageCount > 1 && <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
              <Pagination count={pageCount} onChange={onChangePage} page={currentPage ? Number(currentPage) : 1} />
            </Box>}
          </Paper>
        </>
      )}
    </>
  );
}

export default PostList