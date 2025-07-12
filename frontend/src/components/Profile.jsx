import { useEffect, useState } from "react";
import connection from "../config/connection.config";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [post, setPost] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showId, setShowId] = useState(null);
  const navigate = useNavigate();

  // Fetch profile (includes posts) based on the current user
  async function getProfile() {
    try {
      const res = await connection.get("/user/currentUser"); // Fetch current user token
      const token = res.data;

      if (token) {
        const user = jwtDecode(token); // Decode the token to get user info
        const userProfile = await connection.get(`/user/profile`); // Fetch profile based on current user
        setProfileData(userProfile.data.user);
        setCurrentUserId(user.userid);
      } else {
        navigate("/login"); // Redirect if no token (user not logged in)
      }
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  }

  // Fetch profile on load or when current user changes
  useEffect(() => {
    getProfile();
  }, []); // Dependency array is empty, meaning it runs only once when the component mounts

  // Handle post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (post.trim()) {
      try {
        const res = await connection.get("/user/currentUser");
        const token = res.data;

        if (!token) {
          navigate("/login");
          return;
        }

        await connection.post("/user/post", { post });

        const user = jwtDecode(token);
        setCurrentUserId(user.userid);
        setPost("");
        await getProfile(); // Refresh profile and posts
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("Error submitting post:", error);
        }
      }
    }
  };

  // Handle post text change
  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  // Handle delete post
  const handleDelete = async (id) => {
    try {
      await connection.delete(`/user/delete/${id}`);
      getProfile(); // Refresh posts
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Toggle post options
  const handleShow = (id) => {
    setShowId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="min-h-screen from-gray-900 to-gray-800 bg-linear-30 bg-gradient-to-[60deg] px-5 py-5">
      {/* Username */}
      {profileData ? (
        <h1 className="text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-900 to-red-600 text-transparent bg-clip-text">
            Hello
          </span>
          <span> 👋 </span>
          <span className="text-green-500 ml-2">{profileData.username}</span>
        </h1>
      ) : (
        <p className="text-white">Loading profile...</p>
      )}

      {/* Post Form */}
      <form
        onSubmit={handlePostSubmit}
        className="bg-gray-800 shadow-2xl rounded-xl mb-8"
      >
        <div className="px-4 py-4">
          <textarea
            name="post"
            onChange={handlePostChange}
            value={post}
            className="w-full text-white text-xl outline-none bg-gray-700 p-4 rounded-xl resize-none"
            placeholder="What's on your mind?"
          ></textarea>
          <button className="bg-blue-800 cursor-pointer mt-4 w-full text-xl text-white px-4 py-2 rounded-xl hover:bg-blue-900 active:bg-blue-700">
            Post
          </button>
        </div>
      </form>

      {/* Posts */}
      <h2 className="text-white text-2xl font-semibold mb-4">Your Posts</h2>
      {profileData?.posts?.length > 0 ? (
        profileData.posts
          .slice()
          .reverse()
          .map((posts) => (
            <div
              key={posts._id}
              className="bg-gray-800 shadow-lg mb-6 px-6 py-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white text-xl font-semibold">
                  {profileData.username}
                </h3>
                <div className="relative">
                  <button
                    onClick={() => handleShow(posts._id)}
                    className="bg-gray-700 cursor-pointer rounded-xl p-2"
                  >
                    <BsThreeDotsVertical className="text-white" />
                  </button>
                  {posts._id === showId && (
                    <div
                      className={`absolute z-10 bg-gray-700 rounded-xl px-6 py-4 shadow-md top-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
                        showId === posts._id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <button
                        onClick={() => handleDelete(posts._id)}
                        className="bg-red-800 text-md text-white px-3 py-2 cursor-pointer rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-white text-lg">{posts.post}</p>
            </div>
          ))
      ) : (
        <p className="text-white">No data to show</p>
      )}
    </div>
  );
};

export default Profile;
