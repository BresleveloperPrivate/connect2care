import consts from "./../../tools/client/hooks/consts.json"

class HooksList {
    constructor(hooksRepository) {
        this.hooksRepository = hooksRepository;
    }

    addHooks() {
        this.hooksRepository.addHook(consts.AUTH, consts.HOOK__BEFORE_LOGIN, this.beforeLogin);
        this.hooksRepository.addHook(consts.AUTH, consts.HOOK__AFTER_LOGIN, this.afterLogin);
        this.hooksRepository.addHook(consts.AUTH, consts.HOOK__AFTER_REGISTER, this.afterRegister);
        this.hooksRepository.addHook(consts.AUTH, consts.HOOK__LOGOUT, this.deleteAsyncStorage);
        this.hooksRepository.addFilterHook(consts.AUTH, consts.FILTER_HOOK__FETCH_URL, this.filterHookUrlTry);
        this.hooksRepository.addFilterHook(consts.AUTH, consts.FILTER_HOOK__FETCH_URL, this.filterHookUrl);
    }

    filterHookUrl(url) {
        if (url) {
            url = "pumba.carmel6000.com" + url
        }
        return url

    }
    filterHookUrlTry(url) {
        console.log("url: ", url)
        url = "https://" + url
        return url;
    }

    async afterLogin(res) {
    }

    async afterRegister(res) {
        console.log("res register", res)
    }

    async setUserData(res) {
    }

    beforeLogin() {
        console.log("hhh auth beforeLogin")
    }

    async deleteAsyncStorage() {
    }
}

export default HooksList;
