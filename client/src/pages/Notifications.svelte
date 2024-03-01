<!-- Notifications.svelte -->
<script>
    import { blockerStore } from '../stores/blockerStore';
    import { onMount } from 'svelte';
    import userStore from "../stores/userStore.js";

    onMount(() => {
    });

    let notifications = $blockerStore.filter(blocker => blocker.userid === $userStore.id)




</script>

<div class="notifications-container dark-mode">
    <h1>BLOCKERS</h1>

    {#if notifications.length > 0}
        <ul class="notifications-list">
            {#each notifications as notification (notification.testid)}
                <li class="notification-item">
                    <a href="/tests/{notification.testid}">
                        <strong style="color: #007bff;">Test ID: {notification.testid}</strong> - {notification.name}
                        <p>{notification.description}</p>
                    </a>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="no-notifications">No notifications to display.</p>
    {/if}
</div>

<style>
    /* General Styles */
    body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5; /* Light mode background */
        color: #333; /* Light mode text color */
    }

    /* Dark Mode Styles */
    .dark-mode {
        background-color: #25252b; /* Dark mode background */
        color: #fff; /* Dark mode text color */
    }

    /* Notifications Container Styles */
    .notifications-container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
        color: #007bff; /* Accent color for headers */
    }

    /* Notifications List Styles */
    .notifications-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .notification-item {
        border-bottom: 1px solid #ddd; /* Lighter border color */
        padding: 15px 0;
    }

    a {
        text-decoration: none;
        color: #007bff; /* Accent color for links */
    }

    strong {
        color: #007bff; /* Accent color for strong text */
    }

    p {
        margin: 0;
        color: #555; /* Darker text color */
    }

    .no-notifications {
        color: #555; /* Darker text color */
    }
</style>
