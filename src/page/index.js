import React, { Component } from 'react';

// Import components
import DataTable from '../datatable';

// Import data API
import DataAPIs from '../server-simulation/server';

const sampleColumns = [
	{
		"id": 1,
		"label": "ID",
		"numeric": true,
		"width": "10px"
	},
	{
		"id": 2,
		"label": "Product",
		"numeric": false,
		"width": "10px"
	},
	{
		"id": 3,
		"label": "Price",
		"numeric": true,
		"width": "10px"
	}
];

const sampleRows = [
	{
		"id": 1,
		"product": "abc",
		"price": 15.2
	},
	{
		"id": 2,
		"product": <div><span>React node product</span></div>,
		"price": "$15.5"
	}
];


const columns = [
	{
		"id": 1,
		"label": "Album ID",
		"numeric": true,
		"width": "10px"
	},
	{
		"id": 2,
		"label": "ID",
		"numeric": true,
		"width": "10px"
	},
	{
		"id": 3,
		"label": "Title",
		"numeric": false,
		"width": "10px"
	},
	{
		"id": 4,
		"label": "Link",
		"numeric": true,
		"width": "10px"
	},
	{
		"id": 5,
		"label": "Thumbnail",
		"numeric": false,
		"width": "10px"
	}
];

class Page extends Component {
	state = {
		dataRows: [],
		limit: 10,
		offset: 0,
		view: "real",
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

	render() {
		const { view, dataRows, isLoaded } = this.state;
		const columnsToShow = view === "sample" ? sampleColumns : columns;
		const rowsToShow = view === "sample" ? sampleRows : dataRows;
		if (!isLoaded) {
			return (
				<div>Loading...</div>
			);
		}
		return (
			<div>
				<button onClick={this.switchView}>Switch sample/real data</button>
				<DataTable
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