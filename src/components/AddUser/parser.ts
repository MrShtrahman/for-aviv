import { UserActivity } from "../../redux/reducers/usersReducer";

const convertToActivityAndDay = (input: string): UserActivity => {
  const spiltted = input.split("-");
  if (spiltted[1] === "" || spiltted[1] === " ") spiltted[1] = "מנוחה";
  return {
    day: spiltted[0].replace("יום ", "").replace(" יום", "").replace(" ", ""),
    type: spiltted[1],
  };
};

export const parseActivities = (input: string): UserActivity[] => {
  const seperatedByDays = input.split("\n").filter((elem) => elem !== "");
  return seperatedByDays.map((elem) => convertToActivityAndDay(elem));
};
