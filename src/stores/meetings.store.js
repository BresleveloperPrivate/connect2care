import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'

class MeetingsStore {

    searchInput = ''
    fallenRelative = false
    language = false
    date = false
    lastId = 0

    changeSearchInput = (event) => {
        ////if...
        this.searchInput = event.target.value
    }

    changeFallenRelative = (relative) => {
        if (relative === 'הכל') {
            this.fallenRelative = false
            return
        }
        this.fallenRelative = relative
    }

    changeMeetingLanguage = (language) => {
        if (language === 'כל השפות') {
            this.language = false
            return
        }
        this.language = language
    }

    changeMeetingDate = (date) => {
        if (date === 'כל התאריכים') {
            this.date = false
            return
        }
        this.date = date.split(" ")[0]
    }

    search = async () => {

        let filter = {
            where:
            {
                and: [{
                    id: { gt: this.lastId }
                },
                this.language ? { language: this.language } : {},
                this.date ? { date: this.date } : {},
                this.fallenRelative ? { relationship: this.fallenRelative } : {}

                ]
            }
            , include: [{ relation: "fallens" }],
            limit: 4
        }

        let [meetings, err] = await Auth.superAuthFetch(`/api/meetings?filter=${JSON.stringify(filter)}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        })
        if (err) {
            console.log(err)
        } else {
            console.log(meetings)
        }
    }

}

decorate(MeetingsStore, {
    searchInput: observable,
    fallenRelative: observable,
    language: observable,
    date: observable,
    lastId: observable,
    changeSearchInput: action,
    changeFallenRelative: action,
    changeMeetingLanguage: action,
    changeMeetingDate: action
});

export default new MeetingsStore();