
import { Layout } from "../Components/Layout";
import { lazy, Suspense } from "react"
import { Loading } from "@/Core/components/loading"

const PostList = lazy(() => import("@/Presentation/Post/PostList"))

export const PostsPage = () => {
  return (
    <Layout>
      <main>
        <h1>Post List</h1>
        <Suspense fallback={<Loading />}>
          <PostList />
        </Suspense>
      </main>
    </Layout>
  );
}
