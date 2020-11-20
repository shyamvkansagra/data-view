import React, { Component } from 'react';

// Import components
import DataTable from '../datatable';

// Import data API
import DataAPIs from '../server-simulation/server';

// Import styles
import './page.scss';

const columns = [
	{
		"id": 1,
		"label": "Album ID",
		"numeric": true,
		"width": "10%"
	},
	{
		"id": 2,
		"label": "ID",
		"numeric": true,
		"width": "50px"
	},
	{
		"id": 3,
		"label": "Title",
		"numeric": false,
		"width": "500px"
	},
	{
		"id": 4,
		"label": "Link",
		"numeric": true,
		"width": "100px"
	},
	{
		"id": 5,
		"label": "Thumbnail",
		"numeric": false,
		"width": ""
	}
];

class Page extends Component {
	state = {
		dataRows: [],
		limit: 10,
		offset: 0,
		isLoaded: false
	};

	componentDidMount() {
		DataAPIs.loadAll(() => {
			const albumData = DataAPIs.getData(10, 0);
			this.setState({ isLoaded: true, dataRows: albumData });			
		});
	}

	switchView = () => {
		this.setState({ view: this.state.view === "sample" ? "real" : "sample" });
	}

	onRowClick = (rowData, rowIndex) => {
		alert("You clicked row no: " + rowIndex + "\nData: " + JSON.stringify(rowData));
	}

	fetchData = () => {
		const { limit, offset, dataRows } = this.state;
		const newOffset = offset + limit;
		const newData = DataAPIs.getData(limit, newOffset);
		this.setState({ offset: newOffset, dataRows: [...dataRows, ...newData] });
	}

	render() {
		const { dataRows, isLoaded } = this.state;
		const columnsToShow = columns;
		const rowsToShow = dataRows;
		if (!isLoaded) {
			return (
				<div>Loading...</div>
			);
		}
		return (
			<div>
				<DataTable
					fetchData={this.fetchData}
					columns={columnsToShow}
					rows={rowsToShow}
					onRowClick={this.onRowClick}
					onSelectionChange={() => {}}
				/>
			</div>
		);
	}
}

export default Page;