<script>
    import {onMount} from 'svelte';
    import {fetchRequest} from "../lib/Request.js";
    import {isBlank} from "../lib/Utils.js";

    let testName = '';
    let description = '';
    let selectedSprints = []; // Array to store selected sprints
    let selectedModules = []; // Array to store selected modules
    let sprints = [];
    let modules = [];
    let successMessage = ''; // Added success message state

    onMount(async () => {
        try {
            sprints = await fetchRequest('sprint');
            modules = await fetchRequest('module');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    async function addTest() {
        event.preventDefault()

        if(isBlank(testName)) {
            const nameInput = document.getElementById('name');
            const errorMessage = document.getElementById('name-error');
            nameInput.style.borderColor = 'red';
            errorMessage.textContent = 'Name must not be empty';
            console.log("Name is empty")
            return;
        }

        await POSTtest();
        await Promise.all(selectedSprints.map(async sprintid => await POSTtesting(sprintid.sprintid)));
        await Promise.all(selectedModules.map(async moduleId => await POSTmodule(moduleId.moduleid)));
        const errorMessage = document.getElementById('name-error');
        errorMessage.textContent = '';
        resetForm();
        successMessage = 'Test added successfully!';
        setTimeout(() => {
            successMessage = '';
        }, 2000);
    }

    async function POSTtest() {
        let testData;

        testData = {
            name: testName,
            description: description
        };

        await fetchRequest('test', 'POST', testData);
    }

    async function POSTtesting(sprintid) {
        let testingData;
        let latestid = await getLatestID();

        if (selectedSprints.length === 0) {
            return;
        }

        testingData = {
            sprintid: sprintid,
            testid: latestid,
        };
        console.log('Sprint data: ', testingData.sprintid);
        console.log('Testing Data:', testingData);

        await fetchRequest('testing', 'POST', testingData);
    }

    async function POSTmodule(moduleId) {
        if (!moduleId) {
            console.log('No module selected.');
            return;
        }
        let testid = await getLatestID();

        let moduleData = {
            testid: testid,
            moduleid: moduleId
        };

        await fetchRequest('testmodule', 'POST', moduleData);
    }

    async function getLatestID() {
        try {
            const response = await fetchRequest('test');
            if (response.length > 0) {
                const sortedTests = response.sort((a, b) => b.testid - a.testid);
                return sortedTests[0].testid;
            } else {
                console.error('Failed to fetch tests or no tests available.');
            }
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    }

    function resetForm() {
        testName = '';
        description = '';
        selectedSprints = [];
        selectedModules = [];
    }

    function handleModuleClick(module) {
        const index = selectedModules.indexOf(module);
        if (index !== -1) {
            selectedModules.splice(index, 1);
            selectedModules = selectedModules;
        } else {
            selectedModules = [...selectedModules, module];
        }
        console.log('modules: ', selectedModules);
    }

    function handleSprintClick(sprint) {
        const index = selectedSprints.indexOf(sprint);
        if (index !== -1) {
            selectedSprints.splice(index, 1);
            selectedSprints = selectedSprints;
        } else {
            selectedSprints = [...selectedSprints, sprint];
        }
        console.log('sprints: ', selectedSprints);
    }
</script>

<main>
    <div class="container">
        <form>
            <h1 class="mb-5">Add Test</h1>

            <div class="form-group row mt-4">
                <label for="name" class="col-2 col-form-label">Name</label>
                <div class="col-10">
                    <input type="text" class="form-control dark-text" id="name" placeholder="Name"
                           autocomplete="off" required bind:value={testName}>
                    <div id="name-error" class="error-message"></div>
                </div>
            </div>

            <div class="form-group row">
                <label for="description" class="col-2 col-form-label">Description</label>
                <div class="col-10">
                    <textarea class="form-control dark-text" id="description"
                              placeholder="Description" autocomplete="off" required rows="3"
                              bind:value={description}></textarea>
                </div>
            </div>

            <hr class="mt-5 mb-5 border">

            <div class="form-group row">
                <div class="col-2"></div>

                <div class="col-3">
                    <span class="select-span">Sprints</span>

                    <div class="scrollable-div mt-3">
                        {#each sprints as sprint (sprint.sprintid)}
                            {#if sprint.sprintid !== undefined}
                                <div class="sprint" class:chosen-sprint={selectedSprints.includes(sprint)}>
                                    <div class="text-container"
                                         on:click|stopPropagation={() => {handleSprintClick(sprint)}}>
                                        {sprint.title}
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>

                </div>

                <div class="col-2">
                    <div class="vr"></div>
                </div>

                <div class="col-3">
                    <span class="select-span">Modules</span>

                    <div class="scrollable-div-right mt-3">
                        {#each modules as module (module.moduleid)}
                            <div class="module" class:chosen-module={selectedModules.includes(module)}>
                                <div class="text-container"
                                     on:click|stopPropagation={() => {handleModuleClick(module)}}>
                                    {module.label}
                                </div>
                            </div>
                        {/each}
                    </div>

                </div>

                <div class="col-2"></div>
            </div>

            <button on:click|stopPropagation|preventDefault={addTest} class="btn btn-primary mt-5 add-btn">
                Add Test
            </button>
        </form>
        {#if successMessage}
            <div class="success-message">{successMessage}</div>
        {/if}
    </div>
</main>

<style>
    .success-message {
        background-color: #4CAF50;
        opacity: 0.8;
        color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-top: 1rem;
        font-size: 1rem;
    }

    main {
        color: white;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .scrollable-div {
        max-height: 8rem;
        overflow-y: auto;
        border-radius: 1rem;
    }

    .scrollable-div-right {
        max-height: 8rem;
        overflow-y: auto;
        border-radius: 1rem;
    }

    .scrollable-div:hover {
    }

    .scrollable-div::-webkit-scrollbar, .scrollable-div-right::-webkit-scrollbar {
        width: 5px;
    }

    .scrollable-div::-webkit-scrollbar-track, .scrollable-div-right::-webkit-scrollbar-track {
        background: rgba(179, 179, 179, 0.3);
        border-radius: 10px;
    }

    .scrollable-div::-webkit-scrollbar-thumb, .scrollable-div-right::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    }

    hr {

    }

    .error-message {
        color: red;
        font-size: 12px;
        margin-top: 5px;
    }
    .form-check-input:checked + .form-check-label {
        color: #ffffff;
    }

    .unselectable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .text-left {
        text-align: left;
    }

    .text-right {
        text-align: right;
    }

    .select-span {
        font-size: 18px;
    }

    .vr {
        min-height: 10rem;
    }

    .dark-text {
        background-color: #25252b;
        color: #fff;
        border-radius: 4px;
        border: none;
    }

    .module, .sprint {
        margin-bottom: 3px;
        cursor: pointer;
        background-color: #2e2e36;
        border-radius: 0.5rem;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        color: #b3b3b3;
    }

    .module:hover, .sprint:hover {
        background-color: #3a3a44;
        color: white;
    }

    .chosen-module {
        background: #593fe4;
        color: white !important;
    }

    .chosen-module:hover {
        background: #6f58ee !important;
    }

    .chosen-sprint {
        background: #288521;
        color: white !important;
    }

    .chosen-sprint:hover {
        background: #319f29 !important;
    }

    .text-container {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .add-btn {
        width: 20rem;
    }
</style>
