import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3300/blog/', 
    credentials: 'include',
  }),
  tagTypes: ['Blogs'],  // Correctly defined tagTypes
  endpoints: (builder) => ({
    fetchBlog: builder.query({
      query: ({ search = '', category = '', location = '' }) => 
        `getAll?search=${search}&category=${category}&location=${location}`, 
      providesTags: ['Blogs'],  // Use 'Blogs' as a string
    }),
    fetchBlogById: builder.query({
      query: (id) => `/get/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blogs', id }],  // Tag by ID
    }),
    fetchRelatedBlogs: builder.query({
      query: (id) => `/related/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blogs', id }],
    }),
    postBlog: builder.mutation({
      query: (newBlog) => ({
        url: '/create',
        method: 'POST',
        body: newBlog,
        credentials: 'include',
      }),
      invalidatesTags: ['Blogs'],  // Invalidate the 'Blogs' tag after mutation
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update/${id}`,
        method: "PATCH",
        body: rest,
        credentials: 'include',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],  // Use the correct destructuring
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
        credentials: 'include',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
    }),
    createPost: builder.mutation({
      query: (newPostData) => ({
        url: '/create',
        method: 'POST',
        body: newPostData,
      }),
    }),
  }),
});

export const { 
  useFetchBlogQuery, 
  useFetchBlogByIdQuery, 
  useFetchRelatedBlogsQuery, 
  usePostBlogMutation, 
  useUpdateBlogMutation, 
  useDeleteBlogMutation,
  useCreatePostMutation 
} = blogApi;
