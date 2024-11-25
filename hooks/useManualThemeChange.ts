import {Appearance, ColorSchemeName} from "react-native";
import {useEffect, useState} from "react";
import {AppTheme} from "@/constants/Enums";
import {useSettings} from "@/context/SettingsContext";


export const useManualThemeChange = () => {
    const {theme} = useSettings();
    let systemScheme: ColorSchemeName;
    const [colorScheme, setColorScheme] = useState<ColorSchemeName>()

    useEffect(() => {
        systemScheme = Appearance.getColorScheme();
        setColorScheme(systemScheme);
    }, []);

    useEffect(() => {
        // @ts-ignore
        setColorScheme(theme === AppTheme.system ? systemScheme : AppTheme[theme])
    }, [theme, systemScheme]);

    useEffect(() => {
        Appearance.setColorScheme(colorScheme)
    }, [colorScheme]);
}