import { createServer, Model } from "miragejs";
const PAGE_SIZE = 4;
createServer({
  models: {
    post: Model,
  },
  routes() {
    this.namespace = "api";

    this.get("/posts", (schema, request) => {
      const { page } = request?.queryParams;
      const startPage = (Number(page) - 1) * PAGE_SIZE;
      const endPage = Number(page * PAGE_SIZE);
      const posts = schema.posts.all().models.map((model) => model.attrs);

      return {
        posts: posts.reverse().slice(startPage, endPage),
        total: posts.length,
      };
    });

    this.post("/posts", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const data = localStorage.getItem("posts");
      localStorage.setItem(
        "posts",
        JSON.stringify(data ? [...JSON.parse(data), attrs] : [attrs])
      );

      return schema.posts.create({
        ...attrs,
      });
    });

    this.get("/posts/:id", (schema, request) => {
      const id = request.params.id;
      return schema.posts.find(id);
    });

    this.put("posts/:id", (schema, request) => {
      const newAttrs = JSON.parse(request.requestBody);
      const id = request.params.id;
      let post = schema.posts.find(id);
      const posts = schema.posts.all().models.map((model) => model.attrs);
      const findIndex = posts.findIndex((post) => post.id === id);
      if (findIndex >= 0) {
        posts[findIndex] = newAttrs;
      }

      localStorage.setItem("posts", JSON.stringify([...posts]));

      return post.update(newAttrs);
    });

    this.delete("posts/:id", (schema, request) => {
      const id = request.params.id;
      const data = localStorage.getItem("posts");
      const posts = JSON.parse(data);
      const newPosts = posts?.filter((post)=> post.id !== id);
      localStorage.setItem("posts", JSON.stringify([...newPosts]));
      return schema.posts.find(id).destroy();
    });
  },

  seeds(server) {
    const localPosts = localStorage.getItem("posts");
    if (localPosts) {
      JSON.parse(localPosts)?.forEach((item) => {
        server.create("post", {
          id: item?.id,
          title: item?.title,
          body: item?.body,
          userId: item?.userId,
        });
      });
    } else {
      const data = [
        {
          id: 1,
          title: "tempora rem veritatis voluptas quo dolores vero",
          body: "facere qui nesciunt est voluptatum voluptatem nisi sequi eligendi necessitatibus ea at rerum itaque harum non ratione velit laboriosam quis consequuntur ex officiis minima doloremque voluptas ut aut",
          userId: 1,
        },
        {
          id: 2,
          title: "laudantium voluptate suscipit sunt enim enim",
          body: "ut libero sit aut totam inventore sunt porro sint qui sunt molestiae consequatur cupiditate qui iste ducimus adipisci dolor enim assumenda soluta laboriosam amet iste delectus hic",
          userId: 1,
        },
        {
          id: 3,
          title: "odit et voluptates doloribus alias odio et",
          body: "est molestiae facilis quis tempora numquam nihil qui voluptate sapiente consequatur est qui necessitatibus autem aut ipsa aperiam modi dolore numquam reprehenderit eius rem quibusdam",
          userId: 1,
        },
        {
          id: 4,
          title: "eum et est occaecati",
          body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
          userId: 1,
        },
      ];

      data.forEach((item) => {
        server.create("post", {
          id: item?.id,
          title: item?.title,
          body: item?.body,
          userId: item?.userId,
        });
      });
      localStorage.setItem("posts", JSON.stringify(data));
    }
  },
});
