import {Appearance, ColorSchemeName} from "react-native";
import {useEffect, useLayoutEffect, useState} from "react";
import {AppTheme} from "@/constants/Enums";
import {useSettings} from "@/context/SettingsContext";


export const useManualThemeChange = () => {
    const {theme} = useSettings();
    const [isDark, setIsDarkState] = useState<boolean>(true)

    useLayoutEffect(() => {
        Appearance.setColorScheme(getScheme())
    }, [isDark]);

    useEffect(() => {
        Appearance.setColorScheme(getScheme())
    });

    useEffect(() => {
        //@ts-ignore
        setIsDark(theme === AppTheme.system ? true : AppTheme[theme])
    }, [theme]);

    const setIsDark = (value: boolean) => {
        setIsDarkState(value);
        Appearance.setColorScheme(getScheme())
    }

    const getScheme = () => {
        return isDark ? 'dark' : 'light';
    }
}