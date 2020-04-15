import { observable, decorate, action } from 'mobx';
import React, { createContext, useContext } from 'react';
import Auth from '../modules/auth/Auth'


class CreateMeetingStore {
    fallenDetails = null;
    fallenName = null;
    nameMessage = "";
    fallensToDelete = []
    fallensToAdd = []
    fallensToChange = []
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
        timeHour: '20',
        timeMinute: '30',
        max_participants: 300,
        fallens: null,
        zoomId: "",
        otherRelationship: null
    }
    allMeetings = null;

    meetingDetails = JSON.parse(JSON.stringify(this.meetingDetailsOriginal))

    error = null;
    waitForData = false;
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
            timeHour: "20",
            timeMinute: "30",
            max_participants: 300,
            fallens: null,
            zoomId: "",
            otherRelationship: null,
            // approved: ""
        }
        this.allMeetings = null;

        this.meetingDetails = JSON.parse(JSON.stringify(this.meetingDetailsOriginal))

        this.error = null;
        this.waitForData = false;
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
        if (!this.meetingDetails.fallens[index]) this.meetingDetails.fallens[index] = {}
        this.meetingDetails.fallens[index].id = fallen.id
    }

    changeFallens = (index, number = null) => {
        if (this.meetingDetails.fallens === null) {
            this.meetingDetails.fallens = [{ id: index, relative: null }]
            if (this.meetingDetails.otherRelationShip === null)
                this.meetingDetails.otherRelationShip = [{ id: index, relative: "" }]
        }
        else if (this.meetingDetails.fallens.length >= index) {
            this.meetingDetails.fallens[index] = { id: number, relative: null }
            if (this.meetingDetails.otherRelationShip && this.meetingDetails.otherRelationShip.length >= index)
                this.meetingDetails.otherRelationShip[index] = { id: number, relative: "" }
        }
        else {
            this.meetingDetails.fallens.push({ id: number, relative: null })
            if (this.meetingDetails.otherRelationShip)
                this.meetingDetails.otherRelationShip.push({ id: number, relative: "" })
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
        let id = null
        if (this.meetingDetails.fallens[index])
            id = this.meetingDetails.fallens[index].id
        if (!this.meetingDetails.otherRelationShip || (this.meetingDetails.otherRelationShip && !this.meetingDetails.otherRelationShip.length)) {
            this.meetingDetails.otherRelationShip = [{ id: id, relative: e.target.value }]
            return
        }
        else {
            if (this.meetingDetails.otherRelationShip[index])
                this.meetingDetails.otherRelationShip[index].relative = e.target.value
            else
                this.meetingDetails.otherRelationShip[index] = { id: id, relative: e.target.value }

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
                let [success, err] = await Auth.superAuthFetch(`/api/meetings/getAll`)
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
        delete object.fallens_meetings
        let hour = object.time.split(":")[0]
        let minute = object.time.split(":")[1]

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
            timeHour: hour,
            timeMinute: minute,
            max_participants: Number(object.max_participants) || '',
            fallens: object.fallens,
            zoomId: "",
            approved: object.approved,
            id: object.id
        }

        if (object.fallens && object.fallens.length) {
            for (let i = 0; i < object.fallens.length; i++) {
                this.changeFallenDetails(object.fallens[i], i)
                if (!this.fallenName) this.fallenName = []
                this.fallenName.push(object.fallens[i].name)
                let obj = {}
                obj.id = object.fallens[i].id
                obj.relative = object.fallens[i].relationship
                if (object.fallens[i].relationship !== 'אח/ות' && object.fallens[i].relationship !== 'הורים' && object.fallens[i].relationship !== 'קרובי משפחה' && object.fallens[i].relationship !== 'חבר' && object.fallens[i].relationship !== 'בית אביחי' && object.fallens[i].relationship !== 'האחים שלנו') {
                    obj.relative = 'אחר'
                    if (!this.meetingDetailsOriginal.otherRelationship) this.meetingDetailsOriginal.otherRelationship = {}
                    if (!this.meetingDetailsOriginal.otherRelationship[i]) this.meetingDetailsOriginal.otherRelationship[i] = {}
                    this.meetingDetailsOriginal.otherRelationship[i].relative = object.fallens[i].relationship
                    this.meetingDetailsOriginal.otherRelationship[i].id = object.fallens[i].id
                }
                this.meetingDetails.fallens[i] = obj
                this.meetingDetailsOriginal.fallens[i] = obj
            }
        }
        this.meetingDetails = JSON.parse(JSON.stringify(this.meetingDetailsOriginal))
    }

    getMeetingDetails = async () => {
        if (this.meetingId === -1) return
        let [success, err] = await Auth.superAuthFetch(`/api/meetings?filter={"where":{"id":${this.meetingId}}, "include":["meetingOwner", {"relation":"fallens_meetings", "scope":{"include":"fallens"}}]}`);
        console.log("success", success)
        if (err) {
            this.error = err
        }
        if (success) {
            this.changeDetailsObjFunc(success[0])
        }
    }

    deleteFromFallens = (index) => {
        let id = this.meetingDetails.fallens[index].id
        this.meetingDetails.fallens.splice(index, 1)
        if (this.meetingDetails.otherRelationShip) this.meetingDetails.otherRelationShip.splice(index, 1)
        if (this.fallenDetails && this.fallenDetails[id]) this.fallenDetails[id] = undefined
    }

    approveMeeting = async (email, nameOwner) => {
        console.log("email", email, this.meetingId)
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/approveMeeting/`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, id: Number(this.meetingId), nameOwner })
            }, true);
        if (success){
            this.meetingDetailsOriginal.approved=true;
            this.meetingDetails.approved=true;
        }
        console.log(success, err)
    }

    changeMeetingTimeHour = (event) => {
        this.meetingDetails.timeHour = event
    }

    changeMeetingTimeMinute = (event) => {
        this.meetingDetails.timeMinute = event
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

    whatChanged = (objToPost, objOriginal) => {
        let objToreturn = {}
        for (let i in objToPost) {
            if (objToPost[i] && objOriginal[i] && typeof objToPost[i] === 'object' && typeof objOriginal[i] === 'object') {
                if (!this.equals(objToPost[i], objOriginal[i])) objToreturn[i] = objToPost[i]
            }
            else if (objToPost[i] !== objOriginal[i]) objToreturn[i] = objToPost[i]
        }
        return objToreturn
    }

    createNewMeetingPost = async () => {
        let beforePostJSON = JSON.parse(JSON.stringify(this.meetingDetails))

        if (this.meetingDetails.otherRelationShip && this.meetingDetails.otherRelationShip.length && beforePostJSON.fallens && beforePostJSON.fallens.length) {
            let checkOtherRelation = JSON.parse(JSON.stringify(this.meetingDetails.otherRelationShip))
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
        delete this.meetingDetailsOriginal.otherRelationship
        delete this.meetingDetailsOriginal.timeHour
        delete this.meetingDetailsOriginal.timeMinute
        delete this.meetingDetailsOriginal.max_participants
        // console.log("this.meetingDetailsOriginal", this.meetingDetailsOriginal)
        delete beforePostJSON.otherRelationShip
        let whatDidntChange = this.whatDidntChange(beforePostJSON, this.meetingDetailsOriginal)
        let whatDidntChange1 = this.whatDidntChange(beforePostJSON.owner, this.meetingDetailsOriginal.owner)
        if (!beforePostJSON.fallens && !beforePostJSON.fallens.length) {
            this.setError("כל השדות צריכים להיות מלאים")
            return
        }
        for (let i = 0; i < beforePostJSON.fallens.length; i++) {
            if (!beforePostJSON.fallens[i] || !beforePostJSON.fallens[i].id || beforePostJSON.fallens[i].id === 0 || !beforePostJSON.fallens[i].relative) {
                this.setError("כל השדות צריכים להיות מלאים")
                return
            }
        }
        // console.log("whatDidntChange", whatDidntChange, "whatDidntChange1", whatDidntChange1)
        if (Object.keys(whatDidntChange).length || Object.keys(whatDidntChange1).length) {
            this.setError("כל השדות צריכים להיות מלאים")
            return
        }
        beforePostJSON.zoomId = zoomId
        beforePostJSON.time = this.meetingDetails.timeHour + ":" + this.meetingDetails.timeMinute
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
            this.postErr(err)
            return
        }
        return success
    }

    updateMeeting = async () => {
        let beforePostJSON = JSON.parse(JSON.stringify(this.meetingDetails))
        // let fallensToDelete = [], fallensToChange = [], fallensToAdd = []
        let fallensToChange = []
        let changedObj = this.whatChanged(beforePostJSON, this.meetingDetailsOriginal)

        if (Object.keys(changedObj).length === 0) return
        if (changedObj.owner) {
            changedObj.owner = this.whatChanged(beforePostJSON.owner, this.meetingDetailsOriginal.owner)
        }

        // if (changedObj.fallens) {
        //     for (let i = 0; i < this.meetingDetailsOriginal.fallens.length; i++) {
        //         let index = beforePostJSON.fallens.findIndex(fallen => fallen.id === this.meetingDetailsOriginal.fallens[i].id)
        //         if (index === -1) {
        //             fallensToDelete.push(this.meetingDetailsOriginal.fallens[i])
        //         }
        //         else if (this.meetingDetailsOriginal.fallens[i].id === beforePostJSON.fallens[index].id) {
        //             if (this.meetingDetailsOriginal.fallens[i].relative !== beforePostJSON.fallens[Number(index)].relative) {
        //                 if (beforePostJSON.fallens[Number(index)].relative === "אחר") {
        //                     fallensToChange.push(beforePostJSON.otherRelationShip[Number(index)])
        //                 }
        //                 else fallensToChange.push(beforePostJSON.fallens[Number(index)])
        //             }
        //             else {
        //                 if (this.meetingDetailsOriginal.fallens[i].relative === "אחר" && this.meetingDetailsOriginal.otherRelationship[i].id === beforePostJSON.otherRelationship[Number(index)].id && this.meetingDetailsOriginal.otherRelationship[i].relative !== beforePostJSON.otherRelationship[Number(index)].relative) {
        //                     fallensToChange.push(beforePostJSON.otherRelationship[Number(index)])
        //                 }
        //             }
        //         }
        //     }
        //     beforePostJSON.fallens.filter(afterFallen => {
        //         console.log("afterFallen", afterFallen)
        //         if (afterFallen.id === null || afterFallen.relative === null) {
        //             this.error = "משהו השתבש, אנא בדוק שהכנסת את כל הפרטים"
        //             return
        //         }
        //         let index = this.meetingDetailsOriginal.fallens.findIndex(fallen => fallen.id === afterFallen.id)
        //         if (index === -1) {
        //             fallensToAdd.push(afterFallen)
        //         }
        //     })
        // }
        // 

        // if (fallensToChange.length) beforePostJSON.fallensToChange = JSON.parse(JSON.stringify(fallensToChange))
        // if (fallensToDelete.length) beforePostJSON.fallensToDelete = JSON.parse(JSON.stringify(fallensToDelete))
        // if (fallensToAdd.length) beforePostJSON.fallensToAdd = JSON.parse(JSON.stringify(fallensToAdd))

        if (changedObj.fallens) {
            let changedFallensObj = this.whatChanged(changedObj.fallens, this.meetingDetailsOriginal.fallens)
            for (let index in changedFallensObj) {
                fallensToChange.push({ fallen: changedFallensObj[index].id, relationship: changedFallensObj[index].relative })
            }
            changedObj.fallensToChange = fallensToChange
        }

        this.waitForData = true
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/updateMeeting/`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: changedObj, id: Number(this.meetingId) })
            }, true);
        this.waitForData = false
        if (err) {
            this.postErr(err)
            return
        }
        this.meetingDetailsOriginal = JSON.parse(JSON.stringify(this.meetingDetails))
    }

    postErr = (err) => {
        console.log("err", err)
        if (err && err.error && err.error.duplicate) {
            this.error = "המפגש כבר קיים במערכת, עיין ב״רשימת המפגשים״"
        }
        if (err && err.error && err.error.isOpen)
            this.error = "משהו השתבש, אנא בדוק שבחרת אם המפגש פתוח או סגור בצורה טובה"
        else if (err && err.error && err.error.email)
            this.error = "משהו השתבש, אנא בדוק שהכנסת כתובת אינטרנט נכונה"
        else if (err && err.error && err.error.phone)
            this.error = "משהו השתבש, אנא בדוק שהכנסת מספר טלפון נכון"
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
    deleteFallenToArr: action,
    addFallenToArr: action,
    changeFallenToArr: action,
    changeNumberOfParticipants: action,
    setError: action,
    changeMeetingDate: action,
    changeMeetingTimeHour: action,
    changeMeetingTimeMinute: action,
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
    changeMeetingName: action,
    approveMeeting: action
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