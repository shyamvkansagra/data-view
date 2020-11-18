import React from 'react';

// Import components
import Row from './Row';

// Import styles
import './dataTable.css';

class DataTable extends React.Component {
	render() {
		const { rows, columns, onRowClick } = this.props;
		return (
			<div>
				<h3>Data table</h3>
				<table className="table-container">
					<thead>
						<tr>
							{columns.map(c => (
								<th key={c.id}>{c.label}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((r, index) => (
							<Row
								key={r.id}
								indexVal={index}
								rowData={r}
								onRowClick={onRowClick}
								columns={columns}
							/>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default DataTable;