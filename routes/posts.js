const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Crear una publicación
router.post('/create', async (req, res) => {
  try { 
    const post = await Post.create(req.body);
    res.status(201).send(post);
  } catch (error){
      res.status(500).send({message: "There was a problem trying to create a post"});
  }

});

// Obtener todas las publicaciones
router.get('/', async (req, res) => {
  try { 
    const posts = await Post.find();
    res.status(201).send(posts);
  } catch (error){
      res.status(500).send({message: "There was a problem trying to get all posts"});
  }
  
});

// Obtener una publicación por ID
router.get('/id/:_id', async (req, res) => {
  try { 
    const post = await Post.findById(req.params._id);

    if(!post){
      return res.status(404).send({message: "post not found"})
    }
    res.status(201).send(post);
  } catch (error){
      res.status(500).send({message: "There was a problem trying to get the post by ID"});
  }
});


// Obtener una publicación por título
router.get('/title/:title', async (req, res) => {
  try { 
    const post = await Post.findOne({title: req.params.title});

    if(!post){
      return res.status(404).send({message: "post not found"})
    }
    res.status(201).send(post);
  } catch (error){
      res.status(500).send({message: "There was a problem trying to get the post by title"});
  }
});

// Actualizar una publicación
router.put('/id/:id', async (req, res) => {
  try { 
    const {title, body} = req.body;

    const post = await Post.findByIdAndUpdate(req.params.id);
    
    if(!post){
      return res.status(404).send({message: "post not found"})
    }

    post.title = title;
    post.body = body;

    const updatedPost = await post.save();
    res.status(201).send(updatedPost);
  } catch (error){
      res.status(500).send({message: "There was a problem trying to update the post"});
  }
});


// Eliminar una publicación
router.delete('/id/:id', async (req, res) => {
  try { 
    const post = await Post.findByIdAndDelete(req.params.id);
    if(!post){
      return res.status(404).send({message: "post not found"})
    }
    res.status(201).send(post);
  } catch (error){
      res.status(500).send({message: "There was a problem trying to delete the post"});
  }
});

//Obtener publicaciones con paginación FALTA TERMINAR !!!!
router.get('/postsWithPagination/:page', async (req, res) => {
  try {
    // const page = req.params.page
    const skip = 0;
    const limit = 10;
    // if (page > 0) {
    //   skip = (page -1) * limit;
    // }
    const posts = await Post.find().skip(skip).limit(limit);
    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({ message: "There was a problem trying to get the posts" });
  }
});

module.exports = router;
