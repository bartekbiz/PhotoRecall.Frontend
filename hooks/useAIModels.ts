import {useEffect, useState} from "react";
import {AppTheme} from "@/constants/Enums";
import {useStorage} from "@/hooks/useStorage";
import {DropdownItemType} from "@/constants/Types";
import {ToTitleCase} from "@/utils/Utils";

export const useAIModels = () => {
    const storageKey = "models";
    const [models, setModels] = useState<DropdownItemType[]>([]);
    const {storeDataJSON, getDataJSON} = useStorage();

    useEffect(() => {
        getModelsFromAPI()
            .then(fetched => {
                let dropdown: DropdownItemType[] = [];

                for (let i = 0; i < fetched.length; i++) {
                    dropdown.push({
                        title: fetched[i],
                        value: fetched[i],
                        selected: false
                    })
                }

                return dropdown;
            })
            .then(fetchedDrop => {
                getModelsFromStorage()
                    .then(storedDrop => {
                        let union: DropdownItemType[] = [];

                        for (let i = 0; i < storedDrop.length; i++) {
                            if (fetchedDrop.find(f => f.value === storedDrop[i].value)) {
                                union.push(storedDrop[i]);
                            }
                        }

                        for (let i = 0; i < fetchedDrop.length; i++) {
                            if (union.find(f => f.value === fetchedDrop[i].value)) {
                                continue;
                            }
                            union.push(fetchedDrop[i]);
                        }

                        setModels(union);
                    })
            })
    }, []);

    const getModelsFromAPI = async (): Promise<string[]> => {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow"
        };

        return fetch(`${process.env.EXPO_PUBLIC_API_URL}/Info/GetAvailableYoloModels`, requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .catch((error) => console.error(error));
    }

    const getModelsFromStorage = async () => {
        let yoloModels: DropdownItemType[] = await getDataJSON(storageKey);

        return yoloModels !== null ? yoloModels : [];
    }

    const setModelsStorage = (models: DropdownItemType[]) => {
        storeDataJSON(storageKey, models)
            .then(() => setModels(models));
    }

    return {models, setModels: setModelsStorage}
}