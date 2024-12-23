import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import editIcon from "/camera.png";
import "./EditProfile.css";

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null); // Store the file
    const [previewImage, setPreviewImage] = useState(""); // For image preview
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUser(userData);
            setName(userData.name);
            setEmail(userData.email);
            setPreviewImage(userData.profileImage || "https://randomuser.me/api/portraits/men/75.jpg");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) { // Check file size (1MB limit)
                toast.error("Image size should not exceed 1MB!");
                return;
            }
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Set preview image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            const userId = user.userId;

            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("name", name);
            formData.append("email", email);
            if (password) formData.append("password", password);
            if (profileImage) formData.append("profileImage", profileImage); // Append file

            const response = await fetch("http://localhost:8080/api/auth/update-profile", {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log(updatedUser);
                Cookies.set("user", JSON.stringify(updatedUser));
                toast.success("Profile updated successfully!");
                navigate("/profile");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to update profile!");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="edit-profile">
            <div className="edit-profile-container">
                <h1>Edit Profile</h1>

                <label htmlFor="profileImage" className="profile-image-label">
                    <img src={previewImage} alt="Profile" className="preview-profile-image"/>
                    <span className="edit-icon">
                        <img src={editIcon} alt="Profile" className="edit-icon"/>
                    </span>
                </label>
                <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="update-button" onClick={handleUpdateProfile} disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </div>
        </section>
    );
};

export default EditProfile;
