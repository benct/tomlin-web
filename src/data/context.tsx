import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface AppContextState {
    loading: boolean | null;
    setLoading: Dispatch<SetStateAction<boolean>>;
    isLoggedIn: boolean | null;
    setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>;
    toast: string | null;
    setToast: Dispatch<SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextState>({
    loading: false,
    setLoading: () => {},
    isLoggedIn: null,
    setIsLoggedIn: () => {},
    toast: null,
    setToast: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const value = {
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        toast,
        setToast,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
