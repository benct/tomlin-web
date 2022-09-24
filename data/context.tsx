import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface AppContextState {
    isLoggedIn: boolean | null;
    setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>;
    settings: Record<string, string>;
    setSettings: Dispatch<SetStateAction<Record<string, string>>>;
    toast: string | null;
    setToast: Dispatch<SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextState>({
    isLoggedIn: null,
    setIsLoggedIn: () => {},
    settings: {},
    setSettings: () => {},
    toast: null,
    setToast: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [toast, setToast] = useState<string | null>(null);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        settings,
        setSettings,
        toast,
        setToast,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
