import { useState, useEffect } from 'react';
import Contacts from 'react-native-contacts';

function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      Contacts.getAll()
        .then(res => {
          setContacts(res)
        })
        .catch(err => {
          // console.log('error', err)
          setError(err)
        })
      // setLoading(true);
      // try {
      //   const contactsList = await Contacts.getAll();
      //   setContacts(contactsList);
      // } catch (err) {
      //   setError(err);
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchContacts();
  }, []);

  return { contacts, error, loading };
}

export default useContacts;
