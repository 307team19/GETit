import React from 'react';

import {Text, TouchableOpacity, TouchableHighlight} from 'react-native';

const Button = ({propPress, children}) => {
    const propPress = () => {
        
    }
    const {buttonStyle, TextStyle} = styles;
    return (
        //<TouchableOpacity onPress={propsPress} style={buttonStyle}>
        <TouchableOpacity onPress={propPress} style={buttonStyle}>
            <Text style={TextStyle}>
                {children}
            </Text>
        </TouchableOpacity>
        //<TouchableHighlight>
        //</TouchableHighlight>
    );
};

const styles = {
    buttonStyle:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#1eaaf1',
        marginLeft: 5,
        marginRight: 5
    },
    TextStyle:{
        alignSelf: 'center',
        fontSize: 16,
        color: '#1eaaf1',
        fontWeight: 'bold',
        // marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10
    }
};

export { Button };