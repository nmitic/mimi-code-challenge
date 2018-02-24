const fs = require('fs');
const fetch = require('node-fetch');
const chalk = require('chalk');

const endPointPopularTracks = page => `https://api-v2.hearthis.at/feed/?type=popular&page=${page}&count=20`;
const endPointArtist = name => `https://api-v2.hearthis.at/${name}/`;
const dataFile = 'data.json';

console.log(chalk.green('fetching data initialized.. This will take some time, sit back and relax :) '));

const getData = async (page, arr, storeDataCallback) => {
  
  console.log(chalk.cyan(`fetching popular tracks page: ${page}`));

	const response = await fetch(endPointPopularTracks(page));
  const data = await response.json();

  if (data.length > 0) {
    console.log(chalk.yellow(`fetching all artists in page: ${page}`));

    for (let index = 0; index < data.length; index++) {
      const exist = artistExist(arr, data[index].user_id);

      const artistResponse = await fetch(endPointArtist(data[index].user.permalink));
      const artistData = await artistResponse.json();

    	if (!exist) {
      	arr.push({
          userId: data[index].user_id,
          artistData,
          downloadCount: parseInt(data[index].download_count)
        });
      } else {
        console.log(chalk.red(('Found duplicate artist, updating...')));
      	updateArtist(arr, data[index]);
      }
    }
    
  	setTimeout(() => getData(page + 1, arr, storeDataCallback), 100);
  } else {
  	storeDataCallback(arr);
  }
};

const storeData = (arr) => {
  console.log(chalk.green(('Sorting artist per download count...')));

	const sortedArr = arr.sort((a, b) => {
  	return a.downloadCount === b.downloadCount ? 0 : +(a.downloadCount < b.downloadCount) || -1;
  });
  
  const data = {
    popularArtist: sortedArr
  };
  
  fs.writeFile(dataFile, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log(chalk.green(('Artists are saved, data ready to be consumed, yeah!!!')));
  });
};

const artistExist = (data, artistId) => {
	return data.some(artist => {
    return artist.userId === artistId;
  });
};

const updateArtist = (data, artist) => {
	return data.map(item => {
  	if (item.userId === artist.user_id) {
    	item.downloadCount += parseInt(artist.download_count);
    }
    
    return item;
  });
};

// start the execution
getData(1, [], storeData);


