import React, { Component } from 'react';

class Row extends Component {
	render() {
		const { rowData, onRowClick, indexVal, columns, isChecked, toggleRowSelection } = this.props;
		console.log(columns);
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
						return <td style={{width: columns[idx].width || "auto"}}>
							<a
								onClick={e => { e.stopPropagation(); }}
								href={rowData[rdk]}
								target="_blank"
								rel="noreferrer"
							>Link</a>
						</td>
					} else if (rdk === "thumbnailUrl") {
						return <td style={{width: columns[idx].width || "auto"}}><img className="img-thumbnail" src={rowData[rdk]} alt="thumbnail" /></td>
					}
					return <td style={{width: columns[idx].width || "auto"}} className={columns[idx].numeric ? "right-align" : ""}><span>{rowData[rdk]}</span></td>
				})}
			</tr>
		);
	}
}

export default Row;