# Schedule - RS School course schedule

### Project - https://github.com/GoldenkovVitali/schedule/projects
### Task description - https://github.com/rolling-scopes-school/tasks/blob/master/tasks/schedule.md

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

# application documentation
## Deploy - [schedule](https://heuristic-almeida-b20599.netlify.app)
## The project is an RS School curriculum with the ability to view and edit data

## The project used WebPack and there is a file package.json. Framework used react. 
## Third party libraries applied:

#### Ant Design(npm install antd --save) - An enterprise-class UI design language and React UI library
#### Moment.js(npm install moment --save) - Parse, validate, manipulate, and display dates and times in JavaScript
#### @ant-design/icons(npm install @ant-design/icons --save) - Ant Design Icons for React
#### mapbox-gl(npm install mapbox-gl --save) - Mapbox GL JS is a JavaScript library that uses WebGL to render interactive maps from vector tiles and Mapbox styles. It is part of the Mapbox GL ecosystem, which includes Mapbox Mobile, a compatible renderer written in C++ with bindings for desktop and mobile platforms.
#### react-color(npm install react-color --save) - A Collection of Color Pickers from Sketch, Photoshop, Chrome, Github, Twitter, Material Design & more
#### react-modal-button(npm install react-modal-button --save) - A simple responsive and accessible react modal compatible with React 16 and ready for React 17
#### ColTransfer (npm install ColTransfer --save) library for color change
#### ControlPanel (npm install ControlPanel --save) - Embeddable panel of inputs for adding parameter selection to your app or visualization. Modern and minimalist design. Fully encapsulated module including JS and CSS
#### FullCalendar (npm install --save @fullcalendar/react @fullcalendar/daygrid) - library react component to make calendar

### ctest API used for the application - (https://rs-react-schedule.firebaseapp.com/api/docs/)

WebPack настроен на работу с js-модулями и SASS, сборка осуществляется в папку Dist

### Preparatory steps:

1.Install node.js along with npm (node package manager) - if not already done)

2.Clone or download this repository (clone, download)

3.In the command line (terminal, bush, pwsh) run: npm install

### Project start:

#### Way #1:

1.On the command line, run: npm run build (will compile the Dist folder)

2.Open ./docs/index.html in the latest Google Chrome browser

#### Way #2:

1.At the command line, run: npm run dev

2.Wait the browser will automatically open the project
