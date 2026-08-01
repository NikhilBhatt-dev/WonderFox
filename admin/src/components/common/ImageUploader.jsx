import { useState } from "react";
import { uploadImage } from "../../services/upload.service";
import toast from "react-hot-toast";

const ImageUploader = ({ onUpload }) => {

    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));

        try {

            setLoading(true);

            const image = await uploadImage(file);

            onUpload(image);

            toast.success("Image uploaded");

        } catch (error) {

            toast.error("Upload failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            {preview && (

                <img
                    src={preview}
                    alt=""
                    className="mb-4 h-40 w-40 rounded-lg object-cover"
                />

            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
            />

            {loading && (
                <p className="mt-2 text-sm">
                    Uploading...
                </p>
            )}

        </div>

    );

};

export default ImageUploader;