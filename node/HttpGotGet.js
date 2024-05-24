import got from 'got';

const url = 'https://httpbin.org/post';
const options= {
    body: 'Hello world!',
    headers: {
      'Content-Type': 'text/plain'
    }
};
got.post(url, options)
    .then(response => {
        console.log(response.body);
    })
    .catch(error => {
        console.log(error);
    })