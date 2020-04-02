import { observable, decorate, action } from 'mobx';
import React, { createContext, useContext } from 'react';
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
        if (this.meetingDetails.fallens) {
            for (let i = 0; i < this.meetingDetails.fallens.length; i++) {
                if (this.meetingDetails.fallens[i].id === index)
                    this.meetingDetails.fallens[i].relative = option
            }
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

    createNewMeetingPost = async (history) => {
        let beforePostJSON = JSON.parse(JSON.stringify(this.meetingDetails))
        if (this.otherRelationShip && this.otherRelationShip.length && beforePostJSON.fallens && beforePostJSON.fallens.length) {
            let checkOtherRelation = JSON.parse(JSON.stringify(this.otherRelationShip))
            beforePostJSON.fallens.filter((fallen) => {
                checkOtherRelation.filter((other) => {
                    if (other.id === fallen.id) {
                        fallen.relative = other.relative
                    }
                })
            })
        }
        let zoomId = beforePostJSON.zoomId
        delete beforePostJSON.zoomId
        delete this.meetingDetailsOriginal.zoomId
        let whatDidntChange = this.whatDidntChange(beforePostJSON, this.meetingDetailsOriginal)
        let whatDidntChange1 = this.whatDidntChange(beforePostJSON.owner, this.meetingDetailsOriginal.owner)
        if (whatDidntChange.length && whatDidntChange1.length) {
            this.setError("כל השדות צריכים להיות מלאים")
            return
        }
        beforePostJSON.zoomId = zoomId

        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/createMeeting/`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: beforePostJSON })
            }, true);
        if (err || !success) {
            this.error = "משהו השתבש, נסה שנית מאוחר יותר"
            return
        }
        console.log("success", success)
        if (history)
            history.push("/success")
        //this.successObject = {
        //  meetingStarter: success.meetingOwner.name,
        //meetingStory: success.meetingOwner.name,
        //meetingDate: success.date.
        //}
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

const createMeetingStore = new CreateMeetingStore();

export const CreateMeetingContext = createContext();

export const CreateMeetingProvider = ({ children }) => (
    <CreateMeetingContext.Provider value={createMeetingStore}>
        {children}
    </CreateMeetingContext.Provider>
);

export const useCreateMeeting = () => useContext(CreateMeetingContext);

export default createMeetingStore;