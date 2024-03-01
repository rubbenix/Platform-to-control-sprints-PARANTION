<script>
    import {onMount} from "svelte";
    import {fetchRequest} from "../lib/Request.js";
    import router from "page";

    let assigneeEmail;
    let userId;
    let sprintId;
    let selectedModules = [];
    let modules = [];
    let selectedModulesArray=[];
    export let dueDate;
    export let testId;
    let users = [];

    async function fetchData() {
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        sprintId = parts[parts.length - 3];
        if (sprintId) {
            const result = await fetchRequest('testing/' + sprintId + '/assignee/' + testId);
            assigneeEmail = result.email;
        }

        modules = await fetchRequest('module');
        selectedModulesArray = await fetchRequest('test/'+testId+'/module')
        users = await fetchRequest('users/allUsernames');
        console.log(modules);
        selectedModules = [];

        selectedModulesArray.forEach(selectedModule => {
            const { moduleid } = selectedModule;
            const moduleDetails = modules.find(module => module.moduleid === moduleid);
            if (moduleDetails) {
                selectedModules.push({ ...moduleDetails });
            }
        });
        console.log('Selected Modules:', selectedModules);
        console.log(selectedModules.some(module => module.moduleid === modules[0].moduleid));
    }

    async function changeAssignee() {
        const body = {
            userid: userId,
        };
        await fetchRequest('testing/' + sprintId + '/assignee/' + testId, 'PUT', body)
        await fetchData();
    }

    async function handleModuleClick(module) {
        if(selectedModules.some((selected) => selected.moduleid === module.moduleid)){
            await fetchRequest('test/'+testId+'/module/'+module.moduleid+'?combinatory=true','DELETE')

        }else if (modules.some((selected) => selected.moduleid === module.moduleid)){
            const body={
                moduleid: module.moduleid,
                testid: testId
            }
            await fetchRequest('test/'+testId+'/module/','POST',body)
        }

        const index = selectedModules.map(m => m.moduleid).indexOf(module.moduleid);

        if (index !== -1) {
            selectedModules.splice(index, 1);
            selectedModules = selectedModules;
        } else {
            selectedModules = [...selectedModules, module];
        }
        console.log('Selected modules: ', selectedModules);
    }

    onMount(async () => {
        await fetchData();
        console.log('Selected modules: ', selectedModules);
        console.log('Modules: ', modules);
    });
</script>

<div class="right-constant-bar">
    {#if sprintId}
        <div class="assignee-info">
            <p> Assignee: {assigneeEmail}</p>
            <select bind:value={userId} on:change={changeAssignee}
                    class="form-select form-select-sm bg-dark">
                <option value="-1">Unassigned</option>
                {#each users as {email, userid}}
                    <option value="{userid}">
                        {email}
                    </option>
                {/each}
            </select>
        </div>

        <div class="due-date">
            <p>Due Date: {dueDate}</p>
        </div>
    {/if}
    <span class="select-span">Modules</span>

    <div class="scrollable-div-right mt-3">
        {#each modules as module (module.moduleid)}
            <div class="module" class:chosen-module={selectedModules.some((selected) => selected.moduleid === module.moduleid)}>
                <div class="text-container"
                     on:click|stopPropagation={() => {handleModuleClick(module)}}>
                    {module.label}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .right-constant-bar {

        position: fixed;
        z-index: 11;
        top: 66px;
        right: 0;
        height: 100vh;
        width: 15%;
        color: #ffffff;

        background-color: #25252b;
        overflow-y: auto;
    }

    .assignee-info {
        align-items: center;
        margin-bottom: 20px;
        text-align: center;

    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .due-date {
        text-align: center;
    }

    .form-select-sm {
        /*width: 60%;*/
        cursor: pointer;
        border: none;
        background-color: #2e2e36 !important;
        color: #b3b3b3;
    }

    .form-select-sm:hover {
        background-color: #45454f !important;
        color: white;
    }

    .form-select-sm:focus {
        box-shadow: none;
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
    .module {
        margin-bottom: 3px;
        cursor: pointer;
        background-color: #2e2e36;
        border-radius: 0.5rem;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        color: #b3b3b3;
    }

    .module:hover {
        background-color: #3a3a44;
        color: white;
    }
    .text-container {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .chosen-module {
        background: #593fe4;
        color: white !important;
    }

    .chosen-module:hover {
        background: #6f58ee !important;
    }
</style>