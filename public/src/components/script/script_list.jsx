import React, { Component } from 'react';

import buttons_obj from '../common/button_objs';
import TableListView from '../common/list_view';
import tableHeaders from '../common/list_table_headers';

const { scripts: scriptHeaders } = tableHeaders;

export default class ScriptsList extends Component {
  componentDidMount() {
    this.props.fetchAllScripts();
  }

  render() {
    const { all_scripts, account_info, history } = this.props;
    const thisPage = 'Script';
    const { view_edit } = buttons_obj;
    const { redirect_path } = scriptHeaders;

    return (
      <div>
        {
          all_scripts ? (
            <TableListView
              item_collection={all_scripts}
              account_info={account_info}
              history={history}
              button_collection={view_edit}
              componentClickHandler={() => {}}
              thisPage={thisPage}
              tableHeaders={scriptHeaders}
              newPath={redirect_path}
            />
        ) : null
      }
      </div>
    );
  }
}
