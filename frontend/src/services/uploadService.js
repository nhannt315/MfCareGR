import axios from 'axios';
import sha1 from 'js-sha1';

const uploadService = {};

const API_KEY = '581629481788997';
const API_SECRET = '_tnFVZUwwOez2DFc8XE9m8zI_yQ';

const generateCloudinarySignature = (timestamp) => {
  const strSrc = `timestamp=${timestamp}${API_SECRET}`;
  return sha1(strSrc);
};

uploadService.uploadImagesToCloudinary = images => {
  const uploads = images.map(image => {
    const timestamp = Date.now() / 1000 | 0;
    const url ='https://api.cloudinary.com/v1_1/mfcare/image/upload';
    const formData = new FormData;
    formData.append('file', image);
    formData.append('api_key', API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', generateCloudinarySignature(timestamp));
    return axios.post(url, formData, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(response => response.data);
  });
  return axios.all(uploads);
};

export default uploadService;