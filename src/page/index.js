import React, { Component } from 'react';

// Import components
import DataTable from '../datatable';

// Import data API
import DataAPIs from '../server-simulation/server';

class Page extends Component {
	
	componentDidMount() {
		DataAPIs.loadAll();
	}

	render() {
		return (
			<div>
				<DataTable />
			</div>
		);
	}
}

export default Page;