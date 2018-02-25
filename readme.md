How to start the project
1. Run: npm install
2. Run: npm run popular-artists
3. Open new terminal tab
4. Run: npm run dev

Notes
Since there is no endPoint for popular Artist I made small nodeJS script to handle this and serve the data via json-serve.
This should be done on the backend, since API does not provide with the right data for this small app "needs" there sholudn't be any kind of heavy fetching, calculating and sorting on the frontend.

The "popular artist" data is sorted per download count of each song of the respective Artist. This was intention, since the rules was to get data from "popular tracks" endPoint.
