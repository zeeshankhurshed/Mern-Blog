import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const authApi=createApi({
reducerPath:'authApi',
baseQuery:fetchBaseQuery({
    baseUrl:"http://localhost:3300/user/",
    credentials:'include',
}),

endpoints:(builder)=>({
    registerUser:builder.mutation({
        query:(newUser)=>({
            url:'/register',
            method:"POST",
            body:newUser,
        })
    }),
    loginUser:builder.mutation({
        query:(credentials)=>({
            url:"/login",
            method:"POST",
            body:credentials,
        })
    }),
    logoutUser:builder.mutation({
        query:()=>({
            url:"/logout",
            method:"POST",
        })
    }),
    getUsers:builder.query({
        query:()=>({
            url:"/getAll",
            method:"GET"
        }),
        refetchOnMount:true,
        invalidatesTags:['User']
    }),
    deleteUser: builder.mutation({
        query: (userId) => ({
          url: `/delete/${userId}`,
          method: "DELETE",
        }),
      }),
    updateUserRole:builder.mutation({
        query:({userId,role})=>({
            url:`/update/${userId}`,
            method:"PATCH",
            body:{role},
        }),
        refetchOnMount:true,
        invalidatesTags:['User']
    })
})
})

export const {useRegisterUserMutation,useLoginUserMutation,useLogoutUserMutation,useGetUsersQuery,useDeleteUserMutation,useUpdateUserRoleMutation}=authApi;

export default authApi;