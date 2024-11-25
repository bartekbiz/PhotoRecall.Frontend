import {createContext, useContext} from "react";
import {AppTheme} from "@/constants/Enums";
import {useAppTheme} from "@/hooks/useAppTheme";
import {DropdownItemType} from "@/constants/Types";
import {useYoloModels} from "@/hooks/useYoloModels";

export const SettingsContext = createContext({
    theme: AppTheme.system,
    setTheme: (value: AppTheme) => {},
    themesDropdown: [{title: '', value: '', selected: false}],
    setThemesDropdown: (value: DropdownItemType[]) => {},
    yoloModels: [''],
    setYoloModels: (value: string[]) => {},
    yoloModelsDropdown: [{title: '', value: '', selected: false}],
    setYoloModelsDropdown: (value: DropdownItemType[]) => {},
});

export const useSettings = () => {
    return useContext(SettingsContext);
};

export const SettingsProvider = ({children}: { children: React.ReactNode; }) => {
    const {theme, setTheme, themesDropdown, setThemesDropdown} = useAppTheme();
    const {yoloModels, setYoloModels, yoloModelsDropdown, setYoloModelsDropdown} = useYoloModels();

    const value = {
        theme,
        setTheme,
        themesDropdown,
        setThemesDropdown,
        yoloModels,
        setYoloModels,
        yoloModelsDropdown,
        setYoloModelsDropdown
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
