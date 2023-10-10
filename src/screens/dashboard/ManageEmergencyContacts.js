import React, { useEffect, useState } from 'react';
import {
    Text,
    ScrollView,
    View,
    TextInput,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useContacts from '../../helpers/useContacts';
import useEmergencyContacts from '../../helpers/useEmergencyContacts';
import PrimaryButton from '../../components/PrimaryButton';
import { sizes } from '../../data/theme';
import Contacts from 'react-native-contacts';



function ManageEmergencyContacts() {
    const { emergencyContacts, getAllEmergencyContacts, dispatchEmergencyContacts } = useEmergencyContacts();
    const { contacts, error, loading, result: searchResult, setResult: setSearchResult, handleSearch } = useContacts();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        getAllEmergencyContacts(); // Get all emergency contacts when the component mounts
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error loading contacts: {error.message}</Text>;

    console.log(searchResult)
    const displayedContacts = (searchResult?.length > 0 ? searchResult : contacts || []).filter(
        (contact) => !(emergencyContacts || []).some((econ) => econ.recordID === contact.recordID)
    );

    const handleAddEmergencyContact = (econ) => {
        dispatchEmergencyContacts({ type: 'addContact', payload: econ });
        setSearchResult((prev) => prev.filter((contact) => contact.recordID !== econ.recordID));
    };

    const handleRemoveEmergencyContact = (id) => {
        dispatchEmergencyContacts({ type: 'removeContact', payload: { recordID: id } });
    };

    const handleSaveEmergencyContacts = () => {
        dispatchEmergencyContacts({ type: 'saveEmergencyContacts' });
    };

    const handleButtonPress = () => {
        if (editMode) {
            handleSaveEmergencyContacts(); // Save the changes when editMode is true
        }
        setEditMode(!editMode); // Toggle editMode state
    };


    return (
        <KeyboardAwareScrollView
            extraScrollHeight={64}
            keyboardOpeningTime={10}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <ScrollView style={{ flex: 1, paddingTop: sizes.padding.lg * 2 }}>
                <View style={styles.container}>
                    <Text>This is Manage E Con</Text>
                    <View style={styles.contactList}>
                        {emergencyContacts.map(econ => (
                            <View key={econ.recordID} style={styles.contactItem}>
                                <View>
                                    <Text style={styles.contactName}>{econ.givenName} {econ.familyName}</Text>
                                    <Text>{econ.phoneNumbers[0]?.number}</Text>
                                </View>
                                {editMode && (
                                    <Pressable style={{ backgroundColor: 'red' }} onPress={() => handleRemoveEmergencyContact(econ.recordID)}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', width: 40, height: 40 }}>
                                            <Text>-</Text>
                                        </View>
                                    </Pressable>
                                )}
                            </View>
                        ))}
                    </View>
                    <PrimaryButton
                        text={editMode ? 'Save' : 'Edit'}
                        color={editMode ? 'green' : 'grey'}
                        onPress={handleButtonPress}
                    />
                    <Text style={{ fontSize: sizes.text.header3 }} >My Contacts</Text>
                    <ContactSearch handleSearch={handleSearch} />
                    <View style={styles.contactList}>
                        {displayedContacts?.map((contact) => (
                            <View key={contact.recordID} style={styles.contactItem}>
                                <View>
                                    <Text style={styles.contactName}>{contact.givenName} {contact.familyName}</Text>
                                    <Text>{contact.phoneNumbers[0]?.number}</Text>
                                </View>
                                {editMode && (
                                    <Pressable style={{ backgroundColor: 'green' }} onPress={() => handleAddEmergencyContact(contact)}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', width: 40, height: 40 }}>
                                            <Text>+</Text>
                                        </View>
                                    </Pressable>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

const styles = {
    container: {
        paddingVertical: sizes.padding.lg,
        paddingHorizontal: sizes.padding.md,
        flexDirection: 'column',
        gap: sizes.padding.md,
    },
    contactList: {
        gap: sizes.padding.sm,
    },
    contactItem: {
        padding: sizes.padding.md,
        backgroundColor: 'grey',
        borderColor: 'white',
        borderRadius: sizes.radius.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItem: 'center'
    },
    contactName: {
        fontWeight: 'bold',
    },
    input: {
        minHeight: sizes.padding.lg,
        backgroundColor: 'grey',
        color: 'white',
        borderRadius: sizes.radius.sm,
        paddingHorizontal: sizes.padding.md,
        paddingVertical: sizes.padding.md,
        fontSize: sizes.text.header3,
    },

};

function ContactSearch({ handleSearch }) {
    const [searchString, setSearchString] = useState('');

    return (
        <TextInput
            style={styles.input}
            placeholder="Search by name, email, or phone number"
            value={searchString}
            onChangeText={setSearchString}
            onEndEditing={() => handleSearch(searchString)} // Directly use handleSearch from the hook
        />
    );
}

export default ManageEmergencyContacts;
