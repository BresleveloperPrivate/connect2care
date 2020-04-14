import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'

class ManagerStore {

    page = 1
    meetings = null
    loading = false
    filters = null
    readMore = false
    meetingsNum = 0

    setPage = (page) => {
        this.page = page
    }

    fetchMeetingsDashboard = async (filters = {}, readMore = false) => {
        if (readMore) {
            filters = this.filters
            this.page = this.page + 1
        }
        else {
            this.filters = filters
            this.meetings = null
        }
        this.loading = true
        filters.from = (this.page - 1) * 20
        let [meetings, err] = await Auth.superAuthFetch('/api/meetings/getMeetingsDashboard', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ filters: filters })
        }, true)
        this.loading = false
        if (err) {
            console.log(err)
            return
        }
        this.meetingsNum = meetings.pop() || 0
        this.readMore = (Math.ceil(this.meetingsNum / 20) - this.page) > 0
        if (!readMore) this.meetings = meetings || []
        else {
            for(let meeting of meetings){
                this.meetings.push(meeting)
            }
        }
        return this.meetings
    }
}

decorate(ManagerStore, {
    meetingsNum: observable,
    readMore: observable,
    meetings: observable,
    loading: observable,
    setPage: action,
    setFilters: action,
    meetings: observable,
    fetchMeetingsDashboard: action

});

export default new ManagerStore();

