# Angular Versions Comparison Applications Source Files

### Evolution of the Angular Framework: Analysis and Comparison of Successive Versions
#### Master's Thesis Research Project by Aleksandra Malinowska 
_Poznan University of Technology, Faculty of Computing and Telecommunications_


#### Summary

This master's thesis addresses the evolution of the Angular framework by analyzing and comparing its successive versions. The aim of the study is to present the changes introduced in Angular, considering both technical and functional aspects. The paper examines the historical background and then identifies key differences between individual versions, starting from the fundamental architecture of the framework up to version 17. Performance tests were also conducted, followed by an assessment of the impact of the introduced changes on the performance, scalability, and code quality of applications. The results of the research indicate a significant development of the framework, which meets the needs of the dynamically changing web technology market.

**Keywords**: Angular, evolution, analysis, comparison, versions, history, performance, scalability, code quality

---

## Characteristics of the Applications

### Introduction

This repository contains the source files for various test applications created for performance testing across different versions of Angular, from version 6 to version 17. Each application was initialized using the `ng new` command from the Angular CLI for the respective version. Default configurations were maintained to utilize settings recommended by the Angular team. Performance tests were conducted on production builds, executed via a local HTTP server using the `http-server` package.


### Directory Structure

- **common**: This directory contains shared files responsible for measuring view update times. These common elements include:
    - **Data model interface**: Defines the data used in tests.
    - **Helper class**: Contains methods for measuring view update times.
    - **Abstract simulation service class**: Serves as a base for implementing specific simulation services.


- **server**: Contains an Express server serving the test data. This local server ensures that the data file impacts the final bundle size and avoids any external server requests that could affect the measurements.


- **v6 - v17**: These directories contain the test applications for each Angular version. The applications are functionally identical, featuring a simulation control panel and a data presentation list. Each version only uses fully supported production features for its implementation:
    - From version 15 onwards, the Standalone API replaces the modular architecture used in versions 6 to 14.
    - Version 17 introduces the use of Signals and Control Flow, significantly altering the implementation of the main component template and simulation service.
    - Previous versions use `Observable`, `BehaviourSubject`, `AsyncPipe`, and `*ngFor` to replicate these functionalities.

### Tested Applications

To conduct performance tests, applications created with Angular versions 6 to 17 were utilized. Each was initialized with the `ng new` command from the respective Angular CLI version. Default configurations were preserved to leverage Angular team recommendations. Tests were conducted on production builds, run via a local HTTP server using the `http-server` package. Detailed information on the package versions used in the tests can be found in the table below, aligned with the official documentation guidelines.

| **Release** | **Angular** | **Angular CLI** | **Node.js** | **npm** |
|-------------|-------------|-----------------|-------------|---------|
| 17          | 17.3.11     | 17.3.8          | 20.11.0     | 10.2.4  |
| 16          | 16.2.12     | 16.2.14         | 18.16.0     | 9.5.1   |
| 15          | 15.2.10     | 15.2.11         | 18.16.0     | 9.5.1   |
| 14          | 14.3.0      | 14.2.13         | 16.18.1     | 8.19.0  |
| 13          | 13.3.12     | 13.3.11         | 16.18.1     | 8.19.2  |
| 12          | 12.2.17     | 12.2.18         | 14.21.3     | 6.14.18 |
| 11          | 11.2.14     | 11.2.19         | 12.11.1     | 6.11.3  |
| 10          | 10.2.5      | 10.2.4          | 12.11.1     | 6.11.3  |
| 9           | 9.1.13      | 9.1.15          | 12.11.1     | 6.11.3  |
| 8           | 8.2.14      | 8.3.29          | 10.13.0     | 6.4.1   |
| 7           | 7.2.16      | 7.3.10          | 10.13.0     | 6.4.1   |
| 6           | 6.1.10      | 6.2.9           | 8.17.0      | 6.13.4  |


### Differences Between Versions

All applications are functionally identical, with a main view consisting of a simulation control panel and a data presentation list. However, only fully supported production features in each Angular version were utilized for implementation:
- From version 15 onwards, the Standalone API is used instead of the modular architecture in versions 6 to 14.
- Version 17 introduces Signals and Control Flow, altering the main component template and simulation service implementation.
- Previous versions use `Observable`, `BehaviourSubject`, `AsyncPipe`, and `*ngFor` to replicate these functionalities.

In version 17, the `track` directive was introduced to identify list elements. In versions 6-16, this corresponds to the `trackBy` parameter, which, if omitted, does not cause a compilation error and was thus not used.

### Data Source Characteristics

The data used in tests was pre-generated and loaded from a common local file. This file was served locally through an Express server to ensure it impacts the final bundle size and avoids external server requests that could skew the measurements. Using external server requests was deemed unnecessary for this study, as they are not directly related to changes in successive Angular versions.

---

## Build & Run

### Prerequisites

Before building and running the applications, ensure that you have the following software installed:

- **Node.js** 
- **npm** 
- **Angular CLI** 

For the exact Node.js, npm, and Angular CLI versions, refer to the "Tested Applications" section.

### Building the Applications

Each version of the test application can be built separately. Follow these steps:

1. **Navigate to the desired version's directory**:
    ```sh
    cd v[version_number]
    ```
   Replace `[version_number]` with the specific Angular version (e.g., `cd v6`).


2. **Install the dependencies**:
    ```sh
    npm install
    ```

3. **Build the application**:
    ```sh
    npm run build
    ```

The production build files will be generated in the `dist/` directory within the version's directory. _Exception: For version 17 generated files are located in the `dist/browser` directory._


### Running the Applications

To run the applications locally, follow these steps:

1. **Start the Express server**:
    - Ensure that you have Node.js ~20.11 installed.
    - Open a new terminal window.

    - Navigate to the `server` directory:
      ```sh
      cd server
      ```
    - Install the dependencies:
      ```sh
      npm install
      ```
    - Start the server:
      ```sh
      node server.js
      ```
   The Express server will start, serving the test data locally. _Note: The server must be running to load the data in the applications._



2. **Serve the production build files using `http-server`**:
    - Open another terminal window.
    - For versions 6-16:
      - Navigate to the `dist/` directory of the desired version:
        ```sh
        cd v[version_number]/dist
        ```
        Replace `[version_number]` with the specific Angular version.
    - For version 17:
        - Navigate to the `dist/browser` directory:
          ```sh
          cd v17/dist/browser
          ```
    - Start the local server using `http-server`:
      ```sh
      npx http-server -p 8080
      ```

       The application will be accessible at `http://localhost:8080`.

---

### License & Copyright

This project is licensed under the MIT License. For more details, refer to the [LICENSE](LICENSE) file in the repository. All content is © Aleksandra Malinowska, 2024. All rights reserved.