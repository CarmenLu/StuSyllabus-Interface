import { WeekDay } from './week'
import regeneratorRuntime from '../../utils/third-party/runtime' // eslint-disable-line
function getTermData(weekList, classData) {
    let weekData = weekList
    let classData1 = classData
    let TermList
    // todo forEach
    // todo 将课程和日程分开处理 界面再重新整合
    for (let i = 0; i < classData1.length; i++) {   // 循环每一节课，将其加入整个学期的list里
        let schedule = classData1[i].schedule   // 得到这门课的schedule
        for (let k = 0; k < schedule.length; k++) {
            let j = 0   // 周数
            let stuweek = schedule[k].week // 得到这门课开课的周数
            let day = schedule[k].day   // 得到这门课开课的星期
            while (j < 16) {    // 从第一周开始循环
                let tmp = 1 << j // 用二进制来判断这一周是否有课
                j++
                let IfHaveClass = tmp & stuweek
                if (IfHaveClass === tmp) {    // 有课
                    let dayList = weekData[j - 1]   // 提取这一周的天数
                    let dayData = dayList[day - 1]  // 因dayList的下标从0开始表示周一 day-1
                    let classData = dayData.classData
                    classData.push(classData1[i])
                    dayList[day - 1] = {
                        dateData: dayData.dateData,
                        classData
                    }
                    weekData[j - 1] = dayList
                }
                TermList = weekData
            }
        }

    }

    return TermList
}

export { getTermData }
