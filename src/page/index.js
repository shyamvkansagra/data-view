import React, { Component } from 'react';

// Import components
import DataTable from '../datatable';
import InfiniteScroll from 'react-infinite-scroll-component';

// Import data API
import DataAPIs from '../server-simulation/server';

// Import styles
import './page.scss';

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
		"width": "200px"
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

	fetchData = () => {
		const { limit, offset, dataRows } = this.state;
		const newOffset = offset + limit;
		const newData = DataAPIs.getData(limit, newOffset);
		this.setState({ offset: newOffset, dataRows: [...dataRows, ...newData] });
	}

	render() {
		const { view, dataRows, isLoaded } = this.state;
		const columnsToShow = view === "sample" ? sampleColumns : columns;
		const rowsToShow = view === "sample" ? sampleRows : dataRows;
		const totalRows = view === "sample" ? 2 : 5000;
		if (!isLoaded) {
			return (
				<div>Loading...</div>
			);
		}
		return (
			<div>
				<button className="data-switcher" onClick={this.switchView}>Switch sample/real data</button>
				<InfiniteScroll
					dataLength={rowsToShow.length}
					hasMore={rowsToShow.length < totalRows}
					next={this.fetchData}
					loader={<h4>Loading...</h4>}
				>
					<DataTable
						loadMore={this.fetchData}
						columns={columnsToShow}
						rows={rowsToShow}
						onRowClick={this.onRowClick}
						onSelectionChange={() => {}}
					/>
				</InfiniteScroll>
			</div>
		);
	}
}

export default Page;