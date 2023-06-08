const menu = document.getElementById("menu");
const graphContainer = document.getElementById("graphContainer");
const graph = document.getElementById("graph");
const profile = document.getElementById("profile");
const logoutButton = document.getElementById("logout-button");
const logoutForm = document.getElementById("logout-form");

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = "/login.html";
}
let currentGraph;

function updateGraph(data, selectedOption) {
    // Remove the previous graph if it exists
    const graphContainer = document.getElementById("graphContainer");
    const currentGraph = document.getElementById("graph");
    if (currentGraph) {
      graphContainer.removeChild(currentGraph);
    }
  
    // Extract the data based on the selected option
    const graphData = data.user[selectedOption];
  
    // Create a new SVG element based on the selected option
    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("id", "graph");
    svgElement.setAttribute("class", "graph");
    svgElement.setAttribute("width", "500");
    svgElement.setAttribute("height", "300");
  
    // Apply your animation logic to update the graph element based on the selected option
    switch (selectedOption) {
      case "xpAmount":
        const xpAmount = graphData.aggregate.sum.amount;
        // Example: Create a bar chart with SVG rect elements
        const barElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        barElement.setAttribute("class", "bar");
        barElement.setAttribute("x", "0");
        barElement.setAttribute("y", "0");
        barElement.setAttribute("width", xpAmount);
        barElement.setAttribute("height", "50");
        svgElement.appendChild(barElement);
        break;
      case "grades":
        const grades = graphData.level[0].amount;
        // Example: Create a line chart with SVG path elements
        const lineElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        lineElement.setAttribute("class", "line");
        // Set the path coordinates based on the grades data
        lineElement.setAttribute("d", `M 0 0 L ${grades} 100`);
        svgElement.appendChild(lineElement);
        break;
      case "audits":
        const audits = graphData.downAmount.aggregate.sum.amount;
        // Example: Create a pie chart with SVG path elements
        const pieElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        pieElement.setAttribute("class", "pie");
        // Set the path attributes and data for the pie chart
        // ...
        svgElement.appendChild(pieElement);
        break;
      case "skills":
        const skills = graphData.upAmount.aggregate.sum.amount;
        // Example: Create a scatter plot with SVG circle elements
        const scatterElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        scatterElement.setAttribute("class", "scatter");
        scatterElement.setAttribute("cx", skills);
        scatterElement.setAttribute("cy", "150");
        scatterElement.setAttribute("r", "5");
        svgElement.appendChild(scatterElement);
        break;
      default:
        break;
    }
  
    // Append the new graph element to the container
    graphContainer.appendChild(svgElement);
  }
  

// // Function to update the graph based on fetched data
// function updateGraph(data, selectedOption) {
//     // Remove the previous graph if it exoists
//     if (currentGraph) {
//         graphContainer.removeChild(currentGraph);
//     }

//     // Extract the data based on the selected option
//     const graphData = data.user[selectOption];

//     // Create a new graph element with the new data and animations based on the selected option
//     switch (selectedOption) {
//         case 'xpAmount':
//             const xpAmount = graphData.aggregate.sum.amount;
//             const barElement = document.createElement('div');
//             barElement.classList.add('bar');
//             barElement.style.width = `${xpAmount}px`;
//             graphElement.apppendChild(barElement);
//             break;
//         case 'grades':
//             const grades = graphData.level[0].amount;
//             const lineElement = document.createElement('div');
//             barElement.classList.add('bar');
//             barElement.style.width = `${grades}px`;
//             graphElement.appendChild(lineElement);
//             break;
//         case 'audits':
//             const audits = graphData.downAmount.aggregate.sum.amount;
//             const pieElement = document.createElement('div');
//             pieElement.classList.add('pie');
//             pieElement.style.transform = `rotate(${audits}deg)`;
//             graphElement.appendChild(pieElement)
//             break;
//         case 'skills':
//             const skills = graphData.upAmount.aggregate.sum.amount;
//             const scatterElement = document.createElement('div');
//             scatterElement.classList.add('scatter');
//             scatterElement.style.transform = `${skills}px`;
//             graphElement.appendChild(scatterElement);
//             break;
//         default:
//             break;
//     }
//     graphContainer.appendChild(graphElement);

//     currentGraph = graphElement;
//     // Example: Update the height of a bar element with animation
//     const barElement = document.createElement('div');
//     const barHeight = graphData * 10; // Adjust the calculation based on your needs
//     barElement.style.height = `${barHeight}px`;
//     barElement.classList.add('bar');
//     graphContainer.appendChild(barElement);
//   }


// Function to fetch data from the GraphQL API
async function fetchData(selectOption) {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    window.location.href = "/login.html";
  }
  const query = `
    {
        user {
            login
            attrs
            campus
            level: transactions(
              where: { type: { _eq: "level" }, path: { _ilike: "%/school-curriculum/%" } }
              order_by: { amount: desc }
              limit: 1
            ) {
              amount
            }
            upAmount: transactions_aggregate(where: { type: { _eq: "up" } }) {
              aggregate {
                sum {
                  amount
                }
              }
            }
            downAmount: transactions_aggregate(where: { type: { _eq: "down" } }) {
              aggregate {
                sum {
                  amount
                }
              }
            }
            xpAmount: transactions_aggregate(
              where: {
                type: { _eq: "xp" }
                _or: [{ attrs: { _eq: {} } }, { attrs: { _has_key: "group" } }]
                _and: [
                  { path: { _nlike: "%/piscine-js/%" } }
                  { path: { _nlike: "%/piscine-go/%" } }
                ]
              }
            ) {
              aggregate {
                sum {
                  amount
                }
              }
            }
            timeline: transactions(
              where: {
                type: { _eq: "xp" }
                _or: [{ attrs: { _eq: {} } }, { attrs: { _has_key: "group" } }]
                _and: [
                  { path: { _nlike: "%/piscine-js/%" } }
                  { path: { _nlike: "%/piscine-go/%" } }
                ]
              }
            ) {
              amount
              createdAt
              path
            }
            skills: transactions(where: { type: { _eq: "skill" } }) {
              amount
              createdAt
              path
            }
            audits: results(where: { path: { _eq: "/gritlab/school-curriculum" } }) {
                grade
                createdAt
                path
            }
        
      }
    }
  `;
  try {
    const response = await fetch(
      "https://01.gritlab.ax/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      const user = data.data.user[0];
      displayUserInfo(user);
      displayUserXp(
        user.xpAmount.aggregate.sum.amount,
        user.upAmount.aggregate.sum.amount,
        user.downAmount.aggregate.sum.amount
      );
      displayData(data);
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
        .split("")
        .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);  
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
}

//-----------------display----------------

function createLevelGraph(level) {
    const graphContainer = document.getElementById("graphContainer");
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("class", "graph");
    svgElement.setAttribute("width", "500");
    svgElement.setAttribute("height", "300");
  
    const barWidth = 50;
    const barHeight = level * 10;
    const barX = 50;
    const barY = 300 - barHeight;
  
    const barElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    barElement.setAttribute("class", "bar");
    barElement.setAttribute("x", barX);
    barElement.setAttribute("y", barY);
    barElement.setAttribute("width", barWidth);
    barElement.setAttribute("height", barHeight);
  
    svgElement.appendChild(barElement);
    graphContainer.appendChild(svgElement);
  }
  
  // Example usage:
  const level = 35; // Replace with the actual user's level
  createLevelGraph(level);


function displayUserLevel(level) {
    // if the user is between level 0 -10 return a string containing the level followed by "Aspiring Developer"
    if (level >= 0 && level < 10) {
      return `Level ${level} Aspiring Developer`;
    }
    if (level >= 10 && level < 20) {
      return `Level ${level} Beginner Developer`;
    }
    if (level >= 20 && level < 30) {
      return `Level ${level} Apprentice Developer`;
    }
    if (level >= 30 && level < 40) {
      return `Level ${level} Assistant Developer`;
    }
    if (level >= 40 && level < 50) {
      return `Level ${level} Basic Developer`;
    }
    if (level >= 50 && level < 60) {
      return `Level ${level} Junior Developer`;
    } else {
      return `Level ${level}`;
    }
  }
  
//   // Display the user XP and XP ratio in the DOM and generate the XP graph
//   function displayUserXp(xpAmount, upAmount, downAmount) {
//     // Display the user XP
//     document.getElementById(
//       "total-xp"
//     ).textContent = `Total XP: ${convertToByteUnits(xpAmount)}`;
//     // Display the user XP ratio
//     document.getElementById("xpRatio").textContent =
//       "Audit Ratio: " + (upAmount / downAmount).toFixed(2);
//     // Display the user given XP
//     document.getElementById("upXpValue").textContent =
//       "Up XP: " + convertToByteUnits(upAmount);
//     // Display the user received XP
//     document.getElementById("downXpValue").textContent =
//       "Down XP: " + convertToByteUnits(downAmount);
  
//     const totalXP = upAmount + downAmount;
//     const upXp = document.getElementById("upXp");
//     const downXp = document.getElementById("downXp");
//     const upXpWidth = (upAmount / totalXP) * 100;
//     const downXpWidth = (downAmount / totalXP) * 100;
//     upXp.setAttribute("width", upXpWidth);
//     upXp.setAttribute("x", 0);
//     downXp.setAttribute("width", downXpWidth);
//     downXp.setAttribute("x", upXpWidth);
//   }

function displayUserXp(xpAmount, upAmount, downAmount) {
    // Display the user XP
    document.getElementById("total-xp").textContent = `Total XP: ${xpAmount}`;
    // Display the user XP ratio
    document.getElementById("xpRatio").textContent = "Audit Ratio: " + (upAmount / downAmount).toFixed(2);
    // Display the user given XP
    document.getElementById("upXpValue").textContent = "Up XP: " + upAmount;
    // Display the user received XP
    document.getElementById("downXpValue").textContent = "Down XP: " + downAmount;
  
    const totalXP = upAmount + downAmount;
    const upXp = document.getElementById("upXp");
    const downXp = document.getElementById("downXp");
    const upXpWidth = (upAmount / totalXP) * 100;
    const downXpWidth = (downAmount / totalXP) * 100;
    upXp.setAttribute("width", upXpWidth + "%");
    downXp.setAttribute("width", downXpWidth + "%");
  }
  
  
function displayUserInfo(user) {
  // Set the title of the page to the username of the user
  document.title = `${user.login}'s Profile`;
  // Set the user image
  document.querySelector(".user-image").src = user.attrs.image;
  // set the user name
  document.getElementById("name-profile").textContent = `${user.login}'s Profile`;
  // Set the user phone number
  document.getElementById("phone").textContent = user.attrs.phonenumber;
  // set the user email
  document.getElementById("email").textContent = user.attrs.email;
  // set the user first name and last name
  document.getElementById("first-name-last-name").textContent = `${user.attrs.firstName} ${user.attrs.lastName}`;
  // set the user campus
  document.getElementById("campus").textContent = `${displayUserLevel(user.level[0].amount)} at ${user.campus}`;
  // set the user age and country
  document.getElementById("from").textContent = `${calculateAge(user.attrs.dateOfBirth)} Years old from ${user.attrs.country}`;

  // Display skills
  const skillsList = document.getElementById("skills");
  user.skills.forEach(skill => {
    const skillItem = document.createElement("li");
    skillItem.textContent = `Skill: ${skill.amount} | Created at: ${skill.createdAt} | Path: ${skill.path}`;
    skillsList.appendChild(skillItem);
  });

  // Display audits
  const auditsList = document.getElementById("audits");
  user.audits.forEach(audit => {
    const auditItem = document.createElement("li");
    auditItem.textContent = `Audit Grade: ${audit.grade} | Created at: ${audit.createdAt} | Path: ${audit.path}`;
    auditsList.appendChild(auditItem);
  });
}

  
  // Display audits
  function displayAudits(audits) {
    const auditsList = document.getElementById("audits-list");
    audits.forEach((audit) => {
      const listItem = document.createElement("li");
      listItem.textContent = audit;
      auditsList.appendChild(listItem);
    });
  }
  
  // Display skills
  function displaySkills(skills) {
    const skillsList = document.getElementById("skills-list");
    skills.forEach((skill) => {
      const listItem = document.createElement("li");
      listItem.textContent = skill;
      skillsList.appendChild(listItem);
    });
  }


  function generateGraphs(user) {
    // Use the user data to generate the SVG graphs
  }

  function convertToByteUnits(num) {
    const units = ["bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let i = 0;
    while (num >= 1000 && i < units.length - 1) {
      num /= 1000;
      i++;
    }
    // remove decimals and round up to nearest integer
    num = Math.round(num);
    return `${num} ${units[i]}`;
  }

  function calculateAge(dateOfBirthStr) {
    const dob = new Date(dateOfBirthStr);
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970); // subtract 1970 to get the age in years
  }

    // ---------------fetch----------------

// Event listener for menu selection change
menu.addEventListener("change", () => {
  const selectedOption = menu.value;
  fetchData(selectedOption);
});

// Initial fetch and graph creation
const initialOption = menu.value;
fetchData(initialOption);

const userID = document.getElementById("user-id");

function displayData(data) {
    const token = localStorage.getItem("jwt");
    if (token) {
        const decodedToken = parseJwt(token);
        userID.textContent = decodedToken.sub;
        //you can extract and display other data from the token if needed
    }
    console.log(data);
}

// function displayData(data) {
//   userID.textContent = data.data.user[0].login;
// }


//fetchData();

// ------------Graph----------------

/*
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
    });*/
