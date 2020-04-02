import { observable, decorate, action } from 'mobx';
import Auth from '../modules/auth/Auth'

class CreateMeetingStore {
    fallenDetails = null;
    fallenName = null;
    meetingDetailsOriginal = {
        name: null,
        description: null,
        owner: {
            name: null,
            phone: "",
            email: null
        },
        language: null,
        isOpen: null,
        date: null,
        time: "00:00",
        maxParticipants: "",
        fallens: [{ id: 1, relative: null }],
        zoomId: 0,
    }

    meetingDetails = {
        name: null,
        description: null,
        owner: {
            name: null,
            phone: "",
            email: null
        },
        language: null,
        isOpen: null,
        date: null,
        time: "00:00",
        maxParticipants: "",
        fallens: [{ id: 1, relative: null }],
        zoomId: 0,
    }
    error = null;
    otherRelationship = [{ id: 1, relative: null }];
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
        this.fallenDetails[id].name = fallen.name
        this.fallenDetails[id].fallingDate = fallen.falling_date.split("T")[0] + ", " + fallen.heb_falling_date
        this.fallenDetails[id].image = fallen.image_link
        this.fallenDetails[id].meetings = fallen.meetings
    }

    changeFallens = (index, number = null) => {
        if (this.meetingDetails.fallens === null) {
            this.meetingDetails.fallens = [{ id: index, relative: null }]
            this.otherRelationShip = [{ id: index, relative: null }]
        }
        else if (this.meetingDetails.fallens.length >= index) {
            this.meetingDetails.fallens[index] = { id: number, relative: null }
            this.otherRelationShip = [{ id: number, relative: null }]
        }
        else {
            this.meetingDetails.fallens.push({ id: number, relative: null })
            this.otherRelationShip.push({ id: number, relative: null })

        }
    }

    changeShortDescription = (e) => {
        this.meetingDetails.description = e.target.value
    }

    changeMeetingDate = (date) => {
        this.meetingDetails.date = date
    }

    setOtherRelationship = (e, idFallen) => {
        if (!this.otherRelationShip || this.otherRelationShip && !this.otherRelationShip.length) {
            this.otherRelationShip = [{ id: idFallen, relative: e.target.value }]
            return
        }
        else {
            for (let i = 0; i < this.otherRelationShip.length; i++) {
                if (this.otherRelationShip[i].id === idFallen)
                    this.otherRelationShip[i].relative = e.target.value
            }
        }
    }

    changeFallenName = (e) => {
        this.fallenName = e.target.value
    }

    changeFallenRelative = (option, index) => {
        console.log("option", option)
        console.log("index", index)
        if (this.meetingDetails.fallens) {
            console.log("before       fallens", this.meetingDetails.fallens)
            for (let i = 0; i < this.meetingDetails.fallens.length; i++) {
                console.log("fallens[i],", this.meetingDetails.fallens[i])
                if (this.meetingDetails.fallens[i].id === index)
                    this.meetingDetails.fallens[i].relative = option

            }
            console.log("after       fallens", this.meetingDetails.fallens)
        }
    }

    changeMeetingFacilitatorName = (e) => {
        this.meetingDetails.owner.name = e.target.value
    }

    changeMeetingFacilitatorEmail = (e) => {
        this.meetingDetails.owner.email = e.target.value
    }

    changeMeetingFacilitatorPhoneNumber = (e) => {
        if (e.target.value.match(/[^0-9-]/g) || e.target.value.length > 11) {
            return
        }
        this.meetingDetails.owner.phone = e.target.value
    }

    changeMeetingLanguage = (option) => {
        this.meetingDetails.language = option
    }

    changeMeetingOpenOrClose = (e) => {
        this.meetingDetails.isOpen = e.target.value
    }

    changeNumberOfParticipants = (e) => {
        if (e.target.value.match(/[^0-9]/g) || e.target.value.length > 6) {
            return
        }
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
            owner: {
                name: object.meetingOwner.name,
                phone: object.meetingOwner.phone,
                email: object.meetingOwner.email
            },
            language: object.language,
            isOpen: object.isOpen,
            date: object.date,
            time: object.time,
            maxParticipants: "",
            fallens: object.fallens,
            zoomId: 0,
        }
        this.meetingDetails = {
            name: object.name,
            description: object.description,
            owner: {
                name: object.meetingOwner.name,
                phone: object.meetingOwner.phone,
                email: object.meetingOwner.email
            },
            language: object.language,
            isOpen: object.isOpen,
            date: object.date,
            time: object.time,
            maxParticipants: "",
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

    equals = (obj1, obj2) => {
        if ((obj1 && !obj2) || (!obj1 && obj2)) return false
        if (obj1 && obj2 && Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false
        }
        for (let i in obj1) {
            if (typeof obj1[i] === 'object' && typeof obj2[i] === 'object') {
                if (!this.equals(obj1[i], obj2[i])) return false
            }
            else if (obj1[i] !== obj2[i]) return false
        }
        return true
    }

    whatDidntChange = (objToPost, objOriginal) => {
        let objToreturn = {}
        for (let i in objToPost) {
            if (objToPost[i] && objOriginal[i] && typeof objToPost[i] === 'object' && typeof objOriginal[i] === 'object') {
                if (this.equals(objToPost[i], objOriginal[i])) objToreturn[i] = objToPost[i]
            }
            else if (objToPost[i] === objOriginal[i]) objToreturn[i] = objToPost[i]
        }
        return objToreturn
    }

    createNewMeetingPost = async () => {
        console.log("this.otherRelationShip    before", this.otherRelationShip)
        let beforePostJSON = JSON.parse(JSON.stringify(this.meetingDetails))
        console.log("beforePostJSON", beforePostJSON)
        if (this.otherRelationship && this.otherRelationship.length && beforePostJSON.fallens && beforePostJSON.fallens.length) {
            console.log("innnnn    iffffff")

            /* for (let i = 0; i < beforePostJSON.fallens.length; i++) {
                 console.log("beforePostJSON.fallens[i]", beforePostJSON.fallens[i])
                 for (let j = 0; j < this.otherRelationship.length; j++) {
                     console.log("this.meetingDetails.fallens[j]", beforePostJSON.fallens[j])
                     if (beforePostJSON.fallens[i].id === this.otherRelationship[j].id && this.meetingDetails.fallens[i].relative === "אחר") {
                         //console.log("equal", this.otherRelationship.fallens[j], beforePostJSON.fallens[i])
                         beforePostJSON.fallens[i].relative = this.otherRelationship[j].relative
                         console.log("equal", beforePostJSON.fallens[i])
                     }
                 }
             }}*/
        }
        //console.log("this.otherRelationShip    after", this.otherRelationShip, "this.meetingDetails.fallens", beforePostJSON.fallens)

        console.log("this.meetingDetails.fallens", this.meetingDetails.fallens)
        let whatDidntChange = this.whatDidntChange(this.meetingDetails, this.meetingDetailsOriginal)
        let whatDidntChange1 = this.whatDidntChange(this.meetingDetails.owner, this.meetingDetailsOriginal.owner)
        console.log("whatDidntChange", whatDidntChange)
        console.log("whatDidntChange1", whatDidntChange1)
        if (whatDidntChange.length && whatDidntChange1.length) {
            this.setError("כל השדות צריכים להיות מלאים")
        }
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
        return (this.meetingDetails)
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