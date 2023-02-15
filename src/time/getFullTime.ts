/**
 * 日期对象转换(云函数端会自动转成东八区时间)
 * @params {Date || Number} date 需要转换的时间
 * @params {Number} type 转换方式
 * type = 0 返回 2020-08-03 12:12:12
 * type = 1 返回 20200803121212
 * type = 2 返回 { YYYY, MM, DD, hh, mm, ss }
 */
export function getFullTime(date, type = 0, targetTimezone = 8) {
  if (!date) {
    return "";
  }
  if (typeof date == "number") {
    date = new Date(date);
  }
  const dif = date.getTimezoneOffset();
  const timeDif = dif * 60 * 1000 + targetTimezone * 60 * 60 * 1000;
  const east8time = date.getTime() + timeDif;
  date = new Date(east8time);

  let YYYY = date.getFullYear() + "";
  let MM =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (type === 2) {
    return {
      YYYY: Number(YYYY),
      MM: Number(MM),
      DD: Number(DD),
      hh: Number(hh),
      mm: Number(mm),
      ss: Number(ss),

      year: Number(YYYY),
      month: Number(MM),
      day: Number(DD),
      hour: Number(hh),
      minute: Number(mm),
      second: Number(ss),
    };
  } else if (type === 1) {
    return YYYY + "" + MM + "" + DD + "" + hh + "" + mm + "" + ss;
  } else {
    return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
  }
}
