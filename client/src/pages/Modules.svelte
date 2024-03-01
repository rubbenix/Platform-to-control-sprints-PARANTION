<script>
    import userStore from "../stores/userStore.js";
    import {fetchRequest} from "../lib/Request.js";
    import {onMount} from "svelte";

    let role = $userStore ? $userStore.role : 'user';
    let modules = [];
    let searchBarValue = '';
    let newModule = {
        label: ""
    };
    let editModule = {
        label: ""
    };
    let deletingModuleId;
    let editingModuleId;
    let showDeleteConfirmation = false;

    function fetchModules() {
        return fetchRequest('module?label=' + searchBarValue + ';Includes').then((result) => {
            modules = result;
            return result;
        }).catch((e) => {
            throw e;
        })
    }

    onMount(async () => {
        modules = await fetchModules();
        console.log(modules);
    });

    async function addNewModule() {
        showAddModulePopup = false;
        await fetchRequest('module', 'POST', newModule);
        modules = await fetchModules();
        sortModules();
    }

    function editModuleWithId(module) {
        editModule.label = module.label;
        editingModuleId = module.moduleid;
        showEditModulePopup = true;
    }

    async function editNewModule() {
        showEditModulePopup = false;
        await fetchRequest('module/label/' + editingModuleId, 'PATCH', editModule);
        modules = await fetchModules();
        sortModules();
    }

    function deleteModuleWithId(id) {
        deletingModuleId = id;
        showDeleteConfirmation = true;
    }

    async function confirmDeleteModule() {
        const response = await fetchRequest(`module/${deletingModuleId}`, "DELETE");
        const result = response;
        modules = await fetchModules();

        cancelDeleteModule();
        sortModules();
    }

    function cancelDeleteModule() {
        deletingModuleId = null;
        showDeleteConfirmation = false;
    }

    let isFlippedID = false;

    function reverseModuleArray() {
        isFlippedID = !isFlippedID;
        sortModules();
    }

    function sortModules() {
        if (!isFlippedID) {
            modules = modules.sort((a, b) => a.moduleid - b.moduleid);
        } else {
            modules = modules.sort((a, b) => b.moduleid - a.moduleid);
        }
    }

    let showAddModulePopup = false;
    let showEditModulePopup = false;

</script>

<div class="background">

    {#if showDeleteConfirmation}
        <div class="overlay">
            <div class="delete-confirmation">
                <p>Are you sure you want to delete this module?</p>
                <button class="confirm-btn" on:click={confirmDeleteModule}>Yes</button>
                <button class="cancel-btn" on:click={cancelDeleteModule}>No</button>
            </div>
        </div>
    {/if}

    <div class="card mt-5 mb-5">
        <div class="card-header">
            <div class="row align-items-center">
                <div class="col">
                    <div class="input-group input-group-flush input-group-merge input-group-reverse">
                        <span class="search-icon input-group-text"><i class="bi bi-search"
                                                                      on:click={fetchModules}></i></span>
                        <input class="form-control list-search" type="text" placeholder="Search"
                               bind:value={searchBarValue} on:input={fetchModules}> <!--TODO change update to update with a name
                                                                                              / or change getSprints to also filter by name
                                                                                              searchBarValue -->
                    </div>
                </div>
                <div class="col-auto">
                    {#if role === 'admin' || role === 'developer'}
                        <button class="btn" class:btn-primary={!showAddModulePopup}
                                class:btn-secondary={showAddModulePopup}
                                on:click={() => showAddModulePopup = !showAddModulePopup}>
                            {#if !showAddModulePopup}
                                Add Module
                            {:else}
                                Dismiss
                            {/if}
                        </button>
                    {/if}
                </div>
            </div>
        </div>

        {#if showAddModulePopup}
            <div class="mt-5 popup">

                <div class="row">

                    <div class="col form-group">
                        <label for="label">Label:</label>
                        <input id="label" class="form-control list-search" type="text" placeholder="Label"
                               bind:value={newModule.label}/>
                    </div>

                    <div class="col-auto form-group">
                        <button class="btn btn-primary add-btn" on:click={addNewModule}>Add Module</button>
                    </div>

                    <button class="close-button" on:click={() => showAddModulePopup = false}>
                        <span class="close-icon">X</span>
                    </button>
                </div>

            </div>
        {/if}

        {#if showEditModulePopup}
            <div class="mt-5 popup">

                <div class="row">

                    <div class="col form-group">
                        <label for="labelEdit">Label:</label>
                        <input id="labelEdit" class="form-control list-search" type="text" placeholder="Label"
                               bind:value={editModule.label}/>
                    </div>

                    <div class="col-auto form-group">
                        <button class="btn btn-primary add-btn" on:click={editNewModule}>Edit Module</button>
                    </div>

                    <button class="close-button" on:click={() => showEditModulePopup = false}>
                        <span class="close-icon">X</span>
                    </button>
                </div>

            </div>
        {/if}

        <div class="scrollable-div mt-5">
            <table class="table custom-table">

                <thead>
                <tr>
                    <th scope="col" class="order-header" on:click={reverseModuleArray}>
                        ID
                        <img class:rotated={isFlippedID} class="small-img" src="./src/assets/arrow-down-white.png"
                             alt="order button image">
                    </th>
                    <th scope="col">Label</th>
                    <th scope="col"></th>
                </tr>
                </thead>

                <tbody>
                {#if modules.length > 0}
                    {#each modules as module}
                        <tr>
                            <td>
                                {module.moduleid}
                            </td>
                            <td>{module.label}</td>
                            <td>
                                {#if role === 'admin' || role === 'developer'}

                                    <button class="btn btn-warning mx-1"
                                            on:click|stopPropagation={() => editModuleWithId(module)}>
                                        Edit <i class="bi bi-pencil-fill"></i>
                                    </button>

                                    <button class="btn btn-danger mx-1"
                                            on:click|stopPropagation={() => deleteModuleWithId(module.moduleid)}>
                                        Delete <i class="bi bi-trash-fill"></i>
                                    </button>

                                {/if}

                            </td>
                        </tr>
                        <tr class="spacer">
                            <td colspan="100"></td>
                        </tr>
                    {/each}
                {:else}
                    <tr>
                        <td colspan="4">
                            No modules here yet.
                        </td>
                    </tr>
                {/if}
                </tbody>

            </table>
        </div>

    </div>

</div>

<style>
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
        margin-bottom: 10rem;
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

    .popup {
        position: relative;
        background-color: #19191d;
        padding: 20px;
        z-index: 1000;
        color: white;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #e74c3c;
        border: none;
        border-radius: 50%;
        width: 25px;
        height: 25px;
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

    .add-btn {
        margin-top: 1.5rem;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        color: white;
    }

    .delete-confirmation {
        background-color: #19191d;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        max-width: 300px;
    }

    .delete-confirmation p {
        margin-bottom: 1rem;
    }

    .confirm-btn,
    .cancel-btn {
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
    }

    .confirm-btn {
        background-color: #4CAF50;
        color: #fff;
    }

    .confirm-btn:hover {
        background-color: #45a049;
    }

    .cancel-btn {
        background-color: #f44336;
        color: #fff;
    }

    .cancel-btn:hover {
        background-color: #d32f2f;
    }
</style>