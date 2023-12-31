import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { colors, sizes, styles } from '../data/theme';
import BlurredEllipsesBackground from '../components/BlurredEllipsesBackground';
import assets from '../data/assets';
import { styles as styleses } from '../data/theme';
import { useRecommendedMethod } from '../context/Context';

function Recovery({ navigation }) {

    // console.log('props', props)
    return (
        <BlurredEllipsesBackground>
            <ScrollView style={{
                flex: 1,
                // backgroundColor: colors.darkTurquoise
            }}
                contentInsetAdjustmentBehavior='automatic'
            >
                <SafeAreaView>
                    <View style={{
                        padding: sizes.padding.md,
                        gap: sizes.gap.lg,
                        paddingBottom: sizes.padding.lg * 2
                    }}>
                        <Text style={{ ...styles.text.header2, color: colors.orange }}>Recovery</Text>


                        {/* Section Journaling */}
                        <View style={{ gap: sizes.gap.md }}>
                            <Text style={styles.text.semi1}>Journaling</Text>
                            <RecoveryList
                                icon={assets.icons.journaling}
                                title={"Journaling"}
                                description={"Reflect on experiences, emotions, and the triggers"}
                                iconColor={colors.orange}
                                backgroundColor={colors.orangeTransparent}
                                onPress={() => navigation.navigate("Journaling")}
                            />
                        </View>

                        {/* Section Thoughts Reframing */}
                        <View style={{ gap: sizes.gap.md }}>
                            <Text style={styles.text.semi1}>Thoughts Reframing</Text>
                            <RecoveryList
                                icon={assets.icons.journaling_head}
                                title={"Thoughts Reframing"}
                                description={"Challenge and reshape negative thought patterns"}
                                iconColor={colors.orange}
                                backgroundColor={colors.orangeTransparent}
                                onPress={() => navigation.navigate("Thoughts Reframing")} />
                        </View>

                        {/* Section Grounding Techniques */}
                        <View style={{ gap: sizes.gap.md }}>
                            <Text style={styles.text.semi1}>Grounding Techniques</Text>
                            <RecoveryList
                                icon={assets.icons.journaling_head}
                                title={"Five Senses"}
                                description={"Challenge and reshape negative thought patterns"}
                                iconColor={colors.orange}
                                backgroundColor={colors.orangeTransparent}
                                onPress={() => navigation.navigate("Five Senses")} />
                        </View>

                    </View>
                </SafeAreaView>
            </ScrollView>
        </BlurredEllipsesBackground>
    );
}


function RecoveryList({ icon, title, description, iconColor, backgroundColor, onPress }) {
    const { recommendedMethod } = useRecommendedMethod()
    return (
        <Pressable onPress={onPress}>
            <View style={{
                borderRadius: sizes.radius.lg,
                backgroundColor: backgroundColor,
                padding: sizes.padding.md,
                gap: sizes.gap.md,
                flexDirection: 'row',
            }}>

                {/* Icon */}
                <View style={{
                    backgroundColor: iconColor,
                    borderRadius: sizes.radius.lg * 50,
                    padding: sizes.padding.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    aspectRatio: 1,
                    width: 72
                }} >
                    <View style={{
                        width: 32,
                        aspectRatio: 1,
                    }}>
                        <Image
                            source={icon}
                            style={{
                                flex: 1,
                                aspectRatio: 1
                            }}
                        />
                    </View>
                </View>

                {/* Text */}
                <View style={{
                    // gap: sizes.gap.sm,
                    flex: 1,
                    // backgroundColor: 'red',
                }} >
                    <Text style={styles.text.semi1}>{title}</Text>
                    <Text style={styles.text.body3} >{description}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default Recovery;