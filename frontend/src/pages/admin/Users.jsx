import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../../redux/features/auth/authApi';
import { MdModeEdit } from 'react-icons/md';
import UpdateUser from './UpdateUser';

const ManageUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const[isModelOpen,setIsModelOpen]=useState(false);
  const { data = {}, error, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const existingUser = data.existingUser || [];

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      alert('User deleted successfully');
      refetch(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };
  const handleEdit=(user)=>{
    setSelectedUser(user);
    setIsModelOpen(true)
  }
  const handleCloseModal=()=>{
    setIsModelOpen(false);
    setSelectedUser(null)
  }
  return (
    <>
      {isLoading && <div className="text-center py-4">Loading...</div>}
      {error && <div className="text-center py-4 text-red-500">Error loading users</div>}
      
      <section className="py-6 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
            <div className="rounded-t-lg mb-0 px-4 py-3 border-0 bg-blue-500 text-white">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg">All Users</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button className="bg-indigo-600 text-white active:bg-indigo-700 text-xs font-bold uppercase px-3 py-1 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    See all
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                  <tr className="text-left bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                    <th className="px-6 py-3 border-b border-gray-300">No</th>
                    <th className="px-6 py-3 border-b border-gray-300">Email</th>
                    <th className="px-6 py-3 border-b border-gray-300">Role</th>
                    <th className="px-6 py-3 border-b border-gray-300">Edit or Manage</th>
                    <th className="px-6 py-3 border-b border-gray-300">Delete</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {existingUser.length > 0 ? (
                    existingUser.map((user, index) => (
                      <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`rounded-full py-[2px] px-3 ${user?.role === 'admin'? "bg-indigo-500 text-white uppercase text-xs font-semibold":"bg-amber-300 txt-white uppercase text-xs font-semibold"}`}>

                          {user.role}
                          </span>
                          </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/dashboard/update-user/${user._id}`} className=" flex text-blue-500 hover:text-blue-700">
                            <MdModeEdit size={20} /><span>Edit</span>
                          </Link>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button onClick={()=>handleEdit(user)} className=" flex text-blue-500 hover:text-blue-700">
                            <MdModeEdit size={20} /><span>Edit</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {
        isModelOpen && <UpdateUser user={selectedUser} onClose={handleCloseModal} onRoleUpdate={refetch}/>
      }
    </>
  );
};

export default ManageUsers;
