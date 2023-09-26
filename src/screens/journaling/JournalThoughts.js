import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useJournal } from '../../context/Context';
import Divider from '../../components/Divider';
import { sizes } from '../../data/theme';
import Chip from '../../components/Chip';
import ChipInput from '../../components/ChipInput';
import TextArea from '../../components/TextArea';
import { launchImageLibrary } from 'react-native-image-picker';
import PrimaryButton from '../../components/PrimaryButton';
import useFormattedDate from '../../helpers/useDateFormatter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


/**
 * A component for journaling thoughts and providing contexts.
 * @component
 * @param {object} props - The component's properties.
 * @param {object} props.navigation - The navigation object.
 * @returns {JSX.Element} The rendered JournalThoughts component.
 */
function JournalThoughts({ navigation }) {
    const { journal, dispatchJournal, journalingConfig, setJournalingConfig } = useJournal();
    const { dateString, timeString } = useFormattedDate(journal.dateAdded)

    /**
     * Handles the addition of a new Journal Config.
     * @param {string} newConfig - The new Journal Config to add.
     * @param {string} type - The type of Journal Config (e.g., 'locations' or 'people').
     */
    const handleAddJournalConfig = (newConfig, type) => {
        // Add the new Journal Config to your state or context based on the type
        setJournalingConfig((prev) => {
            const updatedConfig = { ...prev.journalThoughts };
            updatedConfig[type] = [...updatedConfig[type], newConfig];
            return { ...prev, journalThoughts: updatedConfig };
        });
    };

    const handleWriteThoughts = (newThoughts) => {
        dispatchJournal({ type: 'setJournal', payload: { thoughts: newThoughts } });
    };

    /**
     * Handles the press event of a chip.
     * @param {string} value - The value associated with the chip.
     * @param {string} type - The type of chip (e.g., 'withWho' or 'where').
     */
    const onPressChip = (value, type) => {
        dispatchJournal({
            type: 'setJournal',
            payload: {
                [type]: value,
            },
        });
    };

    /**
     * Checks if a chip is selected based on the value and type.
     * @param {string} value - The value to check for selection.
     * @param {string} type - The type to determine the key.
     * @returns {boolean} True if the chip is selected; otherwise, false.
     */
    const isChipSelected = (value, type) => {
        return journal[type]?.includes(value);
    };

    const onPressAddPhoto = async () => {
        await launchImageLibrary()
            .then((result) => {
                if (typeof result.assets[0] === 'object') {
                    console.log('photo', result.assets[0])
                    dispatchJournal({
                        type: 'setJournal',
                        payload: { photo: result.assets[0] }
                    })
                }
            })
            .catch((e) => console.log(e));
    }

    const onPressRemovePhoto = () => {
        dispatchJournal({ type: 'setJournal', payload: { photo: {} } })
    }

    console.log('ctx journal', journal)
    return (
        // <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                extraScrollHeight={64}
                keyboardOpeningTime={10}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <ScrollView style={{ flex: 1, paddingTop: sizes.padding.lg*2 }}>
                    <View style={{ padding: sizes.padding.lg, flexDirection: 'column', gap: sizes.padding.md }}>
                        <Text>I'm feeling {journal.emotionCategory}</Text>
                        <View style={{ flexDirection: 'row', gap: sizes.padding.sm }}>
                            {journal.emotions?.map((emotion) => (
                                <Chip key={emotion} text={emotion} />
                            ))}
                        </View>
                        <Divider />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>HR Data</Text>
                            <View style={{ gap: sizes.padding.sm }}>
                                <Text>{dateString}</Text>
                                <Text style={{ textAlign: 'right' }}>at {timeString}</Text>
                            </View>
                        </View>
                        <Divider />
                        {Object.keys(journal.photo).length === 0 ? (
                            <Pressable onPress={onPressAddPhoto}>
                                <Text>Add a photo</Text>
                            </Pressable>

                        ) :
                            <>
                                <ImageBackground
                                    source={{ uri: journal.photo?.uri }}
                                    style={{
                                        alignItems: 'center',
                                        aspectRatio: journal.photo.width / journal.photo.height,
                                        borderRadius: 10,
                                        borderWidth: 4,
                                        display: 'flex',
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        marginBottom: sizes.padding.md,
                                        overflow: 'hidden',
                                        paddingBottom: sizes.padding.md,
                                        width: '100%',
                                    }}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Pressable onPress={onPressAddPhoto}>
                                        <Text >Change Photo</Text>
                                    </Pressable>
                                    <Pressable onPress={onPressRemovePhoto}>
                                        <Text style={{ color: 'red' }}>Remove Photo</Text>
                                    </Pressable>
                                </View>
                            </>
                        }
                        <Divider />
                        <Text>Who are you with?</Text>
                        <View style={{ flexDirection: 'row', gap: sizes.padding.sm, flexWrap: 'wrap' }}>
                            {journalingConfig.journalThoughts.people.map((person) => (
                                <Chip
                                    key={person}
                                    text={person}
                                    onPress={() => onPressChip(person, 'withWho')}
                                    isSelected={isChipSelected(person, 'withWho')}
                                />
                            ))}
                            <ChipInput type="people" onEndEditing={handleAddJournalConfig} />
                        </View>
                        <Divider />
                        <Text>Where are you?</Text>
                        <View style={{ flexDirection: 'row', gap: sizes.padding.sm, flexWrap: 'wrap' }}>
                            {journalingConfig.journalThoughts.locations.map((location) => (
                                <Chip
                                    key={location}
                                    text={location}
                                    onPress={() => onPressChip(location, 'where')}
                                    isSelected={isChipSelected(location, 'where')}
                                />
                            ))}
                            <ChipInput type="locations" onEndEditing={handleAddJournalConfig} />
                        </View>
                        <Divider />
                        <Text>Write your thoughts</Text>
                        <TextArea placeholder={'Today, I met...'} numberOfLines={250} onEndEditing={handleWriteThoughts} />
                        {/* Done Button */}
                        <PrimaryButton
                            onPress={() => navigation.navigate('Journal Success')}
                            text={'Done'}
                            color={'green'}
                        />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        // </SafeAreaView>
    );
}

/**
 * Prop types for the JournalThoughts component.
 * @typedef {object} JournalThoughtsProps
            * @property {object} navigation - The navigation object.
            */

/**
 * Prop types for the JournalThoughts component.
 * @type {JournalThoughtsProps}
            */
JournalThoughts.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default JournalThoughts;
