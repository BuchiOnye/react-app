import Axios from 'axios';
import config from '../config';
import { validateAll } from 'indicative/validator'


export default class AuthService {

   async registerUser(data){

    console.log('hey there')
    const rules = {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string|min:6|confirmed'
    };

    const validationMessage = {
      required: 'The {{ field }} is required',
      'email.email': 'Invalid email address',
      'password.confirmed' : 'Passwords do not match'
    }

    try{
      await validateAll(data, rules, validationMessage);
      const response = await Axios.post(`${config.apiUrl}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password
      });

      return response.data.data;

    }catch(errors){
        console.log('hey there 2');
        if(errors.status === null){
            const formattedErrors = {};
            console.log(errors)
            formattedErrors['email'] = errors.response.data[0];
            return Promise.reject(formattedErrors);
        }

      const formattedErrors = {}
      errors.forEach(error => formattedErrors[error.field] = error.message);
      return Promise.reject(formattedErrors);
    };
    }

}