import React from 'react';
import "./PropertyList.css"
import PropertyCard from '../Card/PropertyCard';
import propertyData from '../../data/properties';

const PropertyList = () => {
  return (
    <div className="property-list">
      {propertyData.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
