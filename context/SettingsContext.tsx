import {createContext, useContext, useState} from "react";
import {AppTheme} from "@/constants/Enums";

export const SettingsContext = createContext({
    appTheme: AppTheme.system,
    setAppTheme: (value: AppTheme) => {
    },
});

export const useSettings = () => {
    return useContext(SettingsContext);
};

export const SettingsProvider = ({children}: { children: React.ReactNode; }) => {
    const [appTheme, setAppTheme] = useState<AppTheme>(AppTheme.system);
    // let systemScheme: ColorSchemeName;
    // const [colorScheme, setColorScheme] = useState<ColorSchemeName>(systemScheme)

    // useEffect(() => {
    //     systemScheme = Appearance.getColorScheme()
    // }, []);
    //
    // useEffect(() => {
    //     Appearance.setColorScheme(colorScheme)
    // }, [colorScheme]);

    // const toggleAppTheme = (value: AppTheme) => {
    //     if (value === undefined || value === null){
    //         value = AppTheme.system;
    //     }
    //
    //     setAppTheme(value);
    //
    //     if (value === AppTheme.system){
    //         setColorScheme(systemScheme);
    //     }
    //     else {
    //         setColorScheme(value === AppTheme.dark ? 'dark' : 'light');
    //     }
    // }

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
