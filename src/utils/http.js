import axios from 'axios';

const http = axios.create({
  timeout: 30000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
});

http.interceptors.response.use(
  response => {
    //console.log('RESP:', response.data);
    return response;
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      const {data} = error.response;
      
      return Promise.reject('[' + error.response.status + '] ' + data.error);
      
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(
        'Ada masalah ketika menghubungi server. Silahkan cek kembali koneksi internet anda.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error.message);
    }
  },
);


export default http;
