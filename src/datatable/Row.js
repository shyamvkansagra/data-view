import React, { Component } from 'react';

class Row extends Component {
	render() {
		const { rowData } = this.props;
		return (
			<tr className="row-container">
				{Object.keys(rowData).map(rdk => {
					if (rdk === "url") {
						return <td><a href={rowData[rdk]}>Link</a></td>
					} else if (rdk === "thumbnailUrl") {
						return <td><img src={rowData[rdk]} alt="thumbnail" /></td>
					}
					return <td><span>{rowData[rdk]}</span></td>
				})}
			</tr>
		);
	}
}

export default Row;