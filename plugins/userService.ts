import axios from 'axios'

export default {
  async postSignup (payload: any){
    const response = await axios.post('/user', {
      first_name: payload.first_name,
      last_name: payload.last_name,
      username: payload.username,
      nickname: payload.nickname,
      email: payload.email,
      gender: payload.gender,
      birthday: payload.birthday,
      phone_number: payload.phone_number,
      password: payload.password1,
      stream_link: payload.stream_link,
      twitch: payload.twitch,
      twitter: payload.twitter,
      facebook: payload.facebook,
      instagram: payload.instagram,
      youtube: payload.youtube,
    }).catch(function (error) {
      if (error.response) {
        return error.response
      }
      /*
      else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      */
    });
    return response;
  },
  async getUser(id: number){
    const response = await axios.get('/user/'+id);
    return response;
  }
}
