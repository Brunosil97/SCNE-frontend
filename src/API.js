
const baseURL = "http://localhost:3000"
const signInURL = `${baseURL}/sign-in`
const validateURL = `${baseURL}/validate`

const post = (url, data) => {
  const configurationObject = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  return fetch(url, configurationObject)
}
const patch = (url, data) => {
    const configurationObject = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return fetch(`${baseURL}/${url}`, configurationObject).then((res) =>
     res.json()
    );
  };

  const deleteFetch = (url) => {
    const configurationObject = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
    };
    return fetch(`${baseURL}/${url}`, configurationObject).then(res => res.json())
  };
  
const getFetch = (url) => {
  return fetch(`${baseURL}/${url}`).then((res) => res.json());
};

const get = (url, token) => {
  return token ? fetch(url, { headers: { AUTHORIZATION: token } }) : fetch(url)
}
const validate = token => {
  return get(validateURL, token).then(response => response.json())
}
const signIn = data => {
  return post(signInURL, data).then(response => response.json())
}


export default { post, signIn, validate, patch, getFetch, deleteFetch}