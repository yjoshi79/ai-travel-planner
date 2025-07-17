import { useState } from 'react';

const LOCATIONIQ_API_KEY = 'pk.5fb111463343bc1598b31ec052de0a2b';
const BASE_URL = 'https://api.locationiq.com/v1';

const useLocationAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchLocations = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/autocomplete?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(query)}&limit=5&dedupe=1&tag=place:city,place:town`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location suggestions');
      }

      const data = await response.json();
      const formattedSuggestions = data.map(item => ({
        id: item.place_id,
        label: `${item.display_name}`,
        value: item.display_place || item.display_name.split(',')[0],
      }));

      setSuggestions(formattedSuggestions);
    } catch (err) {
      setError(err.message);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    suggestions,
    loading,
    error,
    searchLocations,
  };
};

export default useLocationAutocomplete;
