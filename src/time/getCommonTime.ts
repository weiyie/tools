import { getFullTime } from "./getFullTime";

type AllTime = {
  utcTimeNow;
  nowTime;
  todayStart;
  todayEnd;
  today12End;
  monthStart;
  monthEnd;
  yearStart;
  yearEnd;
  now;
  months;
};
/**
 * 获取时间范围
 * @params {Date} date 日期对象 可以指定时间计算节点，默认使用当前时间进行计算
 * 返回的是时间戳(防止时区问题)
 * 返回数据如下：
 {
   todayStart 今日开始时间
   todayEnd   今日结束时间
   today12End 今日上午结束时间
   monthStart 本月开始时间
   monthEnd   本月结束时间
   yearStart  本年开始时间
   yearEnd    本年结束时间
   now        现在的时间点(含月年日时分秒)
   months     本年度每月的开始和结束时间 months[1] 代表1月
 }
 * getCommonTime();
 */

export const getCommonTime = async function (date, targetTimezone) {
  let res: AllTime = {} as any;
  date = date ? new Date(Number(date)) : new Date();
  targetTimezone = targetTimezone || 8;
  const dif = date.getTimezoneOffset();
  const timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  res.utcTimeNow = date.valueOf() - timeDif;

  const { year, month, day, hour, minute, second } = getFullTime(date, 2) as any;

  res.nowTime = new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}`).getTime() - timeDif;

  // 现在的时间
  res.now = {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
  // 获取本月最大天数
  let month_last_day = new Date(year, month, 0).getDate();
  // 获取今年12月最大天数
  let year_last_day = new Date(year, 12, 0).getDate();
  // 今日开始时间
  res.todayStart = new Date(`${year}/${month}/${day}`).getTime() - timeDif;
  // 今日12点时间
  res.today12End = new Date(`${year}/${month}/${day}`).getTime() + (12 * 60 * 60 * 1000 - 1) - timeDif;
  // 今日结束时间
  res.todayEnd = new Date(`${year}/${month}/${day}`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
  // 本月开始时间
  res.monthStart = new Date(`${year}/${month}/1`).getTime() - timeDif;
  // 本月结束时间
  res.monthEnd = new Date(`${year}/${month}/${month_last_day}`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
  // 本年开始时间
  res.yearStart = new Date(`${year}/1/1`).getTime() - timeDif;
  // 本年结束时间
  res.yearEnd = new Date(`${year}/12/${year_last_day}`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
  // 本年1-12月的起止时间
  res.months = [];
  res.months[0] = {
    monthStart: res.monthStart,
    monthEnd: res.monthEnd,
  };
  for (let i = 1; i <= 12; i++) {
    // 获取此月最大天数
    let month_last_day = new Date(year, i, 0).getDate();
    // 此月开始时间
    let monthStart = new Date(`${year}/${i}/1`).getTime() - timeDif;
    // 此月结束时间
    let monthEnd = new Date(`${year}/${i}/${month_last_day}`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
    res.months[i] = {
      monthStart,
      monthEnd,
    };
  }
  return res;
};
