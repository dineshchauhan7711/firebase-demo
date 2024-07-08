const MESSAGES = {

    // User Authentication
    '1001': 'Register successfully',
    '1002': 'Sign in successfully',
    '1003': 'Get profile successfully',
    '1004': 'Already registered with this email !',
    '1005': 'Please enter correct email and password',
    '1006': 'Logout successfully',
    '1007': 'User not found!',
    '1008': 'Profile updated successfully!',

    // Sidebar
    '2001': 'Sidebar added successfully',
    '2002': 'Get sidebar successfully',
    '2003': 'Sidebar deleted successfully',
    '2004': 'Sidebar not found, please select valid',
    '2005': 'Title already exists, please enter different title',

    // Container
    '3001': 'Container added successfully',
    '3002': 'Get container successfully',
    '3003': 'Container deleted successfully',
    '3004': 'Container not found, please select valid',
    '3005': 'Container name already exists, please enter different name',
    '3006': 'Images uploaded successfully',
    '3007': 'Image deleted successfully',
    '3008': 'Image not found, please select valid',
    '3009': 'Get image successfully',

    // Common
    '9000': 'Please Enter Valid data!',
    '9001': 'Not found',
    '9999': 'Something went wrong!',
}

module.exports.getMessage = function (messageCode) {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};
