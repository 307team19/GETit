import React from 'react';

import {View} from 'react-native';

const Card = (props) => {
    // const {containerStyle} = styles;
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle:{
        borderWidth: 0,
        borderRadius: 0,
        borderColor: 'white',
        borderBottomWidth: 0,
        shadowColor: 'white',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }
};

export { Card };