# Functional Design
`Revision: 1.2` 

# Table of Contents

- [Introduction](#introduction)
  - [Problem Statement](#problem-statement)
  - [Context Analysis](#context-analysis)
- [Solution Overview](#solution-overview)
- [Functional Specification](#functional-specification)
  - [Business Requirement](#business-requirement)
  - [User Requirements](#user-requirements)
  - [Wireframes](#wireframes)
  - [Functional Requirements](#functional-requirements)
- [Non-Functional requirements](#non-functional-requirements)
- [Exceptional Handling](#exceptional-handling)
- [user credentials](#user-credentials)
- [Change Log](#change-log)


# Introduction

The Functional Design document outlines the necessary functionalities and requirements for our testing and management
system's development. This document is a comprehensive guide meant to benefit stakeholders, developers, and testers
involved in the project. By carefully defining requirements and incorporating wireframes, this document ensures the
meticulous planning vital for building a resilient and user-friendly system.

- `revision history:`
In first revision, we have added the requirements. In the second revision, we have added the Introduction, Problem Statement and Solution
Overview,and Exceptional handling Also, we have updated the requirements and moved the wireframes from system design to functional design.

## Problem Statement
The current regression testing process using Scrum boards in Jetbrains Space has the following problems:

* No easy way to track overall progress and generate reports
* Difficult to restart testing for new sprints
* No notifications for upcoming or overdue tests
* No immediate alerting about blocking bug discoveries
* Testing data not preserved when boards reset
 
## Context Analysis

Parantion needs to frequently conduct regression testing across multiple products. New versions are released in 
2 week sprints. Regression testing is done manually by dedicated QA testers.
A dedicated QA team executes pre-defined test cases to verify expected behavior and identify defects.
Key aspects of the testing process:

* Tests span multiple products
* New and updated test cases each sprint
* Tests assigned to individual testers
* Results logged as pass/fail/blocker
* Weighted test cases to estimate effort
* Status reports needed for progress
* Critical bugs require immediate alerts
* Reports needed for completed sprints
* Roles and permissions needed for access control
* Overviews needed for management

The current process using Scrum boards has proven insufficient as testing volume and complexity grows.

# Solution Overview

The proposed solution is a web application with the following components:

- User Management: Administrators have the capability to create and manage tester accounts along with their respective
  permissions.

- Sprint Management: Administrators possess the authority to add, edit, and close sprints, and the active sprint is
  prominently displayed on a central dashboard.

- Test Case Management: Administrators can create test cases, inclusive of details such as name, description, steps,
  weight, and assignee. These test cases are systematically organized under specific sprints.

- Test Execution: Testers can access their assigned test cases, mark individual steps as passed or failed, log bugs, and
  attach relevant files.

- Reporting: Users have the ability to generate comprehensive reports on test status and progress per sprint or product,
  incorporating metrics such as passed tests and bug counts.

- Notifications: Real-time notifications through websockets are triggered for blocking bugs, and email alerts are sent
  for overdue tests.

- Reset Board: Administrators can efficiently close a sprint and reset the board, preparing it for new test cases for
  the subsequent sprint.

- Progression Tracking: Test cases are assigned a weight, and as testers mark steps as completed, the overall progress
  is dynamically calculated.

The application will be hosted on a server and accessed through a standard web browser. User authentication ensures
that individuals can log in and utilize the application's features based on their assigned roles and permissions.
The home page serves as a Sprint Dashboard, providing a snapshot of the ongoing sprint. Admins can manage sprints and
access features such as adding or removing sprints. Access to Sprint overview, Test Case, and report generation is
available to all users. Developers share similar features with admins, excluding the User Management System.
For an overall view of test cases, a Test Case Dashboard is available. Each test case has a dedicated Test Case Page,
detailing steps with associated weights. Users can add new steps, change step statuses, attach files, edit, or delete
test steps. Test progression is monitored through assigned weights, with each test case having an estimated weight and
an assignee field. The system tracks completed tests, and individual test steps within a test case can be marked as
completed. Immediate notifications are sent to subscribed users for blocking bugs.
The application is constructed using a contemporary web framework like Svelte/Node.js, and data is stored in a
Postgres database. While the initial version prioritizes manual testing features, future iterations may incorporate
automated testing integration. Automated testing integration could be added in the future.

# Functional Specification
## Business Requirement


| ID   | Business Requirement                                                                                                            | MoSCW | Source    |
|------|---------------------------------------------------------------------------------------------------------------------------------|-------|-----------|
| BR-1 | The system must be easy to use and easy to understand so we don’t have to spend time explaining to new employees.               | M     | Interview |
| BR-2 | The system should be error-free so that it will not slow down our company’s progress or even damage our profit.                 | M     | Document  |
| BR-3 | The system should be accessible and user-friendly on mobile devices to enable users to perform essential tasks while on the go. | M     | Document  |
| BR-4 | The system must be ready for future growth, accommodating evolving business needs and the addition of more employees.           | M     | Interview |



## User Requirements

| ID    | User Requirement                                                                                                                                       | MSCW | Source    |
|-------|--------------------------------------------------------------------------------------------------------------------------------------------------------|------|-----------|
| US-1  | As a tester, I want to mark tests as blockers so that I can highlight serious bugs.                                                                    | M    | Interview |
| US-2  | As a developer, I want to assign weights to tests so that overall test effort can be estimated.                                                        | M    | Document  |
| US-3  | As a Admin, I want new boards to set up when old ones close so that new sprints can be started seamlessly.                                             | M    | Document  |
| US-4  | As a Admin, we want to add new sprint so that I can categorize test cases.                                                                             | M    | Document  |
| US-5  | As a Admin, I want to set due dates for tests so that test execution has clear timelines.                                                              | M    | Document  |
| US-6  | As a Admin, I want to edit user roles so that access can be controlled efficiently.                                                                    | M    | Interview |
| US-7  | As a user, I want to see an overview of current tests so that I can get the big picture.                                                               | M    | Interview |
| US-8  | As a user, I want to able generate report of tests per sprint so I can check situation.                                                                | M    | Document  |
| US-9  | As an Admin, I want to edit added tests to fix any errors.                                                                                             | M    | Interview |
| US-10 | As an Admin, I want to be able to add test cases so that we can test new features.                                                                     | M    | Document  |
| US-11 | As a User, I want to search tests by names so that I can access them faster.                                                                           | M    | Document  |
| US-12 | As a tester, I want to receive notification about overdue tests so that I can prioritize my work.                                                      | M    | Document  |
| US-13 | As a tester, I want to receive notification about upcoming tests so that I can prepare and allocate time.                                              | M    | Document  |
| US-14 | As a tester, I want to be able to assign and unassign people from test cases.                                                                          | M    | Interview |
| US-15 | As a tester, I want to be able to add comments on test cases so that I can keep track of progress.                                                     | M    | Interview |
| US-16 | As a tester, I want to be able to generate reports containing information about tests completed so far for this sprint and/or including older sprints. | M    | Interview |
| US-17 | As a tester, I want to be able to attach files to test case logs so that we can use images and videos to be more descriptive.                          | S    | Interview |
| US-18 | As a tester, I want to be able to change the status of the test case so that we can organize better.                                                   | M    | Interview |


## Wireframes

### Log in
The first wireframe is the login.
It's a simple page which contains only 4 elements. Two input fields, for the username and for the password. A button which will log in the user if the input is correct.

![](assets/wireframes/LoginWireFrame.drawio.png)


### Navegation

This WireFrame is the part of navegation.
Navigation Bar: On the left side, there’s a vertical navigation bar. Below it are four menu items: Tests, Sprints, Modules, User & Roles. These likely represent different sections of the application that users can navigate to.
Main Area: The main area of the interface will displays information of each menu item.
Top Right Corner: At the top right corner, there are icons for Notifications and User profile/settings.
![](assets/wireframes/NavegationWireFrame.drawio.png)

### List All Sprints
The third wireframe shows all the sprints.
Main Area: The main area of the interface displays a table for tracking sprints. The table has columns for ID, Title, Start Date, and Due Date. Each row in the table represents a sprint and has options to Edit, Delete, view Details or generate a Report. This suggests that users can manage sprints directly from this interface.
Top Right Corner: At the top right corner, there’s also an “Add Sprint” button next to them. Which likely allows users to create new sprints.
![](assets/wireframes/SprintsWireFrame.drawio.png)

### Edit/Add Sprint
New page:A window in the center has fields to enter details of a new sprint, here you can edit and add news Sprints:
Title: The title of the sprint.
Start Date: The start date of the sprint.
End Date: The end date of the sprint.
Add Sprint Button: There is an “Add Sprint” button at the bottom of this window. This is used to add the new sprint to the system.
![](assets/wireframes/Edit_Add_SprintWireFrame.drawio.png)

### List All Tests
This wireframe shows all the tests.
Main Area: The main area of the interface displays a table for tracking tests. The table has columns for ID, Title, Modules, and Weight. Each row in the table represents a test and has options to Edit, Delete, view Details or generate a Report. This suggests that users can manage tests directly from this interface.
At the top right corner, there is an “Add Test” button next to them, which likely allows users to create new tests.
![](assets/wireframes/TestCasesWireFrame.drawio.png)

### Test Case Detail
Main Area: The main area of the interface displays all the steps of the test. We can see: ID, Name, Weight, Test Log, and Completion State. Each row represents a step and has options to Edit or Delete. This suggests that users can manage tasks directly from this interface.
Change Test Log: Below all the task, there’s a section titled ‘CHANGE TEST LOG’ where users can add comments and upload files. This could be used to log changes made to a test.
![](assets/wireframes/TestCaseDetailsWireFrame.drawio.png)

### Edit Tasks of a Test
Main Area: The main area of the interface displays all the tasks of a Test. We can see columns for ID, Name, Weight, Test Log, and Completion State. Each row in the table represents a Task and has options to write and later Confirm or Remove.
![](assets/wireframes/Edit_TestCaseDetailsWireFrame.drawio.png)

### Add Tasks of a Test
Pop-up Window: A pop-up window in the center has fields to enter details of a new test step:
Name of the test step, the step number, the weight or importance of this step in the test and testLog.
Add new Test Step Button: There is an “Add new Test Step” button at the bottom of this pop-up window. This is used to add the new test step to the system.
![](assets/wireframes/Add_TestStepWireFrame.drawio.png)

### List All Modules
Shows all the modules.
Main Area: The main area of the interface displays a table for tracking modules. The table has columns for ID and Label. Each row in the table represents a module and has options to Edit or Delete. This suggests that users can manage modules directly from this interface.
Top Right Corner: At the top right corner, there is an “Add Module” button next to them, which likely allows users to create new modules.
![](assets/wireframes/ModulesWireFrame.drawio.png)

### Edit/Add Modules
In this WireFrame we can edit and add new Modules.
We have the same page as above, however, now we have two new functionalities.
The first one is a writing bar to add the new module.
The second one is a writing bar to edit label module
![](assets/wireframes/Add_Edit_ModulesWireFrame.drawio.png)

### List All Users & Roles
Shows all the Users and User's Roles.
Main Area: The section is titled “ACCOUNT MANAGEMENT”. This is where the admin can manage user accounts.
Email and Role Columns: There are two columns labeled “EMAIL” and “ROLE”. These display the email addresses and roles of the users in the system.
Delete Buttons: Each row has a corresponding “Delete” button on the right side. This allows the admin to remove users from the system.
Add User Button: At the bottom of these rows, there’s an “Add User” button. This is used to add new users to the account management system.
![](assets/wireframes/UsersAndRolesWireFrame.drawio.png)

### Add/Delete Users & Roles
Add New User: At the bottom, there’s an option to add new users. You can enter their email, password, select their role from a dropdown menu, and then click the “Add New User” button to create a new user account.
Also, we can remove Users with the button on the right.
![](assets/wireframes/Add_Delete_UsersAndRolesWireFrame.drawio.png)

## Functional Requirements

| ID   | Functional Requirements                                                                                                                                                                     | MSCW | Source              |
|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|---------------------|
| FR-1 | The system must notify testers about tests that have passed their due date.                                                                                                                 | M    | Document            |
| FR-2 | The system must notify testers about tests that are due soon.                                                                                                                               | M    | Document            |
| FR-3 | The system must immediately send a notification upon detecting a blocking issue.                                                                                                            | M    | Interview           |
| FR-4 | The system must allow sorting tests by weight per column.                                                                                                                                   | S    | Document            |
| FR-5 | The system must generate reports on the completion status of regression test runs per sprint and product, including details on tests, testers, failed/passed tests, time taken, and weight. | S    | Interview           |
| FR-6 | The system must save data when a board is closed to be included in reports later.                                                                                                           | M    | Document, Interview |
| FR-7 | Access to test data and configurations should be role-based, ensuring that users only have access to information relevant to their roles.                                                   | M    | Document, Interview |
| FR-8 | The system must allow searching of tests by name.                                                                                                                                           | S    | Document            |


# Non-Functional requirements

| ID    | Non-Functional requirements                                                                                                                                                                                      | MSCW | Source              |
|-------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|---------------------|
| NFR-1 | The system must ensure the confidentiality, integrity, and availability of all data and transactions. It must comply with GDPR legislation and prevent unauthorized access, modification, or disclosure of data. | M    | Document            |
| NFR-2 | The system should be designed to accommodate the company's future growth in terms of features, functionalities, and data storage capacity.                                                                       | M    | Document            |
| NFR-3 | The system must be able to integrate with other systems or platforms used by the company, such as accounting and inventory management systems.                                                                   | M    | Interview           |
| NFR-4 | The system must be easy to use and navigate for all employees, regardless of their technical skill level. It must have a user-friendly interface with clear and concise instructions.                            | M    | Interview           |
| NFR-5 | The system should be available 96.67% of the time.                                                                                                                                                               | M    | Document            |
| NFR-6 | The system must be compatible with different web browsers, operating systems, and devices, such as desktops, laptops, tablets, and mobile phones.                                                                | M    | Interview, Document |
| NFR-7 | The system must be able to recover from failure within 10 minutes without data loss or disruption of service.                                                                                                    | M    | Interview           |
| NFR-8 | The system should be easily maintainable, allowing updates and bug fixes to be implemented without causing downtime or loss of data.                                                                             | M    | Interview           |

# Exceptional Handling

### Login page

**Empty Username or Password Error Handling**
- If the user attempts to log in without entering a username or password:
  - Prevents the login request from being sent.
  - Displays an error message prompting the user to enter both username and password before proceeding.

**Invalid Credentials Error Handling**
- If the user enters incorrect credentials (username or password):
  - Prevents the login request from being sent.
  - Displays an error message indicating that the provided credentials are invalid.

**Authentication Failure Error Handling**
- If there is an error during the authentication process on the server-side:
  - Displays an error message indicating that there was a problem with the login process.
  - Advises the user to try again later or contact support if the issue persists.

### Add test form

When a user attempts to add a test through the form, the system checks whether the name field is empty. 
If it is, an error notification is displayed to the user, indicating that the name field must not be left blank. 

### Add sprint page

Before submitting the form, the system checks the input data for correctness. The following validations are performed:
The system ensures that the sprint title field is not left empty. If the title field is empty when the user attempts to submit the form, 
an error message is displayed indicating a problem.

### Test case details page ###

**No Selected Step Error Handling**
- If the user attempts to submit a comment or upload a file without selecting a step:
  - Prevents the request from being sent.
  - Notifies the user that they must select a step before proceeding.

**Empty Submission Error Handling**
- If the user attempts to submit an empty comment or upload an empty file:
  - Prevents the request from being sent.
  - Notifies the user that they cannot submit empty content.

### Test case edit page ###

 **Test Case Name Validation**
- When navigating back to details:
  - If the test case name is null or empty:
    - Prevents navigating back.
    - Displays a notification informing the user that the test case name cannot be empty.

 **Step Weight and ID Validation**
- After pressing the confirm button to update details:
  - If the step weight or ID is negative:
    - Prevents updating the details.
    - Displays a notification informing the user that the weight cannot be negative and the step number must be positive.

 **Step Name and Test Log Validation**
- After pressing the confirm button to update details:
  - If the step name or test log is null or empty:
    - Prevents updating the details.
    - Displays a notification informing the user that the step name and test log cannot be empty.

 **Confirmation Notification for Step Deletion**
- When attempting to delete a step:
  - Displays a confirmation overlay.
  - Allows the user to confirm or cancel the deletion.

### Test step add popup ###

The function checks for the following errors and displays a notification if any of them occur:
- If the title of the new test step is null:
  - Shows a notification: "Title must not be null".
- If the step number of the new test step is null:
  - Shows a notification: "Step number must not be null".
- If the step number of the new test step is not a positive number:
  - Shows a notification: "Step number must be a positive number".
- If the weight of the new test step is null:
  - Shows a notification: "Weight must not be null".
- If the weight of the new test step is not a positive number:
  - Shows a notification: "Weight must be a positive number".
- If the test log of the new test step is null:
  - Shows a notification: "Test log must not be null".
# User Credentials

Credentials that can be used to log into the system to use it.

| Username    | Password | Account type |
|-------------|----------|--------------|
| `admin`     | admin    | admin |   
| `tester`    | tester   | tester|
| `developer` | developer     | developer|

# Change Log
- V 1.1
Added requirements
- V 1.2
Added Introduction, Problem Statement and Solution Overview, and Exceptional handling Also, we have updated the
requirements and moved the wireframes from system design to functional design.
