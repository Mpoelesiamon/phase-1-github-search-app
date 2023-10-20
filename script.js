const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const userList = document.getElementById('user-list');
const repoList = document.getElementById('repo-list');
const toggleSearchButton = document.getElementById('toggle-search');
let isSearchingUsers = true;

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;

    if (isSearchingUsers) {
        // Search for GitHub users
        const users = await searchGitHubUsers(searchTerm);
        displayUserResults(users);
    } else {
        // Search for GitHub repositories
        const repos = await searchGitHubRepos(searchTerm);
        displayRepoResults(repos);
    }
});

toggleSearchButton.addEventListener('click', () => {
    isSearchingUsers = !isSearchingUsers;
    searchInput.placeholder = isSearchingUsers ? 'Search for a GitHub user' : 'Search for a GitHub repository';
});

async function searchGitHubUsers(query) {
    const response = await fetch(`https://api.github.com/search/users?q=${query}`);
    const data = await response.json();
    return data.items;
}

async function searchGitHubRepos(query) {
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
    const data = await response.json();
    return data.items;
}

function displayUserResults(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user-item');
        userItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
            <a href="${user.html_url}" target="_blank" class="username">${user.login}</a>
        `;
        userList.appendChild(userItem);
    });
}

function displayRepoResults(repos) {
    repoList.innerHTML = '';
    repos.forEach(repo => {
        const repoItem = document.createElement('div');
        repoItem.classList.add('repo-item');
        repoItem.innerHTML = `
            <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
        `;
        repoList.appendChild(repoItem);
    });
}