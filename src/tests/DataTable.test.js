import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import DataTable from '../datatable';

test("snapshot renders", () => {
	const component = renderer.create(
		<DataTable
			columns={[]}
			rows={[]}
			onRowClick={() => {}}
			onSelectionChange={() => {}}
		/>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});