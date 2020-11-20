import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleProvider } from 'native-base';
import { Portal, Provider } from 'react-native-paper';
//@ts-ignore
import Toast from 'react-native-toast-message';
// @ts-ignore
import getTheme from './native-base-theme/components';
// @ts-ignore
import commonColor from './native-base-theme/variables/commonColor';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

const App = () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <SafeAreaProvider>
                    <Provider>
                        <Portal>
                            <Navigation colorScheme={colorScheme} />
                            <Toast ref={(ref: any) => Toast.setRef(ref)} />
                            <StatusBar />
                        </Portal>
                    </Provider>
                </SafeAreaProvider>
            </StyleProvider>
        );
    }
}

export default App;
