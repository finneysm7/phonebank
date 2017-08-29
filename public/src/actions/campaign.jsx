import axios from 'axios';
import { destroy } from 'redux-form';
import { SET_CAMPAIGNS, SET_CAMPAIGN_CURRENT, SET_VOLUNTEER_JOINED_CAMPAIGNS } from '../reducers/campaign';

export function setCampaignsList(campaignsList) {
  return {
    type: SET_CAMPAIGNS,
    payload: campaignsList
  };
}

export function setJoinedCampaignsList(campaignsList) {
  return {
    type: SET_VOLUNTEER_JOINED_CAMPAIGNS,
    payload: campaignsList
  };
}

export function setCurrentCampaign(campaignDataObj) {
  return {
    type: SET_CAMPAIGN_CURRENT,
    payload: campaignDataObj
  };
}

export function saveNewCampaign(campaignInfo, history) {
  const { name, title, description, script_id, contact_lists_id } = campaignInfo[0];
  const status = campaignInfo[1];
  return dispatch => axios.post('/campaigns',
    {
      name,
      title,
      description,
      script_id,
      status,
      contact_lists_id
    },
    { headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` } }
  )
  .then((res) => {
    history.goBack();
    dispatch(destroy('CampaignPage'));
    return res;
  })
  .catch((err) => {
    const customError = {
      message: `error in saving campaign into database: ${err}`,
      name: 'campaign data post request to campaign component'
    };
    throw customError;
  });
}


export function fetchCampaigns(status = '') {
  const queryParamString = status ? `?status=${status}` : status;

  return dispatch => axios.get(`/campaigns${queryParamString}`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((campaigns) => {
    const { data: campaignsList } = campaigns;
    return dispatch(setCampaignsList(campaignsList));
  })
  .catch((err) => {
    console.log('error fetching all campaigns from the db: ', err);
  });
}

export function fetchCampaignsByUser(userId) {
  return dispatch => axios.get(`/users/${userId}/campaigns`, {
    headers: { Authorization: ` JWT ${localStorage.getItem('auth_token')}` }
  })
  .then((campaigns) => {
    const { data: campaignsList } = campaigns;
    return dispatch(setJoinedCampaignsList(campaignsList));
  })
  .catch((err) => {
    const customError = {
      message: `error in fetching joined campaigns from database: ${err}`,
      name: 'fetchCampaignsByUser'
    };
    throw customError;
  });
}
