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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    setImages([...e.target.files]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");

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

      navigate("/admin/view-listings");
    } catch (err) {
      setError(err.response?.data?.message || "failed to create listing");
      console.error("error creating listing:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>create new listing</h2>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.formGroup}>
        <label>title*</label>
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
          <label>type*</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">select type</option>
            <option value="apartment">apartment</option>
            <option value="house">house</option>
            <option value="room">private room</option>
            <option value="hotel">hotel room</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>location*</label>
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
          <label>guests*</label>
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
          <label>bedrooms*</label>
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
          <label>bathrooms*</label>
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
          <label>price per night*</label>
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
          <label>weekly discount (%)</label>
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
          <label>cleaning fee</label>
          <input
            type="number"
            name="cleaningFee"
            min="0"
            value={formData.cleaningFee}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>service fee</label>
          <input
            type="number"
            name="serviceFee"
            min="0"
            value={formData.serviceFee}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>occupancy taxes</label>
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
        <label>amenities</label>
        <select
          name="amenities"
          multiple
          value={formData.amenities}
          onChange={handleChange}
        >
          <option value="wifi">wifi</option>
          <option value="kitchen">kitchen</option>
          <option value="washer">washer</option>
          <option value="dryer">dryer</option>
          <option value="ac">air conditioning</option>
          <option value="heating">heating</option>
          <option value="pool">pool</option>
          <option value="tv">tv</option>
          <option value="parking">free parking</option>
        </select>
        <small>hold ctrl/cmd to select multiple</small>
      </div>

      <div className={styles.formGroup}>
        <label>description*</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>

      <div className={styles.formGroup}>
        <label>images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <small>select multiple images</small>
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
          <label htmlFor="enhancedCleaning">enhanced cleaning</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="selfCheckIn"
            name="selfCheckIn"
            checked={formData.selfCheckIn}
            onChange={handleChange}
          />
          <label htmlFor="selfCheckIn">self check-in</label>
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="button" onClick={() => navigate("/admin/view-listings")}>
          cancel
        </button>
        <button type="submit" disabled={loading}>
          {loading ? "creating..." : "create listing"}
        </button>
      </div>
    </form>
  );
};

export default CreateListingForm;
