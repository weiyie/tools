import { type } from "../base/index";

export function formatQuery(obj, typeObj) {
  Object.keys(typeObj).forEach((item) => {
    let curTypeObj = typeObj[item];

    if (type(curTypeObj) !== "object" && type(curTypeObj) !== "undefined") {
      const defaultVal = curTypeObj && type(curTypeObj) === "function" ? curTypeObj() : curTypeObj;

      curTypeObj = {
        type: type(defaultVal),
        default: defaultVal,
      };
    }

    // 如果不存在值，则设置为默认值
    if (obj[item] === undefined) {
      obj[item] = type(curTypeObj.default) === "function" ? curTypeObj.default() : curTypeObj.default;
      return;
    }

    const typeVal = curTypeObj.type;

    if (type(obj[item]) === typeVal) {
      return;
    }

    if (typeVal === "number") {
      obj[item] = Number(obj[item]);
      return;
    }

    if (typeVal === "boolean") {
      obj[item] = JSON.parse(obj[item]);
      return;
    }

    if (["object"].includes(typeVal)) {
      try {
        obj[item] = JSON.parse(obj[item]);
      } catch (error) {
        obj[item] = curTypeObj.default;
      }
      return;
    }

    if (typeVal === "array") {
      obj[item] = obj[item].split(",");
    }
  });

  return obj;
}