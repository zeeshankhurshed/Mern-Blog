import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const commentApi=createApi({
    reducerPath:'commentApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3300/comment',
        credentials:'include',
    }),
    tagTypes:['Comments'],
    endpoints:(builder)=>({
        postComment:builder.mutation({
            query:(commentData)=>({
                url:"/create",
                method:"POST",
                body:commentData,
            }),
            invalidatesTags:(result,error,{postId})=>[{type:'Comments',id:postId}]
        }),
        getComments:builder.query({
            query:()=>({
                url:'/getAll',
                method:'GET',
            })
        })
    })
})


export const {useGetCommentsQuery,usePostCommentMutation}=commentApi;

export default commentApi;