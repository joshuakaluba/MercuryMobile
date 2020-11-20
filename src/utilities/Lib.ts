//@ts-ignore
import Toast from 'react-native-toast-message';

const Lib = {
    showError(error: any) {
        console.log(error);
        setTimeout(() => {
            alert(error);
        }, 500);
    },

    generateGuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    },

    showSuccessMessageToast(title:string, message:string){
        Toast.show({
            position: 'bottom',
            visibilityTime: 5000,
            text1: title,
            text2: message
        });
    }
};

export default Lib;