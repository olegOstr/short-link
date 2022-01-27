import React, {useLayoutEffect, useState} from 'react';

const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme = isDarkTheme ? 'dark' : 'light'

export const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || defaultTheme)

    useLayoutEffect(() => {
        localStorage.setItem('app-theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return {theme, setTheme}
};