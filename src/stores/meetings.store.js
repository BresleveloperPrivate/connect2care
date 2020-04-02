import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'
// import { tickStep } from 'd3';

class MeetingsStore {

    searchInput = ''
    prevSearchInput = ''
    fallenRelative = false
    language = false
    date = false
    lastId = 0
    loadMoreButton = false
    meetings = false
    time = false
    availableOnly = false

    changeSearchInput = (event) => {
        ////if match...
        if (event.target.value.match('^([^0-9#*/$%^&@!;=+]*)$')) {
            this.searchInput = event.target.value
        }
    }

    changeAvailableOnly = (isAvailable) => {
        this.availableOnly = isAvailable
    }

    changeMeetingTime = (time) => {
        this.time = time
    }

    changeFallenRelative = (relative) => {
        if (relative === 'קרבה לחלל') {
            this.fallenRelative = false
            return
        }
        this.fallenRelative = relative
    }

    changeMeetingLanguage = (language) => {
        if (language === 'שפת המפגש') {
            this.language = false
            return
        }
        this.language = language
    }

    changeMeetingDate = (date) => {
        if (date === 'תאריך המפגש') {
            this.date = false
            return
        }
        this.date = date
    }

    search = async (getMore, searchButton) => {

        if (searchButton) {
            this.prevSearchInput = this.searchInput
        }

        if (!getMore) {
            this.lastId = 0
            this.meetings = false
        }

        let filter = {
            and: [
                getMore ? { id: { gt: this.lastId } } : {},
                this.language ? { language: this.language } : {},
                this.date ? { date: this.date } : {},
                this.fallenRelative ? { relationship: this.fallenRelative } : {}
            ]
        }

        let [meetings, err] = await Auth.superAuthFetch('/api/meetings/getMeetingsUser', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: this.prevSearchInput, filters: filter, time: this.time || [], isAvailable: this.availableOnly })
        })
        if (err) {
            console.log(err)
        } else {
            console.log(meetings)
            let id;
            if (!meetings.length) {
                this.loadMoreButton = false
                this.meetings = []
                return
            }
            if (meetings.length <= 4) {
                this.loadMoreButton = false
                id = meetings[meetings.length - 1].id
            } else {
                this.loadMoreButton = true
                id = meetings[meetings.length - 2].id
            }
            this.lastId = id
            if (!this.meetings) {
                console.log('aaaaaaaaa')
                this.meetings = meetings.slice(0, 4)
                return
            }
            this.meetings = this.meetings.concat(meetings.slice(0, 4))
        }
    }

}

decorate(MeetingsStore, {
    loadMoreButton: observable,
    search: action,
    availableOnly: observable,
    time: observable,
    searchInput: observable,
    fallenRelative: observable,
    prevSearchInput: observable,
    language: observable,
    date: observable,
    lastId: observable,
    changeSearchInput: action,
    changeFallenRelative: action,
    changeMeetingLanguage: action,
    changeMeetingDate: action,
    meetings: observable,
    changeMeetingTime: action,
    changeAvailableOnly: action,
});

export default new MeetingsStore();