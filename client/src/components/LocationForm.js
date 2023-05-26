import React, { useState } from "react";
import useLocationSearch from "../hooks/useLocationSearch";

function LocationForm() {
  const {
    search,
    searchResults,
    handleSearchChange,
    handleSearchResultSelection,
    handleSearchSubmit,
  } = useLocationSearch();

  return (
    <div className="col-3">
      <form id="location-form" onSubmit={handleSearchSubmit}>
        <label>Search: </label>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearchChange}
        />
        <select name="location" onChange={handleSearchResultSelection}>
          {searchResults.map((result, i) => (
            <option key={i} value={`${result.name},${result.stateCode},${result.countryCode}`}>{`${result.name}, ${result.state}, ${result.country}`}</option>
          ))}
        </select>
        <input id="location-submit" type="submit" />
      </form>
    </div>
  );
}

export default LocationForm;
