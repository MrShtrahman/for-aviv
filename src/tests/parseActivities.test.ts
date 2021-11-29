import { UserActivity } from 'redux/reducers/usersReducer';
import { parseActivities } from '../components/AddUser/parser';

describe('scenarios - 27/11/2021', () => {
  test('Avia Ezran', () => {
    const input = `חמישי-אימון 
שישי- מנוחה
שבת- אימון
ראשון-הליכה חצי שעה
שני- הליכה חצי שעה
שלישי- הליכה חצי שעה
רביעי- הליכה חצי שעה
חמישי שקילה`;

    const result: UserActivity[] = [
      { day: 'שישי', type: ' מנוחה' },
      { day: 'שבת', type: ' אימון' },
      { day: 'ראשון', type: 'הליכה חצי שעה' },
      { day: 'שני', type: ' הליכה חצי שעה' },
      { day: 'שלישי', type: ' הליכה חצי שעה' },
      { day: 'רביעי', type: ' הליכה חצי שעה' },
      { day: 'חמישי', type: ' שקילה' }
    ];

    expect(parseActivities(input)).toStrictEqual(result);
  });

  test('Liat Harel', () => {
    const input = `חמישי-הליכה 

שישי-

שבת-אימון כח והליכה

ראשון-

שני-אימון כח והליכה

שלישי-

רביעי-אימון כח 

חמישי- שקילה`;

    const result: UserActivity[] = [
      { day: 'שישי', type: 'מנוחה' },
      { day: 'שבת', type: 'אימון כח והליכה' },
      { day: 'ראשון', type: 'מנוחה' },
      { day: 'שני', type: 'אימון כח והליכה' },
      { day: 'שלישי', type: 'מנוחה' },
      { day: 'רביעי', type: 'אימון כח ' },
      { day: 'חמישי', type: ' שקילה' }
    ];

    expect(parseActivities(input)).toStrictEqual(result);
  });

  test('Yuval Meshulam', () => {
    const input = `תוכנית אימונים: 
חמישי - כוח + חצי שעה אירובי 
שבת - שעה אירובי
ראשון - כוח + חצי שעה אירובי 
שני - שעה אירובי`;

const result: UserActivity[] = [
    { day: 'תוכניתאימונים', type: 'מנוחה' },
    { day: '', type: 'י' },
    { day: 'חמישי', type: ' כוח + חצי שעה אירובי ' },
    { day: '', type: 'י' },
    { day: 'שבת', type: ' שעה אירובי' },
    { day: 'ראשון', type: ' כוח + חצי שעה אירובי ' },
    { day: 'שני', type: ' שעה אירובי' },
    { day: '', type: 'י' },
  ];

  expect(parseActivities(input)).toStrictEqual(result);
  })
});
