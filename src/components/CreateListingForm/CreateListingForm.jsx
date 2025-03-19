import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./CreateListingForm.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateListingForm = () => {
  const token = useSelector(state => state.auth.token);
  const username = useSelector(state => state.auth.username);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 0,
    amenities: [],
    cleaningFee: 0,
    serviceFee: 0,
    weeklyDiscount: 0,
    occupancyTaxes: 0,
    description: "",
    enhancedCleaning: false,
    selfCheckIn: false,
    host: username,
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "amenities") {
      // handle multiple select
      const options = e.target.options;
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setFormData({
        ...formData,
        amenities: selectedValues,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? parseFloat(value) : value,
      });
    }
  };

  const handleImageChange = e => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Set the files for upload
      setImages(prevImages => [...prevImages, ...filesArray]);

      // Create previews
      const previewsArray = filesArray.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImagePreviews(prevPreviews => [...prevPreviews, ...previewsArray]);

      // Clear the input to allow selecting the same file again
      e.target.value = null;
    }
  };

  const removeImage = index => {
    // Remove from previews array
    setImagePreviews(prevPreviews =>
      prevPreviews.filter((_, i) => i !== index)
    );

    // Remove from files array
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = new FormData();

      // append all form fields
      Object.keys(formData).forEach(key => {
        if (key === "amenities") {
          // append each amenity separately
          formData.amenities.forEach(amenity => {
            data.append("amenities", amenity);
          });
        } else {
          data.append(key, formData[key]);
        }
      });

      // append all images
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      await axios.post(`${API_BASE_URL}/api/accommodations`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Listing created successfully!");

      setTimeout(() => {
        navigate("/admin/view-listings");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create listing");
      console.error("Error creating listing:", err);
      window.scrollTo(0, 0); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create New Listing</h2>

      {error && <div className={styles.error}>{error}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>}

      <div className={styles.formGroup}>
        <label>Title*</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Type*</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="room">Private Room</option>
            <option value="hotel">Hotel Room</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Location*</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Guests*</label>
          <input
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Bedrooms*</label>
          <input
            type="number"
            name="bedrooms"
            min="1"
            value={formData.bedrooms}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Bathrooms*</label>
          <input
            type="number"
            name="bathrooms"
            min="1"
            value={formData.bathrooms}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Price per Night (R)*</label>
          <input
            type="number"
            name="price"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Weekly Discount (%)</label>
          <input
            type="number"
            name="weeklyDiscount"
            min="0"
            max="100"
            value={formData.weeklyDiscount}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Cleaning Fee (R)</label>
          <input
            type="number"
            name="cleaningFee"
            min="0"
            value={formData.cleaningFee}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Service Fee (R)</label>
          <input
            type="number"
            name="serviceFee"
            min="0"
            value={formData.serviceFee}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Occupancy Taxes (R)</label>
          <input
            type="number"
            name="occupancyTaxes"
            min="0"
            value={formData.occupancyTaxes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Amenities</label>
        <select
          name="amenities"
          multiple
          value={formData.amenities}
          onChange={handleChange}
        >
          <option value="wifi">WiFi</option>
          <option value="kitchen">Kitchen</option>
          <option value="washer">Washer</option>
          <option value="dryer">Dryer</option>
          <option value="ac">Air Conditioning</option>
          <option value="heating">Heating</option>
          <option value="pool">Pool</option>
          <option value="tv">TV</option>
          <option value="parking">Free Parking</option>
        </select>
        <small>Hold Ctrl/Cmd to select multiple</small>
      </div>

      <div className={styles.formGroup}>
        <label>Description*</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>

      <div className={styles.checkboxGroup}>
        <div>
          <input
            type="checkbox"
            id="enhancedCleaning"
            name="enhancedCleaning"
            checked={formData.enhancedCleaning}
            onChange={handleChange}
          />
          <label htmlFor="enhancedCleaning">Enhanced Cleaning</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="selfCheckIn"
            name="selfCheckIn"
            checked={formData.selfCheckIn}
            onChange={handleChange}
          />
          <label htmlFor="selfCheckIn">Self Check-in</label>
        </div>
      </div>

      {/* Images Upload Section */}
      <div className={styles.imagesSection}>
        <h3>Upload Images</h3>
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>
            <span>Select Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </label>
          <small>Select multiple images (JPG, PNG, GIF)</small>
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className={styles.imageGrid}>
            {imagePreviews.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <img
                  src={image.preview}
                  alt={`Upload ${index + 1}`}
                  className={styles.imagePreview}
                />
                <button
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={() => removeImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          onClick={() => navigate("/admin/view-listings")}
          className={styles.cancelButton}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              Creating...
            </>
          ) : (
            "Create Listing"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateListingForm;
