import React, { useState } from "react";
import "./PropertyList.css";
import PropertyCard from "../Card/PropertyCard";
import propertyData from "../../data/properties";

const amenitiesList = [
  "Swimming Pool",
  "Gym",
  "24/7 Security",
  "Parking",
  "Playground",
  "Clubhouse",
  "Power Backup",
  "Lift",
  "Community Hall",
  "CCTV Surveillance",
  "Rooftop Garden",
  "Water Supply",
  "Garden",
  "Home Theatre",
];

const PropertyList = () => {
  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce((ac, cur) => ac + parseInt(cur.price), 0);

console.log(totalPrice)

  const handlebooknow = (data) => {
    setCart([...cart, data]);
  };

  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    selectedAmenities: [],
  });
  const [filteredProperties, setFilteredProperties] = useState(propertyData);
  const [showAmenities, setShowAmenities] = useState(false); // New state for showing/hiding amenities

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleAmenityChange = (e) => {
    const { value } = e.target;
    setFilters((prevFilters) => {
      const selectedAmenities = prevFilters.selectedAmenities.includes(value)
        ? prevFilters.selectedAmenities.filter((amenity) => amenity !== value)
        : [...prevFilters.selectedAmenities, value];
      return { ...prevFilters, selectedAmenities };
    });
  };

  const toggleAmenities = () => {
    setShowAmenities((prev) => !prev); // Toggle the visibility
  };

  const applyFilters = () => {
    const updatedProperties = propertyData.filter((property) => {
      const propertyPrice = parseInt(
        property.price.replace(/[₹,]/g, "").trim()
      ); // Ensure to parse the price correctly
      const inputMinPrice = filters.minPrice ? parseInt(filters.minPrice) : 0; // Default to 0 if empty
      const inputMaxPrice = filters.maxPrice
        ? parseInt(filters.maxPrice)
        : Infinity; // Default to Infinity if empty

      const propertyLocation = property.location.toLowerCase(); // Convert property location to lowercase
      const inputLocation = filters.location.toLowerCase(); // Convert input location to lowercase

      return (
        (inputLocation === "" || propertyLocation.includes(inputLocation)) &&
        propertyPrice >= inputMinPrice && // Ensure price is greater than or equal to min price
        propertyPrice <= inputMaxPrice && // Ensure price is less than or equal to max price
        (filters.bedrooms === "" ||
          property.bedrooms === parseInt(filters.bedrooms)) &&
        (filters.selectedAmenities.length === 0 ||
          filters.selectedAmenities.every((amenity) =>
            property.amenities.includes(amenity)
          ))
      );
    });
    setFilteredProperties(updatedProperties);
  };

  return (
    <div>
      {/* Filter Inputs */}
      <div className="filter-container">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={filters.bedrooms}
          onChange={handleFilterChange}
        />
        <div
          onClick={toggleAmenities}
          style={{ cursor: "pointer", margin: "20px 0" }}
        >
          <button style={{ backgroundColor: "#5e6063" }}>Amenities</button>
        </div>
        {showAmenities && (
          <div className="amenities-container">
            {amenitiesList.map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  value={amenity}
                  checked={filters.selectedAmenities.includes(amenity)}
                  onChange={handleAmenityChange}
                />
                {amenity}
              </label>
            ))}
          </div>
        )}
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      {/* Display Filtered Properties */}
      <div className="property-list">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            handlebooknow={handlebooknow}
          />
        ))}
      </div>
      <div>{}</div>
    </div>
  );
};

export default PropertyList;
