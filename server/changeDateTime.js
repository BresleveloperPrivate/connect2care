const changeDateTime = (date, time = '00:00') => {
    const dateMap = date.split(' ').pop().split('.');
    const newDate = new Date(`${dateMap[1]}/${dateMap[0]}/${dateMap[2]}`);
    newDate.date += 1;
    const dateTime = `${newDate.toISOString().substr(0, 10)}T${time}:00`;
    console.log(newDate, time, '--->', dateTime);
    return dateTime;
}

module.exports = changeDateTime;