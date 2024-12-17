import {useEffect, useState} from "react";
import {AppTheme} from "@/constants/Enums";
import {useStorage} from "@/hooks/useStorage";


export default function useAgreeRatio() {
    const storageKey = "agreeRatio";
    const [agreeRatio, setAgreeRatioState] = useState<number>(0);
    const {storeData, getData} = useStorage();

    useEffect(() => {
        get().then((storedValue) => {
            if (storedValue === null) return;
            setAgreeRatioState(storedValue)
        });
    }, []);

    const get = async () => {
        let agreeRatioStr = await getData(storageKey);

        if (agreeRatioStr !== null) {
            return Number(agreeRatioStr);
        }

        return null;
    }

    const setAgreeRatio = (value: number) => {
        storeData(storageKey, value.toString())
            .then(() => setAgreeRatioState(value))
    }

    return {agreeRatio, setAgreeRatio};
}