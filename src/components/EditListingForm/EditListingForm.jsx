import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./EditListingForm.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditListingForm = () => {
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
  });

  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector(state => state.auth.token);
  const username = useSelector(state => state.auth.username);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/accommodations/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const listing = response.data;

        // pre fill the form
        setFormData({
          title: listing.title || "",
          type: listing.type || "",
          location: listing.location || "",
          guests: listing.guests || 1,
          bedrooms: listing.bedrooms || 1,
          bathrooms: listing.bathrooms || 1,
          price: listing.price || 0,
          amenities: listing.amenities || [],
          cleaningFee: listing.cleaningFee || 0,
          serviceFee: listing.serviceFee || 0,
          weeklyDiscount: listing.weeklyDiscount || 0,
          occupancyTaxes: listing.occupancyTaxes || 0,
          description: listing.description || "",
          enhancedCleaning: listing.enhancedCleaning || false,
          selfCheckIn: listing.selfCheckIn || false,
          host: listing.host || username,
        });

        setCurrentImages(listing.images || []);
      } catch (err) {
        setError("Failed to fetch listing details");
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, token, username]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "amenities") {
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

      setNewImages(prevImages => [...prevImages, ...filesArray]);

      // create previews
      const previewsArray = filesArray.map(file => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setNewImagePreviews(prevPreviews => [...prevPreviews, ...previewsArray]);

      // clear  input to allow selecting the same file again
      e.target.value = null;
    }
  };

  const removeNewImage = index => {
    setNewImagePreviews(prevPreviews =>
      prevPreviews.filter((_, i) => i !== index)
    );

    setNewImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveCurrentImage = imageId => {
    setImagesToDelete(prev => [...prev, imageId]);

    // remove from UI
    setCurrentImages(prevImages =>
      prevImages.filter(img => img._id !== imageId)
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = new FormData();

      // append all form fields
      Object.keys(formData).forEach(key => {
        if (key === "amenities") {
          formData.amenities.forEach(amenity => {
            data.append("amenities", amenity);
          });
        } else {
          data.append(key, formData[key]);
        }
      });

      for (let i = 0; i < newImages.length; i++) {
        data.append("images", newImages[i]);
      }

      if (imagesToDelete.length > 0) {
        data.append("imagesToDelete", JSON.stringify(imagesToDelete));
      }

      await axios.put(`${API_BASE_URL}/api/accommodations/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Listing updated successfully!");

      // nav after a delay to allow the user to see the success msg
      setTimeout(() => {
        navigate("/admin/view-listings");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update listing");
      console.error("Error updating listing:", err);
      window.scrollTo(0, 0);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading listing data...</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Edit Listing</h2>

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

      {/* current images section */}
      <div className={styles.imagesSection}>
        <h3>Current Images</h3>
        {currentImages.length > 0 ? (
          <div className={styles.imageGrid}>
            {currentImages.map((image, index) => (
              <div key={image._id || index} className={styles.imageContainer}>
                <img
                  src={`${API_BASE_URL}/${image.path}`}
                  alt={`Listing ${index + 1}`}
                  className={styles.imagePreview}
                />
                <button
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={() => handleRemoveCurrentImage(image._id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noImages}>No images available</p>
        )}
      </div>

      {/* new Images upload Section */}
      <div className={styles.imagesSection}>
        <h3>Add New Images</h3>
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>
            <span>Upload Images</span>
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

        {/* new image Previews */}
        {newImagePreviews.length > 0 && (
          <div className={styles.imageGrid}>
            {newImagePreviews.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <img
                  src={image.preview}
                  alt={`New upload ${index + 1}`}
                  className={styles.imagePreview}
                />
                <button
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={() => removeNewImage(index)}
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
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className={styles.spinner}></span>
              Updating...
            </>
          ) : (
            "Update Listing"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditListingForm;
