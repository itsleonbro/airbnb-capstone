import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./EditListingForm.module.css";

const API_BASE_URL = "http://localhost:5001";

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

  const [images, setImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useSelector(state => state.auth);

  // fetch existing listing data
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
          title: listing.title,
          type: listing.type,
          location: listing.location,
          guests: listing.guests,
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms,
          price: listing.price,
          amenities: listing.amenities,
          cleaningFee: listing.cleaningFee || 0,
          serviceFee: listing.serviceFee || 0,
          weeklyDiscount: listing.weeklyDiscount || 0,
          occupancyTaxes: listing.occupancyTaxes || 0,
          description: listing.description,
          enhancedCleaning: listing.enhancedCleaning || false,
          selfCheckIn: listing.selfCheckIn || false,
        });

        setCurrentImages(listing.images || []);
      } catch (err) {
        setError("failed to fetch listing details");
        console.error("error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, token]);

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
    setImages([...e.target.files]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const data = new FormData();

      // append all form fields
      Object.keys(formData).forEach(key => {
        if (key === "amenities") {
          // clear existing amenities first
          data.append("amenities", []);
          // append each amenity separately
          formData.amenities.forEach(amenity => {
            data.append("amenities", amenity);
          });
        } else {
          data.append(key, formData[key]);
        }
      });

      // append new images if any
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      await axios.put(`${API_BASE_URL}/api/accommodations/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/view-listings");
    } catch (err) {
      setError(err.response?.data?.message || "failed to update listing");
      console.error("error updating listing:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading listing data...</div>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>edit listing</h2>
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

      <div className={styles.currentImages}>
        <h3>Current images</h3>
        <div className={styles.imageGrid}>
          {currentImages.map((image, index) => (
            <div key={index} className={styles.imagePreview}>
              <img
                src={`{API_BASE_URL}/${image.path}`}
                alt={`Listing ${index}`}
              />
            </div>
          ))}
          {currentImages.length === 0 && <p>No images available</p>}
        </div>
      </div>
      <div className={styles.formGroup}>
        <label>Add new images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <small>Select multiple images</small>
      </div>
      <div className={styles.formActions}>
        <button type="button" onClick={() => navigate("/admin/view-listings")}>
          cancel
        </button>
        <button type="submit" disabled={submitting}>
          {submitting ? "Updating..." : "Update listing"}
        </button>
      </div>
    </form>
  );
};

export default EditListingForm;
