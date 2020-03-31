import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'

class CreateMeetingStore {
    fallenDetails = null;
    fallenName = null;
    meetingDetails = {
        name: null,
        description: null,
        relationship: null,
        owner: {
            name: null,
            phone: null,
            email: null
        },
        language: null,
        isOpen: null,
        date: null,
        time: "00:00",
        maxParticipants: null,
        fallens: null,
        zoomId: 0,
        error: null
    }

    changeMeetingName = (e) => {
        this.meetingDetails.name = e.target.value
    }

    //changeFallens = (index)=>{
      //  this.fallens =
    //}

    changeShortDescription = (e) => {
        this.meetingDetails.description = e.target.value
    }

    changeMeetingDate = (option) => {
        this.meetingDetails.date = option
    }

    changeFallenName = (e) => {
        this.fallenName = e.target.value
    }

    changeFallenRelative = (option) => {
        this.meetingDetails.relationship = option
    }

    changeMeetingFacilitatorName = (e) => {
        this.meetingDetails.owner.name = e.target.value
    }

    changeMeetingFacilitatorEmail = (e) => {
        this.meetingDetails.owner.email = e.target.value
    }

    changeMeetingFacilitatorPhoneNumber = (e) => {
        this.meetingDetails.owner.phone = e.target.value
    }

    changeMeetingLanguage = (option) => {
        this.meetingDetails.language = option
    }

    changeMeetingOpenOrClose = (e) => {
        this.meetingDetails.isOpen = e.target.value
    }

    changeNumberOfParticipants = (e) => {
        console.log("e.target.value.match(/[0-9]/g)", e.target.value.match(/[0-9]/g))
        console.log("e.target.value", e.target.value)
        if (e.target.value.match(/[^0-9]/g)) return
        this.meetingDetails.maxParticipants = e.target.value
    }

    changeMeetingTime = (event) => {
        this.meetingDetails.time = (event.getHours() < 10 ? '0' : '') + event.getHours() + ":" + (event.getMinutes() < 10 ? '0' : '') + event.getMinutes()
    }

    createNewMeetingPost = async () => {
        if (this.meetingDetails.date)
            this.meetingDetails.date = this.meetingDetails.date.split(" ")[0]

        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/createMeeting`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: this.meetingDetails })
            }, true);
        if (err)
            this.error = "משהו השתבש, נסה שנית מאוחר יותר"
        console.log("success", success)
        console.log("this.meetingDetails", this.meetingDetails)
    }
}

decorate(CreateMeetingStore, {
    fallenDetails: observable,
    fallenName: observable,
    meetingDetails: observable,
    changeNumberOfParticipants: action,
    changeMeetingTime: action,
    changeMeetingOpenOrClose: action,
    changeMeetingFacilitatorPhoneNumber: action,
    changeFallenRelative: action,
    changeMeetingLanguage: action,
    changeMeetingFacilitatorEmail: action,
    changeMeetingFacilitatorName: action,
    changeFallenName: action,
    changeShortDescription: action,
    createNewMeetingPost: action,
    changeMeetingName: action
});

export default new CreateMeetingStore();