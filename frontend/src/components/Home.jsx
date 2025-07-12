import { useState, useEffect } from "react";
import connection from "../config/connection.config";
import { BsThreeDotsVertical } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [post, setPost] = useState("");
  const [postData, setPostData] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showId, setShowId] = useState(null);
  const navigate = useNavigate();

  // Fetch posts from the backend
  async function getPost() {
    try {
      const response = await connection.get("/user");
      setPostData(response.data); // Update state with the fetched posts
    } catch (err) {
      console.log("Error fetching posts", err);
    }
  }

  // Fetch the current user based on token
  async function getCurrentUser() {
    try {
      const res = await connection.get("/user/currentUser");
      const token = res.data;
      const user = jwtDecode(token);
      setCurrentUserId(user.userid);
    } catch (err) {
      console.error("User not authenticated:", err.message);
      navigate("/login"); // Redirect if token is invalid or expired
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

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
        await getPost();
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    await connection.delete(`/user/delete/${id}`);
    getPost();
  };

  const handleShow = (id) => {
    setShowId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-full px-4 py-5 sm:px-20 sm:py-8 min-h-screen from-gray-900 to-gray-800 bg-linear-30 bg-gradient-to-[60deg]">
      {/* Post creation form */}
      <form
        onSubmit={handlePostSubmit}
        className="bg-gray-800 shadow-2xl rounded-xl mb-4"
      >
        <div className="px-2 py-2 sm:px-5 sm:py-4">
          <div className="flex justify-center">
            <textarea
              name="post"
              onChange={handlePostChange}
              value={post}
              className="w-full text-white text-xl outline-none"
              placeholder="What's on your mind?"
            ></textarea>
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-blue-800 w-full text-xl text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-900 active:bg-blue-700">
              Post
            </button>
          </div>
        </div>
      </form>

      {/* Render posts */}
      {postData.length > 0 ? (
        postData
          .slice()
          .reverse()
          .map((posts) => (
            <div
              key={posts._id}
              className="bg-gray-800 shadow-lg mb-10 px-3 sm:px-10 py-10 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-white text-2xl">
                  {posts.username?.length > 0
                    ? posts.username[0].username
                    : "Unknown User"}
                </h1>

                <div className="relative">
                  <button
                    onClick={() => handleShow(posts._id)}
                    className="bg-gray-700 rounded-xl cursor-pointer w-fit px-2 py-2"
                  >
                    <BsThreeDotsVertical className="text-white" />
                  </button>

                  {posts.username?.length > 0 &&
                    posts.username[0]._id === currentUserId && (
                      <div
                        className={`absolute z-10 bg-gray-700 rounded-xl px-5 py-4 shadow-md top-10 left-[1.4] transform -translate-x-1/2 transition-opacity duration-300 ${
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

              <h1 className="text-white text-xl mt-2">{posts.post}</h1>
            </div>
          ))
      ) : (
        <p className="text-white">No data to show</p>
      )}
    </div>
  );
};

export default Home;
