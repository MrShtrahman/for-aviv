import { UserActivity } from 'redux/reducers/usersReducer';
import { lettersDaysToFullDays, removeTheLetterYom } from './parser';

const splitToDaysSpecial = (input: string): UserActivity[] => {
  const withoutSpecialCharacters = input
    .replace('-', '')
    .replace(':', '')
    .split(' ')
    .filter(elem => elem !== ' ')
    .filter(elem => elem !== '');

  const activity = withoutSpecialCharacters.pop();

  return withoutSpecialCharacters.map(
    day =>
      ({
        day,
        type: activity
      } as UserActivity)
  );
};

/**
 * In the case that people write in this format:
 * ```
 * Sunday monday tuesday - something
 * Friday wendsday - something
 * ```
 */
export const parseSpecialActivities = (input: string): UserActivity[] => {
  let result: UserActivity[] = [];
  const withoutDaysLetters = lettersDaysToFullDays(input);
  const withoutTheLetterYom = removeTheLetterYom(withoutDaysLetters);
  const splittedToActivities = withoutTheLetterYom.split('\n');
  splittedToActivities.forEach(arr => {
    result = result.concat(splitToDaysSpecial(arr));
  });
  return result;
};
