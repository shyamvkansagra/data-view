import React from 'react';

// Import components
import Row from './Row';

// Import styles
import './dataTable.css';

class DataTable extends React.Component {
	render() {
		const { rows, columns } = this.props;
		return (
			<div>
				<h3>Data table</h3>
				<table className="table-container">
					<thead>
						<tr>
							{columns.map(ctr => (
								<th key={ctr.id}>{ctr.label}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map(dr => (
							<Row key={dr.id} rowData={dr} />
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default DataTable;