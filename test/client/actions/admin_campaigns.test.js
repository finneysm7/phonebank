import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { destroy } from 'redux-form';

import { mockStore, exposeLocalStorageMock, checkObjectProps } from '../client_test_helpers';
import fixtures from '../client_fixtures';
import { saveNewCampaign, setCampaignsList, setJoinedCampaignsList, setCurrentCampaign, fetchCampaigns, fetchCampaignsByUser, updateCampaignStatus } from '../../../public/src/actions/campaign';

exposeLocalStorageMock();

const { defaultScripts: initialState,
        listFixture: campaignListFixtures,
        sortedListFixture: campaignSortedListFixtures,
        mapFixture: campaignFixture } = fixtures.campaignFixtures;

describe('campaign actions', () => {
  let mock;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  const expectedCampaignProps = Object.keys(campaignFixture);
  const numberOfProps = expectedCampaignProps.length;

  describe('setCampaignsList: ', () => {
    const setCampaignsListResult = setCampaignsList(campaignListFixtures);
    describe('type: ', () => {
      const { type } = setCampaignsListResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have the type property "SET_CAMPAIGNS"', () => {
        expect(type).toEqual('SET_CAMPAIGNS');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setCampaignsListResult;
      it('should have a payload that is an array of objects: ', () => {
        expect(Array.isArray(payload)).toBe(true);
      });
      it('should contain 3 objects', () => {
        const firstObjectProps = checkObjectProps(expectedCampaignProps, payload[0]);
        const secondObjectProps = checkObjectProps(expectedCampaignProps, payload[1]);
        const thirdObjectProps = checkObjectProps(expectedCampaignProps, payload[2]);
        expect(payload.length).toBe(3);
        expect(thirdObjectProps && secondObjectProps && firstObjectProps).toBe(true);
      });
    });
  });

  describe('setCurrentCampaign', () => {
    const setCurrentCampaignResult = setCurrentCampaign(campaignFixture);
    describe('type: ', () => {
      const { type } = setCurrentCampaignResult;
      it('should have a type property (not undefined): ', () => {
        expect(type).toBeDefined();
      });
      it('should have a value of "SET_CAMPAIGN_CURRENT": ', () => {
        expect(type).toBe('SET_CAMPAIGN_CURRENT');
      });
      it('should not be null: ', () => {
        expect(type === null).toBe(false);
      });
    });
    describe('payload: ', () => {
      const { payload } = setCurrentCampaignResult;
      it('should have a payload that is an object: ', () => {
        expect(Array.isArray(payload)).toBe(false);
        expect(typeof payload).toBe('object');
      });
      it('should have all properties: ', () => {
        expect(checkObjectProps(expectedCampaignProps, payload)).toBe(true);
        expect(Object.keys(payload).length).toBe(numberOfProps);
      });
    });
  });

  describe('fetchCampaigns: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onGet('/campaigns').reply(200, campaignListFixtures
      );
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios GET request: ', () => {
      it('should add the appropriate action to the store: ', () => {
        const { type, payload } = setCampaignsList(campaignSortedListFixtures);
        return store.dispatch(fetchCampaigns())
          .then(() => {
            const dispatchedActions = store.getActions();
            expect(dispatchedActions[0].payload).toEqual(payload);
            expect(dispatchedActions[0].type).toEqual(type);
          });
      });
    });
  });

  describe('fetchCampaignsByUser: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onGet('/users/1/campaigns').reply(200, campaignListFixtures
      );
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios GET request: ', () => {
      it('should add the appropriate action to the store: ', () => {
        const { type, payload } = setCampaignsList(campaignSortedListFixtures);
        return store.dispatch(fetchCampaignsByUser(1))
          .then(() => {
            const dispatchedActions = store.getActions();
            expect(dispatchedActions[0].type).toEqual(type);
            expect(dispatchedActions[0].payload).toEqual(payload);
          });
      });
    });
  });

  describe('saveNewCampaign: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      mock.onPost('/campaigns').reply(201, campaignFixture);
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios POST request: ', () => {
      it('save campaign should add the destroy action to the store and call goBack from history: ', () => {
        const expectedAction = destroy('CampaignPage');
        const history = {
          goBack: jest.fn()
        };
        return store.dispatch(saveNewCampaign([campaignFixture], history))
          .then(() => {
            const [dispatchedActions] = store.getActions();
            const { type, meta } = dispatchedActions;
            expect(dispatchedActions).toEqual(expectedAction);
            expect(type).toBe('@@redux-form/DESTROY');
            expect(meta).toEqual({
              form: [
                'CampaignPage'
              ]
            });
            expect(history.goBack).toHaveBeenCalled();
          });
      });
    });
  });
  describe('updateCampaignStatus: ', () => {
    mock = new MockAdapter(axios);

    beforeEach(() => {
      store = mockStore(initialState);
      mock.onPut('/campaigns/1', { status: 'pause' }).reply(200, { status: 'pause' });
    });
    afterEach(() => {
      mock.reset();
    });
    describe('axios PUT request: ', () => {
      it('Update campaign status correctly: ', () => {
        const fetchAll = jest.fn(() => ({ type: 'test' }));
        return store.dispatch(updateCampaignStatus(1, 'pause', fetchAll))
          .then((campaign) => {
            expect(campaign.status).toEqual(200);
            expect(campaign.data.status).toEqual('pause');
            expect(fetchAll).toHaveBeenCalled();
          });
      });
    });
  });
});
