import {createContext, useContext, useState} from "react";

export const TabBarContext = createContext({
    isTabBarVisible: true,
    hideTabBar: () => {},
    showTabBar: () => {},
});

export const useTabBar = () => {
    return useContext(TabBarContext);
};

export const TabBarProvider = ({children}: {children: React.ReactNode;}) => {
    const [isTabBarVisible, setIsTabBarVisible] = useState(true);

    const value = {
        isTabBarVisible,
        hideTabBar: () => setIsTabBarVisible(false),
        showTabBar: () => setIsTabBarVisible(true),
    };

    return (
        <TabBarContext.Provider value={value}>
            {children}
        </TabBarContext.Provider>
    );
};
