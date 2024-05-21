import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../db/firebase";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Rating from "@mui/material/Rating";
import Modal from "react-modal";
import "./EditBlogPost.css";
import "react-quill/dist/quill.snow.css";

const EditBlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [band, setBand] = useState("");
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [release, setRelease] = useState("");
  const [country, setCountry] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [rating, setRating] = useState(1);
  const [playlists, setPlaylists] = useState([]);
  const [playlistInput, setPlaylistInput] = useState("");
  const [bandMembers, setBandMembers] = useState([]);
  const [bandMemberInput, setBandMemberInput] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const postDoc = doc(db, "posts", postId);
        const postSnap = await getDoc(postDoc);
        if (postSnap.exists()) {
          const postData = postSnap.data();
          setBand(postData.band);
          setTitle(postData.title);
          setLabel(postData.label);
          setRelease(postData.release);
          setCountry(postData.country);
          setContent(postData.content);
          setTags(postData.tags);
          setCategories(postData.categories);
          setRating(postData.rating);
          setPlaylists(postData.playlists);
          setBandMembers(postData.bandMembers);
          if (postData.imageUrl) {
            setPreviewImage(postData.imageUrl);
          }
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchBlogPost();
  }, [postId]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() !== "") {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (index) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  const handleAddPlaylist = () => {
    if (playlistInput.trim() !== "") {
      setPlaylists([...playlists, playlistInput.trim()]);
      setPlaylistInput("");
    }
  };

  const handleRemovePlaylist = (index) => {
    const newPlaylists = [...playlists];
    newPlaylists.splice(index, 1);
    setPlaylists(newPlaylists);
  };

  const handleAddBandMember = () => {
    if (bandMemberInput.trim() !== "") {
      setBandMembers([...bandMembers, bandMemberInput.trim()]);
      setBandMemberInput("");
    }
  };

  const handleRemoveBandMember = (index) => {
    const newBandMembers = [...bandMembers];
    newBandMembers.splice(index, 1);
    setBandMembers(newBandMembers);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageUpdate = async () => {
    try {
      console.log("Image updated successfully");
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postDoc = doc(db, "posts", postId);
      await updateDoc(postDoc, {
        band,
        title,
        label,
        release,
        country,
        content,
        tags,
        categories,
        rating,
        playlists,
        bandMembers,
        imageURL: previewImage,
      });
      console.log("Blog post updated successfully");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/admin/allposts"); // Adjust this path to match your route for all reviews
  };

  return (
    <div className="edit-blog-container">
      <h2>Edit Review</h2>
      <form className="edit-blog-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="band">Band:</label>
          <input
            type="text"
            id="band"
            value={band}
            onChange={(e) => setBand(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="label">Record Label:</label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="release">Release Year:</label>
          <input
            type="text"
            id="release"
            value={release}
            onChange={(e) => setRelease(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <ReactQuill
            id="content"
            value={content}
            onChange={handleContentChange}
            className="quill-editor"
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
          <label htmlFor="tags">Tags:</label>
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
            />
            <button type="button" onClick={handleAddTag}>
              Add
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="categories">Categories:</label>
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
            />
            <button type="button" onClick={handleAddCategory}>
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
            />
            <button type="button" onClick={handleAddPlaylist}>
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
            />
            <button type="button" onClick={handleAddBandMember}>
              Add
            </button>
          </div>
        </div>
        <div className="rating-star">
          <label className="rating">Rating:</label>
          <Rating
            name="customized-icons"
            value={rating}
            precision={1}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </div>
        <div>
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}
          <label htmlFor="image">
            Image (Max size: 120KB, Max dimensions: 250x250):
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="button" onClick={handleImageUpdate}>
            Save Image
          </button>
        </div>
        <button type="submit">Update Review</button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Update Confirmation"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Review updated successfully!</h2>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </div>
  );
};

export default EditBlogPost;







