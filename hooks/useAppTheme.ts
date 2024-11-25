import {useEffect, useState} from "react";
import {AppTheme} from "@/constants/Enums";
import {useStorage} from "@/hooks/useStorage";
import {DropdownItemType} from "@/constants/Types";
import {ToTitleCase} from "@/utils/Utils";

const themesArray: DropdownItemType[] = [
    {title: ToTitleCase(AppTheme[AppTheme.system]), value: AppTheme.system, selected: false},
    {title: ToTitleCase(AppTheme[AppTheme.dark]), value: AppTheme.dark, selected: false},
    {title: ToTitleCase(AppTheme[AppTheme.light]), value: AppTheme.light, selected: false},
];

export const useAppTheme = () => {
    const storageKey = "theme";
    const [theme, setThemeState] = useState<AppTheme>(AppTheme.system);
    const [themesDropdown, setThemesDropdownState] = useState<DropdownItemType[]>(themesArray);
    const {storeData, getData} = useStorage();

    useEffect(() => {
        getAppTheme()
            .then((storedTheme) => {
                setThemeState(storedTheme);
                return storedTheme;
            })
            .then((storedTheme) => {
                themesArray.forEach(x =>
                    x.value === storedTheme ? x.selected = true : x.selected = false)
                return themesArray;
            })
            .then((themesArray) => setThemesDropdownState(themesArray))
    }, []);

    const getAppTheme = async () => {
        let themeStr = await getData(storageKey);

        if (themeStr !== null) {
            return Number(themeStr);
        }

        return AppTheme.system;
    }

    const setTheme = (theme: AppTheme) => {
        storeData(storageKey, theme.toString())
            .then(() => setThemeState(theme))
    }

    const setThemesDropdown = (themesDropdown: DropdownItemType[]) => {
        setThemesDropdownState(themesDropdown);

        let selectedTheme = themesDropdown.find(x => x.selected);
        if (!selectedTheme) return;
        setTheme(selectedTheme.value);
    }

    return {theme, setTheme, themesDropdown, setThemesDropdown}
}