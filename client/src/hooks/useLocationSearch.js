import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import useWeatherReport from "./useWeatherReport";

function useLocationSearch() {
  const [geolocation, setGeolocation] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({});
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { updateWeatherReport } = useWeatherReport();

  // Fetch geolocation data from the backend server
  useEffect(() => {
    fetch("/geolocation").then((resp) => {
      if (resp.ok) {
        resp.json().then((geolocationData) => {
          setGeolocation(geolocationData);
        });
      } else {
        resp.json().then((error) => {
          console.log(error);
        });
      }
    });
  }, []);

  // Control form input for search bar
  const handleSearchControl = (searchTerm) => {
    setSearch(searchTerm);
  };

  const clearSearchResults = () => {
    setSearchResults([]);
  };

  const isCityStartingWithSearchTerm = (searchTerm, cityName) => {
    return cityName.toLowerCase().startsWith(searchTerm.toLowerCase());
  };

  const isCityAtLeastHalfwaySearched = (searchTerm, cityName) => {
    return cityName.length <= searchTerm.length * 2;
  };

  const isCityInCurrentCountry = (cityObj) => {
    return cityObj.countryCode === geolocation.countryCode;
  };

  const isIncludedInSearchResults = (searchTerm, cityObj) => {
    const cityName = cityObj.name;
    return (
      isCityStartingWithSearchTerm(searchTerm, cityName) &&
      (isCityAtLeastHalfwaySearched(searchTerm, cityName) ||
        isCityInCurrentCountry(cityObj))
    );
  };

  const addStateAndCountryNamesToCities = (citiesArr) => {
    citiesArr.forEach((result) => {
        const stateName = State.getStateByCodeAndCountry(
          result.stateCode,
          result.countryCode
        ).name;
        const countryName = Country.getCountryByCode(result.countryCode).name;
  
        result.state = stateName;
        result.country = countryName;
      });

      return citiesArr;
  }

  const filterBySearch = (searchTerm) => {
    const newSearchResults = addStateAndCountryNamesToCities(City.getAllCities().filter((city) =>
      isIncludedInSearchResults(searchTerm, city))
    );
    
    return newSearchResults;
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;

    handleSearchControl(newSearch);

    if (newSearch === "") {
      clearSearchResults();
    } else {
      const newSearchResults = filterBySearch(newSearch);
      setSearchResults(newSearchResults);
      setSelectedLocation(newSearchResults[0]);
    }
  };

  const handleSearchResultSelection = (e) => {
    const cityStateCountryArr = e.target.value.split(",");
    const cityName = cityStateCountryArr[0];
    const stateCode = cityStateCountryArr[1];
    const countryCode = cityStateCountryArr[2];

    const locationSelection = City.getCitiesOfState(countryCode, stateCode).filter(
      (city) => city.name === cityName
    )[0];

    setSelectedLocation(locationSelection);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const { latitude, longitude } = selectedLocation;

    const coords = {
        latitude: latitude,
        longitude: longitude
    }
    
    updateWeatherReport(coords);
    
  };

  return {
    search,
    searchResults,
    handleSearchChange,
    handleSearchResultSelection,
    handleSearchSubmit,
  };
}

export default useLocationSearch;
