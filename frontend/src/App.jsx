import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SingleBlog from './pages/SingleBlog';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import AddNewPost from './pages/admin/AddNewPost';
import ManageItems from './pages/admin/ManageItems';
import Users from './pages/admin/Users';
import AdminLayout from './pages/admin/AdminLayout';
import PrivateRoute from './components/PrivateRoute';
import UpdatePost from './pages/admin/UpdatePost';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="blog/:id" element={<SingleBlog />} />
        
        {/* Admin layout with nested routes */}
        <Route path="dashboard" element={<PrivateRoute><AdminLayout/></PrivateRoute> }>
          {/* Nested routes under AdminLayout */}
          <Route index element={<Dashboard />} /> {/* Default route for /dashboard */}
          <Route path="add-new-post" element={<AddNewPost />} />
          <Route path="manage-items" element={<ManageItems />} />
          <Route path="users" element={<Users />} />
          <Route path="update-items/:id" element={<UpdatePost />} />
        </Route>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;
