# schedule

Project - https://github.com/GoldenkovVitali/schedule/projects
## Workflow:

1) Create an issue and **don't forget to point the project in issue settings** (skip this step if the issue is already created)
2) Pull changes from `develop`. Create a branch and work in there.

   **Naming for branches: feat/fix(#\<issue-number>)-<issue-name or bug description(shortened)>**

   Examples: 
   
   _feat(#1)-api-service_
   
   _fix(#1)-fix-incorrect-path_
3) You need to add commits with the following naming: 

   **Naming for commits: feat/fix(#\<issue-number>): \<commit message>**
 
   Example: 
   
   _feat(#1): initial structure_
   
   _fix(#1): remove unnecessary button_
4) After work is done you need to create a pull request to `develop` branch.

   Add a meaningful name and description (optionally add screenshots) and **don't forget to point the project in PR settings**

   Also, **don't forget to point the issue number (ex. #1) in PR description**

5) If something works incorrectly, you should point this in the issue comments. In that case, the issue assignee should create a new 'fix' branch from `develop` and fix problems.

6) An issue should be closed if everything is ok or bug is fixed.
