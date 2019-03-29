function WeekDay(weekday) {  // 转换为中文的天数
    switch (weekday) {
        case 1:
            return '一'
        case 2:
            return '二'
        case 3:
            return '三'
        case 4:
            return '四'
        case 5:
            return '五'
        case 6:
            return '六'
        case 0:
            return '日'
        default:
            break
    }
}

function getMonthCh(month) { // 将月转为中文
    switch (month) {
        case 0:
            return '一月'
        case 1:
            return '二月'
        case 2:
            return '三月'
        case 3:
            return '四月'
        case 4:
            return '五月'
        case 5:
            return '六月'
        case 6:
            return '七月'
        case 7:
            return '八月'
        case 8:
            return '九月'
        case 9:
            return '十月'
        case 10:
            return '十一月'
        case 11:
            return '十二月'
        default:
            break
    }
}

function getDateInfo(date) {
    let originDate = new Date('2019/02/25')
    let year = date.getFullYear()
    let day = WeekDay(date.getDay())
    let day2 = date.getDay()
    let month = getMonthCh(date.getMonth())
    let differenceDay = (date.getTime() - originDate.getTime()) / (1000 * 60 * 60 * 24)
    let StuWeek
    if (differenceDay % 7 === 0) {
        StuWeek = Math.ceil(differenceDay / 7) + 1
    } else {
        StuWeek = Math.ceil(differenceDay / 7)
    }
    let date1 = date.toLocaleString()
    let date2 = date.getDate()
    let DateInfo = {
        date1,
        StuWeek,
        year,
        day,
        month,
        date2,
        day2
    }
    return DateInfo
}

function getTermList() {
    let weekList = new Array(16)
    let dayList = new Array(7)
    let startDate = new Date('2019/02/25')
    let count = 0
    for (let i = 0; i < weekList.length; i++) {
        for (let j = 0; j < dayList.length; j++) {
            let classData = new Array()
            if (j === 0 && i === 0) {
                dayList[j] = {
                    dateData: getDateInfo(startDate),
                    classData
                }
            } else {
                let period = startDate.setDate(startDate.getDate() + 1)
                let date = new Date(period)
                dayList[j] = {
                    dateData: getDateInfo(date),
                    classData
                }
            }
        }
        weekList[i] = dayList
        dayList = new Array(7)
    }
    console.log(`有${count}天`)
    return weekList
}


export { WeekDay, getDateInfo, getTermList }
