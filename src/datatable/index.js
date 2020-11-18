import React from 'react';

// Import components
import Row from './Row';

// Import data API
// import DataAPIs from '../server-simulation/server';

class DataTable extends React.Component {
	render() {
		const { rows, columns } = this.props;
		return (
			<div>
				<h3>Data table rows</h3>
				<div className="data-table-header">
					{columns.map(ctr => (
						<span>{ctr.label}</span>
					))}
				</div>
				<div>{rows.map(dr => (
					<Row key={dr.id} rowData={dr} />
				))}</div>
			</div>
		);
	}
}

export default DataTable;