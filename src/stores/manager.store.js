import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'

class ManagerStore {

    page = 1
    meetings = null
    filters = {}

    setPage =(page)=>{
        this.page = page
    }

    setFilters = (filters) => {
        this.filters = filters
    }

    fetchMeetingsDashboard = async () => {
        this.filters.from = (this.page - 1) * 20
        let [meetings, err] = await Auth.superAuthFetch('/api/meetings/getMeetingsDashboard', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ filters: this.filters })
        }, true)
        if (err) {
            // this.setError("לא הצלחנו להביא את התקופות המבוקשות")
            return
        }
        console.log(meetings)
        this.meetings = meetings
        return this.meetings
    }
}

decorate(ManagerStore, {

    page: observable,
    filters: observable,
    meetings: observable,
    setPage: action,
    setFilters: action,
    meetings: observable,
    fetchMeetingsDashboard: action

});

export default new ManagerStore();

