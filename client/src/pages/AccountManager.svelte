<script>
    import {onMount} from "svelte";
    import {fetchRequest} from "../lib/Request.js";
    import {isBlank} from "../lib/Utils.js";


    let roles = [];
    let users = [];
    let newUser = {
        email: "",
        password: "",
        role: ""
    };
    let incorrectInput = '';

    let showAddUserPopup = false;

    async function fetchUsers() {
        const fetchedUsers = await fetchRequest('users/mappedRoles');
        fetchedUsers.forEach((user) => {
            user.newRoleId = getRole(user.role);
        })
        users = fetchedUsers;
        console.log(users);
    }

    function getRole(roleName) {
        return roles.find((role) => role.name === roleName).roleid;
    }

    async function updateUserRole(user) {
        const updatedUser = {
            roleid: user.newRoleId,
        };
        await fetchRequest(`users/${user.userid}`, 'PUT', updatedUser);
        await fetchUsers();
    }


    async function deleteUser(user) {
        const confirmDelete = confirm(`Are you sure you want to delete ${user.email}?`);
        if (confirmDelete) {
            try {
                await fetchRequest(`users/${user.userid}`, 'DELETE');
                await fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    }

    async function addUser() {
        if (isBlank(newUser.email) || isBlank(newUser.roleid) || isBlank(newUser.password)) {
            incorrectInput = 'Incorrect Input';
            return;
        }
        incorrectInput = '';
        showAddUserPopup = false;
        const newUserWithRoleID = {
            email: newUser.email,
            roleid: newUser.roleid,
            password: newUser.password,
        };
        await fetchRequest('users', 'POST', newUserWithRoleID);
        await fetchUsers();

    }

    onMount(async () => {
        roles = await fetchRequest('userrole');
        await fetchUsers();
    });

</script>

<main>
    <h1 style="color: #ddd;">Account Management</h1>

    <div class="card mt-5 mb-5">

        <div class="scrollable-div">
            <table class="table custom-table">

                <thead>
                <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {#each users as user, index}
                    <tr>
                        <td>{user.email}</td>
                        <td>
                            <select bind:value={user.newRoleId} on:change={updateUserRole(user)}
                                    class="form-select form-select-md bg-dark">
                                {#each roles as role}
                                    <option value={role.roleid}>{role.name}</option>
                                {/each}
                            </select>
                        </td>

                        <td>
                            <button class="btn btn-danger mx-1"
                                    on:click|stopPropagation={() => deleteUser(user)}>
                                Delete <i class="bi bi-trash-fill"></i>
                            </button>
                        </td>
                    </tr>
                {/each}
                </tbody>

            </table>
        </div>

    </div>

    <button class="add-user-button" on:click={() => showAddUserPopup = true}>Add User</button>

    {#if showAddUserPopup}
        <div class="popup">

            <div class="row">
                <div class="col form-group">
                    <label for="email">Email:</label>
                    <input class="form-control list-search" type="email" placeholder="Email" bind:value={newUser.email}/>
                </div>

                <div class="col form-group">
                    <label for="password">Password:</label>
                    <input class="form-control list-search" type="password" placeholder="Password" bind:value={newUser.password}/>
                </div>

                <div class="col form-group">
                    <label for="role">Role:</label>
                    <select bind:value={newUser.roleid}
                            class="form-select form-select-md bg-dark">
                        {#each roles as role}
                            <option value={role.roleid}>{role.name}</option>
                        {/each}
                    </select>
                </div>

                <div class="col-auto form-group">
                    <button class="add-user-button" on:click={addUser}>Add a new User</button>
                    <button class="close-button" on:click={() => showAddUserPopup = false}>
                        <span class="close-icon">X</span>
                    </button>
                </div>
            </div>

        </div>
    {/if}

    {#if incorrectInput !== ''}
        <span class="error-text">{incorrectInput}</span>
    {/if}

</main>

<style>
    main {
        padding: 20px;
    }

    .popup {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #19191d;
        padding: 20px;
        border: 1px solid #ccc;
        z-index: 1000;
        color: white;
    }

    .add-user-button {
        padding: 10px;
        margin: 5px;
        color: #fff;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        font-size: 14px;
    }

    .add-user-button {
        background-color: #4CAF50;
        width: 200px;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #e74c3c;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-icon {
        color: #fff; /* White color for the X */
        font-size: 16px;
        font-weight: bold;
    }

    /* table styling*/

    input {
        margin-right: 5px;
    }

    .card {
        background-color: #19191d;
    }

    .list-search {
        background-color: #25252b;
        color: #fff;
        border-radius: 4px;
        border: none;
    }

    .dropdown-menu h6 {
        font-size: 1.2rem;
    }

    .dropdown-menu {
        font-size: 1.1rem;
    }

    .dropdown-menu label, .dropdown-menu input {
        cursor: pointer;
    }

    .dropdown:hover .filter {
        background-color: #2e2e36;
        color: white;
    }

    .search-icon {
        border: none;
        cursor: pointer;
        background-color: #2e2e36;
        color: white;
    }

    .btn:focus {
        box-shadow: none;
    }

    .filter {
        border-radius: 4px;
        color: #b3b3b3;
        background-color: #25252b;
        border: none;
    }

    .custom-table {
        margin-bottom: 3rem;
    }

    .scrollable-div {
        max-height: 500px;
        overflow-y: auto;
    }

    .scrollable-div::-webkit-scrollbar {
        width: 5px;
    }

    .scrollable-div::-webkit-scrollbar-track {
        background: rgba(179, 179, 179, 0.3);
        border-radius: 10px;
    }

    .scrollable-div::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    }

    tbody {

    }

    .custom-table thead tr, .custom-table thead th {
        position: sticky;
        top: 0;
        border-top: none;
        border-bottom: none !important;
        color: #fff;
        background-color: #19191d;
    }

    .custom-table tbody th, .custom-table tbody td {
        color: #777;
        padding-bottom: 20px;
        padding-top: 20px;
        font-weight: 300;
    }

    .custom-table tbody th small, .custom-table tbody td small {
        color: #b3b3b3;
        font-weight: 300;
    }

    .custom-table tbody tr:not(.spacer) {
        border-radius: 7px;
        overflow: hidden;
        -webkit-transition: .3s all ease;
        -o-transition: .3s all ease;
        transition: .3s all ease;
    }

    .custom-table tbody tr:not(.spacer):hover {
        -webkit-box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.1);
    }

    .custom-table tbody tr th, .custom-table tbody tr td {
        background: #25252b;
        border: none;
        -webkit-transition: .3s all ease;
        -o-transition: .3s all ease;
        transition: .3s all ease;
    }

    .custom-table tbody tr th a, .custom-table tbody tr td a {
        color: #b3b3b3;
    }

    .custom-table tbody tr th:first-child, .custom-table tbody tr td:first-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .custom-table tbody tr th:last-child, .custom-table tbody tr td:last-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .custom-table tbody tr.spacer td {
        padding: 0 !important;
        height: 3px;
        border-radius: 0 !important;
        background: transparent !important;
    }

    .custom-table tbody tr.active th, .custom-table tbody tr.active td, .custom-table tbody tr:hover th,
    .custom-table tbody tr:hover td {
        color: #fff;
        background: #2e2e36;
    }

    .custom-table tbody tr.active th a, .custom-table tbody tr.active td a, .custom-table tbody tr:hover th a,
    .custom-table tbody tr:hover td a {
        color: #fff;
    }

    a {
        -webkit-transition: .3s all ease;
        -o-transition: .3s all ease;
        transition: .3s all ease;
    }

    a, a:hover {
        text-decoration: none !important;
    }

    input[type='checkbox'] {
        height: 1rem;
        width: 1rem;
        cursor: pointer;
    }

    img {
        width: 20px;
        height: 20px;
        margin: 0 10px 0 10px;
    }

    .module {
        margin-bottom: 3px;
        cursor: pointer;
        background-color: #2e2e36;
        border-radius: 0.5rem;
    }

    .modules .module {
        width: 10rem;
        color: #b3b3b3;
        margin-right: 0.5rem;
    }

    .chosen-module {
        background: #593fe4;
        color: white !important;
    }

    .chosen-module:hover {
        background: #6f58ee !important;
    }

    .modules .module:hover {
        color: white;
        background: #45454f;
    }

    .custom-table tbody tr.active th .module, .custom-table tbody tr.active td .module, .custom-table tbody tr:hover th .module,
    .custom-table tbody tr:hover td .module {
        background: #393942;
    }

    .custom-table tbody tr.active th .module:hover, .custom-table tbody tr.active td .module:hover, .custom-table tbody tr:hover th .module:hover,
    .custom-table tbody tr:hover td .module:hover {
        background: #45454f;
    }

    .custom-table tbody tr.active th .chosen-module, .custom-table tbody tr.active td .chosen-module, .custom-table tbody tr:hover th .chosen-module,
    .custom-table tbody tr:hover td .chosen-module {
        background: #593fe4;
    }

    .small-img {
        width: 15px;
        height: 15px;
        margin: 0;
        transition: transform 0.3s ease;
    }

    .order-header, .test-page {
        cursor: pointer;
    }

    .rotated {
        transform: rotate(180deg);
    }

    .form-select-md {
        /*width: 60%;*/
        cursor: pointer;
        border: none;
        background-color: #2e2e36 !important;
        color: #b3b3b3;
    }

    .form-select-md:hover {
        background-color: #45454f !important;
        color: white;
    }

    .form-select-md:focus {
        box-shadow: none;
    }

    .error-text {
        color: red;
        font-size: 14px;
    }
</style>
