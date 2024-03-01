<script>
    import {onMount} from "svelte";
    import router from "page";
    import userStore from "../stores/userStore.js";
    import {DateInput} from 'date-picker-svelte';
    import {fetchRequest} from "../lib/Request.js";

    export let params;
    let sprintid = params.id;
    let oldSprintId;
    let email = $userStore ? $userStore.email : null;
    let sprint = [];
    let title;
    let startDate;
    let dueDate;
    let successMessage = ''; // Added success message state
    let incorrectData = false;


    async function getSprintById() {
        const path = `sprint/${sprintid}`;
        const response = await fetchRequest(path, 'GET');
        sprint = response;
        console.log("Sprint:", sprint);
    }


    onMount(async () => {
        const currentRoute = router.current;
        const parts = currentRoute.split('=');
        const oldSprintIdResult = parts[parts.length - 1];
        oldSprintId = oldSprintIdResult;

        if (sprintid && sprintid !== 'new') {
            await getSprintById(sprintid);
            if (sprint.length > 0) {
                title = sprint[0].title;
                startDate = new Date(sprint[0].startdate);
                dueDate = new Date(sprint[0].duedate);
            }
        } else {
            sprint = [{
                sprintId: 0,
                title: "",
                startdate: "",
                duedate: ""
            }];
            title = sprint[0].title;
            startDate = new Date();
            dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 7); // default + 1 week

            sprint[0].startdate = formatDate(startDate);
            sprint[0].duedate = formatDate(dueDate);
        }
        console.log("Title:", title);
        console.log("StartDate:", startDate);
        console.log("DueDate:", dueDate);
    });

    async function editSprint(sprintid, sprintInfo) {
        const path = `sprint/${sprintid}`;

        // Use fetchRequest from Request.js
        const response = await fetchRequest(path, 'PUT', sprintInfo);
        console.log(response);
    }

    async function addNewSprint(sprintInfo) {
        console.log("Old spruitn",sprintInfo);
        if(!isNaN(oldSprintId)) {
            await fetchRequest('sprint/' + oldSprintId,'POST', sprintInfo)
        } else {
            await fetchRequest('sprint/', 'POST', sprintInfo)
        }
    }

    function checkInputs() {
        let stringInputs = [title, startDate, dueDate];

        let index = 0;

        for (const input of stringInputs) {
            if (!isValidString(input)) {
                console.log(stringInputs[index]);
                console.log(`Index: ${index}`)
                index++;
                return false;
            }
        }
        return true;
    }

    function formatDate(date) {
        let start = new Date(date);
        return start.getDate() + '-' + (start.getMonth() + 1) + '-' + start.getFullYear();
    }

    async function submitNewInfo() {
        if (checkInputs()) {
            incorrectData = false;
            let sprintInfo = {
                title: title,
                startDate: startDate,
                dueDate: dueDate
            }

            if (sprintid && sprintid !== 'new') {
                await editSprint(sprintid, sprintInfo);
            } else {
                await addNewSprint(sprintInfo);
            }

            router(`/projects`);
        } else {
            incorrectData = true;
        }
    }

    function isValidString(string) {
        return string !== undefined && string !== null && string !== "";
    }


    let logoImageLink;

</script>

<main>
    <div class="container">

        {#if sprint && sprintid !== undefined}

            <form>
                <h1 class="mb-5">
                    {#if sprintid && sprintid !== 'new'}
                        Edit Sprint
                    {:else if oldSprintId !== undefined}
                        Restart Sprint
                    {:else}
                        Add Sprint
                    {/if}
                </h1>

                {#if incorrectData}
                    <span class="error-text">Incorrect Inputs</span>
                {/if}

                <div class="form-group row mt-4 mb-5">
                    <label for="name" class="col-2 col-form-label">Title</label>
                    <div class="col-10">
                        <input type="text" class="form-control dark-text" id="name" placeholder="Name"
                               autocomplete="off" required bind:value={title} class:error-input={incorrectData}>
                    </div>
                </div>

                <div class="form-group row mt-5">
                    <div class="col-5">
                        <div class="row">
                            <label for="startDate" class="col-6 col-form-label">Start date</label>
                            <div class="col-6 date">
                                <DateInput bind:value={startDate} format="yyyy-MM-dd"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-2">
                        <div class="vr"></div>
                    </div>

                    <div class="col-5">
                        <div class="row">
                            <label for="dueDate" class="col-6 col-form-label">Due date</label>
                            <div class="col-6 date">
                                <DateInput bind:value={dueDate} format="yyyy-MM-dd"/>
                            </div>
                        </div>
                    </div>
                </div>


                <button on:click|stopPropagation|preventDefault={submitNewInfo} class="btn btn-primary mt-5 add-btn">
                    {#if sprintid && sprintid !== 'new'}
                        Edit Sprint
                    {:else}
                        Add Sprint
                    {/if}
                </button>
            </form>

        {:else }
            <p class="no-sprint-message">No sprint found!</p>
        {/if}

        {#if successMessage}
            <div class="success-message">{successMessage}</div>
        {/if}
    </div>
</main>

<style>

    body {
        color: white;
    }

    :global(body) {
        --date-picker: ;
        --date-picker-foreground: #f7f7f7;
        --date-picker-background: #16171c;
        --date-picker-highlight-border: hsl(var(--deg), 98%, 49%);
        --date-picker-highlight-shadow: hsla(var(--deg), 98%, 49%, 50%);
        --date-picker-selected-color: hsl(var(--deg), 100%, 85%);
        --date-picker-selected-background: hsla(var(--deg), 98%, 49%, 20%);
        transition: all 80ms ease-in-out;
    }

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

    .vr {
        min-height: 2rem;
    }

    .dark-text {
        background-color: #25252b;
        color: #fff;
        border-radius: 4px;
        border: none;
    }

    .add-btn {
        width: 20rem;
    }

    .error-text {
        color: red;
        font-size: 14px;
    }

    .error-input {
        border-color: red !important;
        border-width: 2px !important;
    }
</style>
