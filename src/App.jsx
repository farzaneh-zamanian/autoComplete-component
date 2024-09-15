import { useEffect, useState } from "react";
import "./App.css";
import cities from "./cities.json";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const suggestionListClickHandler = (value) => {
    setInputValue(value.trim()); // trim input value to remove trailing whitespace
    setSuggestions([]);
  };

  useEffect(() => {
    if (!inputValue) return;

    if (cities && cities.length > 0) {
      const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setSuggestions(filteredCities);
    }
  }, [inputValue]);

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="input-field"
      />
      {inputValue && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city) => (
            <li
              key={city.name}
              onClick={() => suggestionListClickHandler(city.name)}
              className="suggestion-item"
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
