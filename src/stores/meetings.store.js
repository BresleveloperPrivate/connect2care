import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'

class MeetingsStore {

    searchInput = ''
    fallenRelative = false
    language = false
    date = false
    lastId = 0
    loadMoreButton = false

    changeSearchInput = (event) => {
        ////if match...
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

    search = async (getMore) => {

        if (!getMore) {
            this.lastId = 0
        } 

        let filter = {
            where:
            {
                and: [
                    getMore ? { id: { gt: this.lastId } } : {},
                    this.language ? { language: this.language } : {},
                    this.date ? { date: this.date } : {},
                    this.fallenRelative ? { relationship: this.fallenRelative } : {}

                ]
            }
            , include: [{ relation: "fallens" }],
            limit: 3
        }

        let [meetings, err] = await Auth.superAuthFetch(`/api/meetings?filter=${JSON.stringify(filter)}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        })
        if (err) {
            console.log(err)
        } else {
            console.log(meetings)
            let id;
            if(!meetings.length) return
            if (meetings.length <= 2) {
                this.loadMoreButton = false
                id = meetings[meetings.length - 1].id
            } else {
                this.loadMoreButton = true
                id = meetings[meetings.length - 2].id
            }
            this.lastId = id
            console.log(meetings , id)
        }
    }

}

decorate(MeetingsStore, {
    loadMoreButton:observable,
    search:action,
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