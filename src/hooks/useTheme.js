import React, {useLayoutEffect, useState} from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light')

    useLayoutEffect(() => {
        localStorage.setItem('app-theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return {theme, setTheme}
};