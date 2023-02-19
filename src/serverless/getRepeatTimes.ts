import { getCommonTime } from "../time/index";

const minutes10 = 60 * 1000 * 10;

const getActionTime = (time) => {
  // 获取执行时间和当前时间的关系
  const [nowTimeData, targetTimeData] = [getCommonTime(), getCommonTime(time)];

  const { nowTime: todayNow, todayEnd } = nowTimeData;
  const { nowTime: targetNow } = targetTimeData;

  return {
    todayNow,
    todayEnd,
    targetNow,
  };
};

export const getRepeatTimes = (time, repeat = 0) => {
  let { targetNow, todayNow, todayEnd } = getActionTime(time);
  // 过去时间，且不定时重复，则直接为空数据
  if (!repeat && targetNow < todayNow) {
    return [];
  }

  while (targetNow < todayNow) {
    targetNow = targetNow + repeat;
  }

  const repeatList = [] as any;

  if (!repeat) {
    // 不需要定时执行的任务则直接添加到任务列表中
    repeatList.push(targetNow);
  } else {
    // 需要定时得任务则只获取当天的任务
    while (repeat && targetNow < todayEnd + minutes10) {
      if (targetNow > todayNow) {
        repeatList.push(targetNow);
      }

      targetNow = targetNow + repeat;
    }
  }

  return repeatList;
};