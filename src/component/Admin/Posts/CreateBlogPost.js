import React, { useState, useEffect } from "react";
import { useAuth } from "../../../auth";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./../../../db/firebase";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import Modal from "react-modal";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-quill/dist/quill.snow.css";
import "./CreateBlogPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import Rating from "@mui/material/Rating";

const CreateBlogPost = () => {
  const { user } = useAuth();
  const [band, setBand] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const[release,setRelease] = useState("");
  const[country, setCountry]= useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState(null);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [rating, setRating] = useState(1);
  const [playlists, setPlaylists] = useState([]);
  const [bandMembers, setBandMembers] = useState([]);
  const [playlistInput, setPlaylistInput] = useState("");
  const [bandMemberInput, setBandMemberInput] = useState("");
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setAuthorName(userData.username);
        } else {
          console.error("No user data found for user:", user.uid);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserName();
    }
  }, [user]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() !== "") {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleAddPlaylist = () => {
    if (playlistInput.trim() !== "") {
      setPlaylists([...playlists, playlistInput.trim()]);
      setPlaylistInput("");
    }
  };

  const handleRemovePlaylist = (index) => {
    const updatedPlaylists = [...playlists];
    updatedPlaylists.splice(index, 1);
    setPlaylists(updatedPlaylists);
  };

  const handleAddBandMember = () => {
    if (bandMemberInput.trim() !== "") {
      setBandMembers([...bandMembers, bandMemberInput.trim()]);
      setBandMemberInput("");
    }
  };

  const handleRemoveBandMember = (index) => {
    const updatedBandMembers = [...bandMembers];
    updatedBandMembers.splice(index, 1);
    setBandMembers(updatedBandMembers);
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      // Skapa en FileReader-instans
      const reader = new FileReader();
      // Lyssna på när läsningen av filen är klar
      reader.onloadend = () => {
        // Uppdatera förhandsgranskad bild med den inlästa filen
        setPreviewImage(reader.result);
      };
      // Läs filen som en data-URL
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const storage = getStorage(); // Använd getStorage här för att få en referens till Firebase Storage
        const storageRef = ref(storage, `images/${user.uid}/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        const imageURL = await getDownloadURL(storageRef);
      const postData = {
        band,
        title,
        label,
        release,
        country,
        content,
        authorId: user.uid,
        authorName,
        createdAt: new Date(),
        tags,
        categories,
        rating,
        playlists,
        bandMembers,
        imageURL,
      };
      await addDoc(collection(db, "posts"), postData);
      console.log("Blog post created successfully");
      setShowModal(true);

      setBand("")
      setTitle("");
      setLabel("");
      setRelease("");
      setCountry("")
      setContent("");
      setTags([]);
      setCategories([]);
      setCategoryInput("");
      setTagInput("");
      setRating(1);
      setPlaylists([]);
      setBandMembers([]);
      setImage(null);
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Create a Review</h2>
      <form className="create-blog-form" onSubmit={handleSubmit}>
      <div>
          <label htmlFor="title">Band:</label>
          <input
            type="text"
            id="band"
            value={band}
            onChange={(e) => setBand(e.target.value)}
            style={{ width: "97%" }}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "97%" }}
          />
        </div>
        <div>
          <label htmlFor="title">RecordLabel</label>
          <input
            type="text"
            id="lable"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            style={{ width: "97%" }}
          />
        </div>
        <div>
          <label htmlFor="title">Release Year</label>
          <input
            type="text"
            id="release"
            value={release}
            onChange={(e) => setRelease(e.target.value)}
            style={{ width: "97%" }}
          />
        </div>
        <div>
        <label htmlFor="title">Country</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ width: "97%" }}
          />
        </div>
        <div>
          <label htmlFor="content">Review:</label>
          <ReactQuill
            id="content"
            value={content}
            onChange={handleContentChange}
            className="quill-editor"
            style={{ width: "97%" }}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "video",
            ]}
          />
        </div>
        <div>
          <label htmlFor="tags">Themes:</label>
          <div>
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                <span>{tag}</span>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="remove-icon"
                  onClick={() => handleRemoveTag(index)}
                />
              </div>
            ))}
          </div>
          <div className="add-tag">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              style={{ width: "100px", padding: "5px 10px" }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              style={{ padding: "5px 10px", marginLeft: "10px" }}
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="categories">Gener:</label>
          <div>
            {categories.map((category, index) => (
              <div key={index} className="category">
                <span>{category}</span>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="remove-icon"
                  onClick={() => handleRemoveCategory(index)}
                />
              </div>
            ))}
          </div>
          <div className="add-category">
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              style={{ width: "100px", padding: "5px 10px" }}
            />
            <button
              type="button"
              onClick={handleAddCategory}
              style={{ padding: "5px 10px", marginLeft: "10px" }}
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="playlists">Playlists:</label>
          <div>
            {playlists.map((playlist, index) => (
              <div key={index} className="playlist">
                <span>{playlist}</span>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="remove-icon"
                  onClick={() => handleRemovePlaylist(index)}
                />
              </div>
            ))}
          </div>
          <div className="add-playlist">
            <input
              type="text"
              value={playlistInput}
              onChange={(e) => setPlaylistInput(e.target.value)}
              style={{ width: "100px", padding: "5px 10px" }}
            />
            <button
              type="button"
              onClick={handleAddPlaylist}
              style={{ padding: "5px 10px", marginLeft: "10px" }}
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="bandMembers">Band Members:</label>
          <div>
            {bandMembers.map((member, index) => (
              <div key={index} className="member">
                <span>{member}</span>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="remove-icon"
                  onClick={() => handleRemoveBandMember(index)}
                />
              </div>
            ))}
          </div>
          <div className="add-member">
            <input
              type="text"
              value={bandMemberInput}
              onChange={(e) => setBandMemberInput(e.target.value)}
              style={{ width: "100px", padding: "5px 10px" }}
            />
            <button
              type="button"
              onClick={handleAddBandMember}
              style={{ padding: "5px 10px", marginLeft: "10px" }}
            >
              Add
            </button>
          </div>
        </div>
        <div className="rating-star">
          <label className="rating">Rating:</label>
          <Rating
            name="customized-icons"
            defaultValue={0}
            precision={1}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
         {previewImage && (
  <div className="image-preview">
    <img src={previewImage} alt="Preview" style={{ maxWidth: "250px", maxHeight: "250px" }} />
  </div>
)}


<div>
  <label htmlFor="image">Image (Max size: 120KB, Max dimensions: 250x250):</label>
  <input type="file" accept="image/*" onChange={handleImageChange} />
</div>
        </div>
        <button type="submit">Create Post</button>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Review Created Successfully!</h2>
          <p>Your Review has been created successfully.</p>
          <button onClick={() => setShowModal(false)}>Close</button>
        </Modal>
      )}
      </form>
    </div>
  );
};

export default CreateBlogPost;
