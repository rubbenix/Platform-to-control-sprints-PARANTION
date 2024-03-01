<script>
    import {addCombinatoryOption, fetchRequest, generateQuery} from "../lib/Request.js";
    import {arrayToString} from "../lib/Utils.js";
    import {onMount} from 'svelte';
    import router from "page";
    import userStore from "../stores/userStore.js";

    export let generalTable;
    export let sprintId;
    // TODO: Because of dashboard page, the sprint id is reduced by 1, so I am increasing it here in the meanwhile,
    // remove this when its fixed there.

    let fullTests = [];
    let statuses;
    let modules;
    let reverseTests = false;
    let weightOrder = false;
    let searchBarValue;

    let statusOptions = [];
    let moduleOptions = [];

    let role;

    function handleCheckboxChange(event, option) {
        if (!event.target.checked) {
            const index = statusOptions.indexOf(option);
            if (index !== -1) {
                statusOptions.splice(index, 1);
                statusOptions = statusOptions;
            }
        } else {
            statusOptions = [...statusOptions, option];
        }
        fullFetch();
    }

    function handleModuleClick(module) {
        const index = moduleOptions.indexOf(module);
        if (index !== -1) {
            moduleOptions.splice(index, 1);
            moduleOptions = moduleOptions;
        } else {
            moduleOptions = [...moduleOptions, module];
        }
        console.log('modules: ', moduleOptions);
        fullFetch();
    }

    onMount(async () => {
        await fullFetch();
        role = $userStore.role;
    });

    function fullFetch() {
        Promise.all([fetchStatuses(), fetchTests(), fetchModules()])
            .then(([fetchedStatuses, fetchedTests, fetchedModules]) => {
                statuses = fetchedStatuses;
                modules = fetchedModules;

                const modulePromises = fetchedTests.map(element =>
                    fetchRequest('testmodule/test/' + element.testid)
                        .then(async (result) => {
                            element.modules = result.map(item => item.moduleid);

                            const weightReturn = await fetchRequest('test/' + element.testid + "/weight");
                            element.weight = weightReturn.sum;
                            return element;
                        })
                );
                return Promise.all(modulePromises);
            }).then(async (allTests) => {
            let alteredTests = [];
            if (sprintId) {
                const query = generateQuery('testing', ['sprintid', 'statusid'], [sprintId, arrayToString(statusOptions)]
                    , ['Equals', 'Equals'], 'testid,statusid')
                const sprintData = await fetchRequest(addCombinatoryOption(query));
                const filteredTests = allTests.filter(item => sprintData.some(({testid}) => testid === item.testid));
                alteredTests = filteredTests.map(item2 => {
                    const matchingEntry = sprintData.find(item1 => item1.testid === item2.testid);
                    if (matchingEntry) {
                        return {...item2, statusid: matchingEntry.statusid};
                    } else {
                        return item2;
                    }
                });
            } else {
                alteredTests = allTests;
            }
            return alteredTests
        }).then(async (updatedTests) => {
            const fetchAssignees = updatedTests.map(async (test) => {
                if (sprintId) {
                    const assignee = await fetchRequest('testing/' + sprintId + '/assignee/' + test.testid);
                    if (assignee.email === "null") {
                        test.assignee = 'Unassigned';
                    } else {
                        test.assignee = assignee.email;
                    }
                }
            });

            await Promise.all(fetchAssignees);

            return updatedTests;
        })
            .then(updatedTests => {
                if (weightOrder) {
                    updatedTests.sort((a, b) => a.weight - b.weight)
                }
                if (reverseTests) {
                    updatedTests.reverse();
                }
                fullTests = updatedTests;

                reverseTestArray();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    async function fetchTests() {
        let moduleIdsArray = [];
        if (moduleOptions.length !== 0) {
            moduleIdsArray = await fetchTestIds();
        }
        const queryProperties = ['testid', 'name'];
        const queryParams = [arrayToString(moduleIdsArray), searchBarValue];

        const querySettings = ["Equals", "Includes"];
        let query = generateQuery('test', queryProperties, queryParams, querySettings);
        return await fetchRequest(query);
    }

    async function fetchTestIds() {
        let testIdQuery;
        testIdQuery = generateQuery('testmodule', ['moduleid'], [arrayToString(moduleOptions)], ['Equals']);
        const result = await fetchRequest(testIdQuery);
        return result.map(item => item.testid);
    }

    function fetchStatuses() {
        return fetchRequest('status').then((result) => {
            return new Map(result.map(status => [status.name, status.statusid]));
        }).catch((e) => {
            throw e;
        })
    }

    function fetchModules() {
        return fetchRequest('module').then((result) => {
            return new Map(result.map(module => [module.moduleid, module.label]));
        }).catch((e) => {
            throw e;
        })
    }

    function reverseTestArray() {
        reverseTests = !reverseTests;
        if (reverseTests) {
            fullTests = fullTests.sort((a, b) => a.testid - b.testid);
        } else {
            fullTests = fullTests.sort((a, b) => b.testid - a.testid);
        }
    }

    function orderByWeight() {
        weightOrder = !weightOrder;
        if (weightOrder) {
            fullTests = fullTests.sort((a, b) => a.weight - b.weight);
        } else {
            fullTests = fullTests.sort((a, b) => b.weight - a.weight);
        }
    }

    let checkboxes = [];

    function checkAll() {
        checkboxes.forEach((checked) => true);
    }

    function getImage(test) {
        let imgSrc = "../src/assets/TestStatusIcons/Awaiting.png";

        if (!statuses || !test.statusid) return;
        if (test.statusid === statuses.get('Blocker')) {
            imgSrc = "../src/assets/TestStatusIcons/Blocker.png"
        } else if (test.statusid === statuses.get('Passed')) {
            imgSrc = "../src/assets/TestStatusIcons/Successful.png"
        } else if (test.statusid === statuses.get('Bug')) {
            imgSrc = "../src/assets/TestStatusIcons/Bug.png"
        } else {
            imgSrc = "../src/assets/TestStatusIcons/Awaiting.png"
        }

        return imgSrc;
    }

    let isFlippedID = false;
    let isFlippedWeight = false;

    const toggleRotateID = () => {
        isFlippedID = !isFlippedID;
    };

    const toggleRotateWeight = () => {
        isFlippedWeight = !isFlippedWeight;
    };

    const openTestPage = (id) => {
        console.log(sprintId);
        if (sprintId) {
            router("/projects/" + sprintId + "/test/" + id);
        } else {
            router("/tests/" + id);
        }
    }

    const changeStatus = async (test) => {
        await fetchRequest('testing/' + sprintId + "/status/" + test.testid + "?combinatory=true", 'put', {statusid: test.statusid});
        console.log('status id for test: ' + test.testid + ', changed to:', test.statusid);
        fullFetch();
    }
</script>

<div class="card mt-5 mb-5">
    <div class="card-header">
        <div class="row align-items-center">
            <div class="col">
                <div class="input-group input-group-flush input-group-merge input-group-reverse">
                        <span class="search-icon input-group-text"><i class="bi bi-search"
                                                                      on:click={fullFetch}></i></span>
                    <input class="form-control list-search" type="text" placeholder="Search"
                           bind:value={searchBarValue} on:input={fullFetch}>
                </div>
            </div>
            <div class="col-auto">
                {#if generalTable}
                    {#if role === 'admin' || role === 'developer'}
                        <a class="btn btn-primary" href="/addtest">
                            Add Test
                        </a>
                    {/if}
                {:else}
                    <div class="dropdown">

                        <button class="btn filter" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside"
                                aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-sliders"></i> Filter <span
                                class="badge bg-primary ms-1">{statusOptions.length}</span>
                        </button>

                        <form name="formSelect" class="dropdown-menu dropdown-menu-end dropdown-menu-card mt-2">

                            <div class="card-header">
                                <h4 class="">Filters</h4>
                            </div>

                            <div class="card-body">

                                <div class="list-group list-group-flush mt-n4 mb-4">
                                    <div class="list-group-item">
                                        <div class="row">
                                            <div class="col">

                                                <h6>Status</h6>

                                            </div>
                                            <div class="col-auto">
                                                {#if statuses}
                                                    {#each Array.from(statuses.entries()) as [statusName, statusId]}
                                                        <label class="form-check-label" for="{statusId}"><input
                                                                id={statusId} type="checkbox" class="form-check-input"
                                                                on:change={(e) => handleCheckboxChange(e, statusId)}>{statusName}
                                                        </label>
                                                    {/each}
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </form>

                    </div>
                {/if}

            </div>
        </div>
    </div>

    <div class="card mb-5">
        <div class="card-header">

        </div>

        <div class="card-body modules">
            <div class="row">
                {#each moduleOptions as option}
                    <div class="module" class:chosen-module={moduleOptions.includes(option)}>
                        <div class="text-container" on:click|stopPropagation={() => {handleModuleClick(option)}}>
                            {modules.get(option)}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="scrollable-div">
        <table class="table custom-table">

            <thead>
            <tr>

                <th scope="col" class="order-header" on:click={toggleRotateID} on:click={reverseTestArray}>
                    ID
                    <img class:rotated={isFlippedID} class="small-img" src="../src/assets/arrow-down-white.png"
                         alt="order button image">
                </th>
                <th scope="col">Title</th>
                <th scope="col">Modules</th>
                {#if !generalTable}
                    <th scope="col">Status</th>
                    <th scope="col">Assignee</th>
                {/if}
                <th scope="col" class="order-header" on:click={toggleRotateWeight} on:click={orderByWeight}>Weight
                    <img class:rotated={isFlippedWeight} class="small-img" src="../src/assets/arrow-down-white.png"
                         alt="order button image">
                </th>
            </tr>
            </thead>

            <tbody>
            {#if fullTests || statuses}
                {#each fullTests as test, i}
                    <tr class="test-page" on:click={openTestPage(test.testid)}>

                        <td>
                            {test.testid}
                        </td>
                        <td>{test.name}</td>
                        <td>
                            {#if test.modules && modules}
                                {#each test.modules as module}
                                    <div class="module" class:chosen-module={moduleOptions.includes(module)}>
                                        <div class="text-container"
                                             on:click|stopPropagation={() => {handleModuleClick(module)}}>
                                            {modules.get(module)}
                                        </div>
                                    </div>
                                {/each}
                            {/if}
                        </td>
                        {#if !generalTable}
                            <td>
                                <div class="row" on:click|stopPropagation>
                                    <div class="col-5">
                                        <img src={getImage(test)} alt="status of test case">
                                    </div>
                                    <div class="col-7">
                                        <select bind:value={test.statusid} on:change={changeStatus(test)}
                                                class="form-select form-select-md bg-dark">
                                            {#each Array.from(statuses.entries()) as [statusName, statusId]}
                                                <option value="{statusId}">
                                                    {statusName}
                                                </option>
                                            {/each}
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>{test.assignee}</td>
                        {/if}
                        <td>{test.weight}</td>
                    </tr>
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td>
                        No tests here yet.
                    </td>
                </tr>
            {/if}
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