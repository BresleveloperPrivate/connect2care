import { observable, decorate, action } from 'mobx';

class CreateMeetingStore {
    fallenDetails = null;
    fallenDate = null;
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
        zoomId: 0
    }

    changeMeetingName = (e) => {
        this.meetingDetails.name = e.target.value
    }

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
}

decorate(CreateMeetingStore, {
    fallenDetails: observable,
    fallenName: observable,
    fallenDate: observable,
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
    changeMeetingName: action
});

export default new CreateMeetingStore();