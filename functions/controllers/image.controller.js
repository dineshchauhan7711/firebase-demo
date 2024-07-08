// Helpers/Files
const response = require('../helpers/response');
const validator = require('../helpers/validator');

// Collections
const { db } = require('../connection/initialize_firebase');
const Container = db.collection("containers");
const Images = db.collection("images");


/**
 * Upload Images
 **/
const uploadImages = async (req, res) => {
     try {
          const validation = new validator(req.body, {
               container_id: 'required|string',
               images: 'required|array',
               "images.*.name": 'required|string',
               "images.*.url": 'required|string',
          });
          if (validation.fails()) {
               const firstMessage = Object.keys(validation.errors.all())[0];
               return response.error(res, validation.errors.first(firstMessage));
          };
          const { container_id, images } = req.body;

          // Check if the sidebar list exists
          const containerSnapshot = await Container.doc(container_id).get();
          if (!containerSnapshot.exists) {
               return response.error(res, 3004);
          };

          images.forEach(async (image) => {
               // Add the image with created_at timestamp
               await Images.add({
                    container_id,
                    name: image.name,
                    url: image.url,
                    created_at: new Date(),
                    updated_at: new Date()
               });
          });

          return response.success(res, 3006);
     } catch (error) {
          console.error('Error ===>> ', error);
          return response.error(res, 9999);
     }
};

/**
 * Get Images
 */
const GetContainerImages = async (req, res) => {
     try {
          const validation = new validator(req.query, {
               container_id: 'required|string',
          });
          if (validation.fails()) {
               const firstMessage = Object.keys(validation.errors.all())[0];
               return response.error(res, validation.errors.first(firstMessage));
          };

          const { container_id } = req.query;

          // Fetch all documents from the "images" collection
          const querySnapshot = await Images
               .where("container_id", "==", container_id)
               .orderBy("created_at", "asc")
               .get();

          const responseData = querySnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data()
          }));

          // Send successful response
          return response.success(res, 3009, responseData);
     } catch (error) {
          console.log('error =====>>> ', error);
          response.error(res, 9999);
     }
};




module.exports = {
     uploadImages,
     GetContainerImages
}



