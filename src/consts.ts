export const weekDays = [
  'שישי',
  'שבת',
  'ראשון',
  'שני',
  'שלישי',
  'רביעי',
  'חמישי'
];

export interface UserActivity {
  type: string;
  day: string;
}

export interface User {
  name: string;
  activities: UserActivity[];
}
