import React, { useEffect, useState } from 'react';
import {
    Text,
    ScrollView,
    View,
    TextInput,
    Pressable,
    ActivityIndicator,
    SafeAreaView,
    Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useContacts from '../../helpers/useContacts';
import useEmergencyContacts from '../../helpers/useEmergencyContacts';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, sizes, styles } from '../../data/theme';
import Contacts from 'react-native-contacts';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListItem } from './ManageRecoveryPreferences';
import assets from '../../data/assets';



function ManageEmergencyContacts() {
    const { emergencyContacts, getAllEmergencyContacts, dispatchEmergencyContacts } = useEmergencyContacts();
    const { contacts, error, loading, result: searchResult, setResult: setSearchResult, handleSearch } = useContacts();
    const [editMode, setEditMode] = useState(false);
    const [searchString, setSearchString] = useState('');


    useEffect(() => {
        getAllEmergencyContacts(); // Get all emergency contacts when the component mounts
    }, []);

    const displayedContacts = !loading ? (
        searchResult?.length > 0
            ? searchResult.filter(
                contact => !emergencyContacts.some(
                    emContact => emContact.recordID === contact.recordID
                )
            )
            : searchString
                ? [] // Show nothing when textInput is not empty, but no searchResult
                : contacts.filter(
                    contact => !emergencyContacts.some(
                        emContact => emContact.recordID === contact.recordID
                    )
                ) || [] // Show all contacts when textInput is empty and no searchResult
    ) : [];


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

    const insets = useSafeAreaInsets()

    console.log('load', loading)
    console.log('contacts', searchResult)


    return (
        <BlurredEllipsesBackground>
            <KeyboardAwareScrollView
                extraScrollHeight={64}
                keyboardOpeningTime={10}
                contentContainerStyle={{ flexGrow: 1 }}
            // keyboardDismissMode='none'
            // keyboardShouldPersistTaps='always'
            >
                <View style={{ paddingTop: insets.top + sizes.padding.lg }} >
                    <View style={{ paddingVertical: sizes.padding.lg, paddingHorizontal: sizes.padding.md, flexDirection: 'column', gap: sizes.padding.md }}>

                        <Text style={styles.text.header2}>Emergency Contacts</Text>
                        <View style={innerStyles.contactList}>
                            {emergencyContacts.length === 0 ? (
                                <Text style={styles.text.body3}>You haven't set up emergency contact yet.</Text>
                            ) : emergencyContacts.map(econ => (
                                <ListItem
                                    key={econ.recordID}
                                    title={`${econ.givenName} ${econ.familyName}`}
                                    subtitle={`${econ.phoneNumbers[0]?.number}`}
                                    renderRightItem={editMode && (
                                        <Pressable onPress={() => handleRemoveEmergencyContact(econ.recordID)}>
                                            <Image
                                                source={assets.icons.remove}
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                }}
                                            />
                                        </Pressable>
                                    )}
                                />
                            ))}
                        </View>
                        <PrimaryButton
                            text={editMode ? 'Save' : 'Edit'}
                            color={editMode ? colors.green : colors.whiteSoTransparent}
                            onPress={handleButtonPress}
                        />
                        <Text style={styles.text.header3} >My Contacts</Text>
                        <ContactSearch searchString={searchString} setSearchString={setSearchString} handleSearch={handleSearch} />

                        {loading ? (
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: sizes.padding.lg
                            }}>
                                <Text style={{ ...styles.text.body1 }}>Loading contacts from your device...</Text>
                            </View>
                        ) : (
                            <View style={innerStyles.contactList}>
                                {displayedContacts.length > 0 ? displayedContacts?.map((contact) => (
                                    <ListItem
                                        key={contact.recordID}
                                        title={`${contact.givenName} ${contact.familyName}`}
                                        subtitle={`${contact.phoneNumbers[0]?.number}`}
                                        renderRightItem={editMode && (
                                            <Pressable onPress={() => handleAddEmergencyContact(contact)}>
                                                <Image
                                                    source={assets.icons.add}
                                                    style={{
                                                        width: 24,
                                                        height: 24
                                                    }}
                                                />
                                            </Pressable>
                                        )}
                                    />
                                )) :
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: sizes.padding.lg
                                    }}>
                                        <Text style={{ ...styles.text.body1 }}>No contact.</Text>
                                    </View>

                                }
                            </View>
                        )}
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </BlurredEllipsesBackground>
    );
}

const innerStyles = {
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
        backgroundColor: colors.darkGrey,
        borderColor: 'white',
        borderRadius: sizes.radius.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItem: 'center'
    },
    contactName: {
        // fontWeight: 'bold',
        ...styles.text.semi1
    },
    contactNumber: {
        ...styles.text.semi2,
        color: 'rgba(255,255,255,.5)'
    },
    input: {
        minHeight: sizes.padding.lg,
        backgroundColor: colors.darkGrey,
        color: 'white',
        borderRadius: sizes.radius.sm,
        paddingHorizontal: sizes.padding.md,
        paddingVertical: sizes.padding.md,
        fontSize: sizes.text.header3,
    },

};

function ContactSearch({ searchString, setSearchString, handleSearch }) {

    return (
        <TextInput
            style={innerStyles.input}
            placeholder="Search by name, email, or phone number"
            value={searchString}
            onChangeText={setSearchString}
            onEndEditing={() => handleSearch(searchString)} // Directly use handleSearch from the hook
            onSubmitEditing={() => handleSearch(searchString)} // Directly use handleSearch from the hook

        />
    );
}

export default ManageEmergencyContacts;
