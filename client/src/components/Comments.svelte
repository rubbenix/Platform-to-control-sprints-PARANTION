<script>
    import {fetchRequest} from "../lib/Request.js";
    import router from "page";

    export let testId;
    export let comments = [];
    export let selectedStep;
    export let fetchAll;
    let comment = '';

    async function setTestId() {
        const currentRoute = router.current;
        const parts = currentRoute.split('/');
        const lastPart = parts[parts.length - 1];
        testId = parseInt(lastPart, 10);
    }


    async function handleSubmit() {

        await setTestId();
        const requestCommentBody = {
            testlog: comment,
        };
        try {
            if (selectedStep != null) {
                if (!comment.trim()) {
                    showNotification('Empty comment. Please enter a comment before submitting.');
                    return;
                }
                const textResponse = fetchRequest('test/' + testId + '/teststeps/' + selectedStep.stepid + '?combinatory=true', 'PUT', requestCommentBody);
                if (textResponse.status = 200) {
                    console.log('Comment submitted successfully');
                    setTimeout(() => {
                        console.log("this is the third message");
                    }, 3000);
                    await fetchAll();
                } else {
                    console.error('Failed to submit comment');
                }
            }else{
                showNotification('No step selected. Please select a step before submitting.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    let fileInput;
    let previewImage;
    let showImage = false;

    function handleFileChange() {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Update the previewImage source to display the selected image
                showImage = true;
                previewImage.src = e.target.result;
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(file);
        }
    }

    async function uploadFile() {
        await setTestId();

        console.log("Selected Step ", selectedStep)

        if (!selectedStep) {
            showNotification('No step selected. Please select a step before uploading a file.');
            return;
        }

        const file = fileInput.files[0];

        if (!file) {
            showNotification('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetchRequest('test/' + testId + '/teststeps/' + selectedStep.stepid + '/attachment', 'POST', formData)
        console.log(response);

        previewImage.src = '';
        await fetchAll();
    }
    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
</script>

<div class="comments-section">
    <h2>Change Test Log</h2>
    <small class="hint">Make changes to selected step</small>
    <div class="containerForAttachments mt-5">
        <div class="form-group row">
            <label for="comment" class="col-2 col-form-label">Comment</label>
            <div class="col-10">
                    <textarea class="form-control dark-text" id="comment" bind:value={comment}
                              placeholder="Add a comment..." autocomplete="off" name="comment"
                              required rows="5"></textarea>
            </div>
        </div>
        <input type="file" bind:this={fileInput} on:change={handleFileChange}><br>
        <img bind:this={previewImage} alt="Preview" style="max-width: 300px; max-height: 300px; margin-top: 10px;"><br>
        <div id="notification" class="error-text"></div>

        <div class="center">
            <button class="btn btn-primary" on:click={uploadFile}>Upload File</button>
            <button class="btn btn-primary" on:click={handleSubmit} type="submit">Submit</button>
        </div>
    </div>
</div>

<style>
    .dark-text {
        background-color: #25252b;
        color: #fff;
        border-radius: 4px;
        border: none;
    }

    .center {
        text-align: center;
    }

    .containerForAttachments{
        text-align: left;
    }

    textarea{
    }

    .comments-section {
        margin-top: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        border: 1px solid #ccc;
        margin-bottom: 10px;
        padding: 10px;
    }

    .comment-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }

    img {
        max-width: 100%;
        margin-top: 10px;
    }

    form {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }

    textarea {
        margin-bottom: 10px;
    }

    button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 15px;
        margin: 5px;
        cursor: pointer;
        border-radius: 5px;
    }

    button:hover {
        background-color: #0056b3;
    }

    .hint {
        opacity: 0.3;
        font-size: 16px !important;
    }
    .error-text {
        margin: auto;
        color: red;
        font-size: 18px;
    }
</style>