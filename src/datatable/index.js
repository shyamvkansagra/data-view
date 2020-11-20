import React from 'react';

// Import components
import Row from './Row';

// Import styles
import './dataTable.scss';

const itemHeight = 100;
const windowHeight = 800;
// let scrollTop = 0;

class DataTable extends React.Component {
	state = {
		selectedRows: [],
		scrollTop: 0,
		page: 0,
		loading: false,
		prevY: 0
	}

	componentDidMount() {
		// window.addEventListener("scroll", this.onScroll, true);
		document.querySelector(".table-container").addEventListener("scroll", this.onScroll, true);
		// const list = ReactDOM.findDOMNode(this.refs.list)
		// this.list.addEventListener('scroll', this.onScroll);
		var options = {
      root: document.querySelector(".table-container"), // Page as root
      rootMargin: "0px",
      threshold: 1.0
		};
		
		this.observer = new IntersectionObserver(
      this.handleObserver.bind(this), //callback
      options
		);
		// this.observer2 = new IntersectionObserver(
		// 	this.onScroll.bind(this),
		// 	options
		// );
    this.observer.observe(this.node);
	}

	handleObserver = (entities, observer) => {
		const y = entities[0].boundingClientRect.y;
		console.log(y);
    if (this.state.prevY > y) {
      const lastRow = this.props.rows[this.props.rows.length - 1];
			const curPage = lastRow.id;
			this.fetchData();
      // this.getUsers(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
	}

	onScroll = (e, entities, observer) => {
		// const y = entities[0].boundingClientRect.y;
    // if (this.state.scrollTop > y) {
    //   const lastUser = this.state.users[this.state.users.length - 1];
    //   const curPage = lastUser.id;
    //   this.getUsers(curPage);
    //   this.setState({ page: curPage });
    // }
    // this.setState({ scrollTop: y });
		// console.log(this.node.scrollTop);
		// this.setState({ scrollTop: this.node.scrollTop })
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
		const { selectedRows, scrollTop } = this.state;

		const innerHeight = rows.length * itemHeight;
		const startIndex = Math.floor(scrollTop / itemHeight);
		const endIndex = Math.min(
			rows.length - 1, // don't render past the end of the list
			Math.floor((scrollTop + windowHeight) / itemHeight)
		);

		const items = [];
		for (let i = startIndex; i <= endIndex; i++) {
			const r = rows[i];
			items.push(
				<Row
					key={r.id}
					isChecked={selectedRows.indexOf(r.id) > -1}
					toggleRowSelection={this.toggleRowSelection}
					indexVal={i}
					rowData={r}
					onRowClick={onRowClick}
					columns={columns}
				/>
			);
		}

		// const onScroll = e => {
		// 	console.log(e.currentTarget.scrollTop);
		// 	scrollTop = e.currentTarget.scrollTop;
		// };

		return (
			<div onScroll={this.onScroll} style={{ overflow: "scroll", height: "80vh" }}>
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
						
						<tbody style={{ position: "relative", height: `${innerHeight}px` }}>
								{items}
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
							<div ref={node => this.node = node} style={{height: "100px"}}></div>
						</tbody>
					</table>
			</div>
		);
	}
}

export default DataTable;