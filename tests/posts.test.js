const app = require('../index.js')
const request = require('supertest');
const Post = require('../models/Post.js');

describe("testing/post", () => {

  const post = {
    title: "post1",
    body: "prueba1",
  };

  test("Create a post", async () => {
    let postsCount = await Post.countDocuments({});
    expect(postsCount).toBe(0);

    resPost = await request(app).post("/posts/create").send(post).expect(201);
    expect(resPost.body.title).toBe('post1');
    expect(resPost.body.body).toBe('prueba1');

    postsCount = await Post.countDocuments({});
    expect(postsCount).toBe(1);

    
    });

  // POR TERMINAR !!!!
  // test("Get all posts", async () => {

  //   resPost = await request(app).get("/posts/").expect(201);

  //   postsCount = await Post.countDocuments({});
  //   expect(postsCount).toBe(Array);

    
  // })

  afterAll(() => {
    return Post.deleteMany();
  });
    
  
});


  