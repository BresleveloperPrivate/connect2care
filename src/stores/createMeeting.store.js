import { observable, decorate, action } from 'mobx';
import React, { createContext, useContext } from 'react';
import Auth from '../modules/auth/Auth'


class CreateMeetingStore {
    fallenDetails = null;
    fallenName = null;
    nameMessage = "";
    meetingDetailsOriginal = {
        name: "",
        description: "",
        owner: {
            name: "",
            phone: "",
            email: ""
        },
        language: "",
        isOpen: "",
        date: "",
        time: "00:00",
        max_participants: "",
        fallens: null,
        zoomId: 0,
    }
    allMeetings = null;

    meetingDetails = JSON.parse(JSON.stringify(this.meetingDetailsOriginal))

    error = null;
    waitForData = false;
    otherRelationship = null;
    meetingId = -1;

    changeMeetingName = (e) => {
        if (e.length > 100) return
        this.meetingDetails.name = e.target.value
    }

    resetAll = () => {
        this.fallenDetails = null;
        this.fallenName = null;
        this.nameMessage = "";
        this.meetingDetailsOriginal = {
            name: "",
            description: "",
            owner: {
                name: "",
                phone: "",
                email: ""
            },
            language: "",
            isOpen: "",
            date: "",
            time: "00:00",
            max_participants: "",
            fallens: null,
            zoomId: 0,
        }
        this.allMeetings = null;

        this.meetingDetails = JSON.parse(JSON.stringify(this.meetingDetailsOriginal))

        this.error = null;
        this.waitForData = false;
        this.otherRelationship = null;
        this.meetingId = -1;
    }

    setMeetingId = (meetingId) => {
        this.meetingId = meetingId
    }

    changeFallenDetails = (fallen, index) => {
        let id = fallen.id
        if (!this.fallenDetails) {
            this.fallenDetails = {}
        }
        this.fallenDetails[id] = {
            name: fallen.name,
            fallingDate: fallen.falling_date.split("T")[0] + " | " + fallen.heb_falling_date,
            image: fallen.image_link,
            meetings: fallen.meetings
        }
        this.meetingDetails.fallens[index].id = fallen.id
    }

    changeFallens = (index, number = null) => {
        if (this.meetingDetails.fallens === null) {
            this.meetingDetails.fallens = [{ id: index, relative: null }]
            this.otherRelationShip = [{ id: index, relative: "" }]
        }
        else if (this.meetingDetails.fallens.length >= index) {
            this.meetingDetails.fallens[index] = { id: number, relative: null }
            this.otherRelationShip[index] = { id: number, relative: "" }
        }
        else {
            this.meetingDetails.fallens.push({ id: number, relative: null })
            this.otherRelationShip.push({ id: number, relative: "" })
        }
    }

    changeShortDescription = (e) => {
        if (e.length > 1000) return
        this.meetingDetails.description = e.target.value
    }

    changeMeetingDate = (date) => {
        this.meetingDetails.date = date
    }

    setOtherRelationship = (e, index) => {
        if (!this.otherRelationShip || (this.otherRelationShip && !this.otherRelationShip.length)) {
            this.otherRelationShip = [{ id: null, relative: e.target.value }]
            return
        }
        else {
            if (this.otherRelationShip[index])
                this.otherRelationShip[index].relative = e.target.value
            else
                this.otherRelationShip[index].relative = { id: null, relative: e.target.value }

        }
    }

    changeFallenName = (event, index) => {
        if (!this.fallenName) {
            this.fallenName = []
        }
        if (index === this.fallenName.length)
            this.fallenName.push(event)
        else if (index < this.fallenName.length)
            this.fallenName[index] = event
        else {
            for (let i = this.fallenName.length; i < index; i++)
                this.fallenName[i] = ""
            this.fallenName[index] = event
        }
    }

    changeFallenRelative = (option, index) => {
        if (this.meetingDetails.fallens) {
            for (let i = 0; i < this.meetingDetails.fallens.length; i++) {
                if (this.meetingDetails.fallens[i].id === index) {
                    this.meetingDetails.fallens[i].relative = option
                    if (option !== "אח/ות" && option !== "הורים" && option !== "קרובי משפחה") {
                        this.meetingDetails.fallens[i].needAlert = true
                        // setTimeout(() => this.meetingDetails.fallens[i].needAlert = false, 10000)
                    }
                }
            }
        }
    }

    changeNeedAlert = (value, index) => {
        if (this.meetingDetails.fallens) {
            for (let i = 0; i < this.meetingDetails.fallens.length; i++) {
                if (this.meetingDetails.fallens[i].id === index) {
                    this.meetingDetails.fallens[i].needAlert = value
                }
            }
        }
    }

    changeMeetingFacilitatorName = (e) => {
        if (e.length > 100) return
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

    getAllMeetings = async () => {
        if (this.meetingDetails.name && this.meetingDetails.name !== "") {
            if (!this.allMeetings) {
                let [success, err] = await Auth.superAuthFetch(`/api/meetings/`)
                if (err || !success) {
                    this.error = "משהו השתבש, נסה שנית מאוחר יותר"
                    return
                }
                if (success)
                    this.allMeetings = success
            }
            this.nameMessage = ""
            for (let i = 0; i < this.allMeetings.length; i++) {
                if (this.allMeetings[i].name === this.meetingDetails.name)
                    this.nameMessage = "שים לב, שם זה זהה לארוע אחר שנפתח"
            }
        }
    }

    changeMeetingOpenOrClose = (e) => {
        this.meetingDetails.isOpen = e.target.value
    }

    changeNumberOfParticipants = (e) => {
        if (e.target.value.match(/[^0-9]/g) || e.target.value.length > 6) {
            return
        }
        this.meetingDetails.max_participants = e.target.value
    }

    changeDetailsObjFunc = (object) => {
        object.fallens = []
        for (let i of object.fallens_meetings) {
            let fallen = {}
            for (let key in i.fallens) {
                fallen[key] = i.fallens[key]
            }
            fallen.relationship = i.relationship
            object.fallens.push(fallen)
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
            max_participants: object.max_participants || '',
            fallens: object.fallens,
            zoomId: 0,
        }
        this.meetingDetails = JSON.parse(JSON.stringify(this.meetingDetailsOriginal))

        if (object.fallens && object.fallens.length) {
            for (let i = 0; i < object.fallens.length; i++) {
                this.changeFallenDetails(object.fallens[i], i)
                this.changeFallenName(object.fallens[i].name, i)
                let obj = {}
                obj.id = object.fallens[i].id
                obj.relative = object.fallens[i].relationship
                if (object.fallens[i].relationship !== 'אח/ות' && object.fallens[i].relationship !== 'הורים' && object.fallens[i].relationship !== 'קרובי משפחה' && object.fallens[i].relationship !== 'חבר') {
                    obj.relative = 'אחר'
                    if (!this.otherRelationship) this.otherRelationship = {}
                    if (!this.otherRelationship[i]) this.otherRelationship[i] = {}
                    this.otherRelationship[i].relative = object.fallens[i].relationship
                    this.otherRelationship[i].id = object.fallens[i].id
                }
                this.meetingDetails.fallens[i] = obj
            }
        }
        console.log(this.meetingDetails)
    }

    getMeetingDetails = async () => {
        if (this.meetingId === -1) return

        let [success, err] = await Auth.superAuthFetch(`/api/meetings?filter={"where":{"id":${this.meetingId}}, "include":["meetingOwner", {"relation":"fallens_meetings", "scope":{"include":"fallens"}}]}`);

        if (err) {
            this.error = err
        }
        if (success) {
            // console.log(success[0])
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
        if (Object.keys(whatDidntChange).length || Object.keys(whatDidntChange1).length) {
            this.setError("כל השדות צריכים להיות מלאים")
            return
        }
        beforePostJSON.zoomId = zoomId

        this.waitForData = true
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/createMeeting/`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: beforePostJSON })
            }, true);
        this.waitForData = false
        if (err || !success) {
            console.log("err", err)
            if (err && err.error && err.error.isOpen)
                this.error = "משהו השתבש, אנא בדוק שבחרת אם המפגש פתוח או סגור בצורה טובה"
            else if (err && err.error && err.error.max_participants)
                this.error = "משהו השתבש, אנא בדוק שהכנסת מספר משתתפים מקסימלי במספרים"
            else if (err && err.error && err.error.name)
                this.error = "משהו השתבש, אנא בדוק ששם המפגש נכון"
            else if (err && err.error && err.error.message && err.error.message === "No response, check your network connectivity")
                this.error = "משהו השתבש, אנא בדוק את החיבור לאינטרנט"
            else if (err && err.error && err.error.description)
                this.error = "משהו השתבש, אנא בדוק שתאור המפגש נכון"
            else if (err && err.error && err.error.language)
                this.error = "משהו השתבש, אנא בדוק שבחרת שפה נכונה"
            else if (err && err.error && err.error.time)
                this.error = "משהו השתבש, אנא בדוק שהשעה של המפגש נכונה"
            else if (err && err.error && err.error.date)
                this.error = "משהו השתבש, אנא בדוק שבחרת תאריך נכון"
            else if (err && err.error && err.error.relationship)
                this.error = "משהו השתבש, אנא בדוק שבחרת קרבה שלי אל החלל נכונה"
            else if (err && err.error && err.error.msg)
                this.error = err.error.msg
            else
                this.error = "משהו השתבש, אנא נסה שנית מאוחר יותר"
            return
        }
        return success
    }

    setError = (error) => {
        this.error = error
    }
}

decorate(CreateMeetingStore, {
    fallenDetails: observable,
    fallenName: observable,
    nameMessage: observable,
    otherRelationship: observable,
    meetingDetails: observable,
    meetingId: observable,
    error: observable,
    waitForData: observable,
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
    resetAll: action,
    setOtherRelationship: action,
    changeMeetingLanguage: action,
    changeMeetingFacilitatorEmail: action,
    changeMeetingFacilitatorName: action,
    changeFallenName: action,
    changeNeedAlert: action,
    changeShortDescription: action,
    createNewMeetingPost: action,
    getAllMeetings: action,
    changeMeetingName: action
});

const createMeetingStore = new CreateMeetingStore();

export const CreateMeetingContext = createContext();

export const CreateMeetingProvider = ({ children }) => (
    <CreateMeetingContext.Provider value={createMeetingStore}>
        {children}
    </CreateMeetingContext.Provider>
);

export const useCreateMeetingStore = () => useContext(CreateMeetingContext);

export default createMeetingStore;