// Helpers/Files
const response = require('../helpers/response');
const validator = require('../helpers/validator');
const { admin } = require("../connection/initialize_firebase");
const ErrorHandling = require('../helpers/firebase_error_handling');


/**
 *  Firebase verify id token middleware
 */
const verifyIdToken = async (req, res, next) => {
     try {
          const validation = new validator(req.headers, {
               authorization: 'required|string',
          }, {
               'required.authorization': 'Unauthorized Users.',
               'string.authorization': 'Unauthorized Users.',
               'min.authorization': 'Unauthorized Users.',
          });
          if (validation.fails()) {
               const firstMessage = Object.keys(validation.errors.all())[0];
               return response.error(res, validation.errors.first(firstMessage), 401);
          };

          const headerToken = req.headers.authorization;
          const decodedToken = await admin.auth().verifyIdToken(headerToken);
          req.user = {
               user_id: decodedToken.user_id,
               role: decodedToken.admin ? "admin" : "user"
          };
          return next();
     } catch (error) {
          console.log('Error :==>> ', error)
          const message = await ErrorHandling(error.code);
          return response.error(res, message, 401);
     }
};

/**
 * Middleware function that checks if the user has the required permission role.
 */
const userPermission = (permissionRoles) => {
     return async function (req, res, next) {
          try {
               const { user: { role } } = req;

               if (!permissionRoles.includes(role)) {
                    return response.error(res, 1012, 401);
               };

               next()
          } catch (error) {
               console.log('error in permission middleware :>> ', error);
               return response.error(res, 9999);
          }
     }
};


module.exports = {
     verifyIdToken,
     userPermission
};

