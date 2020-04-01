import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'

class CreateMeetingStore {
    fallenDetails = null;
    fallenName = null;
    meetingDetailsOriginal = {
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
        fallens: [1],
        zoomId: 0,
        error: null
    }
    otherRelationship = null;
    meetingId = -1;

    changeMeetingName = (e) => {
        this.meetingDetails.name = e.target.value
    }

    setMeetingId = (meetingId) => {
        this.meetingId = meetingId
    }

    changeFallenDetails = (fallen) => {
        let id = fallen.id
        if (!this.fallenDetails) {
            this.fallenDetails = {}
            this.fallenDetails[id] = {}
        }
        this.fallenDetails[id].name = fallen.first_name + " " + fallen.last_name
        this.fallenDetails[id].fallingDate = fallen.falling_date.split("T")[0] + ", " + fallen.heb_falling_date
        this.fallenDetails[id].image = fallen.image_link
        this.fallenDetails[id].meetings = fallen.meetings
    }

    changeFallens = (index, number = null) => {
        console.log("this.meetingDetails.fallens", this.meetingDetails.fallens)
        if (this.meetingDetails.fallens === null) {
            this.meetingDetails.fallens = [index]
        }
        else if (this.meetingDetails.fallens.length >= index) {
            this.meetingDetails.fallens[index] = number
        }
        else this.meetingDetails.fallens.push(index)

    }


    changeShortDescription = (e) => {
        this.meetingDetails.description = e.target.value
    }

    changeMeetingDate = (date) => {
        this.meetingDetails.date = date
    }

    setOtherRelationship = (e) => {
        this.otherRelationShip = e.target.value
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

    changeDetailsObjFunc = (object) => {
        if (object.fallens && object.fallens.length) {
            this.fallenDetails = null;
            this.fallenName = null;
        }
        this.meetingDetailsOriginal = {
            name: object.name,
            description: object.description,
            relationship: object.relationship,
            owner: {
                name: object.meetingOwner.name,
                phone: object.meetingOwner.phone,
                email: object.meetingOwner.email
            },
            language: object.language,
            isOpen: object.isOpen,
            date: object.date,
            time: object.time,
            maxParticipants: null,
            fallens: object.fallens,
            zoomId: 0,
        }
        this.meetingDetails = {
            name: object.name,
            description: object.description,
            relationship: object.relationship,
            owner: {
                name: object.meetingOwner.name,
                phone: object.meetingOwner.phone,
                email: object.meetingOwner.email
            },
            language: object.language,
            isOpen: object.isOpen,
            date: object.date,
            time: object.time,
            maxParticipants: null,
            fallens: object.fallens,
            zoomId: 0,
        }
    }

    getMeetingDetails = async () => {
        let [success, err] = await Auth.superAuthFetch(`/api/meetings?filter={"where":{"id":${this.meetingId}}, "include":["meetingOwner", "fallens"]}`);

        console.log("success", success)
        if (err) {
            this.error = err
        }
        if (success) {
            this.changeDetailsObjFunc(success[0])
        }
    }

    changeMeetingTime = (event) => {
        this.meetingDetails.time = (event.getHours() < 10 ? '0' : '') + event.getHours() + ":" + (event.getMinutes() < 10 ? '0' : '') + event.getMinutes()
    }

    createNewMeetingPost = async () => {
        if (this.meetingDetails.date)
            this.meetingDetails.date = this.meetingDetails.date.split(" ")[0]
        if (this.otherRelationship)
            this.meetingDetails.relationship = this.otherRelationship

        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/createMeeting/`,
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

    setError = (error) => {
        this.error = error
    }
}

decorate(CreateMeetingStore, {
    fallenDetails: observable,
    fallenName: observable,
    otherRelationship: observable,
    meetingDetails: observable,
    meetingId: observable,
    error: observable,
    setMeetingId: action,
    changeFallenDetails: action,
    changeFallens: action,
    changeNumberOfParticipants: action,
    setError: action,
    changeMeetingDate: action,
    changeMeetingTime: action,
    changeMeetingOpenOrClose: action,
    changeMeetingFacilitatorPhoneNumber: action,
    changeFallenRelative: action,
    getMeetingDetails: action,
    setOtherRelationship: action,
    changeMeetingLanguage: action,
    changeMeetingFacilitatorEmail: action,
    changeMeetingFacilitatorName: action,
    changeFallenName: action,
    changeShortDescription: action,
    createNewMeetingPost: action,
    changeMeetingName: action
});

export default new CreateMeetingStore();