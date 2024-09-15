import React, { useState, useEffect } from 'react';
// import cities from '../../cities.json';
const cities = [
  { name: "Aberdeen" },
  { name: "Abilene" },
  { name: "Akron" },
  { name: "Albany" },
  { name: "Albuquerque" },
  { name: "Alexandria" },
  { name: "Allentown" },
  { name: "Amarillo" },
  { name: "Anaheim" }
];

function levenshteinDistance(a, b) {
  // implementation of Levenshtein distance algorithm
  // you can use a library like `string-distance` or implement it yourself
}

const CityAutocomplete = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const handleInputChange = () => {
      const inputLower = input.toLowerCase();
      const suggestions = [];

      for (const city of cities) {
        const cityLower = city.name.toLowerCase();
        const distance = levenshteinDistance(inputLower, cityLower);
        if (distance <= 2) { // adjust the threshold as needed
          suggestions.push({
            name: city.name,
            distance
          });
        }
      }

      suggestions.sort((a, b) => a.distance - b.distance);
      setSuggestions(suggestions.slice(0, 5)); // show top 5 suggestions
    };

    handleInputChange();
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CityAutocomplete;