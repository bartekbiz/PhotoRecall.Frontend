import {createContext, useContext, useState} from "react";
import {number} from "prop-types";
import {AppTheme} from "@/constants/Enums";
import {useColorScheme} from "@/hooks/useColorScheme";

export const SettingsContext = createContext({
    appTheme: AppTheme.system,
    setAppTheme: (value: AppTheme) => {},
});

export const useSettings = () => {
    return useContext(SettingsContext);
};

export const SettingsProvider = ({children}: {children: React.ReactNode;}) => {
    const [appTheme, setAppTheme] = useState(AppTheme.system);

    const value = {
        appTheme,
        setAppTheme: (value: AppTheme) => setAppTheme(value),
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
