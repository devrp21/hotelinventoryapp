// import { InjectionToken } from "@angular/core";

// export const localStorageToken = new InjectionToken<any>('local storage', {
//     providedIn: 'root',
//     factory() {
//         return localStorage;
//     },
// });


import { InjectionToken } from "@angular/core";

export const localStorageToken = new InjectionToken<any>('local storage', {
  providedIn: 'root',
  factory() {
    try {
      // Check if window is defined (browser environment)
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage;
      } else {
        console.warn('localStorage is not available. Using a fallback.');
        // Provide a fallback implementation if localStorage is not available
        return {
          getItem: (_key: string) => null,
          setItem: (_key: string, _value: any) => {},
          removeItem: (_key: string) => {},
        };
      }
    } catch (error) {
      console.error('An error occurred while accessing localStorage:', error);
      // Provide a fallback implementation in case of an error
      return {
        getItem: (_key: string) => null,
        setItem: (_key: string, _value: any) => {},
        removeItem: (_key: string) => {},
      };
    }
  },
});
