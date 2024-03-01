# Test report Scorion regression testing system #

## Tester: Aleks Proskurkin ##

### Test case 1

- Name: Mark a test as a blocker
- Precondition: Test exists in the system. And user is logged in.
- Requirement No. US-1, US-18
- | Test Steps                   | Pass/Fail |
                |------------------------------|-----------|
  | Navigate to the sprint page. | Pass      |
  | Mark the test as a blocker.  | Pass      |
- Expected Output: Test is marked as a blocker successfully.
- Pass/Fail Criteria: Test is successfully marked as a blocker.

### Test case 2

- Name: Assign weights to the tests
- Precondition: Test exists in the system and has a few test steps. User is logged in as developer or admin.
- Requirement No. US-2
- | Test Steps                           | Pass/Fail |
              |--------------------------------------|-----------|
  | Navigate to the Sprint details page. | Pass      |
  | Click on the certain test.           | Pass      | 
  | Change weights of needed teststeps.  | Pass      |
- Expected Output: Sprint page displays new weight of this test.
- Pass/Fail Criteria: Weight of the certain step has been updated.

### Test case 3

- Name: Create Sprints
- Precondition: User is logged in as developer or admin.
- Requirement No. US-3, US-4, US-5
- | Test Steps                    | Pass/Fail |
            |-------------------------------|-----------|
  | Navigate to the Sprints page. | Pass      |
  | Click on 'Add Sprint'.        | Pass      | 
  | Enter new sprint data.        | Pass      | 
  | Click 'submit'.               | Pass      | 
- Expected Output: Sprints page displays a new sprint. All tests that will belong to this sprint will inherit due date
  from the sprint.
- Pass/Fail Criteria: A new sprint has been created.

### Test case 4

- Name: User management
- Precondition: User is logged in an admin.
- Requirement No. US-6
- | Test Steps                            | Pass/Fail |
                |---------------------------------------|-----------|
  | Navigate to the Users and Roles page. | Pass      |
  | Change any user`s role.               | Pass      | 
- Expected Output: Users page displays new role of the user.
- Pass/Fail Criteria: The user`s role has been changed.

### Test case 5

- Name: Detailed test information
- Precondition: User is logged in.
- Requirement No. US-7
- | Test Steps                  | Pass/Fail |
              |-----------------------------|-----------|
  | Navigate to the Tests page. | Pass      |
  | Click on any test.          | Pass      | 
- Expected Output: All detailed information is displayed on screen: attachments, steps, weights, attachments, modules.
- Pass/Fail Criteria: Detailed test info is displayed.

### Test case 6

- Name: Generate report for sprint
- Precondition: User is logged in.
- Requirement No. US-8, US-16, FR-5
- | Test Steps                    | Pass/Fail |
            |-------------------------------|-----------|
  | Navigate to the Sprints page. | Pass      |
  | Click on 'Create Report'.     | Pass      | 
- Expected Output: -
- Pass/Fail Criteria: .csv file will be downloaded on the computer of user.

### Test case 7

- Name: Edit tests
- Precondition: User is logged in as developer or admin.
- Requirement No. US-9
- | Test Steps                  | Pass/Fail |
          |-----------------------------|-----------|
  | Navigate to the Tests page. | Pass      |
  | Click on any test.          | Pass      | 
  | Click on 'Edit'.            | Pass      | 
  | Enter new data.             | Pass      | 
  | Click 'Confirm'.            | Pass      |
- Expected Output: test information has been changed.
- Pass/Fail Criteria: updated test information is displayed on Test details page.

### Test case 8

- Name: Add tests
- Precondition: User is logged in as developer or admin.
- Requirement No. US-10
- | Test Steps                  | Pass/Fail |
            |-----------------------------|-----------|
  | Navigate to the Tests page. | Pass      |
  | Click on 'Add test'.        | Pass      | 
  | Enter new data.             | Pass      | 
  | Click 'Add test'.           | Pass      |
- Expected Output: Test added successfully message displayed on the screen.
- Pass/Fail Criteria: new test case is displayed on Tests page.

### Test case 9

- Name: Search for tests
- Precondition: User is logged in.
- Requirement No. US-11, FR-8
- | Test Steps                                         | Pass/Fail |
            |----------------------------------------------------|-----------|
  | Navigate to the Tests page.                        | Pass      |
  | Enter title of a searched test into the searchbar. | Pass      | 
- Expected Output: -
- Pass/Fail Criteria: Only Tests that contain searchbar text are displayed.

### Test case 10

- Name: Assign an unassign people
- Precondition: User is logged in as developer or admin.
- Requirement No. US-14
- | Test Steps                                              | Pass/Fail |
          |---------------------------------------------------------|-----------|
  | Navigate to the Sprints page.                           | Pass      |
  | Click on the running Sprint.                            | Pass      | 
  | Click on a certain test.                                | Pass      | 
  | Change the assignee for this test on the right sidebar. | Pass      |
- Expected Output: -
- Pass/Fail Criteria: Assignee for this test case has been changed.

### Test case 11

- Name: Add comments
- Precondition: User is logged in.
- Requirement No. US-15
- | Test Steps                    | Pass/Fail |
        |-------------------------------|-----------|
  | Navigate to the Sprints page. | Pass      |
  | Click on the running Sprint.  | Pass      | 
  | Click on a certain test.      | Pass      | 
  | Select a certain test step.   | Pass      | 
  | Enter new comment in textbox. | Pass      | 
  | Click 'Sumbit'.               | Pass      |
- Expected Output: -
- Pass/Fail Criteria: Testlog for this test step has been updated.

### Test case 12

- Name: Attach File
- Precondition: User is logged in.
- Requirement No. US-17
- | Test Steps                    | Pass/Fail |
      |-------------------------------|-----------|
  | Navigate to the Sprints page. | Pass      |
  | Click on the running Sprint.  | Pass      | 
  | Click on a certain test.      | Pass      | 
  | Select a certain test step.   | Pass      | 
  | Attach a file.                | Pass      | 
  | Click 'Upload File'           | Pass      |
- Expected Output: File is displayed if user selects the test step.
- Pass/Fail Criteria: File is attach to the test step.

### Test case 13

- Name: Blocker notifications
- Precondition: User is logged in. Selected test is assigned to himself.
- Requirement No. FR-3
- | Test Steps                                                              | Pass/Fail |
      |-------------------------------------------------------------------------|-----------|
  | Navigate to the Sprints page.                                           | Pass      |
  | Click on the running Sprint.                                            | Pass      |
  | Change certain test`s status on Blocker which is assigned to ourselves. | Pass      |

- Expected Output: Header displays new notification.
- Pass/Fail Criteria: Notification is displayed.

### Test case 14

- Name: Sort tests by weight
- Precondition: User is logged in.
- Requirement No. FR-4
- | Test Steps                                                             | Pass/Fail |
    |------------------------------------------------------------------------|-----------|
  | Navigate to the Tests page.                                            | Pass      |
  | Click on the running Weight title (1st row, last column in the table). | Pass      | 

- Expected Output: Order of tests is changed.
- Pass/Fail Criteria: Tests sorting is toggled by clicking on the Weight header.