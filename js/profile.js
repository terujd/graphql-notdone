import { ApolloClient, InMemoryCache, gql} from '@apollo/client';
import Chart from './chart.js';

// retrieve stored login credentials or token from localStorage or sessionStorage
const token = localStorage.getItem('token');

// set up ApolloClient to send GraphQL queries
const client = new ApolloClient({
    uri: 'https://01.gritlab.ax/intra/gritlab/api/graphql-engine/v1/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

// define GraphQL queries
const GET_USER_PROFILE = gql`
    query GetUserProfile {
        user {
            id
            name
            xpAmount
            grades {
                name
                value
            }
            audits {
                date
                result
            }
            skills {
                name
                proficiency
            }
        }
    }
`;

// fetch user data from GraphQL endpoint
client.query({
    query: GET_USER_PROFILE,
})
    .then(({data}) => {
        //populate HTML elements with user data
        document.getElementById('user-identification').textContent = data.user.name;
        document.getElementById('xp-amount').textContent = data.user.pxAmount;

        const chartData = data.user.grades.map((grade) => ({
            label: grade.name,
            data: [grade.value],
            backgroundColor: generateRandomColor()
        }));

        new Chart(document.getElementById('grades-chart'), {
            type: 'bar',
            data: {
                labels: [''],
                datasets: chartData
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const auditList = document.getElementById('audit-list');
        data.user.audits.forEach((audit) => {
            const auditListItem = document.createElement('li');
            auditListItem.textContent = `${audit.date}: ${audit.result}`;
            auditList.appendChild(auditListItem);
        });

        const skillsList = document.getElementById('skills-list');
        data.user.skills.forEach((skill) => {
            const skillListItem = document.createElement('li');
            skillListItem.textContent = `${skill.name}: ${skill.proficiency}`;
            skillsList.appendChild(skillListItem);
        });
    })
    .catch((error) => {
        console.log(error);
    });