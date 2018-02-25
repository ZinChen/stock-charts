import alphavantage from 'alphavantage'

const alpha = alphavantage({
  key: 'WJY2N6Q86IFIARMN'
})

export default alpha;

// alpha.data.batch([`msft`, `aapl`]).then(data => {
//   console.log(data);
// });


// alpha.data.intraday(`msft`).then(data => {
//   console.log(data);
// });


// alpha.data.intraday(`msfbadt`)
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error);
//   })