import { request } from 'graphql-request';

const endpoint = 'https://((DOMAIN))/api/graphql-engine/v1/graphql';

const query = `
  query GetUserProfile($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      avatarUrl
      bio
      followersCount
      followingCount
      postsCount
    }
  }
`;

// Retrieve user ID from local storage or other source
const userId = localStorage.getItem('userId');

// Send query to endpoint to retrieve user data
request(endpoint, query, { userId })
  .then(data => {
    const user = data.user;

    // Update HTML content with retrieved user data
    document.querySelector('#profile-name').textContent = user.name;
    document.querySelector('#profile-email').textContent = user.email;
    document.querySelector('#profile-bio').textContent = user.bio;
    document.querySelector('#profile-followers-count').textContent = user.followersCount;
    document.querySelector('#profile-following-count').textContent = user.followingCount;
    document.querySelector('#profile-posts-count').textContent = user.postsCount;
    document.querySelector('#profile-avatar').src = user.avatarUrl;
  })
  .catch(error => {
    console.error(error);
    // Handle error
  });