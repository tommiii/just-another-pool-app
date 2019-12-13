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
      role: 'RESPONDENT',
      id: 1,
    },
    {
      name: 'Semprogno',
      role: 'RESPONDENT',
      id: 2,
    },
    {
      name: 'Gianni',
      role: 'RESPONDENT',
      id: 3,
    },
  ],
  pools: [
    {
      id: 0,
      ownerId: 0,
      question: 'What does Marsellus Wallace look like?',
      options: [
        'What?',
        'What??',
        'What???',
      ],
      answersPerUser: [
        { userId: 1, answer: 0 },
        { userId: 2, answer: 2 },
        { userId: 3, answer: 2 },
      ],
    },
    {
      id: 1,
      ownerId: 0,
      question: 'You know what they call a Quarter Pounder with Cheese in Paris?',
      options: [
        'They don\'t call it a Quarter Pounder with Cheese?',
        'Royale with Cheese',
        'What\'d they call it?',
      ],
      answersPerUser: [
        { userId: 1, answer: 1 },
        { userId: 2, answer: 2 },
        { userId: 3, answer: 1 },
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
