import React from 'react';

// Import components
import Row from './Row';
import InfiniteScroll from 'react-virtualized-infinite-scroll';

// Import styles
import './dataTable.scss';

class DataTable extends React.Component {
	state = {
		selectedRows: [],
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
		const checkboxElems = document.querySelectorAll('input[type="checkbox"]');
		if (newSelectedRows.length) {
			this.setState({ selectedRows: [] });
			checkboxElems.forEach(cb => cb.checked = false);
		} else {
			rows.forEach(r => {
				if (newSelectedRows.indexOf(r.id) < 0) {
					newSelectedRows.push(r.id);
				}
			});
			this.setState({ selectedRows: newSelectedRows });
			checkboxElems.forEach(cb => cb.checked = true);
		}
	}

	renderRow = (r) => {
		const { selectedRows } = this.state;
		const { columns, onRowClick } = this.props;
		return <Row
			key={r.id}
			isChecked={selectedRows.indexOf(r.id) > -1}
			toggleRowSelection={this.toggleRowSelection}
			indexVal={r.id - 1}
			rowData={r}
			onRowClick={onRowClick}
			columns={columns}
		/>
	}

	render() {
		const { rows, columns, fetchData } = this.props;
		const { selectedRows } = this.state;

		return (
			<div>
				<h3>Acme Inc. data table</h3>
					<table className="table-container" cellSpacing="0" cellPadding="0">
						<thead>
							<tr>
								<th><input onChange={() => {}} onClick={this.toggleSelectAll} checked={selectedRows.length === rows.length} type="checkbox"></input></th>
								{columns.map(c => (
									<th key={c.id} style={{ width: c.width || "auto" }}>{c.label}</th>
								))}
							</tr>
						</thead>
						
						<tbody>
							<InfiniteScroll
                loadMore={fetchData}
                renderRow={this.renderRow}
                rowHeight={100}
                threshold={2}
                data={rows}
                renderLoading={(
                    <div style={{ height: 40 }}>
                        Loading...
                    </div>
                )}
                containerHeight={800}
                ref={(infiniteScroll) => this.infiniteScroll = infiniteScroll}
                scrollRef={(virtualScroll) => this.virtualScroll = virtualScroll}
            />
							{/* {rows.map((r, index) => (
								<Row
									key={r.id}
									isChecked={selectedRows.indexOf(r.id) > -1}
									toggleRowSelection={this.toggleRowSelection}
									indexVal={index}
									rowData={r}
									onRowClick={onRowClick}
									columns={columns}
								/>
							))} */}
						</tbody>
					</table>
			</div>
		);
	}
}

export default DataTable;