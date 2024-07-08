// Helpers/Files
const response = require('../helpers/response');
const validator = require('../helpers/validator');

// Collections
const { db } = require('../connection/initialize_firebase');
const Playlist = db.collection("playlists");
const Images = db.collection("images");


/**
 * Add Image To Playlist
 **/
const AddImageToPlaylist = async (req, res) => {
     try {
          const validation = new validator(req.body, {
               image_id: 'required|string',
          });
          if (validation.fails()) {
               const firstMessage = Object.keys(validation.errors.all())[0];
               return response.error(res, validation.errors.first(firstMessage));
          };
          const { image_id } = req.body;

          // Check if the image exists
          const imageSnapshot = await Images.doc(image_id).get();
          if (!imageSnapshot.exists) {
               return response.error(res, 3008);
          };

          // Check if image is already in playlist
          const playlistSnapshot = await Playlist
               .where("image_id", "==", image_id)
               .get();
          if (!playlistSnapshot.empty) {
               return response.error(res, 4007);
          };

          // Add the sidebar list with created_at timestamp
          await Playlist.add({
               image_id,
               created_at: new Date(),
               updated_at: new Date()
          });
          return response.success(res, 4005);
     } catch (error) {
          console.error('Error ===>> ', error);
          return response.error(res, 9999);
     }
};

/**
 * Get Playlists
 **/
const GetPlaylists = async (req, res) => {
     try {
          // Fetch Playlists with selected fields
          const playlistSnapshot = await Playlist
               .orderBy("created_at", "asc")
               .select("image_id")
               .get()

          if (playlistSnapshot.empty) {
               return response.success(res, 4002, []);
          };

          // Fetch images for each playlist.
          const playlistData = await Promise.all(playlistSnapshot.docs.map(
               async (doc) => {
                    const imageSnapshot = await Images
                         .doc(doc.data().image_id)
                         .get();
                    return {
                         id: doc.id,
                         ...doc.data(),
                         name: imageSnapshot.data().name || null,
                         url: imageSnapshot.data().url || null
                    };
               }
          ));

          // Send successful response.
          return response.success(res, 4002, playlistData);
     } catch (error) {
          console.log('error =====>>> ', error);
          response.error(res, 9999);
     }
};

module.exports = {
     AddImageToPlaylist,
     GetPlaylists
}




