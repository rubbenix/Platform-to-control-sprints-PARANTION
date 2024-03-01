<script>
    import router from 'page';
    import TestCaseOverview from './pages/TestCaseOverview.svelte'
    import Header from "./components/Header.svelte";
    import {tokenStore} from "../src/stores/TokenStore.js";

    import Sidebar from "./components/Sidebar.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import TestCaseDetails from "./pages/TestCaseDetails.svelte";
    import Login from "./pages/Login.svelte";
    import SprintDetail from "./pages/SprintDetail.svelte";
    import Sprints from "./pages/Sprints.svelte";
    import Notifications from "./pages/Notifications.svelte";
    import AccountManager from "./pages/AccountManager.svelte";
    import Modules from "./pages/Modules.svelte";
    import addTest from "./pages/addTest.svelte";
    import EditTestCasePage from "./pages/EditTestCasePage.svelte";

    const token = $tokenStore.token;
    let page;
    let params;
    let currentRoute;

    router('/', (ctx) => {
        page = Login;
        currentRoute = ctx.pathname;
    });

    router('/testCases', (ctx) => {
        page = TestCaseOverview;
        currentRoute = ctx.pathname;
    });
    router('/header', (ctx) => {
        page = Header;
        currentRoute = ctx.pathname;
    });
    router('/notifications', (ctx) => {
        page = Notifications;
        currentRoute = ctx.pathname;
    });

    router('/projects/:sprintid/test/:id', (ctx) => {
        page = TestCaseDetails;
        params = ctx.params;
        currentRoute = ctx.pathname;
    });

    router('/addTest', (ctx) => {
        page = addTest;
        currentRoute = ctx.pathname;
    });

    router('/tests/:id', (ctx) => {
        page = TestCaseDetails;
        params = ctx.params;
        currentRoute = ctx.pathname;
    });

    router('/projects', (ctx) => {
        page = Sprints;
        currentRoute = ctx.pathname;
    });
    router('/projects/:id', (ctx) => {
        page = Dashboard;
        params = ctx.params;
        currentRoute = ctx.pathname;
    });
    router('/SprintDetail', (ctx) => {
        if (ctx.querystring === 'new') {
            page = SprintDetail;
            params = {id: 'new'};
        } else {
            page = Sprints;
        }
        currentRoute = ctx.pathname;
    });
    router('/SprintDetail/:id', (ctx) => {
        page = SprintDetail;
        params = ctx.params;
        currentRoute = ctx.pathname;
    });
    router('/account', (ctx) => {
        page = AccountManager;
        params = ctx.params;
        currentRoute = ctx.pathname;
    });

    router('/modules', (ctx) => {
        page = Modules;
        params = ctx.params;
        currentRoute = ctx.pathname;
    });


    router('/tests/:id/edit', (ctx) => {
        page = EditTestCasePage;
        params = ctx.params;
        currentRoute = ctx.pathname;
    });

    router.start();
</script>
<svelte:head>
    <title>{" Regression test management"}</title>
</svelte:head>

<main>
    <!--{#if !token}-->
    <!--    {router(`/`)}-->
    <!--{/if}-->
    {#if currentRoute === '/'}
        <div class="main">
            <div class="page">
                <svelte:component this={page} {params}/>
            </div>
        </div>
    {:else}
        <Header active={currentRoute}/>
        <div class="main">
            <Sidebar active={currentRoute}></Sidebar>
            <div class="page" style=" {currentRoute === undefined ? '' : !currentRoute.includes('/tests') ? '' : 'padding: 1px 0 2rem 1rem'}">
                <svelte:component this={page} {params}/>
            </div>
        </div>
    {/if}
</main>


<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        background-color: #19191d;
        text-align: center;
        margin: 0 auto;
        padding: 0;
    }

    img {
        height: 16rem;
        width: 16rem;
    }

    .main {
        display: flex;
    }

    .page {
        width: 85%;
        margin-left: auto;
        min-height: 100vh;
        height: fit-content;
        padding: 98px 2rem 2rem 2rem;
    }

</style>
