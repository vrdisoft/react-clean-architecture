import { createServer, Model } from "miragejs";

createServer({
  models: {
    post: Model,
  },
  routes() {
    this.namespace = "api";

    this.get("/posts", (schema, request) => {
      const { currentPage } = request?.queryParams;
      const startPage = (Number(currentPage) - 1) * 10;
      const endPage = Number(currentPage * 10);
      const posts = schema.posts.all().models.map((model) => model.attrs);
      
      return {
        posts:  posts,//.slice(startPage, endPage),
        total:  posts.length,
      };
    });

    this.post("/posts", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.posts.create({
        ...attrs.data,
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

      // const posts = schema.posts.all().models.map((model) => model.attrs);
      // const findIndex = posts.findIndex((post) => post.id === id);
      // if (findIndex >= 0) {
      //   posts[findIndex] = newAttrs.data;
      // }

      return post.update(newAttrs.data);
    });

    this.delete("posts/:id", (schema, request) => {
      const id = request.params.id;
      //const posts = schema.posts.all().models.map((model) => model.attrs);

      return schema.posts.find(id).destroy();
    });
  },

  seeds(server) {
    const data = [
      {
        id: 1,
        title: 'tempora rem veritatis voluptas quo dolores vero',
        body: 'facere qui nesciunt est voluptatum voluptatem nisi sequi eligendi necessitatibus ea at rerum itaque harum non ratione velit laboriosam quis consequuntur ex officiis minima doloremque voluptas ut aut',
        userId: 1,
      },
      {
        id: 2,
        title: 'laudantium voluptate suscipit sunt enim enim',
        body: 'ut libero sit aut totam inventore sunt porro sint qui sunt molestiae consequatur cupiditate qui iste ducimus adipisci dolor enim assumenda soluta laboriosam amet iste delectus hic',
        userId: 1,
      },
      {
        id: 3,
        title: 'odit et voluptates doloribus alias odio et',
        body: 'est molestiae facilis quis tempora numquam nihil qui voluptate sapiente consequatur est qui necessitatibus autem aut ipsa aperiam modi dolore numquam reprehenderit eius rem quibusdam',
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
  },
});
