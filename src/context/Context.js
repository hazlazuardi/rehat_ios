import React, { createContext, useContext } from "react";
import PropTypes from 'prop-types';


const ThemeContext = createContext(null);

function StoreProvider({ children }) {
	return (
		<ThemeContext.Provider value={{}} >
			{children}
		</ThemeContext.Provider>
	);
}

StoreProvider.propTypes = {
	children: PropTypes.element
};

export function useTheme() {
	return useContext(ThemeContext);
}

export default StoreProvider;