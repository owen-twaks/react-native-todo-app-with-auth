import React from 'react';
import { TextInput } from 'react-native';

const TextInputComponent = ({value, onChangeText, name, ...props}) => (
    <TextInput
        value={value}
        onChangeText={(value) => onChangeText(name, value)} //... Bind the name here
        {...props}
    />
)

export default TextInputComponent