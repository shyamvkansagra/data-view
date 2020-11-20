# Data view table

This project is about creating a dynamic Data table component with some unique features. It is created using create-react-app. \
Check out the working demo at: [Data view](https://shyamvkansagra.github.io/data-view/)

## Run locally

git clone https://github.com/shyamvkansagra/data-view.git

npm install

yarn start

This should start application at localhost:3000

## About this project

This project aims to create a re-usable "data table" component which can be called from your components with simply passing row and column related info. You can pass more arguments too as you scale your app. Data table component is supposed to handle any type of dynamic data. Hence, such components can help you create tabular view of your data in easier manner if you are a developer.

### Features

- If your column has 'numeric' attribute, data will be right aligned in that column

- Can take column width as a prop and render accordingly, falls back to default width

- Click events on individual rows

- Checkboxes to select rows individually or select all from heading row

- Infinite scroll, load data as and when you scroll down

- Can handle large number of rows

- Tests

### Libraries used

- react

- SASS

- react-virtualized-infinite-scroll

- react-test-renderer

### Design overview

This application uses data available at [https://jsonplaceholder.typicode.com/photos](https://jsonplaceholder.typicode.com/photos). Since all of the data (which is 5000 rows) comes in one call, it takes upto 2-3 seconds sometimes to load it on client. We can create DB and store this info there to get data with our APIs in pagination manner, but since focus is React, I skipped that step and stored the data in local storage for ease of use. Application performs loading step for the very first time. Once data is in local storage, I am mimicking behaviour of async calls by getting only 10 rows per call by using limit and offset.

For the view part, I created `page` and `datatable` components. Page component will be using the data table component internally. Data table can be invoked by simply passing the proper data.

To style the components, I added and used SASS. To create infinite scroll and virtualization behaviour, I have used a library. Whenever you scroll down, next data will be fetched and displayed. At a time, only limited number of rows which are required for display will be present in DOM.

Finally, I added the tests with jest (create-react-app's in-built). Tests basically aim to make sure component rendering is fine and desired API calls and UI elements work as expected. The by default command to run tests, will run all our defined tests in 'watch' mode, as in whenever you save, tests will run automatically. You can also use `CI=true yarn test` to run it once without watch behaviour.

Once all above was done, I deployed the app on gitHub pages. 

### Future ideas

While working on this project, I had few ideas which I would like to implement in future to make this a complete stand alone solution:

- Implement server and DB to store and perform operations on table data

- Enhance the UI (create mobile view UI, use proper icons, fonts and colors)

- Add validations at data level

- Enhance column and row params to have even more detailed metadata, such that our "data table" component can display them even better (e.g. rows to have 'type' key to indicate what type of data it is, or columns to have 'order' key to show rows and heading in proper order)
