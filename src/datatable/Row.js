import React, { Component } from 'react';

class Row extends Component {
	render() {
		const { rowData } = this.props;
		return (
			<div className="row-container">
				{Object.keys(rowData).map(rdk => {
					if (rdk === "url") {
						return <a href={rowData[rdk]}>Link</a>
					} else if (rdk === "thumbnailUrl") {
						return <img src={rowData[rdk]} alt="thumbnail" />
					}
					return <span>{rowData[rdk]}</span>
				})}
			</div>
		);
	}
}

export default Row;