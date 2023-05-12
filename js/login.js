import { loginTitle, loginTitleText, spanElements, generateRandomColor } from "./css.js";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
  });
  
  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              token
            }
          }
        `,
        variables: {
          username,
          password
        }
      });
      const token = data.login.token;
      localStorage.setItem('token', token);
      alert("You have successfully logged in.");
      location.reload();
    } catch (error) {
      loginErrorMsg.style.opacity = 1;
    }
  });
  