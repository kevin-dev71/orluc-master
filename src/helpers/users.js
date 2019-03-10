const User = require('../models/User');

module.exports = {

    totalUsers: async () => {
        return await User.countDocuments();
    }
    
}