import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Row extends Component {
	render() {
		const { rowData, onRowClick, indexVal, columns, toggleRowSelection } = this.props;
		return (
			<tr className="row-container" onClick={() => onRowClick(rowData, indexVal+1)}>
				<td>
					<input
						type="checkbox"
						id={rowData.id}
						onClick={e => {
							e.stopPropagation();
							toggleRowSelection(rowData.id);
						}}
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

Row.propTypes = {
	rowData: PropTypes.object,
	onRowClick: PropTypes.func,
	indexVal: PropTypes.number,
	columns: PropTypes.array,
	toggleRowSelection: PropTypes.func
}

Row.defaultProps = {
	rowData: {},
	onRowClick: () => {},
	columns: [],
	toggleRowSelection: () => {}
}