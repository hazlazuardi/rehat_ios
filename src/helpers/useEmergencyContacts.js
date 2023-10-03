import { useEmergencyContact } from "../context/Context";

function useEmergencyContacts() {
    const { emergencyContacts, dispatchEmergencyContacts } = useEmergencyContact();

    const getAllEmergencyContacts = () => {
        dispatchEmergencyContacts({ type: 'getAllEmergencyContacts' });
    };

    return {
        emergencyContacts,
        getAllEmergencyContacts,
        dispatchEmergencyContacts,
    };
}

export default useEmergencyContacts