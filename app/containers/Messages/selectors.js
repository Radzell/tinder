import { createSelector } from 'reselect';
import { selectDashboardHistory } from 'containers/Dashboard/selectors';
/**
 * Direct selector to the messages state domain
 */
const selectMessagesDomain = () => state => state.get('messages');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Messages
 */

const selectMessages = () => createSelector(
  selectMessagesDomain(),
  (substate) => substate.toJS()
);

const selectPersonId = () => createSelector(
  selectMessages(),
  (messages) => messages.currentPerson,
);

const selectMatchesSelector = () => createSelector(
  selectDashboardHistory(),
  (state) => state.matches.splice(0).reverse()
);

const selectPersonSelector = () => createSelector(
  selectDashboardHistory(),
  selectPersonId(),
  (state, id) => {
    if (!id || id === '') {
      return undefined;
    }
    return state.matches.filter((each) => each._id === id);
  }
  );

export {
  selectMessagesDomain,
  selectPersonSelector,
  selectMatchesSelector,
};