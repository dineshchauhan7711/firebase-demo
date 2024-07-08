// Helpers/Files
const response = require('../helpers/response');
const validator = require('../helpers/validator');

// Collections
const { db } = require('../connection/initialize_firebase');
const Sidebar = db.collection("sidebar_lists");


/**
 * Add sidebar list
 */
const AddSidebar = async (req, res) => {
     const validation = new validator(req.body, {
          title: 'required|string|uppercase',
     });
     if (validation.fails()) {
          const firstMessage = Object.keys(validation.errors.all())[0];
          return response.error(res, validation.errors.first(firstMessage));
     };
     try {
          const { title } = req.body;

          // Check if the title already exists
          const snapshot = await Sidebar.where("title", "==", title).get();
          if (!snapshot.empty) {
               return response.error(res, 2005);
          };

          // Add the sidebar list with created_at timestamp
          await Sidebar.add({
               title,
               created_at: new Date(),
               updated_at: new Date()
          });
          return response.success(res, 2001);
     } catch (error) {
          console.error('Error ===>> ', error);
          return response.error(res, 9999);
     }
};

/**
 * Get sidebar list
 */
const GetSidebarList = async (req, res) => {
     try {
          // Fetch all documents from the "sidebar_lists" collection
          const querySnapshot = await Sidebar
               .orderBy("created_at", "asc")
               .select("title")
               .get();

          const responseData = querySnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data()
          }));

          // Send successful response
          return response.success(res, 2002, responseData);
     } catch (error) {
          console.log('error =====>>> ', error);
          response.error(res, 9999);
     }
};

module.exports = { AddSidebar, GetSidebarList };
