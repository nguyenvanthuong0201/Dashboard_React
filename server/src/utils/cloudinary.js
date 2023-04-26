import cloudinary from 'cloudinary';
export const uploadImageCloud = async (imagePath, key = '') => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: "Life",
    };
    if (key != '') {
        options.width = 250;
        options.crop = 'scale';
    }
    try {
        // Upload the image
        const result = await cloudinary.v2.uploader.upload(imagePath, options);
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const DeleteImageCloud = async (public_id) => {
    try {
        const result = await cloudinary.v2.uploader.destroy(public_id);
        return result;
    } catch (error) {
        console.error(error);
    }
}