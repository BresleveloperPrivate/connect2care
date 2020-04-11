import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'
// import { tickStep } from 'd3';

class MeetingsStore {

    error = false
    searchInput = ''
    prevSearchInput = ''
    fallenRelative = ''
    language = false
    date = false
    lastId = 0
    loadMoreButton = false
    meetings = false
    time = false
    availableOnly = false

    changeSearchInput = (event) => {
        ////if match...
        if (event.target.value.match('^([^#/$%^&@!;=+]*)$')) {
            this.searchInput = event.target.value
        }
        if (event.target.value === '' && this.prevSearchInput !== '') {
            this.search(false, true)
        }
    }

    changeAvailableOnly = (isAvailable) => {
        this.availableOnly = isAvailable
    }

    changeMeetingTime = (time) => {
        this.time = time
    }

    changeFallenRelative = (relative) => {
        console.log(relative)
        this.fallenRelative = relative
    }

    changeMeetingLanguage = (language) => {
        this.language = language
    }

    changeMeetingDate = (date) => {
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
            // id: this.lastId,
            language: this.language.data,
            date: this.date.data,
            relationship: this.fallenRelative.data,
            time: this.time.data,
            isAvailable: this.availableOnly,
        }

        let [meetings, err] = await Auth.superAuthFetch('/api/meetings/getMeetingsUser', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: this.prevSearchInput, filters: filter, limit: { min: this.lastId, max: this.lastId + 5 } })
        })
        if (err) {
            this.error = err
            console.log(err)
        } else {
            if (!meetings.length) {
                this.loadMoreButton = false
                this.meetings = []
                return
            }
            if (meetings.length <= 4) {
                this.loadMoreButton = false
            } else {
                this.loadMoreButton = true
            }
            if (!this.meetings) {
                this.meetings = meetings.slice(0, 4)

            } else {
                this.meetings = this.meetings.concat(meetings.slice(0, 4))
            }
            this.lastId = this.meetings.length
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
    error: observable,
});

export default new MeetingsStore();