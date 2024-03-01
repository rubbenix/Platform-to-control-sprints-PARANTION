<script>
    import router from "page";
    import {fetchRequest} from "../lib/Request.js";

    export let promiseSprints;
    export let editSprintWithId;
    export let deleteSprintWithId;
    export let generateReport;
    export let addNewSprint;
    export let update;
    export let role;

    let searchBarValue;

    const openSprintPage = (id) => {
        router("/projects/" + id);
    }

    function formatDate(date) {
        let start = new Date(date);
        return start.getDate() + '-' + (start.getMonth() + 1)  + '-' + start.getFullYear();
    }

    export let isFlippedID = false;

    function reverseSprintArray() {
        isFlippedID = !isFlippedID;
        sortSprints();
    }

    function sortSprints() {
        if (!isFlippedID) {
            promiseSprints = promiseSprints.sort((a, b) => a.sprintid - b.sprintid);
        } else {
            promiseSprints = promiseSprints.sort((a, b) => b.sprintid - a.sprintid);
        }
    }

    sortSprints();

    async function fetchSPrintTitle() {
        try {
            promiseSprints = await fetchRequest({ title: searchBarValue });
            sortSprints();
        } catch (error) {
            console.error('Error fetching sprints:', error);
        }
    }
</script>

<div class="card mt-5 mb-5">
    <div class="card-header">
        <div class="row align-items-center">
            <div class="col">
<!--                <div class="input-group input-group-flush input-group-merge input-group-reverse">-->
<!--                        <span class="search-icon input-group-text"><i class="bi bi-search"-->
<!--                                                                      on:click={fetchSPrintTitle}></i></span>-->
<!--                    <input class="form-control list-search" type="text" placeholder="Search"-->
<!--                           bind:value={searchBarValue} on:input={fetchSPrintTitle}> &lt;!&ndash;TODO change update to update with a name-->
<!--                                                                                              / or change getSprints to also filter by name-->
<!--                                                                                              searchBarValue &ndash;&gt;-->
<!--                </div>-->
            </div>
            <div class="col-auto">
                {#if role === 'admin'}
                    <button class="btn btn-primary" on:click={addNewSprint}>
                        Add Sprint
                    </button>
                {/if}
            </div>
        </div>
    </div>

    <div class="scrollable-div mt-5">
        <table class="table custom-table">

            <thead>
            <tr>
                <th scope="col" class="order-header" on:click={reverseSprintArray}>
                    ID
                    <img class:rotated={isFlippedID} class="small-img" src="./src/assets/arrow-down-white.png"
                         alt="order button image">
                </th>
                <th scope="col">Title</th>
                <th scope="col">Start Date</th>
                <th scope="col">Due Date</th>
                <th scope="col"></th>
            </tr>
            </thead>

            <tbody>
                {#await promiseSprints}
                {:then sprints}
                    {#if sprints}
                        {#each sprints as sprint}
                            <tr class="test-page" on:click={openSprintPage(sprint.sprintid)}>
                                <td>
                                    {sprint.sprintid}
                                </td>
                                <td><a href="/projects/{sprint.sprintid}">{sprint.title}</a></td>
                                <td>{formatDate(sprint.startdate)}</td>
                                <td>{formatDate(sprint.duedate)}</td>
                                <td>
                                    {#if role === 'admin'}

                                        <button class="btn btn-warning mx-1"
                                                on:click|stopPropagation={() => editSprintWithId(sprint.sprintid)}>
                                            Edit <i class="bi bi-pencil-fill"></i>
                                        </button>

                                        <button class="btn btn-danger mx-1"
                                                on:click|stopPropagation={() => deleteSprintWithId(sprint.sprintid)}>
                                            Delete <i class="bi bi-trash-fill"></i>
                                        </button>

                                    {/if}

                                    <button class="btn btn-info mx-1">
                                        View Details <i class="bi bi-arrows-fullscreen"></i>
                                    </button>

                                    <button class="btn btn-success mx-1"
                                            on:click|stopPropagation={() => generateReport(sprint.sprintid)}>
                                        Create Report <i class="bi bi-briefcase-fill"></i>
                                    </button>

                                </td>
                            </tr>
                            <tr class="spacer">
                                <td colspan="100"></td>
                            </tr>
                        {/each}
                    {:else}
                        <tr>
                            <td>
                                No sprints here yet.
                            </td>
                        </tr>
                    {/if}
                {:catch error}
                    <p class="error">{error.message}</p>
                {/await}
            </tbody>

        </table>
    </div>

</div>

<style>
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
</style>
