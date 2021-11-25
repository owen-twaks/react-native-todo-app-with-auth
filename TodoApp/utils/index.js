import AsyncStorage from '@react-native-async-storage/async-storage';

var isJsonParsable = string => {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}

export async function setStore(storeKey, value) {
    try {
        let storeValue = value;

        if(typeof(storeValue) === 'number'){
            storeValue = value.toString();
        } else if(typeof(storeValue) === 'object'){
            storeValue = JSON.stringify(storeValue);
        }else if(typeof(storeValue) !== 'string'){
            storeValue = storeValue.toString();
        }

        await AsyncStorage.setItem(`@${storeKey}`, storeValue);
    } catch (e) {
    console.log(e)
    }
}


export async function getStore(storeKey) {

    try {
        const value = await AsyncStorage.getItem(`@${storeKey}`);

        return isJsonParsable(value) ? JSON.parse(value) : undefined;

      } catch (e) {
        console.log(e)
      }
}
