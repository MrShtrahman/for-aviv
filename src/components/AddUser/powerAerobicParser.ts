import { UserActivity } from 'redux/reducers/usersReducer';

type PowerOrAerobic = 'power' | 'aerobic';

const mergePowerAndAerobic = (power: UserActivity[], aerobic: UserActivity[]): UserActivity[] =>
  [...power, ...aerobic].reduce((current, { day, type }) => {
    const candidateDay = current.find(activity => activity.day === day);
    if (candidateDay) candidateDay.type = 'אירובי + כוח';
    else current.push({ day, type });
    return current;
  }, [] as UserActivity[]);

const parseSpecificType = (input: string, type: PowerOrAerobic): UserActivity[] => {
  const splittedInput = input.replaceAll(',', ' ').replaceAll('\n', ' ').split(' ');
  const lastDay = splittedInput[splittedInput.length - 1];
  if (lastDay[0] === 'ו') {
    splittedInput[splittedInput.length - 1] = lastDay.substring(1);
  }

  return splittedInput.map(
    day =>
      ({
        day,
        type: type === 'aerobic' ? 'אירובי' : 'כוח'
      } as UserActivity)
  );
};

export const parsePowerAerobicActivities = (power: string, aerobic: string): UserActivity[] => {
  const parsedPower = parseSpecificType(power, 'power');
  const parsedAerobic = parseSpecificType(aerobic, 'aerobic');

  return mergePowerAndAerobic(parsedPower, parsedAerobic);
};
