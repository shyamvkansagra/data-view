import React from 'react';

// Import components
import Row from './Row';

// Import data API
import DataAPIs from '../server-simulation/server';

class DataTable extends React.Component {
	state = {
		dataRows: [],
		limit: 10,
		offset: 0
	};

	componentDidMount() {
		const albumData = DataAPIs.getData(10, 0);
		this.setState({ dataRows: albumData });
	}

	render() {
		const { dataRows } = this.state;
		return (
			<div>
				<h3>Data table rows</h3>
				<div>{dataRows.map(dr => (
					<Row key={dr.id} rowData={dr} />
				))}</div>
			</div>
		);
	}
}

export default DataTable;