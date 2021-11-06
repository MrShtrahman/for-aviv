import { UserActivity, weekDays } from "redux/reducers/usersReducer";

const removeEverythingBeforeFriday = (input: string): string => {
  const indexOfFirstFriday = input.replace("יום ו", "יום שישי").indexOf("שישי");
  return input.substr(indexOfFirstFriday);
};

const lettersDaysToFullDays = (input: string): string =>
  input
    .replace(`מוצ"ש`, "שבת")
    .replace(`מוצש`, "שבת")
    .replace("יום א", "יום ראשון")
    .replace("יום ב", "יום שני")
    .replace("יום ג", "יום שלישי")
    .replace("יום ד", "יום רביעי")
    .replace("יום ה", "יום חמישי")
    .replace("יום ו", "יום שישי")
    .replace(/$יום ש^/, "יום שבת");

const removeTheLetterYom = (input: string): string => {
  weekDays.forEach((day) => {
    input = input.replace(`יום ${day}`, day);
  });

  return input;
};

const splitToDays = (input: string): string[] => {
  return weekDays
    .map((day, index) => {
      if (input.indexOf(day) === -1) return "";
      if (day === "חמישי") {
        const indexOfThursday = input.indexOf(day);
        return input.substr(indexOfThursday);
      }
      const indexOfDay = input.indexOf(day);
      const indexOfNextDay = input.indexOf(weekDays[index + 1]);
      const indexToDeleteUntil =
        indexOfNextDay !== -1 ? indexOfNextDay : input.length;

      return input
        .substr(indexOfDay, indexToDeleteUntil - indexOfDay)
        .replace(/^\n|\n$/g, "");
    })
    .filter((elem) => elem !== "");
};

const convertToActivityAndDay = (input: string): UserActivity => {
  console.log("input :>> ", input);
  let splitted: string[] = [];
  if (input.indexOf("-") !== -1) splitted = input.split("-");
  else if (input.indexOf(":") !== -1) splitted = input.split(":");
  else if (input.indexOf("\n") !== -1) splitted = input.split("\n");
  // We just take everything past the day itself
  else {
    const indexOfWhitespace = input.indexOf(" ");
    splitted = [
      input.substr(0, indexOfWhitespace),
      input.substr(indexOfWhitespace),
    ];
  }

  console.log("spiltted :>> ", splitted);
  if (splitted[1] === "" || splitted[1] === " ") splitted[1] = "מנוחה";
  return {
    day: splitted[0].replace(" ", ""),
    type: splitted[1],
  };
};

export const parseActivities = (input: string): UserActivity[] => {
  const nothingBeforeFriday = removeEverythingBeforeFriday(input);
  const withoutDaysLetters = lettersDaysToFullDays(nothingBeforeFriday);
  const withoutTheLetterYom = removeTheLetterYom(withoutDaysLetters);
  const seperatedByDays = splitToDays(withoutTheLetterYom);
  return seperatedByDays.map((elem) => convertToActivityAndDay(elem));
};
