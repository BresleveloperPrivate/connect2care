import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'

class ManagerStore {

    page = 1
    meetings = null
    loading = false

    setPage = (page) => {
        this.page = page
    }

    fetchMeetingsDashboard = async (filters = {}) => {
        this.loading = true
        this.meetings = null
        filters.from = (this.page - 1) * 20
        let [meetings, err] = await Auth.superAuthFetch('/api/meetings/getMeetingsDashboard', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ filters: filters })
        }, true)
        this.loading = false
        if (err) {
            console.log(err)
            // this.setError("לא הצלחנו להביא את התקופות המבוקשות")
            return
        }
        console.log(meetings)
        let size = meetings.pop()
        this.meetings = meetings || []
        return this.meetings
    }
}

decorate(ManagerStore, {

    page: observable,
    meetings: observable,
    loading: observable,
    setPage: action,
    setFilters: action,
    meetings: observable,
    fetchMeetingsDashboard: action

});

export default new ManagerStore();

