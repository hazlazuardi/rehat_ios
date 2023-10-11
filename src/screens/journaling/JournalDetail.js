import React from 'react'
import PropTypes from 'prop-types'
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { colors, sizes, styles } from '../../data/theme'
import Divider from '../../components/Divider'
import Chip from '../../components/Chip'
import EmotionCategoryButton from '../../components/journaling/EmotionCategoryButton'
import useFormattedDate from '../../helpers/useDateFormatter'
import assets from '../../data/assets'


function JournalDetail({ route }) {

    const { journal } = route.params

    const { dateString, timeString } = useFormattedDate(journal.dateAdded)

    console.log('detail journal: ', journal)

    return (
        <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior='automatic'>
            <SafeAreaView>
                <View style={{ padding: sizes.padding.md, gap: sizes.gap.md }}>

                    {/* First Row */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: sizes.gap.xl,
                        // backgroundColor: 'red'
                    }} >
                        <View style={{ gap: sizes.gap.sm, flex: 1 }}>
                            <Text style={{ ...styles.text.header1, flexShrink: 1 }}>{journal.title}</Text>
                            <View style={{ flexDirection: 'row', gap: sizes.gap.sm, flexWrap: 'wrap', flex: 1 }}>
                                {journal.emotions?.map(emotion => {
                                    return (
                                        <View key={emotion} style={{ alignSelf: 'flex-start' }}>
                                            <Chip text={emotion} />
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                        <EmotionCategoryButton title={journal.emotionCategory} width={100} disabled />
                    </View>

                    <Divider color={'white'} />

                    {/* System Retrieved Data */}
                    <View style={{ gap: sizes.gap.md }}>

                        {/* HR and Date */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text
                                    style={{
                                        color: colors.textArea.color
                                    }}
                                >{dateString}
                                </Text>
                                <Text
                                    style={{
                                        color: colors.textArea.color
                                    }}
                                >{timeString}
                                </Text>
                            </View>
                            <Text>HR</Text>
                        </View>

                        {/* Thoughts */}
                        <View style={{
                            padding: sizes.padding.md,
                            backgroundColor: colors.textArea.backgroundColor,
                            borderRadius: sizes.radius.sm
                        }}>
                            <Text
                                style={{
                                    color: colors.textArea.color
                                }}>
                                {journal.thoughts}
                            </Text>
                        </View>

                    </View>

                    <Divider color={'white'} />

                    {/* Photo(s) */}
                    <View style={{ gap: sizes.gap.md }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ ...styles.text.header2 }}>Photo</Text>
                            <Image
                                source={assets.icons.person_group}
                                style={{
                                    width: sizes.icon.xs,
                                    aspectRatio: 1
                                }}
                            />
                        </View>
                        {journal.photo.uri ? (
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
                        ) : <></>}
                    </View>

                    <Divider color={'white'} />

                    {/* withWho */}

                    <View style={{ gap: sizes.gap.md }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ ...styles.text.header2 }}>Who you were with</Text>
                            <Image
                                source={assets.icons.person_group}
                                style={{
                                    width: sizes.icon.xs,
                                    aspectRatio: 1
                                }}
                            />
                        </View>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <Chip text={journal.withWho} />
                        </View>
                    </View>

                    <Divider color={'white'} />

                    {/* where */}

                    <View style={{ gap: sizes.gap.md }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ ...styles.text.header2 }}>Where you were</Text>
                            <Image
                                source={assets.icons.place}
                                style={{
                                    width: sizes.icon.xs,
                                    aspectRatio: 1
                                }}
                            />
                        </View>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <Chip text={journal.where} />
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        </ScrollView >
    )
}

JournalDetail.propTypes = {}

export default JournalDetail
