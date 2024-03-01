<script>
    import TestCaseDetailsComponent from '../components/TestCaseDetailsComponent.svelte';
    import RightConstantBar from '../components/RightConstantBar.svelte';
    import router from "page";

    // export let params;

    // let testId = params && params.id !== undefined ? params.id : null;
    const currentRoute = router.current;
    const parts = currentRoute.split('/');
    let testId = parts[parts.length - 1];
    let selectedStep=null;
</script>


{#if testId}
    <div class="container">
        <div class="main-content">
            <TestCaseDetailsComponent {testId} bind:selectedStep={selectedStep}/>
        </div>
        <RightConstantBar {testId}/>
    </div>
{:else}
    <p>No test case selected.</p>
{/if}

<style>
    .container {
        display: flex;
    }

    .main-content {
        margin-top: 80px;
        margin-right: 15%;
        width: 50%;
        flex-grow: 1;
        padding: 20px;
        color: white;
    }
</style>