import reducer, { addUser, deleteUsers, User, initialState, UsersState } from '../redux/reducers/usersReducer';

describe('usersReducer', () => {
  test('should handle a user being added to the list', () => {
    const user: User = {
      name: 'Matan',
      activities: [{ day: 'שישי', type: 'מנוחה' }]
    };
    expect(reducer(initialState, addUser(user))).toEqual({users: [
      {
        name: 'Matan',
        activities: [{ day: 'שישי', type: 'מנוחה' }]
      }
    ]});
  });

  test('shoud handle deleting all users', () => {
      const modifiedInitialState: UsersState = {users: [{
        name: 'Matan',
        activities: [{ day: 'שישי', type: 'מנוחה' }]
      },{
        name: 'Noam',
        activities: [{ day: 'ראשון', type: 'מנוחה' }]
      }]};
      expect(reducer(modifiedInitialState, deleteUsers(modifiedInitialState))).toStrictEqual({users: []})
  })
});
