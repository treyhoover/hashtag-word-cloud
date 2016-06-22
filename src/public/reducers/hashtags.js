import {
  RECEIVE_HASHTAGS
} from '../actions/hashtags';

export default function hashtags(state = [], action) {
  switch (action.type) {
    case RECEIVE_HASHTAGS:
      return action.data;
    default:
      return state;
  }
}
