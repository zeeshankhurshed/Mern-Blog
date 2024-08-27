import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        // Combine first and last name to create a username
        const username = `${firstName} ${lastName}`;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            username,  // Use the combined username
            role: 'user' // Assign the 'admin' role or customize as needed
        });
        
        // console.log("New user role:", newUser.role); // Debugging line

        // Generate JWT token
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id, role: newUser.role }, // Ensure role is included
            SECRET_KEY,
            { expiresIn: '1h' } // Set the token to expire in 1 hour
        );

        // Send response
        res.status(200).json({ message: "User registered successfully", user: newUser, token });
    } catch (error) {
        console.error('Failed to register:', error);
        res.status(500).json({ message: "Registration failed" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Send response with user data and token
        res.status(200).json({message:"User login successfully", user: existingUser, token });
    } catch (error) {
        console.error('Failed to login:', error);
        res.status(500).json({ message: "Login failed" });
    }
};

export const logout = (req, res) => {
    try {
        // Clear the cookie where the token is stored
        res.clearCookie('token'); // Use clearCookie to remove the cookie

        // Send success response
        res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
        // Log error and send failure response
        console.error("Failed to logout", error);
        res.status(500).json({ message: "Logout Failed!" });
    }
};


export const getAllUsers=async(req,res)=>{
    try {
        const existingUser=await User.find({},'id email role')
        res.status(200).json({message:"Users found successfully",existingUser})
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
}

export const deleteUsers = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        const existingUser = await User.findByIdAndDelete(id); // Delete the user by ID
        if (!existingUser) { // Check if user was found and deleted
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
};

export const updateUser=async(req,res)=>{
    const {id}=req.params;
    const {role}=req.body;
    try {
        const existingUser=await User.findByIdAndUpdate(id,{role},{new:true});

        if(!existingUser){
            return res.status(404).json({message:'User not find'});
        }
        res.status(200).json({message:'User role updated successfully',existingUser})
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).json({ message: "Failed to update user" });
    }
}