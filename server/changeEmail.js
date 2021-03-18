const changeEmail = (email) => {
    return `${email.replace('@', '')}@connect2care.ourbrothers.co.il`
}

module.exports = changeEmail;