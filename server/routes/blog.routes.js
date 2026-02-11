const express = require('express');
const router = express.Router();
const Blog = require('../models/blog.model');
const { upload, cloudinary } = require('../config/cloudinary');

// GET /api/blogs -> Fetch published blogs for public site
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'Published' }).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/admin/blogs -> Fetch all blogs for dashboard
router.get('/admin/all', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/blogs/:id -> Fetch single blog
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/blogs -> Create blog with image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, description, content, status } = req.body;
        const blogData = {
            title,
            description,
            content,
            status: status || 'Draft'
        };

        if (req.file) {
            blogData.imageUrl = req.file.path;
            blogData.cloudinaryId = req.file.filename;
        }

        const blog = new Blog(blogData);
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/blogs/:id -> Update blog
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, description, content, status } = req.body;
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.content = content || blog.content;
        blog.status = status || blog.status;

        if (req.file) {
            // Delete old image from cloudinary if it exists
            if (blog.cloudinaryId) {
                await cloudinary.uploader.destroy(blog.cloudinaryId);
            }
            blog.imageUrl = req.file.path;
            blog.cloudinaryId = req.file.filename;
        }

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/blogs/:id -> Delete blog
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        if (blog.cloudinaryId) {
            await cloudinary.uploader.destroy(blog.cloudinaryId);
        }

        await blog.deleteOne();
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
