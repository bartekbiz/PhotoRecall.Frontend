import React from "react";
import {BottomTabBar, BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {useTabBar} from "@/context/TabBarContext";

const TabBar: React.FC<BottomTabBarProps> = (props: BottomTabBarProps) => {
    const {isTabBarVisible} = useTabBar();

    if (!isTabBarVisible) {
        return null;
    }

    return <BottomTabBar {...props} />;
};

export default TabBar;