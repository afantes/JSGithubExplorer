// Selecting elements from the DOM
let theInput = document.querySelector(".input-container input");
let getButton = document.querySelector(".input-container button");
let reposData = document.querySelector(".data-container");

// Adding event listener to the button
getButton.addEventListener("click", getRepos);

// Function to fetch and display repositories
function getRepos() {

    // Checking if input field is empty
    if (theInput.value === "") {

        reposData.innerHTML = "<span>Please enter a GitHub username.</span>";

    } else {

        // Fetching repositories from GitHub API
        fetch(`https://api.github.com/users/${theInput.value}/repos`)

            .then((response) => response.json())

            .then((repositories) => {

                // Checking if no repositories found
                if (repositories.length === 0) {

                    reposData.innerHTML = "<span>No repositories found.</span>";

                } else {

                    // Clearing previous data
                    reposData.innerHTML = "";

                    // Looping through repositories
                    repositories.forEach((repo) => {

                        // Creating main div element
                        let mainDiv = document.createElement("div");
                        mainDiv.className = "repo-box";

                        // Creating repo name element
                        let repoName = document.createElement("p");
                        repoName.textContent = repo.name;
                        repoName.className = "repo-name";

                        // Creating repo URL anchor
                        let theUrl = document.createElement("a");
                        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                        theUrl.target = "_blank";
                        theUrl.textContent = "Visit";

                        // Creating stars count span
                        let starsSpan = document.createElement("span");
                        starsSpan.textContent = `Stars: ${repo.stargazers_count}`;

                        // Appending elements to main div
                        mainDiv.appendChild(repoName);
                        mainDiv.appendChild(theUrl);
                        mainDiv.appendChild(starsSpan);

                        // Appending main div to data container
                        reposData.appendChild(mainDiv);
                    });
                }
            })
            .catch((error) => {
                console.error("An error occurred while fetching repositories:", error);
                reposData.innerHTML = "<span>An error occurred. Please try again.</span>";
            });
    }
}