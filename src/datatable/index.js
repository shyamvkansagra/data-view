import React from 'react';

// Import components
import Row from './Row';

// Import styles
import './dataTable.scss';

class DataTable extends React.Component {
	state = {
		selectedRows: []
	}

	toggleRowSelection = (id) => {
		const { selectedRows } = this.state;
		var newSelectedRows = Array.from(selectedRows);
		if (newSelectedRows.indexOf(id) > -1) {
			newSelectedRows.splice(newSelectedRows.indexOf(id), 1);
		} else {
			newSelectedRows.push(id);
		}
		this.setState({ selectedRows: newSelectedRows });
	}

	toggleSelectAll = () => {
		const { selectedRows } = this.state;
		const { rows } = this.props;
		const newSelectedRows = Array.from(selectedRows);
		if (newSelectedRows.length) {
			this.setState({ selectedRows: [] });
		} else {
			rows.forEach(r => {
				if (newSelectedRows.indexOf(r.id) < 0) {
					newSelectedRows.push(r.id);
				}
			});
			this.setState({ selectedRows: newSelectedRows });
		}
	}

	render() {
		const { rows, columns, onRowClick } = this.props;
		const { selectedRows } = this.state;
		return (
			<div>
				<h3>Data table</h3>
				<table className="table-container" cellSpacing="0" cellPadding="0">
					<thead>
						<tr>
							<th><input onClick={this.toggleSelectAll} checked={selectedRows.length === rows.length} type="checkbox"></input></th>
							{columns.map(c => (
								<th key={c.id} style={{ width: c.width || "auto" }}>{c.label}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((r, index) => (
							<Row
								key={r.id}
								isChecked={selectedRows.indexOf(r.id) > -1}
								toggleRowSelection={this.toggleRowSelection}
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