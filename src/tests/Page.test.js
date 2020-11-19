import { render, screen } from '@testing-library/react';
import Page from '../page';
import DataAPIs from '../server-simulation/server';

test('renders switch button', () => {
  render(<Page />);
  const btnSwitchElement = screen.getByText("Loading...");
  expect(btnSwitchElement).toBeInTheDocument();
});

test('loadAll works', () => {
	DataAPIs.loadAll(function() {
		try {
			done();
		} catch(error) {
			done(error);
		}
	});
});

test('load specific data works', () => {
	DataAPIs.loadAll(function() {
		expect(DataAPIs.getData(1, 0)).toBe([{
			albumId: 1,
			id: 1,
			thumbnailUrl: "https://via.placeholder.com/150/92c952",
			title: "accusamus beatae ad facilis cum similique qui sunt",
			url: "https://via.placeholder.com/600/92c952"
		}]);
	});
});
