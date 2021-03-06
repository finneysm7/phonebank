import fixtures from '../client_fixtures';

import { volunteerCallsReducer,
         SET_CALL_CURRENT,
         CLEAR_CALL_CURRENT,
         UPDATE_CALL_STATUS,
         UPDATE_CALL_OUTCOME,
         SET_CALL_CONTACT_INFO,
         DISABLE_CALL_CONTROL,
         ENABLE_CALL_CONTROL } from '../../../public/src/reducers/calls';

const { dbFixture, initialState } = fixtures.callsFixtures;

const mockCallActions = [
  {
    type: SET_CALL_CURRENT,
    payload: dbFixture
  },
  {
    type: CLEAR_CALL_CURRENT
  },
  {
    type: UPDATE_CALL_STATUS,
    payload: 'IN_PROGRESS'
  },
  {
    type: UPDATE_CALL_OUTCOME,
    payload: 'LEFT_MESSAGE'
  },
  {
    type: SET_CALL_CONTACT_INFO,
    payload: { name: 'meow' }
  },
  {
    type: DISABLE_CALL_CONTROL
  },
  {
    type: ENABLE_CALL_CONTROL
  },
  {
    type: 'SET_CALL_CATS',
    payload: 'many cats'
  }
];

const [
  currentCall,
  clearCurrent,
  updateStatus,
  updateOutcome,
  setContact,
  disableCallControl,
  enableCallControl,
  fake
] = mockCallActions;

describe('volunteerCallsReducer tests: ', () => {
  describe('default behavior: ', () => {
    const defaultState = volunteerCallsReducer(undefined, {});
    const { current_call,
            call_id,
            user_id,
            campaign_id,
            contact_id,
            status,
            outcome,
            notes,
            current_call_contact_name } = defaultState;
    it('should return the default state if the action type does not match any cases: ', () => {
      expect(defaultState).toEqual(initialState);
    });
    it('should have a property named current_call which is a boolean: ', () => {
      expect(typeof current_call === 'boolean' && current_call === false).toBe(true);
    });
    it('should have a property named call_id which is null: ', () => {
      expect(typeof call_id === 'object' && call_id === null).toBe(true);
    });
    it('should have a property named user_id which is null: ', () => {
      expect(typeof user_id === 'object' && user_id === null).toBe(true);
    });
    it('should have a property named campaign_id which is null: ', () => {
      expect(typeof campaign_id === 'object' && campaign_id === null).toBe(true);
    });
    it('should have a property named contact_id which is null: ', () => {
      expect(typeof contact_id === 'object' && contact_id === null).toBe(true);
    });
    it('should have a property named notes which is null: ', () => {
      expect(typeof notes === 'object' && notes === null).toBe(true);
    });
    it('should have a property named status which is undefined: ', () => {
      expect(status).toBe(undefined);
    });
    it('should have a property named outcome which is undefined: ', () => {
      expect(outcome).toBe(undefined);
    });
    it('should have a property named current_call_contact_name which is undefined: ', () => {
      expect(current_call_contact_name).toBe(undefined);
    });
  });

  describe('case matching and handling payload: ', () => {
    let testResult;
    const setCallProps = ['current_call', 'call_id', 'user_id', 'campaign_id', 'contact_id', 'status', 'outcome', 'call_ended', 'call_started', 'notes'];
    describe(`should the correct props (${setCallProps}) "SET_USERS" is dispatched: `, () => {
      testResult = volunteerCallsReducer(initialState, currentCall);
      const { current_call,
              call_id,
              user_id,
              campaign_id,
              contact_id,
              status,
              outcome } = testResult;
      it('should update current_call to be a boolean (true): ', () => {
        expect(typeof current_call === 'boolean' && current_call === true).toBe(true);
      });
      it('should update call_id to be an integer: ', () => {
        expect(call_id).toBe(1);
      });
      it('should update user_id to be an integer', () => {
        expect(user_id).toBe(1);
      });
      it('should set campaign_id to be an integer', () => {
        expect(campaign_id).toBe(1);
      });
      it('should set contact_id to be an integer', () => {
        expect(contact_id).toBe(1);
      });
      it('should set status to be a ASSIGNED', () => {
        expect(status).toBe('ASSIGNED');
      });
      it('should set outcome to be PENDING', () => {
        expect(outcome).toBe('PENDING');
      });
    });
    describe('CLEAR_CALL_CURRENT is dispatched: ', () => {
      const defaultState = {
        current_call: false,
        call_id: null,
        user_id: null,
        campaign_id: null,
        contact_id: null,
        status: undefined,
        outcome: undefined,
        notes: null
      };
      it('should return default state to the correct props: ', () => {
        testResult = volunteerCallsReducer(initialState, clearCurrent);
        expect(testResult).toEqual({ ...initialState, ...defaultState });
      });
    });
    describe('should set call status when UPDATE_CALL_STATUS is dispatched: ', () => {

      testResult = volunteerCallsReducer(initialState, updateStatus);
      const { status } = testResult;
      it('should set the status to IN_PROGRESS: ', () => {
        expect(status).toBe('IN_PROGRESS');
      });
    });
    describe('should set call outcome when UPDATE_CALL_OUTCOME is dispatched: ', () => {
      testResult = volunteerCallsReducer(initialState, updateOutcome);
      const { outcome } = testResult;
      it('should set the outcome to LEFT_MESSAGE', () => {
        expect(outcome).toBe('LEFT_MESSAGE');
      });
    });
    describe('when SET_CALL_CONTACT_INFO is dispatched: ', () => {
      it('should set contact', () => {
        testResult = volunteerCallsReducer(initialState, setContact);
        const { current_call_contact_name } = testResult;
        expect(current_call_contact_name).toBe('meow');
      });
    });
    describe('when DISABLE_CALL_CONTROL is dispatched: ', () => {
      it('should set disable_call_control to true', () => {
        testResult = volunteerCallsReducer(initialState, disableCallControl);
        const { disable_call_control } = testResult;
        expect(disable_call_control).toBe(true);
      });
    });
    describe('when ENABLE_CALL_CONTROL is dispatched: ', () => {
      it('should set disable_call_control to false', () => {
        testResult = volunteerCallsReducer(initialState, enableCallControl);
        const { disable_call_control } = testResult;
        expect(disable_call_control).toBe(false);
      });
    });
    describe('it should handle non-matching action types: ', () => {
      testResult = volunteerCallsReducer(initialState, fake);
      it('should return the default state if the action type is not a case in the reducer: ', () => {
        expect(testResult).toEqual(initialState);
      });
    });
  });
});
