export function worldClock(zone: any, region: any, timeF: any) {
    var dst = 0
    var time = timeF ? new Date(timeF) : new Date()
    var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000)
    var gmtTime = new Date(gmtMS)
    var day: any = gmtTime.getDate()
    var month = gmtTime.getMonth()
    //@ts-ignore
    var year = gmtTime.getYear()
    if (year < 1000) {
        year += 1900
    }
    var monthArray = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12")

    var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
    if (year % 4 === 0) {
        monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
    }
    if (year % 100 === 0 && year % 400 !== 0) {
        monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
    }

    var hr = gmtTime.getHours() + zone
    var min: any = gmtTime.getMinutes()
    var sec: any = gmtTime.getSeconds()

    if (hr >= 24) {
        hr = hr - 24
        day -= -1
    }
    if (hr < 0) {
        hr -= -24
        day -= 1
    }
    if (hr < 10) {
        hr = " " + hr
    }
    if (min < 10) {
        min = "0" + min
    }
    if (sec < 10) {
        sec = "0" + sec
    }
    if (day <= 0) {
        if (month === 0) {
            month = 11
            year -= 1
        }
        else {
            month -= 1
        }
        day = monthDays[month]
    }
    if (day > monthDays[month]) {
        day = 1
        if (month === 11) {
            month = 0
            year -= -1
        }
        else {
            month -= -1
        }
    }

    if (region === "Europe") {
        var startDST = new Date()
        var endDST = new Date()
        startDST.setMonth(2)
        startDST.setHours(1)
        startDST.setDate(31)
        var dayDST = startDST.getDay()
        startDST.setDate(31 - dayDST)
        endDST.setMonth(9)
        endDST.setHours(0)
        endDST.setDate(31)
        dayDST = endDST.getDay()
        endDST.setDate(31 - dayDST)
        var currentTime = new Date()
        currentTime.setMonth(month)
        //@ts-ignore
        currentTime.setYear(year)
        currentTime.setDate(day)
        currentTime.setHours(hr)
        if (currentTime >= startDST && currentTime < endDST) {
            dst = 1
        }
    }
    if (dst === 1) {
        hr -= -1
        if (hr >= 24) {
            hr = hr - 24
            day -= -1
        }
        if (hr < 10) {
            hr = " " + hr
        }
        if (day > monthDays[month]) {
            day = 1
            if (month === 11) {
                month = 0
                year -= -1
            }
            else {
                month -= -1
            }
        }
        if (hr < 10) {
            hr = hr.replace(/\s/g, '')
            hr = "0" + hr
        }
        if (day < 10) {
            day = "0" + day
        }
        return `${year}-${monthArray[month]}-${day}T${hr}:${min}:${sec}+02:00`
    }
    else {
        if (hr < 10) {
            hr = hr.replace(/\s/g, '')
            hr = "0" + hr
        }
        if (day < 10) {
            day = "0" + day
        }
        return `${year}-${monthArray[month]}-${day}T${hr}:${min}:${sec}+02:00`
    }
}

export function diffYMDHMS(date1: any, date2: any) {

    const years = date1.diff(date2, 'year');
    date2.add(years, 'years');

    const months = date1.diff(date2, 'months');
    date2.add(months, 'months');

    const days = date1.diff(date2, 'days');
    date2.add(days, 'days');

    const hours = date1.diff(date2, 'hours');
    date2.add(hours, 'hours');

    const minutes = date1.diff(date2, 'minutes');
    date2.add(minutes, 'minutes');

    const seconds = date1.diff(date2, 'seconds');

    return { years, months, days, hours, minutes, seconds };
}