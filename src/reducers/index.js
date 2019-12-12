import {
  SET_USER_ID,
  ADD_USER,
  UPDATE_POOLS,
} from '../constants';

const initialState = {
  selectedUserId: 0,
  users: [
    {
      name: 'Tizio',
      role: 'OWNER',
      id: 0,
    },
    {
      name: 'Caio',
      role: 'USER',
      id: 1,
    },
    {
      name: 'Semprogno',
      role: 'RESPONDENT',
      id: 2,
    },
  ],
  pools: [
    {
      id: 0,
      ownerId: 0,
      question: 'What do you mean you\'ve never seen Blade Runner?',
      options: [
        'Sorry, I don\'t like movies, my life is miserable...',
        'Hey man, your\'re quoting Alex Turner, I like that!',
        'This conversation is going out of control...',
      ],
      answersPerUser: [
        { user: 1, answer: 2 },
      ],
    },
  ],
};


const poolApp = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        selectedUserId: action.id,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user],

      };
    case UPDATE_POOLS:
      return {
        ...state,
        pools: action.pools,


      };
    default:
      return state;
  }
};

export default poolApp;
