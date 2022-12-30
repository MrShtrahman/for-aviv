import { describe, test, expect } from 'vitest';
import {
  removeTheLetterYom,
  lettersDaysToFullDays,
  splitToDays,
  removeEverythingBeforeFriday,
  convertToActivityAndDay,
  fillInMissingDays
} from 'components/AddUser/parser';
import { UserActivity } from 'redux/reducers/usersReducer';

describe('removeEverythingBeforeFriday', () => {
  test('removes everything before the first friday', () => {
    const input = `יום חמישי - משהו
        יום שישי - משהו אחר
        יום שבת - חרלעות`;

    const result = removeEverythingBeforeFriday(input);

    expect(result.indexOf('שישי')).toEqual(0);
  });

  test('keeps the input the same when no friday is given', () => {
    const input = `יום חמישי - משהו
        יום שבת - משהו אחר
        יום ראשון - חרלעות`;

    const result = removeEverythingBeforeFriday(input);

    expect(result).toEqual(input);
  });
});

describe('lettersDaysToFullDays', () => {
  test('should convert days letters to full days', () => {
    const input = `יום ה - משהו
        יום ו - משהו אחר
        מוצש - חרלעות`;

    const result = lettersDaysToFullDays(input);

    expect(result).toEqual(`יום חמישי - משהו
        יום שישי - משהו אחר
        שבת - חרלעות`);
  });
});

describe('splitToDays', () => {
  test('should split to days', () => {
    const input = `יום ה - משהו
        יום ו - משהו אחר
        מוצש - חרלעות`;

    const result = splitToDays(input);

    expect(result).toHaveLength(3);
  });
});

describe('removeTheLetterYom', () => {
  test('should remove the letter yom from input', () => {
    const input = `יום חמישי - משהו
        יום שישי - משהו אחר
        יום שבת - משהו אחר לגמרי`;
    const result = removeTheLetterYom(input);

    expect(result).toEqual(`חמישי - משהו
        שישי - משהו אחר
        שבת - משהו אחר לגמרי`);
  });
});

describe('fillInTheMissingDays', () => {
  test('fills in missing days', () => {
    const input = `חמישי - מנוחה
        ראשון - מנוחה
        שלישי- מנוחה
        רביעי - מנוחה`;

    const result = fillInMissingDays(input);

    expect(result.indexOf('שישי')).not.toEqual(-1);
    expect(result.indexOf('שבת')).not.toEqual(-1);
    expect(result.indexOf('רביעי')).not.toEqual(-1);
  });

  test('not do anything given all days exist', () => {
    const input = `חמישי - מנוחה
        שישי - מנוחה
        שבת - מנוחה
        ראשון - מנוחה
        שני - מנוחה
        שלישי- מנוחה
        רביעי - מנוחה`;

    expect(fillInMissingDays(input)).toEqual(input);
  });
});

describe('convertToActivityAndDay', () => {
  test('should handle a `-` seperator', () => {
    const input = `רביעי - משהו נהדר`;

    const result = convertToActivityAndDay(input);

    expect(result).toEqual({ day: 'רביעי', type: ' משהו נהדר' } as UserActivity);
  });

  test('should handle a `:` seperator', () => {
    const input = `רביעי : משהו נהדר`;

    const result = convertToActivityAndDay(input);

    expect(result).toEqual({ day: 'רביעי', type: ' משהו נהדר' } as UserActivity);
  });

  test('should handle a `\n` seperator', () => {
    const input = `רביעי\nמשהו נהדר`;

    const result = convertToActivityAndDay(input);

    expect(result).toEqual({ day: 'רביעי', type: 'משהו נהדר' } as UserActivity);
  });

  test('should handle a ` ` seperator', () => {
    const input = `רביעי משהו נהדר`;

    const result = convertToActivityAndDay(input);

    expect(result).toEqual({ day: 'רביעי', type: ' משהו נהדר' } as UserActivity);
  });
});
