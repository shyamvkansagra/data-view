import React, { Component } from 'react';

class Row extends Component {
	render() {
		const { rowData, onRowClick, indexVal, columns } = this.props;
		return (
			<tr className="row-container" onClick={() => onRowClick(rowData, indexVal+1)}>
				{Object.keys(rowData).map((rdk, idx) => {
					if (rdk === "url") {
						return <td><a href={rowData[rdk]}>Link</a></td>
					} else if (rdk === "thumbnailUrl") {
						return <td><img src={rowData[rdk]} alt="thumbnail" /></td>
					}
					return <td className={columns[idx].numeric ? "right-align" : ""}><span>{rowData[rdk]}</span></td>
				})}
			</tr>
		);
	}
}

export default Row;