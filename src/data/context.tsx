import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface AppContextState {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    isLoggedIn: boolean | null;
    setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>;
    roles: string[];
    setRoles: Dispatch<SetStateAction<string[]>>;
    toast: string | null;
    setToast: Dispatch<SetStateAction<string | null>>;
    hasPermission: (role: string) => boolean;
}

const AppContext = createContext<AppContextState>({
    loading: false,
    setLoading: () => {},
    isLoggedIn: null,
    setIsLoggedIn: () => {},
    roles: [],
    setRoles: () => {},
    toast: null,
    setToast: () => {},
    hasPermission: (_: string) => false,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [roles, setRoles] = useState<string[]>([]);
    const [toast, setToast] = useState<string | null>(null);

    const hasPermission = (role: string) => roles.includes('admin') || roles.includes(role);

    const value = {
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        roles,
        setRoles,
        toast,
        setToast,
        hasPermission,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
