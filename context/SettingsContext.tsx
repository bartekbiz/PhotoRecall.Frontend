import {createContext, useContext, useState} from "react";
import {AppTheme} from "@/constants/Enums";
import {useAppTheme} from "@/hooks/useAppTheme";
import {DropdownItemType} from "@/constants/Types";
import {useAIModels} from "@/hooks/useAIModels";

export const SettingsContext = createContext({
    theme: AppTheme.system,
    setTheme: (value: AppTheme) => {},
    themesDropdown: [{title: '', value: '', selected: false}],
    setThemesDropdown: (value: DropdownItemType[]) => {},
    models: [{title: '', value: '', selected: false}],
    setModels: (value: DropdownItemType[]) => {},
    refreshAssets: false,
    setRefreshAssets: (value: boolean) => {}
});

export const useSettings = () => {
    return useContext(SettingsContext);
};

export const SettingsProvider = ({children}: { children: React.ReactNode; }) => {
    const {theme, setTheme, themesDropdown, setThemesDropdown} = useAppTheme();
    const {models, setModels} = useAIModels();
    const [refreshAssets, setRefreshAssets] = useState<boolean>(false);

    const value = {
        theme,
        setTheme,
        themesDropdown,
        setThemesDropdown,
        models,
        setModels,
        refreshAssets,
        setRefreshAssets
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
