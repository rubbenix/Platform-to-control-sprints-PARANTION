<script>
    import { blockerStore } from '../stores/blockerStore';
    import userStore from "../stores/userStore.js";

    // Import the image
    import logoImage from '../assets/logopng/scorionLogoCutout.png';

    export let active;

    $: loggedIn = true; // Set to true or false based on your logic
    let showUserMenu = false; // Flag to control user menu visibility
    $: AmountOfBlockers = $blockerStore.filter(blocker => blocker.userid === $userStore.id).length;
    $: email = $userStore.email;

</script>

<nav class="navbar fixed-top navbar-dark bg-dark navbar-expand-lg justify-content-between">
    <!-- Replace the text with the image -->
    <a
            class:active={active === (loggedIn ? "/projects" : "/login")}
            href={loggedIn ? "/projects" : "/"}
            class="navbar-brand"
    >
        {#if loggedIn}
            <img src={logoImage} alt="Logo" style="height: 2rem">
        {:else}
            <img src={logoImage} alt="Logo" style="height: 1rem;">
        {/if}
    </a>

    <ul class="nav">
        {#if loggedIn}
            <li class="nav-item">
                <a href="notifications" class="nav-link">
                    <i class="bi bi-bell d-inline-block mx-2"></i>
                    Notifications {AmountOfBlockers > 0 ? `(${AmountOfBlockers})` : ''}
                </a>
            </li>
            <li
                    class="nav-item user-menu"
                    on:click={() => showUserMenu = !showUserMenu}
            >
                <a class="nav-link">
                    <i class="bi bi-person d-inline-block mx-2"></i>
                    {email}
                </a>
                {#if showUserMenu}
                    <div
                            class="user-menu-dropdown"
                            on:mouseleave={() => showUserMenu = false}
                    >
                        <!-- Dropdown content goes here -->
                        <a href="/" class="user-menu-item">Logout</a>
                    </div>
                {/if}
            </li>
        {/if}
    </ul>
</nav>
<style>
    .navbar {
        background-color: #25252b !important; /* Dark background color for the navbar */
        padding: 10px 0;
        width: 100%;
    }

    .navbar-brand {
        font-size: 1.5rem;
        font-weight: bold;
        color: #fff; /* White text color for the brand */
        text-decoration: none;
        transition: color 0.3s ease-in-out; /* Smooth color transition on hover */
        margin-left: 4rem;
    }

    .navbar-brand:hover {
        color: #486080; /* Yellow color on hover */
    }

    .nav {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav-item {
        margin-right: 15px;
    }

    .nav-link {
        color: #fff; /* White text color for the links */
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: color 0.3s ease-in-out; /* Smooth color transition on hover */
    }

    .nav-link i {
        font-size: 1.2rem;
        margin-right: 5px;
    }

    .nav-link:hover {
        color: #486080; /* Grey color on hover */
    }

    .user-menu {
        position: relative;
        cursor: pointer; /* Change cursor to pointer on hover to indicate clickability */
    }

    .user-menu-dropdown {
        position: absolute;
        top: calc(100% - 5px);
        left: 0;
        display: none;
        flex-direction: column;
        background-color: #343a40; /* Adjust dropdown background color */
        border: 1px solid #dee2e6; /* Add border */
        border-radius: 0.25rem;
        z-index: 1000;
    }

    .user-menu:hover .user-menu-dropdown {
        display: flex;
    }

    .user-menu-item {
        color: #fff;
        padding: 0.5rem 1rem;
        text-decoration: none;
        display: block;
        transition: background-color 0.3s ease-in-out;
    }

    .user-menu-item:hover {
        background-color: #486080; /* Adjust hover background color */
    }
    img{
        height: 2rem;
        width: 6rem;
    }
</style>
