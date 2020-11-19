import React, { Component } from 'react';

class Row extends Component {
	render() {
		const { rowData, onRowClick, indexVal, columns, isChecked, toggleRowSelection } = this.props;
		return (
			<tr className="row-container" onClick={() => onRowClick(rowData, indexVal+1)}>
				<td>
					<input
						type="checkbox"
						onClick={e => {
							e.stopPropagation();
							toggleRowSelection(rowData.id);
						}}
						checked={isChecked}
						onChange={() => {}}
					/>
				</td>
				{Object.keys(rowData).map((rdk, idx) => {
					if (rdk === "url") {
						return <td>
							<a
								onClick={e => { e.stopPropagation(); }}
								href={rowData[rdk]}
								target="_blank"
								rel="noreferrer"
							>Link</a>
						</td>
					} else if (rdk === "thumbnailUrl") {
						return <td><img className="img-thumbnail" src={rowData[rdk]} alt="thumbnail" /></td>
					}
					return <td className={columns[idx].numeric ? "right-align" : ""}><span>{rowData[rdk]}</span></td>
				})}
			</tr>
		);
	}
}

export default Row;