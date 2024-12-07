const bcrypt = require('bcrypt');

// Change Admin Password
exports.changeAdminPassword = async (req, res) => {
    try {
        // Check if the logged-in user is the admin
        const adminEmail = 'admin@ex.com';  // Fixed admin email
        const adminPassword = 'admin';      // Fixed admin password

        const { currentPassword, newPassword } = req.body;

        // Check if the logged-in user is the admin
        if (req.user.email !== adminEmail) {
            return res.status(403).json({
                success: false,
                message: 'Only admin can change the password.',
            });
        }

        // Compare the current password with the fixed one
        const isMatch = currentPassword === adminPassword;
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect',
            });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        
        // Update the admin password
        const admin = await User.findOneAndUpdate(
            { email: adminEmail },
            { password: hashedNewPassword },
            { new: true }
        );

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin user not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
