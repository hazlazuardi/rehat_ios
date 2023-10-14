export const colors = {
    darkTurquoise: '#0E6E74',
    turqoise: '#0E8388',
    green: '#298753',
    orange: '#FF6000',
    orangeTransparent: 'rgba(255, 96, 0, .5)',
    textArea: {
        backgroundColor: 'rgba(217,217,217,.08)',
        color: 'rgba(203, 228, 222, .45)'
    }
}

export const sizes = {
    radius: {
        sm: 12,
        md: 16,
        lg: 20
    },
    gap: {
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32
    },
    padding: {
        sm: 8,
        md: 16,
        lg: 32
    },
    text: {
        header1: 32,
        header2: 24,
        header3: 20,
        body1: 20,
        body2: 16,
        body3: 14,
        semi1: 20,
        semi2: 16,
        caption: 12,
    },
    button: {
        radius: 50,
        padding: {
            sm: 16,
            md: 32
        }
    },
    icon: {
        xs: 24,
        sm: 32,
        md: 48,
        lg: 54,
        xl: 64
    }

}

// 'Merriweather', serif;
// 'Poppins', sans-serif;

export const styles = {
    text: {
        header1: {
            fontWeight: 'bold',
            fontSize: sizes.text.header1,
            color: 'white',
            fontFamily: 'Poppins'
        },
        header2: {
            fontWeight: 'bold',
            fontSize: sizes.text.header2,
            color: 'white',
            fontFamily: 'Poppins'
        },
        header3: {
            fontWeight: 'bold',
            fontSize: sizes.text.header3,
            color: 'white',
            fontFamily: 'Poppins'
        },
        body1: {
            fontWeight: '500',
            fontSize: sizes.text.body1,
            color: 'white',
            fontFamily: 'Poppins'
        },
        body2: {
            fontWeight: '400',
            fontSize: sizes.text.body2,
            color: 'white',
            fontFamily: 'Poppins'
        },
        body2Transparent: {
            fontWeight: '400',
            fontSize: sizes.text.body2,
            color: 'rgba(203, 228, 222, .45))',
            fontFamily: 'Poppins'
        },
        body3: {
            fontWeight: '400',
            fontSize: sizes.text.body3,
            color: 'white',
            fontFamily: 'Poppins'
        },
        semi1: {
            fontWeight: '600',
            fontSize: sizes.text.semi1,
            color: 'white',
            fontFamily: 'Poppins'
        },
        semi2: {
            fontWeight: '600',
            fontSize: sizes.text.semi2,
            color: 'white',
            fontFamily: 'Poppins'
        },

        caption: {
            fontWeight: '500',
            fontSize: sizes.text.caption,
            color: 'white',
            fontFamily: 'Poppins'
        },

        captionTransparent: {
            fontWeight: '500',
            fontSize: sizes.text.caption,
            color: 'white',
            fontFamily: 'Poppins',
            opacity: .5
        },

        listTitle: {
            fontWeight: 'bold',
            fontSize: sizes.text.body1,
            color: 'white',
            fontFamily: 'Poppins'
        },
        listSubtitle: {
            fontSize: sizes.text.body2,
            color: 'white',
            fontFamily: 'Poppins'
        },
        merri: {
            body1: {
                fontWeight: '400',
                fontSize: sizes.text.body1,
                color: 'white',
                fontFamily: 'Merriweather'
            },
            body2: {
                fontWeight: '400',
                fontSize: sizes.text.body2,
                color: 'white',
                fontFamily: 'Merriweather'
            },
        }
    }
}