import {useEffect, useState} from "react";
import {AppTheme} from "@/constants/Enums";
import {useStorage} from "@/hooks/useStorage";
import {DropdownItemType} from "@/constants/Types";
import {ToTitleCase} from "@/utils/Utils";

const yoloModelsArray: DropdownItemType[] = [
    {title: 'yolo11x.pt', value: 'yolo11x.pt', selected: false},
    {title: 'yolov10x.pt', value: 'yolov10x.pt', selected: false},
    {title: 'yolov9e.pt', value: 'yolov9e.pt', selected: false},
    {title: 'yolov8x.pt', value: 'yolov8x.pt', selected: false},
    {title: 'yolov7x.pt', value: 'yolov7x.pt', selected: false},
    {title: 'yolov5xu.pt', value: 'yolov5xu.pt', selected: false},
];

export const useYoloModels = () => {
    const storageKey = "yoloModels";
    const [yoloModels, setYoloModelsState] = useState<string[]>([]);
    const [yoloModelsDropdown, setYoloModelsDropdownState] = useState<DropdownItemType[]>(yoloModelsArray);
    const {storeDataJSON, getDataJSON} = useStorage();

    useEffect(() => {
        getYoloModels()
            .then((storedModels) => {
                setYoloModelsState(storedModels);
                return storedModels;
            })
            .then((storedModels) => {
                yoloModelsArray.forEach(x =>
                    storedModels.includes(x.value) ? x.selected = true : x.selected = false)
                return yoloModelsArray;
            })
            .then((yoloModelsArray) => setYoloModelsDropdownState(yoloModelsArray))
    }, []);

    const getYoloModels = async () => {
        let yoloModels: string[] = await getDataJSON(storageKey);

        return yoloModels !== null ? yoloModels : [''];
    }

    const setYoloModels = (models: string[]) => {
        storeDataJSON(storageKey, models)
            .then(() => setYoloModelsState(models))
    }

    const setYoloModelsDropdown = (modelsDropdown: DropdownItemType[]) => {
        setYoloModelsDropdownState(modelsDropdown);

        let selectedModels: string[] = modelsDropdown
            .filter(x => x.selected)
            .map(x => x.value);

        if (selectedModels !== null) setYoloModels(selectedModels);
    }

    return {yoloModels, setYoloModels, yoloModelsDropdown, setYoloModelsDropdown}
}