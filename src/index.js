import React from 'react';
import ReactDOM from 'react-dom'

import alphavantage from 'alphavantage'

console.log(process.env);

const alpha = alphavantage({
  key: 'WJY2N6Q86IFIARMN'
})

alpha.data.batch([`msft`, `aapl`]).then(data => {
  console.log(data);
});


alpha.data.intraday(`msft`).then(data => {
  console.log(data);
});


alpha.data.intraday(`msfbadt`)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  })

ReactDOM.render(
  <div>App</div>, document.getElementById('root')
)
