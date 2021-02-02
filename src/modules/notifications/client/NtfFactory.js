
import SwNtfFActory from './SwNffFactory';
import FcmNtfFactory from './FcmNtfFactory'

var NtfFactory = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function isCordova() {
        return document.URL.indexOf('http://') === -1 &&
            document.URL.indexOf('https://') === -1
    }

    return {

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {

            if (!instance) {
                if (isCordova())
                    instance = FcmNtfFactory.getInstance();
                else instance = SwNtfFActory.getInstance();
            }

            return instance;
        },
        unsubscribe: async function () { //unregister and destroy instance.
            const response = await instance.unsubscribe();
            instance = null;
        }

    };

})();

export default NtfFactory;


