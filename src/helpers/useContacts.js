import { useState, useEffect } from 'react';
import Contacts from 'react-native-contacts';

function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      Contacts.getAll()
        .then(res => {
          setContacts(res);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    };

    fetchContacts();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      try {
        const results = await Contacts.getContactsMatchingString(searchTerm);
        console.log('from API', results);
        setResult(results);
      } catch (error) {
        console.error('Error searching contacts:', error);
      }
    } else {
      setResult([]);
    }
  };

  return { contacts, error, loading, result, handleSearch, setResult };
}

export default useContacts;
