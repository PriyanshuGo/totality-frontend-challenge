import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const { image, title, description, price, location, bedrooms, amenities } = property;

  return (
    <div className="property-card">
      <img src={image} alt={title} className="property-card-image" />
      <div className="property-card-content">
        <h2 className="property-card-title">{title}</h2>
        <p className="property-card-description">{description}</p>
        <p className="property-card-price">{price}</p>
        {/* <p className="property-card-location">Location: {location}</p>
        <p className="property-card-bedrooms">Bedrooms: {bedrooms}</p>
        <ul className="property-card-amenities">
          {amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul> */}
        <button className="property-card-button">Book Now</button>
      </div>
    </div>
  );
};

export default PropertyCard;
