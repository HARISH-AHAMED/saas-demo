const getApiUrl = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    // Remove trailing slash if exists
    url = url.replace(/\/$/, '');
    // Ensure /api is at the end if we are not in localhost (where it might already be included in the default)
    if (!url.endsWith('/api')) {
        url = url + '/api';
    }
    return url;
};

const API_URL = getApiUrl();


export const getPublishedBlogs = async () => {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return response.json();
};

export const getAllBlogs = async () => {
    const response = await fetch(`${API_URL}/blogs/admin/all`);
    if (!response.ok) throw new Error('Failed to fetch admin blogs');
    return response.json();
};

export const getBlogById = async (id) => {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    if (!response.ok) throw new Error('Blog not found');
    return response.json();
};

export const createBlog = async (formData) => {
    const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        body: formData, // FormData handles headers and multipart
    });
    if (!response.ok) throw new Error('Failed to create blog');
    return response.json();
};

export const updateBlogApi = async (id, formData) => {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'PUT',
        body: formData,
    });
    if (!response.ok) throw new Error('Failed to update blog');
    return response.json();
};

export const deleteBlogApi = async (id) => {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete blog');
    return response.json();
};
