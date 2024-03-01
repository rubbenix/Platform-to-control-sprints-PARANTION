# Team plan
Revision: 1.2

# Table of Contents

- [Targets](#targets)
- [The Assignment](#the-assignment)
- [Solution Indication](#solution-indication)
- [Plan Of Approach (POA)](#plan-of-approach-poa)
- [Code of Conduct (CoC)](#code-of-conduct)
- [Definition of Done (DoD)](#definition-of-done-dod)
- [Team Members](#team-members)
- [Stakeholders Information](#stakeholders-information)


# Targets
- To carry out this project successfully we have to increase our programming skills, specifically with JavaScript, html and css. Not all members know this language, so we must learn and practice it. We will also use svelte, a front-end component framework. Also, we will have to connect the project to a database to be able to make it work and store all the data, for this we will use PostgreSQL.
- Successfully comply with all the requirements that Parantion has requested of us. Above all, keep in mind the requirement to implement notifications.
- Be able to complete all the tasks proposed for each Sprint.
- Finish the product for the customer before final delivery.
- Talk to the client to know exactly what they need. Hold the necessary meetings so that the client and we are clear about the path to follow.
- As a team we want to be organized. There will be at least 3 weekly meetings to advance the project and talk to each other to assign tasks. Whenever necessary we will increase the number of meetings
- We want to be an efficient team. To do this, we must first organize ourselves and, from here,
  we have to work hard. Based on the Scrum methodology, we will assign a Scrum Master for each Sprint.
- We must cooperate and help each other. If we avoid conflicts we will have a happy and motivated life.
  equipment. There will be peace and you will be able to work better. 
- We need to be constant and for all of us to form a team together. We will help each other to make the best project we can.
# The Assignment

Parantion wants to develop a regression testing management system to better track and manage their manual regression
testing process.
Their current process involves tracking tests and their status on a Scrum board in Jetbrains Space.

This has some limitations:

* No easy way to communicate blocking bugs
* No reporting on completed tests per sprint/product
* Difficult to reset board for new sprint
* No tracking of test progression based on weight
* No notifications about upcoming/overdue tests

The goals of the new system:

* Admins can manage sprints, add/remove test cases, Manage users
* Developers can view test cases, log bugs linked to cases, update test case contents and add/remove test cases
* Testers can change state test cases, log bugs linked to cases, update test case contents
* Create a regression test reporting system
* A dashboard with an overview of the current sprint
* Create a system to notify relevant people about blocking bugs
* Create a system to reset the board for a new sprint
* A user management system with different roles and permissions
* Select people notified immediately of blocking bugs
* Easy to reset board for new sprint
* Track test progression based on weights
* Notifications about due/overdue tests
* Eventually track start/end times of tests to forecast timeline
* 
# Solution Indication

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


# Code of Conduct (CoC)
### Punctuality and Attendance
- Every team member is expected to arrive on time and be present in every class and meeting.
- In case of absence, the absent member must inform all other team members and the lecturer.

### Task Assignment and Communication
- All group members are required to work on their assigned tasks.
- If a task is deemed too difficult or incompletable, the team member must report back to others.
- Effective communication is essential for the success of the team.


### Conflict Resolution
- In case of conflicts between team members, the team shall attempt to resolve the issue internally.
- If internal resolution is unsuccessful, the matter will be brought to the attention of the lecturer.

### Personal Challenges
- If a team member cannot complete their work due to personal reasons, immediate notification to the team is required.
- The team will collectively ensure that the tasks of the affected member are appropriately redistributed.

### Meeting Etiquette
- During meetings, maintain a professional and focused environment.
- Avoid disruptions, side conversations, or unrelated activities.

### Confidentiality and Plagiarism
- Information and work shared among group members must remain within the group.
- To prevent plagiarism, members should refrain from sharing their codes with other students.


### Respect
- Team members are expected to treat each other with respect.


### Accountability and Responsibility
- Each team member is accountable for their assigned tasks and responsibilities.
- If a member is unable to fulfill their duties, they should proactively seek assistance or delegate tasks.
- Accountability is crucial to the success of our project. We expect all team members to fulfill their responsibilities
  and to communicate clearly and honestly with the rest of the team. If a team member fails to complete their work
  between stand-up meetings, an explanation is required. In this case, if the explanation is "I didn't have the
  motivation," the team will accept it, but the member will be expected to catch up and spend double the time to
  make up for the missed work.

- If a team member fails to complete their work for a second time and the explanation is simply "I was lazy," without
  a legitimate reason such as illness, then a strike will be issued. Eelco will be notified of the strike, and the
  team member will be expected to catch up and spend double the time to make up for the missed work.


### Communication Channels
- Utilize designated communication channels (e.g., messaging apps, email) for team discussions and updates.
- Respond promptly to team messages and notifications.


### Documentation and Transparency
- Keep thorough documentation of individual and group progress.
- Be transparent about challenges, setbacks, and changes in project timelines.


### Contribution Equality
- Strive for an equitable distribution of tasks among team members.
- Encourage and value the diverse skills and perspectives each member brings.


### Iterative Feedback
- Provide constructive and respectful feedback to team members on their work.
- Embrace a culture of continuous improvement and learning.


### Technology and Tool Usage
- Follow agreed-upon guidelines for using collaborative tools and technologies.
- Ensure that all team members have access to necessary tools and resources.


### Adherence to Academic Integrity
- Uphold academic integrity standards and avoid any form of cheating or plagiarism.
- Cite sources appropriately and adhere to any academic guidelines provided by the lecturer.


### Flexibility and Adaptability
- Be open to adapting plans and strategies based on the evolving needs of the project.
- Embrace a flexible mindset to navigate unexpected challenges.


### Professionalism
- Conduct yourself in a professional manner in all interactions within the team and with external stakeholders.
- Represent the team positively in academic and professional settings.


### Conflict of Interest
- Disclose any potential conflicts of interest that may impact the team or project.
- Work collaboratively to find solutions that mitigate conflicts and maintain the team's integrity.


### Consequences for Violations
- Clearly outline the consequences for repeated violations of the code of conduct.
- Ensure that consequences are fair and proportionate to the nature of the violation.


## Quality

Quality is paramount to the success of our project. We are committed to delivering a high-standard, error-free solution
that meets the expectations of Parantion. To ensure quality throughout the development process, we adhere to the
following principles:
- Coding Standards: All team members will adhere to established coding standards and best practices for TypeScript.
This includes consistent formatting, meaningful variable names, and proper documentation.
- Code Reviews: Regular code reviews will be conducted to ensure that code quality is maintained. Feedback from reviews
will be constructive and focused on improvement.
- Testing: Comprehensive testing strategies, including unit tests and integration tests, will be implemented to identify
and rectify bugs at an early stage. Each team member is responsible for testing their own code before submitting it for
review.
- communication: Open and transparent communication is essential for effective collaboration. Team members will 
communicate progress, challenges, and updates regularly during meetings and through designated channels.
- Collaboration Tools: Utilization of collaboration tools, such as Gitlab and sharing fil platforms, will be consistent
to facilitate efficient teamwork and organization.
- Documentation: All code will be thoroughly documented to ensure that it is understandable and maintainable. This
includes inline comments and JavaDoc comments for significant methods or components.
- Continuous Improvement: The team will strive for continuous improvement throughout the development process. This
includes learning new skills, incorporating feedback, and adapting to changing requirements.
- Project Management: The team will follow Scrum principles for project management. This includes regular stand-up
meetings, sprint planning, and sprint retrospectives. The team will also utilize a Gitlab board to track progress and
ensure that tasks are completed on time.
- Version Control: The team will utilize Gitlab for version control. This includes committing code regularly, writing
clear commit messages, and pushing code to the repository at the end of each day.
- Security: Security considerations will be taken into account during the development process. This includes following
secure coding practices and mitigating potential vulnerabilities.
- Performance: The team will ensure that the code meets performance requirements specified in the user story. This
includes conducting performance tests and optimizing the code for efficiency.
- Deployment: The team will ensure that the code is ready for deployment to the target environment. This includes
documenting and applying any environment-specific configurations.
- Accountability: Each team member is accountable for their assigned tasks and responsibilities. If a member is unable
to fulfill their duties, they should proactively seek assistance or delegate tasks.
- Flexibility: The team will be open to adapting plans and strategies based on the evolving needs of the project. This
includes embracing a flexible mindset to navigate unexpected challenges.


## Team Members
### Product Owner
- Viktor
### Frontend 
- Jafar
- Viktor
- Yaroslav
- Justin
### Backend
- Yaroslav
- Aleks
- Ferhat
- Rubén
- Justin
- Viktor
- Jafar
### Editor of Documentation
- Jafar
- Viktor
- Aleks
- Yaroslav
- Justin
- Rubén
- Ferhat
### Scrum Master
- (Rotative)
### Database Administrators
- Justin
- Viktor

# Definition of Done (DoD)
## 1. Code Implementation:
- The code has been developed according to the specifications outlined in the user story or task.
- The code meets the coding standards and guidelines set by the team.

## 2. Code Testing:
- Comprehensive unit tests have been written to cover the functionality of the code.
- All tests have been executed, and the code passes all test cases successfully.
- Any identified bugs or issues have been addressed, and additional tests have been added if necessary.

## 3. Code Review and Collaboration:
- The code has undergone a thorough peer review process.
- Feedback from team members has been considered and incorporated into the code.
- All questions and suggestions related to the code have been addressed.

## 4. Version Control:
- The code has been pushed to the designated version control system (GitLab).
- Commit messages are clear, concise, and follow the team's version control conventions.
- Team members have been notified of the code changes through appropriate channels.

## 5. Documentation:
- The code includes inline documentation using appropriate comments.
- For significant methods or components, comprehensive JavaDoc comments have been added.
- Documentation is updated to reflect any changes made to the code.

## 6. Code Quality:
- The code adheres to best practices and design principles.
- Code smells and duplication have been minimized.
- The code is maintainable, modular, and follows a consistent coding style.

## 7. Integration:
- The code integrates seamlessly with the existing codebase.
- Any integration issues with other components have been resolved.

## 8. Security:
- Security considerations relevant to the code have been addressed and implemented.
- The code follows secure coding practices to mitigate potential vulnerabilities.

## 9. Performance:
- The code meets performance requirements specified in the user story.
- Performance tests, if applicable, have been conducted and passed.

## 10. Deployment Readiness:
- The code is ready for deployment to the target environment.
- Any environment-specific configurations are documented and applied.

## Workflow Progress:
- Moved to "Doing" on the issue board.
- Moved to "Testing" on the issue board.

## Task Closure:
- The task or user story is marked as "Closed" in the board.
- Any associated documentation, such as release notes, has been updated.


# Stakeholders Information


## Development Team:
- Jafar Alirahmi - 535566
- Viktor Krastev - 526479
- Justin Fuchs - 497905
- Rubén Gómez - 554913
- Yaroslav Peptiuk - 540323
- Aleks Proskurkin - 531826
- Ferhat Kelten - 531801
- Lecturer: Eelco Visser
## Parantion:
- Client: Nicky Henzen - @n.henzen



# Plan Of Approach (POA)



## Contents

1. Introduction
2. Background
3. Results
4. Organization
5. Borders and Risk
6. Conclusion


## 1. Introduction

This document will describe the Plan of Approach for the group project "Client on Board" in the 2nd quartile of the
second year for 2023/2024. The name of the company that made the assignment is Parantion. The product we are asked to
deliver is a solution in the form of a program for managing performance automatic regression testing.

The plan will cover everything from understanding what Parantion needs to looking at how other people do similar things
in the software world. We'll decide what our program needs to do and how it should work. We know that things might not
always go smoothly. Thus, we'll think ahead about what could go wrong and come up with ways to fix problems quickly.
This way, we can keep the project moving forward.

## 2. Background

Dynamic Deventer company Parantion is looking to streamline its JetBrains Space-managed manual regression testing
procedure. The company envisions a web-based system that will allow administrators to manage test cases, configure
sprints, and track progress in order to address inefficiencies.

**Frontend:** In keeping with Parantion's innovation objectives, the team chooses **Svelte**, a platform renowned for
its performance and simplicity, which offers a responsive user interface.

**Backend:** Using **JavaScript** in conjunction with **Express.js** guarantees a strong, statically-typed base for
server-side functions.

**Database:** The inclusion of MySQL enhances data management capabilities, providing a reliable and scalable solution
for storing and retrieving essential information.

This technology stack, which includes TypeScript and Svelte, not only fits with the team's experience but also presents
the Regression Testing Management System as a cutting-edge option. Future improvements are supported by the iterative
development methodology, which guarantees that the system adapts to Parantion's changing requirements for dynamic
testing.


## 3. Results


- Implementing a websocket, will allow for immediate reporting of blockers encountered during testing.
  It will provide real-time notifications to relevant stakeholders when blockers are identified. It will be easier to
  solve problems.
- Regression Test Reporting:
  Reporting system provides a clear overview of completed regression tests for each part of the project.
  Detailed reports could include information on passed and failed tests, allowing for a quick assessment of the
  product's stability.
- Board Reset for New Sprint:
  Development of a feature that allows for easy resetting of a new testing board to streamline the transition to a new
  sprint could involve archiving previous test data and configurations for a clean slate.
- Progression Tracking Based on Weight:
  This could provide insights into the overall progress of testing based on the assigned weight to different test cases.
- Test Due Date Notifications:
  Integration of a notification system to remind testers about upcoming test.
  This feature ensures that testing activities stay on schedule, so they can get it easier, contributing to timely
  product development.

## 4. Organization

In terms of organization, each team member has a specific role and responsibilities. The team works closely together to
communicate effectively and complete tasks efficiently. Team management tools and social media platforms, such as
Discord and Google Docs, are used to stay in touch and share documents. The project is broken down into smaller tasks
for each sprint, and after discussing and deciding on the tasks, each team member is responsible for completing them in
a timely manner. tri-weekly meetings are held at university and additional meetings can be scheduled as needed. The team
also uses Discord and video conferencing to stay in touch outside the classroom. Feedback is encouraged and used to
improve the work of the team. However, in case a team member does not complete their task or does not show up,
the following steps will be taken: first with communication and reminder, then consequences such as warning or strikes,
and at the end, escalation to the instructor if the problem persists. It is important to keep in mind that the team is
a cohesive unit and everyone's contributions are important for the success of the project. Therefore, non-compliance or
non-attendance issues should be addressed in a timely and professional manner and a solution that is fair for the whole
team should be found.



## 5. Borders and Risk

There are some potential challenges, limitations and risks that may affect the project.

* One of our teammates might not put in their expected time and effort into the project, which could affect our overall
  effort and project's timeline.
* If a teammate doesn't pull before pushing the code, it will cause merge conflicts for others.
* Less communication with teammates can lead to problems in finishing the project on time.
* Not choosing a programming language that everyone agrees for this project might cause delays in completing the project
  on time.
* Not attending the class on time might create problems in catching up with the project.
* Insufficient testing, during development and before deployment can cause critical issues in the project.
* If the project objectives are not well-defined, it can cause to confusion and a lack of a focus.
* Changes in project requirements after starting development can cause delays and may require significant adjustments to
  the existing work.
* Insufficient documentation of code, processes and decisions can make it difficult for team members to understand and
  maintain the project.


## 6. Conclusion

In summary, our Plan of Approach lays out a practical strategy for building a regression testing system tailored to
Parantion's needs. We've chosen a tech stack that makes sense and outlined features that aim to improve testing
efficiency. Team organization follows Scrum principles for a structured workflow.
in the Borders and Risk chapter we have identified potential challenges like time management and code integration and
have plans to deal with them. Simply put, our plan is focused towards delivering a solution that meet Parantion's
requirements.



