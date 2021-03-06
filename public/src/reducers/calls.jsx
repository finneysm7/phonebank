const defaultCalls = {
  current_call: false,
  call_id: null,
  user_id: null,
  campaign_id: null,
  contact_id: null,
  status: undefined,
  outcome: undefined,
  notes: null,
  current_call_contact_name: undefined,
  call_volunteer_active: false,
  disable_call_control: false
};

const clearCallDefault = {
  current_call: false,
  call_id: null,
  contact_id: null,
  status: undefined,
  outcome: undefined,
  notes: null,
  current_call_contact_name: undefined,
  call_volunteer_active: false
};

export const SET_CALL_CURRENT = 'SET_CALL_CURRENT';
export const CLEAR_CALL_CURRENT = 'CLEAR_CALL_CURRENT';
export const UPDATE_CALL_STATUS = 'UPDATE_CALL_STATUS';
export const UPDATE_CALL_OUTCOME = 'UPDATE_CALL_OUTCOME';
export const SET_CALL_CONTACT_INFO = 'SET_CALL_CONTACT_INFO';
export const SET_VOLUNTEER_CALL_ACTIVE = 'SET_VOLUNTEER_CALL_ACTIVE';
export const CLEAR_VOLUNTEER_CALL_ACTIVE = 'CLEAR_VOLUNTEER_CALL_ACTIVE';
export const DISABLE_CALL_CONTROL = 'DISABLE_CALL_CONTROL';
export const ENABLE_CALL_CONTROL = 'ENABLE_CALL_CONTROL';

export function volunteerCallsReducer(state = defaultCalls, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CALL_CURRENT:
      return {
        ...state,
        current_call: true,
        call_id: payload.id,
        user_id: payload.user_id,
        campaign_id: payload.campaign_id,
        contact_id: payload.contact_id,
        status: payload.status,
        outcome: payload.outcome,
        notes: payload.notes
      };
    case CLEAR_CALL_CURRENT:
      return {
        ...state,
        ...clearCallDefault
      };
    case UPDATE_CALL_STATUS:
      return {
        ...state,
        status: payload
      };
    case UPDATE_CALL_OUTCOME:
      return {
        ...state,
        outcome: payload
      };
    case SET_CALL_CONTACT_INFO:
      return {
        ...state,
        current_call_contact_name: payload.name
      };
    case SET_VOLUNTEER_CALL_ACTIVE:
      return {
        ...state,
        call_volunteer_active: true
      };
    case CLEAR_VOLUNTEER_CALL_ACTIVE:
      return {
        ...state,
        call_volunteer_active: false
      };
    case DISABLE_CALL_CONTROL:
      return {
        ...state,
        disable_call_control: true
      };
    case ENABLE_CALL_CONTROL:
      return {
        ...state,
        disable_call_control: false
      };
    default:
      return state;
  }
}
