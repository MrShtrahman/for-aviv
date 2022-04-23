import { UserActivity, weekDays } from 'redux/reducers/usersReducer';

const hebrewRegex = new RegExp(/[\u0590-\u05FF]/);

export const removeEverythingBeforeHebrew = (input: string): string => {
  const firstHebrewOccurence = hebrewRegex.exec(input)?.index || 0;
  const withoutHebrew = input.substring(firstHebrewOccurence);
  return withoutHebrew;
};

export const removeEverythingBeforeFriday = (input: string): string => {
  const indexOfFirstFriday = input.replace('יום ו', 'יום שישי').indexOf('שישי');
  return indexOfFirstFriday === -1 ? input : input.substr(indexOfFirstFriday);
};

export const lettersDaysToFullDays = (input: string): string =>
  input
    .replace(`מוצ"ש`, 'שבת')
    .replace(`מוצש`, 'שבת')
    .replace('יום א', 'יום ראשון')
    .replace('יום ב', 'יום שני')
    .replace('יום ג', 'יום שלישי')
    .replace('יום ד', 'יום רביעי')
    .replace('יום ה', 'יום חמישי')
    .replace('יום ו', 'יום שישי')
    .replace(/$יום ש^/, 'יום שבת');

export const removeTheLetterYom = (input: string): string => {
  weekDays.forEach(day => {
    input = input.replace(`יום ${day}`, day);
  });

  return input;
};

export const fillInMissingDays = (input: string): string => {
  weekDays.forEach((day, index) => {
    if (day === 'שישי') return;
    const indexOfPreviousDay = input.indexOf(weekDays[index - 1]);
    if (indexOfPreviousDay !== -1) return;
    const indexOfCurrentDay = input.indexOf(weekDays[index]);
    if (indexOfCurrentDay === -1) {
      input += `\n${weekDays[index - 1]}`;
    } else {
      input = `${input.slice(0, indexOfCurrentDay)}${weekDays[index - 1]}\n${input.slice(indexOfCurrentDay)}`;
    }
  });

  return input;
};

export const splitToDays = (input: string): string[] => {
  const dunno = input.split('\n');

  console.log('dunno :>> ', dunno);

  const dunno_2 = dunno.map(curr => removeEverythingBeforeHebrew(curr));
  console.log('dunno_2 :>> ', dunno_2);
  return dunno_2.filter(elem => elem !== '' && elem !== ' ');
};

export const convertToActivityAndDay = (input: string): UserActivity => {
  let splitted: string[] = [];
  if (input.indexOf('-') !== -1) splitted = input.split('-');
  else if (input.indexOf(':') !== -1) splitted = input.split(':');
  else if (input.indexOf('\n') !== -1) splitted = input.split('\n');
  // We just take everything past the day itself
  else {
    const indexOfWhitespace = input.indexOf(' ');
    splitted = [input.substr(0, indexOfWhitespace), input.substr(indexOfWhitespace)];
  }

  if (splitted[1] === '' || splitted[1] === ' ') splitted[1] = 'מנוחה';
  return {
    day: splitted[0].replace(' ', ''),
    type: splitted[1]
  };
};

export const parseActivities = (input: string): UserActivity[] => {
  const nothingBeforeFriday = removeEverythingBeforeFriday(input);
  // console.log('nothingBeforeFriday :>> ', nothingBeforeFriday);
  const withoutDaysLetters = lettersDaysToFullDays(nothingBeforeFriday);
  // console.log('withoutDaysLetters :>> ', withoutDaysLetters);
  const withoutTheLetterYom = removeTheLetterYom(withoutDaysLetters);
  // console.log('withoutTheLetterYom :>> ', withoutTheLetterYom);
  const withFilledInDays = fillInMissingDays(withoutTheLetterYom);
  // console.log('withFilledInDays :>> ', withFilledInDays);
  const seperatedByDays = splitToDays(withFilledInDays);
  // console.log('seperatedByDays :>> ', seperatedByDays);
  return seperatedByDays.map(elem => convertToActivityAndDay(elem));
};
