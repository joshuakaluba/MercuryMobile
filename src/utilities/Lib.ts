//@ts-ignore
import Toast from 'react-native-toast-message';
import { AdMobInterstitial } from 'expo-ads-admob';
import { Platform } from 'react-native';
import environment from '../../environment';

const Lib = {
    showError(error: any) {
        console.log(error);
        setTimeout(() => {
            alert(error);
        }, 500);
    },

    generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    showSuccessMessageToast(title: string, message: string) {
        Toast.show({
            position: 'bottom',
            visibilityTime: 5000,
            text1: title,
            text2: message
        });
    },

    async showInterstitial() {
        try {
            const adUnit = Platform.OS === 'ios' ? environment.ads['ios'].interstitial
                : environment.ads['android'].interstitial;

            await AdMobInterstitial.setAdUnitID(adUnit);
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            console.log(error)
        }
    }
};

export default Lib;