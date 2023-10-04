import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCampgrounds() {
  const [campgrounds, setCampgrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchCampgrounds() {
      try {
        const response = await axios.get('/api/campgrounds');
        setCampgrounds(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCampgrounds();
  }, []);
  
  return { campgrounds, loading };
}
