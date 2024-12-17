import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorage = () => {
    const storeData = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.log(`Error saving data: ${e}`)
        }
    };

    const storeDataJSON = async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.log(`Error saving data: ${e}`)
        }
    };

    const getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        }
        catch (e) {
            console.log(`Error getting data: ${e}`)
        }
        return null;
    };

    const getDataJSON = async (key: string) => {
        try {
            const jsonString = await AsyncStorage.getItem(key);
            return jsonString != null ? JSON.parse(jsonString) : null;
        } catch (e) {
            console.log(`Error getting data: ${e}`)
        }
        return null;
    };

    return {storeData, storeDataJSON, getData, getDataJSON}
}