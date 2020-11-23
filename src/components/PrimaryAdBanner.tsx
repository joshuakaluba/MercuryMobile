import * as React from 'react';
import { View, Platform } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import environment from './../../environment';

// @ts-ignore
const PrimaryAdBanner = () => {

    const _bannerError = (error: any) => console.log(error);

    return environment.showAds ? <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={
            Platform.OS === 'ios' ?
                environment.ads['ios'].sessionBanner :
                environment.ads['android'].sessionBanner
        }
        servePersonalizedAds
        onDidFailToReceiveAdWithError={_bannerError} />
        : <View></View>;
}

export default PrimaryAdBanner;
