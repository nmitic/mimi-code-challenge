const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const pipe = (...functions) => data =>
  functions.reduce((value, func) => func(value), data)

const endPoint = {
  artistList: params => `http://localhost:3000/popularArtist?_page=${params.page}&_limit=20`,
  trackList: params => `https://api-v2.hearthis.at/${params.artist}/?type=tracks&page=${params.page}&count=20`,
  track: params => `https://api-v2.hearthis.at/${params.artist}/${params.title}/`
}

const getData = async (endPoint) => {
  const response = await fetch(endPoint);
  const data = await response.json();
  
  return data;
}

const getArtistsList = compose(getData, endPoint.artistList);
const getTracksList = compose(getData, endPoint.trackList);
const getTrack = compose(getData, endPoint.track);

export { getArtistsList, getTracksList, getTrack };