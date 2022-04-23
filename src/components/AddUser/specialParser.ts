/* eslint-disable no-unused-vars */
import { UserActivity } from 'redux/reducers/usersReducer';
import { lettersDaysToFullDays, removeTheLetterYom, removeEverythingBeforeHebrew } from './parser';

const splitToDaysSpecial = (input: string): UserActivity[] => {
  const withoutSpecialCharacters = input
    .replace('-', '')
    .replace(':', '')
    .split(' ')
    .filter(elem => elem !== ' ')
    .filter(elem => elem !== '');

  const activity = withoutSpecialCharacters.pop();

  const lastDay = withoutSpecialCharacters[withoutSpecialCharacters.length - 1];
  if (lastDay[0] === 'ו') {
    withoutSpecialCharacters[withoutSpecialCharacters.length - 1] = lastDay.substring(1);
  }

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
  if (input === '') return [];
  let result: UserActivity[] = [];
  input = input.replaceAll(',', ' ');
  const withoutNonHebrewAtStart = removeEverythingBeforeHebrew(input);
  const withoutDaysLetters = lettersDaysToFullDays(withoutNonHebrewAtStart);
  const withoutTheLetterYom = removeTheLetterYom(withoutDaysLetters);
  const splittedToActivities = withoutTheLetterYom.split('\n');
  splittedToActivities.forEach(arr => {
    result = result.concat(splitToDaysSpecial(arr));
  });
  return result;
};
