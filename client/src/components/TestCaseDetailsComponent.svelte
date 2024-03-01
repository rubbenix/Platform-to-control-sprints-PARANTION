<script>
    import {onDestroy, onMount} from "svelte";
    import {fetchRequest} from "../lib/Request.js";
    import router from "page";
    import CommentsSection from "./Comments.svelte";
    import userStore from "../stores/userStore.js";

    export let testId;
    export let selectedStep = null;
    let testCaseName;
    let showAddTeststepPopup = false;
    let notificationMessage='';
    let testSteps = [];
    let newTeststep = {
        stepnr: "",
        title: "",
        weight: "",
        testlog: "",
        completion: ""
    };
    let attachments = [];
    let selectedAttachmentIndex = null;

    function handleImageClick(index) {
        selectedAttachmentIndex = index;
    }

    function handleCloseZoom() {
        selectedAttachmentIndex = null;
    }

    onDestroy(() => (selectedAttachmentIndex = null));

    async function fetchAll() {
        await fetchTestSteps();
        sortSteps();
    }

    async function fetchTestSteps() {
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        let testId = parts[parts.length - 1];

        await new Promise(resolve => setTimeout(resolve, 100));

        testSteps = await fetchRequest('test/' + testId + '/teststeps');
        testCaseName = await fetchRequest('test/' + testId + '/');
        testCaseName = testCaseName[0].name;

        await new Promise(resolve => setTimeout(resolve, 100));


        const response = await fetchRequest('test/' + testId + '/teststeps');
        testSteps = response;
        testSteps.forEach(function (step, index) {
            if (step.completion) {
                testSteps[index].completion = "true";
            } else {
                testSteps[index].completion = "false";
            }
        });
        console.log(testSteps);
        console.log(testCaseName)
    }

    onMount(async () => {
        const pathArray = window.location.pathname.split('/');
        testId = parseInt(pathArray[pathArray.indexOf('tests') + 1], 10);
        await fetchAll();
    });

    async function handleStepClick(step) {
        selectedStep = selectedStep === step ? null : step;
        console.log("Selected step:", selectedStep);

        await fetchAttachments();
    }

    async function fetchAttachments() {
        if (selectedStep) {
            const response = await fetchRequest(`test/${testId}/teststeps/${selectedStep.stepid}/attachment`);

            attachments = await response;
            console.log(attachments);
        }
    }

    function handleStepCompletionChange(step) {
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        let testId = parts[parts.length - 1];

        let completionBool = step.completion === "true";
        const body = {
            completion: (completionBool)
        };

        fetchRequest('test/' + testId + '/teststeps/' + step.stepid + '?combinatory=true', 'PUT', body)

    }

    async function addTestStep() {
        if (!newTeststep.title){
            showNotification('Title must be not null')
            return;
        } if (!newTeststep.stepnr){
            showNotification('Step number must be not null')
            return;
        }   if (newTeststep.stepnr<1){
            showNotification('Step number must be a positive number')
            return;
        }    if (!newTeststep.weight){
            showNotification('Weight must be not null')
            return;
        }   if (newTeststep.weight<1){
            showNotification('Weight must be a positive number')
            return;
        }    if (!newTeststep.testlog){
            showNotification('Testlog must be not null')
            return;
        }
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        let testId = parts[parts.length - 1];
        showAddTeststepPopup = false;
        const teststep = {
            testid: testId,
            stepnr: newTeststep.stepnr,
            title: newTeststep.title,
            weight: newTeststep.weight,
            testlog: newTeststep.testlog,
            completion: 'false'
        };
        await fetchRequest('test/' + testId + '/teststeps', 'POST', teststep);

        await fetchAll();

        newTeststep = {
            stepnr: "",
            title: "",
            weight: "",
            testlog: ""
        };

    }
    function showNotification(message) {
        notificationMessage = message;
        setTimeout(() => {
            notificationMessage = '';
        }, 5000);
    }
    function editPage() {
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        let testId = parts[parts.length - 1];
        router('/tests/' + testId + '/edit');
    }

    let isFlippedID = false;

    function reverseStepArray() {
        isFlippedID = !isFlippedID;
        sortSteps();
    }

    function sortSteps() {
        if (!isFlippedID) {
            testSteps = testSteps.sort((a, b) => a.stepnr - b.stepnr);
        } else {
            testSteps = testSteps.sort((a, b) => b.stepnr - a.stepnr);
        }
    }

</script>

<div class="test-case-details">
    <h1>{testCaseName}</h1>
    {#if $userStore.role === 'admin'}
        <button class="btn btn-warning top-btn" on:click={editPage}>Edit <i class="bi bi-pencil-fill"></i></button>
        <button class="btn top-btn" class:btn-primary={!showAddTeststepPopup}
                class:btn-secondary={showAddTeststepPopup}
                on:click={() => showAddTeststepPopup = !showAddTeststepPopup}>
            {#if !showAddTeststepPopup}
                Add Test Step
            {:else}
                Dismiss
            {/if}
        </button>
    {/if}

    <div class="mt-3">  <!--scrollable-div-->
        <table class="table custom-table">
            <thead>
            <tr>
                <th scope="col" class="order-header" on:click={reverseStepArray}>
                    ID
                    <img class:rotated={isFlippedID} class="small-img" src="/src/assets/arrow-down-white.png"
                         alt="order button image">
                </th>
                <th>Name</th>
                <th>Weight</th>
                <th>Test Log</th>
                <th>Completion State</th>
            </tr>
            </thead>

            <tbody>
            {#if testSteps.length > 0}
                {#each testSteps as step}
                    <tr id={`step-${step.stepid}`} on:click={() => handleStepClick(step)}
                        class:active={selectedStep === step}>
                        <td>{step.stepnr}</td>
                        <td>{step.title}</td>
                        <td>{step.weight}</td>
                        <td>{step.testlog}</td>
                        <td on:click|preventDefault|stopPropagation>
                            <select bind:value={step.completion} on:change={handleStepCompletionChange(step)}
                                    class="form-select form-select-md bg-dark">
                                <option value="true">Completed</option>
                                <option value="false">Incomplete</option>
                            </select>
                        </td>
                    </tr>
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="5">
                        There are no steps yet.
                    </td>
                </tr>
            {/if}

            </tbody>
        </table>
    </div>

    <div class="popup" style="{showAddTeststepPopup ? 'display: block;' : 'display: none;'}">

        <span class="close-button" on:click={() => showAddTeststepPopup = false}>&times;</span>

        <label for="name">Name:</label>
        <input id="name" type="text" bind:value={newTeststep.title}/>

        <label for="stepnr">Step number:</label>
        <input id="stepnr" type="text" bind:value={newTeststep.stepnr}/>

        <label for="weight">Weight:</label>
        <input id="weight" type="text" bind:value={newTeststep.weight}/>

        <label for="testlog">Testlog:</label>
        <input id="testlog" type="text" bind:value={newTeststep.testlog}/>

        <div id="notification" class="error-text">{notificationMessage}</div>
        <button class="add-teststep-button" on:click={addTestStep}>Add a new Test step</button>
    </div>

    <div class="attachments-container">
        {#each attachments as attachment}
            <div class="attachment" on:click={() => handleImageClick(attachment.attachmentid)}>
                <img src={"http://localhost:3000/test/"+testId+"/teststeps/"+selectedStep.stepid+"/attachment/"+attachment.attachmentid}
                     alt="Attachment" class="images"/>
            </div>
        {/each}

        {#if selectedAttachmentIndex !== null}
            <div class="zoom-overlay" on:click={handleCloseZoom}>
                <div class="zoom-content">
                    <img src={"http://localhost:3000/test/"+testId+"/teststeps/"+selectedStep.stepid+"/attachment/"+selectedAttachmentIndex}
                         alt="Zoomed Attachment"/>
                </div>
            </div>
        {/if}
    </div>

    <CommentsSection {testId} {selectedStep} {fetchAll}/>
</div>

<style>

    .popup {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #2e2e36;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index: 999;
        color: white;
    }

    .popup label {
        margin-top: 10px;
        display: block;
        font-weight: bold;
    }

    .popup input {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        box-sizing: border-box;
    }

    .popup button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px;
        cursor: pointer;
        margin-top: 10px;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        color: #fff;
    }

    .add-teststep-button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 15px;
        margin: 5px;
        cursor: pointer;
        border-radius: 5px;
    }

    .add-teststep-button {
        background-color: #0056b3;
    }

    .attachments-container {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
    }

    .attachment {
        margin-right: 10px;
        cursor: pointer;
        display: inline-block;

    }

    .zoom-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1000;
    }

    .zoom-content {
        margin: auto;
        max-width: 80%;
        max-height: 80%;
    }

    .zoom-content img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .top-btn {
        margin: 1rem;
    }

    .btn-warning:hover {
        background-color: #d3aa11;
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

    .form-select-md {
        /*width: 60%;*/
        cursor: pointer;
        border: none;
        background-color: #1d1d21 !important;
        color: #b3b3b3;
    }

    .form-select-md:hover {
        background-color: #45454f !important;
        color: white;
    }

    .form-select-md:focus {
        box-shadow: none;
    }

    .images {
        min-height: 150px;
        min-width: 130px;
        max-width: 200px;
        max-height: 200px;
    }
    .error-text {
        color: red;
        border-color: red;
        border-width: 2px;
    }
</style>