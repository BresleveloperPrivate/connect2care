import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'
import downloadExcel from '../functions/downloadExcel'

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

    setReadMore = (readMore) => {
        this.readMore = readMore
    }

    fetchMeetingsDashboard = async (filters = {}, readMore = false, isExcel = false) => {
        if (readMore) {
            filters = this.filters
            this.page = this.page + 1
        }
        else if (!isExcel) {
            this.filters = filters
            this.meetings = null
        }
        this.loading = true
        filters.from = (this.page - 1) * 20
        let [meetings, err] = await Auth.superAuthFetch('/api/meetings/getMeetingsDashboard', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ filters: filters, isExcel: isExcel })
        }, true)
        this.loading = false
        if (err) {
            console.log(err)
            return
        }
        if (!isExcel) {
            this.meetingsNum = meetings.pop() || 0
            this.readMore = (Math.ceil(this.meetingsNum / 20) - this.page) > 0
            if (!readMore) this.meetings = meetings || []
            else {
                for (let meeting of meetings) {
                    this.meetings.push(meeting)
                }
            }
        }
        else {

            const columns = {
                name: "שם המפגש",
                date: "תאריך",
                time: 'שעה',
                fallens: 'שמות הנופלים',
                ownerName: 'שם המארח',
                ownerEmail: 'כתובת המייל של המארח',
                ownerPhone:'פלפון של המארח'

            }

            downloadExcel(meetings, columns, "מתחברים וזוכרים טבלאות")
        }
    }
}

decorate(ManagerStore, {
    meetingsNum: observable,
    readMore: observable,
    meetings: observable,
    loading: observable,
    setPage: action,
    setReadMore: action,
    setFilters: action,
    meetings: observable,
    fetchMeetingsDashboard: action

});

export default new ManagerStore();

