import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, Keyboard, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useJournal, useJournalingConfig } from '../../context/Context';
import Divider from '../../components/Divider';
import { colors, sizes, styles } from '../../data/theme';
import Chip from '../../components/Chip';
import ChipInput from '../../components/ChipInput';
import TextArea from '../../components/TextArea';
import { launchImageLibrary } from 'react-native-image-picker';
import PrimaryButton from '../../components/PrimaryButton';
import useFormattedDate from '../../helpers/useDateFormatter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EmotionCategoryButton from '../../components/journaling/EmotionCategoryButton';
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import assets from '../../data/assets';
import { toAssetCase } from '../../helpers/helpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useManageJournaling from '../../helpers/useManageJournaling';


/**
 * A component for journaling thoughts and providing contexts.
 * @component
 * @param {object} props - The component's properties.
 * @param {object} props.navigation - The navigation object.
 * @returns {JSX.Element} The rendered JournalThoughts component.
 */
function JournalThoughts({ navigation }) {
	const {
		currentJournal,
		journalingConfig,
		addJournalingConfig,
		setCurrentJournal,
	} = useManageJournaling()

	const { dayString, timeString } = useFormattedDate(currentJournal.dateAdded)

	const [isShouldReturn, setIsShouldReturn] = useState(false)

	const handleAddJournalConfig = (newConfig, type) => {
		if (newConfig.length !== 0) {
			addJournalingConfig(newConfig, type)
		}
		Keyboard.dismiss()
		setIsShouldReturn(false)
	};

	const handleWriteThoughts = (field, value) => {
		setCurrentJournal(field, value)
	}

	const onPressChip = (value, type) => {
		setCurrentJournal(type, value)
	};

	const isChipSelected = (value, type) => {
		return currentJournal[type]?.includes(value);
	};

	const onPressAddPhoto = async () => {
		await launchImageLibrary()
			.then((result) => {
				if (typeof result.assets[0] === 'object') {
					// console.log('photo', result.assets[0])
					setCurrentJournal('photo', result.assets[0])
				}
			})
			.catch((e) => console.log(e));
	}

	const onPressRemovePhoto = () => {
		setCurrentJournal('photo', {})
	}

	const isJournalComplete = () => {
		const requiredFields = ['emotionCategory', 'emotions', 'withWho', 'where', 'whatActivity', 'thoughts', 'dateAdded'];
		for (const field of requiredFields) {
			if (field === 'emotions' && currentJournal[field].length === 0) {
				return false;
			}
			if (!currentJournal[field]) {
				return false;
			}
		}
		return true;
	};

	const insets = useSafeAreaInsets()
	// console.log('ctx journal', currentJournal.emotionCategory.toLowerCase().replace(' ', '_'))

	// console.log('ctx journal', currentJournal)
	// const { CameraIcon } = useIcons()

	// console.log('jconf', journalingConfig)

	return (
		// <SafeAreaView style={{ flex: 1 }}>
		<BlurredEllipsesBackground>
			<KeyboardAwareScrollView
				extraScrollHeight={64}
				keyboardOpeningTime={10}
				enableResetScrollToCoords={false}
				keyboardDismissMode={isShouldReturn ? 'none' : 'interactive'}
				keyboardShouldPersistTaps={isShouldReturn ? 'always' : 'never'}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<View style={{ paddingTop: insets.top + sizes.padding.lg }} >

					{/* Content */}
					<View style={{ paddingVertical: sizes.padding.lg, paddingHorizontal: sizes.padding.md, flexDirection: 'column', gap: sizes.padding.md }}>

						{/* journalCategory */}
						<View style={{ flexDirection: 'row', gap: sizes.padding.md, alignItems: 'center', maxWidth: '100%' }} >
							<EmotionCategoryButton disabled title={currentJournal.emotionCategory} width={120} variant={toAssetCase(currentJournal.emotionCategory)} />
							<View>
								<Text style={{ ...styles.text.header2, fontWeight: '300' }}>I'm feeling
								</Text>
								<Text style={{ ...styles.text.header2, }} >
									{currentJournal.emotionCategory}
								</Text>
							</View>

						</View>

						{/* journalEmotions */}
						<View style={{ flexDirection: 'row', gap: sizes.padding.sm, flexWrap: 'wrap' }}>
							{currentJournal.emotions?.map((emotion) => (
								<Chip key={emotion} text={emotion} />
							))}
						</View>

						<Divider color={'white'} />

						{/* dateAdded */}
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<View style={{ gap: sizes.padding.sm }}>
								<Text style={styles.text.body2Transparent}>{dayString}</Text>
								<Text style={styles.text.body2Transparent}>at {timeString}</Text>
							</View>
						</View>

						<Divider color={'white'} />

						{/* thoughts */}
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<Text style={{ ...styles.text.body2 }}>Write your thoughts</Text>
							<Image
								source={assets.icons.edit}
								style={{
									width: sizes.icon.xs,
									aspectRatio: 1
								}}
							/>
						</View>
						<TextArea
							variant='title'
							textStyle={{
								...styles.text.body1,
								// color: styles.text.body2Transparent.color
							}}
							placeholder={'Title (max 40 characters)'}
							onEndEditing={(titleValue) => handleWriteThoughts('title', titleValue)}
							value={currentJournal.title}
							onFocus={() => setIsShouldReturn(false)}
						/>
						<TextArea
							multiline
							textStyle={{
								...styles.text.body1,
								// color: styles.text.body2Transparent.color
							}}
							placeholder={'Today, I met... then, I met a...'}
							onEndEditing={(thoughtValue) => handleWriteThoughts('thoughts', thoughtValue)}
							value={currentJournal.thoughts}
							onFocus={() => setIsShouldReturn(false)}
						/>

						<Divider color={'white'} />

						{/* Photo */}
						{Object.keys(currentJournal.photo).length === 0 ? (
							<Pressable onPress={onPressAddPhoto}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
									<Text style={{ ...styles.text.body2 }}>Add a photo</Text>
									<Image
										source={assets.icons.camera}
										style={{
											width: sizes.icon.xs,
											aspectRatio: 1
										}}
									/>
								</View>
							</Pressable>

						) :
							<>
								<ImageBackground
									source={{ uri: currentJournal.photo?.uri }}
									style={{
										alignItems: 'center',
										aspectRatio: currentJournal.photo.width / currentJournal.photo.height,
										borderRadius: sizes.radius.md,
										// borderWidth: 4,
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
										<Text style={styles.text.semi1} >Change Photo</Text>
									</Pressable>
									<Pressable onPress={onPressRemovePhoto}>
										<Text style={{ ...styles.text.semi1, color: 'red' }}>Remove Photo</Text>
									</Pressable>
								</View>
							</>
						}

						<Divider color={'white'} />

						{/* withWho */}
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<Text style={{ ...styles.text.body2 }}>Who you were with</Text>
							<Image
								source={assets.icons.person_group}
								style={{
									width: sizes.icon.xs * 1.1,
									aspectRatio: 1
								}}
							/>
						</View>
						<View style={{ flexDirection: 'row', gap: sizes.padding.sm, flexWrap: 'wrap' }}>
							{journalingConfig.journalThoughts.people.map((person) => (
								<Chip
									key={person}
									text={person}
									onPress={() => onPressChip(person, 'withWho')}
									isSelected={isChipSelected(person, 'withWho')}
								// size={'md'}
								// font='body3'
								/>
							))}
							<ChipInput
								type="people"
								onEndEditing={handleAddJournalConfig}
								onFocus={() => setIsShouldReturn(true)}
							// size={'md'}
							// font='body3'
							/>
						</View>

						<Divider color={'white'} />

						{/* where */}
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<Text style={{ ...styles.text.body2 }}>Where you were</Text>
							<Image
								source={assets.icons.place}
								style={{
									width: sizes.icon.xs,
									aspectRatio: 1
								}}
							/>
						</View>
						<View style={{ flexDirection: 'row', gap: sizes.padding.sm, flexWrap: 'wrap' }}>
							{journalingConfig.journalThoughts.locations.map((location) => (
								<Chip
									key={location}
									text={location}
									onPress={() => onPressChip(location, 'where')}
									isSelected={isChipSelected(location, 'where')}
								/>
							))}
							<ChipInput
								type="locations"
								onEndEditing={handleAddJournalConfig}
								onFocus={() => setIsShouldReturn(true)}
							/>
						</View>

						<Divider color={'white'} />

						{/* whatActivity */}
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<Text style={{ ...styles.text.body2 }}>What you were doing</Text>
							<Image
								source={assets.icons.activity}
								style={{
									width: sizes.icon.xs,
									aspectRatio: 1
								}}
							/>
						</View>
						<View style={{ flexDirection: 'row', gap: sizes.padding.sm, flexWrap: 'wrap' }}>
							{journalingConfig.journalThoughts.activities.map((activity) => (
								<Chip
									key={activity}
									text={activity}
									onPress={() => onPressChip(activity, 'whatActivity')}
									isSelected={isChipSelected(activity, 'whatActivity')}
								/>
							))}
							<ChipInput
								type="activities"
								onEndEditing={handleAddJournalConfig}
								onFocus={() => setIsShouldReturn(true)}
							/>
						</View>

					</View>

					{/* Done Button */}
					<View style={{ paddingHorizontal: sizes.padding.md, marginBottom: sizes.padding.lg * 2 }} >
						<PrimaryButton
							onPress={() => navigation.navigate('Journal Success')}
							text={'Done'}
							color={'green'}
							disabled={!isJournalComplete()} // Add this line
						/>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</BlurredEllipsesBackground >
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