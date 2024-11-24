const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// exports.registerUser = async (req, res) => {
//     const { email, password, name, mobileNumber, socialLinks, city, profilePhoto } = req.body;

//     try {
//         // Validate input
//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required' });
//         }

//         // Check if the email is already registered
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: 'Email is already registered' });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create the user
//         const user = new User({
//             email,
//             password: hashedPassword, // Save the hashed password
//             name: name || '', // Optional fields can be empty initially
//             mobileNumber: mobileNumber || '',
//             socialLinks: socialLinks || [],
//             city: city || '',
//             profilePhoto: profilePhoto || '',
//         });

//         // Save the user in the database
//         await user.save();

//         // Respond with the created user (excluding password)
//         res.status(201).json({
//             message: 'User registered successfully',
//             user: {
//                 id: user._id,
//                 email: user.email,
//                 name: user.name,
//                 mobileNumber: user.mobileNumber,
//                 socialLinks: user.socialLinks,
//                 city: user.city,
//                 profilePhoto: user.profilePhoto,
//             },
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred during registration' });
//     }
// };

exports.registerUser = async (req, res) => {
    const { email, password, name } = req.body;
  
    try {
      // Validate required input
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
      }
  
      // Check if the email is already registered
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create the user with initial data
      const user = new User({
        email,
        password: hashedPassword, // Save hashed password
        name,
      });
  
      await user.save();
  
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred during registration' });
    }
  };
  // Update user profile, including additional details and photo upload
exports.updateProfile = async (req, res) => {
    const { mobileNumber, socialLinks, city } = req.body;
  
    try {
      // Find the user by ID from the authenticated user
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Upload profile photo to Cloudinary if provided
      let profilePhotoUrl = user.profilePhoto;
      if (req.file) {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
          folder: 'user_profile_photos',
        });
        profilePhotoUrl = cloudinaryResponse.secure_url;
      }
  
      // Update user details
      user.mobileNumber = mobileNumber || user.mobileNumber;
      user.socialLinks = socialLinks || user.socialLinks;
      user.city = city || user.city;
      user.profilePhoto = profilePhotoUrl;
  
      await user.save();
  
      res.status(200).json({
        message: 'Profile updated successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          mobileNumber: user.mobileNumber,
          socialLinks: user.socialLinks,
          city: user.city,
          profilePhoto: user.profilePhoto,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the profile' });
    }
  };
  
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                mobileNumber: user.mobileNumber,
                socialLinks: user.socialLinks,
                city: user.city,
                profilePhoto: user.profilePhoto,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};
