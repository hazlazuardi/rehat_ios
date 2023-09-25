import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, SafeAreaView, Text } from 'react-native';
import { sizes } from '../../data/theme';
import { useJournal } from '../../context/Context';

/**
 * A component for displaying a success message after saving a journal entry.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {function} props.navigation - The navigation function.
 */
function JournalSuccess({ navigation }) {
    const { dispatchJournal } = useJournal();

    /**
     * Handles the press event when the user is done with the journal entry.
     */
    function handlePress() {
        dispatchJournal({ type: 'saveJournal' });
        navigation.navigate('Journaling');
    }

    return (
        <SafeAreaView>
            <Text>Your daily journal has been saved</Text>
            <Pressable
                onPress={handlePress}
                style={{
                    backgroundColor: 'green',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: sizes.button.padding.sm,
                    borderRadius: sizes.button.radius,
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Done</Text>
            </Pressable>
        </SafeAreaView>
    );
}

/**
 * Prop types for the JournalSuccess component.
 *
 * @typedef {object} JournalSuccessProps
 * @property {function} navigation - The navigation function.
 */

/**
 * Prop types for the JournalSuccess component.
 *
 * @type {JournalSuccessProps}
 */
JournalSuccess.propTypes = {
    navigation: PropTypes.func.isRequired,
};

export default JournalSuccess;
