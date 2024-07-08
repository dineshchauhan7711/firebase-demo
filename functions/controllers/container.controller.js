// Helpers/Files
const response = require('../helpers/response');
const validator = require('../helpers/validator');

// Collections
const { db } = require('../connection/initialize_firebase');
const Container = db.collection("containers");
const Sidebar = db.collection("sidebar_lists");
const Images = db.collection("images");


/**
 * Add Container
 **/
const AddContainer = async (req, res) => {
     try {
          const validation = new validator(req.body, {
               name: 'required|string|uppercase',
               sidebar_id: 'required|string',
          });
          if (validation.fails()) {
               const firstMessage = Object.keys(validation.errors.all())[0];
               return response.error(res, validation.errors.first(firstMessage));
          };
          const { name, sidebar_id } = req.body;

          // Check if the sidebar list exists
          const sidebarSnapshot = await Sidebar.doc(sidebar_id).get();
          if (!sidebarSnapshot.exists) {
               return response.error(res, 2004);
          };

          // Check if the title already exists
          const snapshot = await Container.where("name", "==", name).get();
          if (!snapshot.empty) {
               return response.error(res, 3005);
          };

          // Add the sidebar list with created_at timestamp
          await Container.add({
               sidebar_id,
               name,
               created_at: new Date(),
               updated_at: new Date()
          });
          return response.success(res, 3001);
     } catch (error) {
          console.error('Error ===>> ', error);
          return response.error(res, 9999);
     }
};

/**
 * Get Containers
 */
const GetContainers = async (req, res) => {
     try {
          const validation = new validator(req.query, {
               sidebar_id: 'required|string',
          });
          if (validation.fails()) {
               const firstMessage = Object.keys(validation.errors.all())[0];
               return response.error(res, validation.errors.first(firstMessage));
          };

          const { sidebar_id } = req.query;

          // Check if the sidebar list exists
          const sidebarSnapshot = await Sidebar.doc(sidebar_id).get();
          if (!sidebarSnapshot.exists) {
               return response.error(res, 2004);
          };

          // Fetch containers with selected fields
          const containerSnapshot = await Container
               .where("sidebar_id", "==", sidebar_id)
               .orderBy("created_at", "asc")
               .select("name", "description")
               .get();

          if (containerSnapshot.empty) {
               return response.success(res, 3002, []);
          };

          // Fetch images for each container in parallel
          const containersData = await Promise.all(containerSnapshot.docs.map(async (containerDoc) => {
               const containerData = {
                    id: containerDoc.id,
                    ...containerDoc.data(),
                    images: []
               };

               // Fetch images associated with the current container
               const imagesSnapshot = await Images
                    .where("container_id", "==", containerDoc.id)
                    .orderBy("created_at", "asc")
                    .select("name", "url")
                    .get();

               // Add image data to containerData
               containerData.images = imagesSnapshot.docs.map(imageDoc => ({
                    id: imageDoc.id,
                    ...imageDoc.data()
               }));

               return containerData;
          }));

          // Send successful response with containers and their images
          return response.success(res, 3002, containersData);
     } catch (error) {
          console.log('error =====>>> ', error);
          response.error(res, 9999);
     }
};



module.exports = {
     AddContainer,
     GetContainers
}




