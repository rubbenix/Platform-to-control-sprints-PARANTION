<script>
    import router from 'page';
    import userStore from '../stores/userStore.js';
    import {onMount} from 'svelte'
    import {fetchRequest} from "../lib/Request.js";
    import {tokenStore} from "../stores/TokenStore.js";
    import {connect, login} from "../lib/clientSocket.js";

    let user = {};
    let socket;

    onMount(async () => {
        try {
            socket = await connect();
            userStore.subscribe(value => user = value);
        } catch (error) {
            console.error("WebSocket connection failed:", error);
        }
    });

    const handleSubmit = async () => {
        const response = await submit();
        try {
            await login(email, password, socket)
        } catch (error) {
            console.log(error)
        }

        if (response) {
            if (response.token) {
                $tokenStore.token = response.token;
                router('/projects');
            }
        }
    };

    let email = '';
    let password = '';
    let incorrectCredentials = false;


    async function submit() {
        try {
            return fetchRequest('token', 'POST', {email, password}).then((result) => {
                incorrectCredentials = false;
                $tokenStore.token = result.token;
                $userStore = result.user;
                return result;

            }).catch((e) => {
                incorrectCredentials = true;
                console.log(e);
            })

        } catch (e) {
            console.log(e);
            incorrectCredentials = true;
        }
    }

</script>

<body>
    <div class="login__container">
        <form id="login" action="" on:submit|preventDefault={handleSubmit}>
            <div class="form-header">
                <h1 style="text-align:center; margin: 5rem auto;">Login</h1>

                {#if incorrectCredentials}
                    <p class="error-message text-danger">Username or password is incorrect!</p>
                {/if}
            </div>


            <div class="form__control">
                <input type="text" placeholder="Enter Username" name="uname" id="email" bind:value={email} required>
            </div>

            <div class="form__control">
                <input type="password" placeholder="Enter Password" name="psw" id="password" bind:value={password} required>
            </div>

            <div class="submit__button">
                <button type="submit">Login</button>
            </div>
        </form>

    </div>
</body>

<style>
    body {
        font-size: 18px;
        max-height: 100%;
        min-width: 100%;
        overflow-y: hidden;
        overflow-x: hidden;
        font-family: 'Montserrat', sans-serif;
    }

    .background__image {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
    }

    .login__container {
        display: block;
        position: absolute;
        width: 39rem;
        height: 48rem;
        z-index: 10;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 10px 4px rgba(0, 0, 0, 0.25);
        border-radius: 70px;
    }

    h1, p {
        font-family: 'Yeseva One';
    }

    h1 {
        font-size: 4rem;
    }

    #login {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
    }

    label {
        display: inline-block;
    }

    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 50px;
        box-sizing: border-box;
    }

    .submit__button {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        display: inline-block;
        margin-top: 2rem;
        width: 90%;
        border-radius: 50px;
        background: #BB8700;
        color: #fff;
    }

    .form__control {
        margin-bottom: 10px;
        padding-bottom: 20px;
    }

    .form__control.success input {
        border: 5px solid #2ecc71;
    }

    .form__control.error input {
        border: 5px solid #e74c3c;
    }

    .form__control small {
        color: #e74c3c;
        position: absolute;
        margin-left: 8px;
        bottom: 0;
        left: 0;
        visibility: hidden;
    }

    .form__control .error small {
        visibility: visible;
    }

    @media screen and (max-width: 768px) {
        .login__container {
            width: 500px;
            height: 40rem;
        }

        h1 {
            font-size: 3rem;
        }

        button {
            margin-top: 1rem;
        }
    }

    @media screen and (max-width: 480px) {
        .login__container {
            width: 100%;
            height: 70%;
        }
    }
</style>
