
const Lib = {
    showError(error: any) {
        console.log(error);
        setTimeout(() => {
            alert(error);
        }, 500);
    }
};

export default Lib;