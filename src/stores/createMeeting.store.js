import { observable, decorate, action } from 'mobx';
import React, { createContext, useContext } from 'react';
import Auth from '../modules/auth/Auth'


class CreateMeetingStore {
    date = (new Date()).getDate()
    res = null
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
        timeHour: "",
        timeMinute: "",
        max_participants: "",
        fallens: null,
        zoomId: "",
        otherRelationship: null,
        // approved: ""
    }

    meetingDetails = {
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
        max_participants: 500,
        fallens: null,
        zoomId: "",
        otherRelationship: null,
    }

    error = null;
    waitForData = false;
    meetingId = -1;

    changeMeetingName = (e) => {
        if (e.length > 100) return
        this.meetingDetails.name = e.target.value
    }

    resetAll = () => {
        this.res = null
        this.fallenDetails = null;
        this.fallenName = null;
        this.nameMessage = "";
        this.meetingDetails = {
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
            timeHour: "",
            timeMinute: "",
            max_participants: "",
            fallens: null,
            zoomId: "",
            otherRelationship: null,
            // approved: ""
        }

        // this.meetingDetails = JSON.parse(JSON.stringify(this.meetingDetailsOriginal))
        this.meetingDetails.date = ""
        this.meetingDetails.timeHour = "20"
        this.meetingDetails.timeMinute = "30"
        this.meetingDetails.max_participants = 500

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
        if (!this.meetingDetails.fallens) this.meetingDetails.fallens = []
        if (!this.meetingDetails.fallens[index]) this.meetingDetails.fallens[index] = {}
        this.meetingDetails.fallens[index].id = fallen.id
    }

    changeFallens = (index, number = null) => {
        if (!this.meetingDetails.fallens) {
            this.meetingDetails.fallens = [{ id: index, relative: null }]
            if (!this.meetingDetails.otherRelationship)
                this.meetingDetails.otherRelationship = [{ id: index, relative: "" }]
        }
        else if (this.meetingDetails.fallens.length > index) {
            this.meetingDetails.fallens[index].id = number
            if (this.meetingDetails.otherRelationship && this.meetingDetails.otherRelationship.length > index)
                this.meetingDetails.otherRelationship[index].id = number
        }
        else {
            this.meetingDetails.fallens.push({ id: number, relative: null })
            if (!this.meetingDetails.otherRelationship)
                this.meetingDetails.otherRelationship = [{ id: number, relative: "" }]
            else
                this.meetingDetails.otherRelationship.push({ id: number, relative: "" })
        }
    }

    changeShortDescription = (e) => {
        if (e.length > 1500) return
        this.meetingDetails.description = e.target.value
    }

    changeMeetingDate = (date) => {
        this.meetingDetails.date = date
    }

    changeZoomId = (e) => {
        this.meetingDetails.zoomId = e.target.value
    }

    setOtherRelationship = (e, index) => {
        let id = null
        if (this.meetingDetails.fallens[index]) {
            id = this.meetingDetails.fallens[index].id
        }
        if (!this.meetingDetails.otherRelationship || (this.meetingDetails.otherRelationship && !this.meetingDetails.otherRelationship.length)) {
            this.meetingDetails.otherRelationship = [{ id: id, relative: e.target.value }]
            return
        }
        else {
            if (this.meetingDetails.otherRelationship[index]) {
                if (id !== this.meetingDetails.otherRelationship[index].id)
                    this.meetingDetails.otherRelationship[index].id = id
                this.meetingDetails.otherRelationship[index].relative = e.target.value
            }
            else
                this.meetingDetails.otherRelationship[index] = { id: id, relative: e.target.value }

        }
    }

    setArmyAgentReq = index => {
        if (!this.meetingDetails.fallens) {
            this.meetingDetails.fallens = [];
        }
        this.meetingDetails.fallens[index] = {id: null, ...this.meetingDetails.fallens[index], armyAgentReq: !this.meetingDetails.fallens[index]?.armyAgentReq};
    };

    setServeUnit = (e, index) => {
        if (!this.meetingDetails.fallens) {
            this.meetingDetails.fallens = [];
        }
        this.meetingDetails.fallens[index] = {id: null, ...this.meetingDetails.fallens[index], serveUnit: e.target.value};
    };

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
                    this.meetingDetails.fallens[i].needAlert = false
                    this.meetingDetails.fallens[i].relative = option
                    if (this.meetingDetails.otherRelationship && this.meetingDetails.otherRelationship[index] && index === this.meetingDetails.otherRelationship[index].id) this.meetingDetails.otherRelationship[index].relative = ""
                    if (option !== "אח/ות" && option !== "אלמן/ אלמנה" && option !== "יתומים" && option !== "הורים" && option !== "קרובי משפחה") {
                        this.meetingDetails.fallens[i].needAlert = true
                        this.time = setTimeout(() => { if (this.meetingDetails.fallens && this.meetingDetails.fallens[i]) this.meetingDetails.fallens[i].needAlert = false }, 10000)
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
                    clearTimeout(this.time)
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
        if (e.target.value.match(/[^0-9-+]/g) || e.target.value.length > 14) {
            return
        }
        this.meetingDetails.owner.phone = e.target.value
    }

    changeMeetingLanguage = (option) => {
        this.meetingDetails.language = option
    }

    isNameExist = async () => {
        if (this.meetingDetails.name && this.meetingDetails.name !== "") {
            let [success, err] = await Auth.superAuthFetch(`/api/meetings/isNameExist`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: this.meetingDetails.name })
            }, true);
            console.log("success", success)
            console.log("err", err)
            if (err) {
                return
            }
            if (success) {
                this.nameMessage = "שים לב, שם זה זהה לארוע אחר שנפתח"
            }
        }
    }

    changeMeetingOpenOrClose = (e) => {
        this.meetingDetails.isOpen = e.target.value
    }

    changeNotAllFieldsCorrect = (value) => {
        this.notAllFieldsCorrect = value
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
            fallen.serveUnit = i.serveUnit
            fallen.armyAgentReq = !!i.serveUnit
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
            code: object.code,
            date: object.date,
            timeHour: hour,
            timeMinute: minute,
            max_participants: Number(object.max_participants) || '',
            fallens: object.fallens,
            zoomId: object.zoomId,
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
                obj.serveUnit = object.fallens[i].serveUnit
                obj.armyAgentReq = !!object.fallens[i].serveUnit
                if (!this.meetingDetailsOriginal.otherRelationship) {
                    this.meetingDetailsOriginal.otherRelationship = []
                }
                if (object.fallens[i].relationship !== "אח/ות" && object.fallens[i].relationship !== "בית אביחי" && object.fallens[i].relationship !== "האחים שלנו" && object.fallens[i].relationship !== "אלמן/ אלמנה" && object.fallens[i].relationship !== "יתומים" && object.fallens[i].relationship !== "הורים" && object.fallens[i].relationship !== "קרובי משפחה") {
                    obj.relative = 'אחר'
                    if (!this.meetingDetailsOriginal.otherRelationship[i])
                        this.meetingDetailsOriginal.otherRelationship[i] = { id: object.fallens[i].id, relative: object.fallens[i].relationship }
                    else {
                        this.meetingDetailsOriginal.otherRelationship[i].relative = object.fallens[i].relationship
                        this.meetingDetailsOriginal.otherRelationship[i].id = object.fallens[i].id
                    }
                }
                else {
                    this.meetingDetailsOriginal.otherRelationship[i] = { id: object.fallens[i].id, relative: null }

                }
                this.meetingDetails.fallens[i] = obj
                this.meetingDetailsOriginal.fallens[i] = obj
            }
        }
        this.meetingDetails = JSON.parse(JSON.stringify(this.meetingDetailsOriginal))
    }

    getMeetingDetails = async () => {
        if (this.meetingId === -1) return
        let [success, err] = await Auth.superAuthFetch(`/api/meetings/getMeetingById`, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ meetingId: Number(this.meetingId) })
        }, true);
        if (err) {
            this.error = err
        }
        if (success) {
            this.changeDetailsObjFunc(success[0])
        }
        this.res = true
    }

    deleteFromFallens = (index) => {
        let id = this.meetingDetails.fallens[index].id
        if (this.fallenName && this.fallenName.length > index)
            this.fallenName.splice(index, 1)
        if (this.meetingDetails.fallens && this.meetingDetails.fallens.length > index)
            this.meetingDetails.fallens.splice(index, 1)
        if (this.meetingDetails.otherRelationship && this.meetingDetails.otherRelationship.length > index)
            if (this.meetingDetails.otherRelationship) this.meetingDetails.otherRelationship.splice(index, 1)
        if (this.fallenDetails && this.fallenDetails[id]) delete this.fallenDetails[id]
        this.deleting = true
    }

    setDeleting = (del) => {
        this.deleting = del
    }

    approveMeeting = async (email, nameOwner) => {
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/approveMeeting/`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, id: Number(this.meetingId), nameOwner })
            }, true);
        if (success) {
            this.meetingDetailsOriginal.approved = true;
            this.meetingDetails.approved = true;
        }
        console.log(success, err)
    }

    createZoom = async (email, date) => {
        console.log("email", email, this.meetingId)
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/createZoom/`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, meetingId: Number(this.meetingId), date })
            }, true);
        if (err) {
            this.setError('אירעה שגיאה, נסה שנית מאוחר יותר')
        }
        if (success) {
            this.meetingDetailsOriginal.zoomId = success;
            this.meetingDetails.zoomId = success;
        }
    }

    newZoom = async (email, nameOwner) => {
        console.log("email", email, this.meetingId)
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/newZoom/`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, nameOwner })
            }, true);
        if (err) {
            this.setError('משהו השתבש, נסה שנית מאוחר יותר');
        }
        if (success) {
            this.setError('ישלח מייל בדקות הקרובות ליוצר המפגש עם פרטי הזום');
        }
    }

    sendZoomHost = async (time, date) => {
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/sendMailHost`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ time: time, date: date, meetingId: Number(this.meetingId) })
            }, true);
        if (err) {
            // setErr(true)
            return
        }
        this.setError("המייל נשלח בהצלחה")
    }

    sendZoomParticipants = async (time, date) => {
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/sendMailParticipants`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ time: time, date: date, meetingId: Number(this.meetingId) })
            }, true);
        if (err) {
            // setErr(true)
            return
        }
        this.setError("המייל נשלח בהצלחה")
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

    createNewMeetingPost = async (lang) => {

        let beforePostJSON = JSON.parse(JSON.stringify(this.meetingDetails))
        if (this.meetingDetails.otherRelationship && this.meetingDetails.otherRelationship.length && beforePostJSON.fallens && beforePostJSON.fallens.length) {

            let checkOtherRelation = JSON.parse(JSON.stringify(this.meetingDetails.otherRelationship))
            checkOtherRelation.filter((otherRelative) => {
                if (otherRelative.relative === "בית אביחי" || otherRelative.relative === "בית אבי חי" || otherRelative.relative === "האחים שלנו") {
                    this.error = lang !== 'heb' ? "You can't be related to the fallen, by 'Our brothers' and 'Beit Avi Chai'. Only the manager can choose this relation" : "אינך יכול לבחור להיות קשור לנופל מהדברים האלה: 'האחים שלנו', 'בית אבי חי' ו'בית אביחי', רק למנהל מותר לבחור את הקישוריות הזאת."
                    return
                }
            })

            beforePostJSON.fallens.filter((fallen) => {
                checkOtherRelation.filter((other) => {
                    if (other.id === fallen.id) {
                        fallen.relative = other.relative
                    }
                })
            })
        }
        if (this.error) return
        let zoomId = beforePostJSON.zoomId
        delete beforePostJSON.zoomId
        delete this.meetingDetailsOriginal.zoomId
        delete this.meetingDetailsOriginal.otherRelationship
        // if (this.date < 26) delete this.meetingDetailsOriginal.date
        // delete this.meetingDetailsOriginal.timeHour
        // delete this.meetingDetailsOriginal.timeMinute
        // delete this.meetingDetailsOriginal.max_participants
        delete beforePostJSON.otherRelationship
        console.log("beforePostJSON", beforePostJSON)
        if (this.notAllFieldsCorrect) {
            this.setError(lang !== "heb" ? "Please check that you fixed all the red errors" : "אנא בדוק שטיפלת בכל ההערות האדומות")
            return
        }

        let whatDidntChange = this.whatDidntChange(beforePostJSON, this.meetingDetailsOriginal)
        let whatDidntChange1 = this.whatDidntChange(beforePostJSON.owner, this.meetingDetailsOriginal.owner)

        console.log("whatDidntChange", whatDidntChange, "whatDidntChange1", whatDidntChange1)
        if (!beforePostJSON.fallens && !beforePostJSON.fallens.length) {
            this.setError(lang !== "heb" ? "All the fields must be filled" : "כל השדות צריכים להיות מלאים")
            return
        }
        for (let i = 0; i < beforePostJSON.fallens.length; i++) {
            if (!beforePostJSON.fallens[i] || !beforePostJSON.fallens[i].id || beforePostJSON.fallens[i].id === 0 || !beforePostJSON.fallens[i].relative) {
                this.setError(lang !== "heb" ? "All the fields must be filled" : "כל השדות צריכים להיות מלאים")
                return
            }
        }

        if (Object.keys(whatDidntChange).length || Object.keys(whatDidntChange1).length) {
            this.setError(lang !== "heb" ? "All the fields must be filled" : "כל השדות צריכים להיות מלאים")
            return
        }
        beforePostJSON.zoomId = zoomId
        beforePostJSON.lang = localStorage.getItem('lang')
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
            this.postErr(err, lang)
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

        if (this.notAllFieldsCorrect) {
            this.setError("אנא בדוק שטיפלת בכל ההערות האדומות")
            return
        }

        if (changedObj.fallens) {
            let changedFallensObj = this.whatChanged(changedObj.fallens, this.meetingDetailsOriginal.fallens)
            for (let index in changedFallensObj) {
                fallensToChange.push({ fallen: changedFallensObj[index].id, relationship: changedFallensObj[index].relative })
            }
            changedObj.fallensToChange = fallensToChange
        }
        if (changedObj.code) delete changedObj.code
        if (changedObj.timeHour || changedObj.timeMinute) changedObj.time = this.meetingDetails.timeHour + ":" + this.meetingDetails.timeMinute

        if (this.meetingDetails.otherRelationship && this.meetingDetails.otherRelationship.length && beforePostJSON.fallens && beforePostJSON.fallens.length) {

            let checkOtherRelation = JSON.parse(JSON.stringify(this.meetingDetails.otherRelationship))

            beforePostJSON.fallens.filter((fallen) => {
                checkOtherRelation.filter((other) => {
                    if (other.id === fallen.id) {
                        if (other.relative !== null)
                            fallen.relative = other.relative
                    }
                })
            })
        }

        this.waitForData = true
        console.log(changedObj)
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/updateMeeting/`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: changedObj, id: Number(this.meetingId), lang: String(localStorage.getItem('lang')) })
            }, true);
        this.waitForData = false
        if (err) {
            this.postErr(err, String(localStorage.getItem('lang')))
            return
        }
        this.meetingDetailsOriginal = JSON.parse(JSON.stringify(this.meetingDetails))
    }

    postErr = (err, lang) => {
        console.log("err", err)
        if (err && err.error && err.error.duplicate)
            this.error = lang !== "heb" ? "The meeting already exists in the system, see the 'Meetings List'" : "המפגש כבר קיים במערכת, עיין ב״רשימת המפגשים״"
        else if (err && err.error && err.error.isOpen)
            this.error = lang !== "heb" ? "Something went wrong, Please make sure that you have selected whether the meeting is open or closed properly" : "משהו השתבש, אנא בדוק שבחרת אם המפגש פתוח או סגור בצורה טובה"
        else if (err && err.error && err.error.message && err.error.message === "No response, check your network connectivity")
            this.error = lang !== "heb" ? "Something went wrong, please check your network connectivity" : "משהו השתבש, אנא בדוק את החיבור לאינטרנט"
        else if (err && err.error && err.error.message)
            this.error = err.error.message
        else if (err && err.error && err.error.email)
            this.error = lang !== "heb" ? "Something went wrong, please make sure that you entered a correct email address of gmail" : "משהו השתבש, אנא בדוק שהכנסת כתובת אימייל נכונה של gmail"
        else if (err && err.error && err.error.phone)
            this.error = lang !== "heb" ? "Something went wrong, please make sure that you entered a correct phone number" : "משהו השתבש, אנא בדוק שהכנסת מספר טלפון נכון"
        else if (err && err.error && err.error.max_participants)
            this.error = lang !== "heb" ? "Something went wrong, please make sure that you entered a maximum number of participants" : "משהו השתבש, אנא בדוק שהכנסת מספר משתתפים מקסימלי במספרים"
        else if (err && err.error && err.error.name)
            this.error = lang !== "heb" ? "Something went wrong, please make sure that you entered a correct meeting name" : "משהו השתבש, אנא בדוק ששם המפגש נכון"
        else if (err && err.error && err.error.description)
            this.error = lang !== "heb" ? "Something went wrong, please make sure that you entered a correct meeting description" : "משהו השתבש, אנא בדוק שתאור המפגש נכון"
        else if (err && err.error && err.error.language)
            this.error = lang !== "heb" ? "Something went wrong, please make sure that you entered a correct language" : "משהו השתבש, אנא בדוק שבחרת שפה נכונה"
        else if (err && err.error && err.error.time)
            this.error = lang !== "heb" ? "Something went wrong, please make sure that you entered a correct time meeting" : "משהו השתבש, אנא בדוק שהשעה של המפגש נכונה"
        else if (err && err.error && err.error.date)
            this.error = lang !== "heb" ? "Something went wrong, please make sure that you entered a correct date" : "משהו השתבש, אנא בדוק שבחרת תאריך נכון"
        else if (err && err.error && err.error.relationship)
            this.error = lang !== "heb" ? "Something went wrong, please make sure that you entered a correct realation to the fallen" : "משהו השתבש, אנא בדוק שבחרת קרבה שלי אל החלל נכונה"
        else if (err && err.error && err.error.msg)
            this.error = err.error.msg
        else
            this.error = lang !== "heb" ? "Something went wrong, please try again later" : "משהו השתבש, אנא נסה שנית מאוחר יותר"
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
    meetingDetailsOriginal: observable,
    meetingId: observable,
    error: observable,
    deleting: observable,
    waitForData: observable,
    setMeetingId: action,
    changeFallenDetails: action,
    changeFallens: action,
    deleteFallenToArr: action,
    setDeleting: action,
    addFallenToArr: action,
    changeFallenToArr: action,
    changeNumberOfParticipants: action,
    setError: action,
    changeNotAllFieldsCorrect: action,
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
    isNameExist: action,
    changeMeetingName: action,
    approveMeeting: action,
    newZoom: action,
    res: observable
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