## werk
Job Application Tracker

## Overview
Werk is a web application that allows users to record and manage their job applications in an organized and presentable manner. Users can add details about each job application, such as the company, position, resume used, cover letter status, and notes. The application then provides a comprehensive list of all the user's current applications along with their respective statuses. Additionally, the project aims to introduce a dashboard feature that will offer further insights and statistics, such as the percentage of applications that progressed through specific interview stages or the success rate of applications with cover letters.

## Technologies Used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat-square&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB) ![supabase](https://img.shields.io/badge/supabase-%2523323330.svg?style=flat-square&logo=supabase) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=flat-square&logo=git&logoColor=white)

## Setup and Installation

## Database Setup
The Job Application Tracker utilizes a PostgreSQL database through Supabase. The database has been configured to enable comprehensive tracking of application changes and enforce data access controls.

### Application Changes Tracking
To track changes made to job applications, a trigger was implemented in the applications table. This trigger detects modifications to the status or stage columns within a row and executes a function that captures the timestamp, application details, and the old and new values of the modified columns. This information is then stored in the applications_changes table, facilitating the rendering of a concise application history on the front end.

### Row Level Security
Row-level security measures have been implemented to control data access within the database. Specifically:
- Only authorized users can modify their own application records. This is achieved through row-level security policies that restrict modifications to rows owned by the authenticated user. Unauthorized users are prevented from modifying or tampering with other users' application data.
- Access to certain applications can be granted to the public. By setting a user's profile to "public," the associated applications can be viewed by anyone, even if they are not authenticated.

These security measures help ensure data integrity and privacy while allowing users to maintain control over their own application records.

## Usage
On the list, you can view a list of your current job applications along with their respective statuses.
To add a new application, click the "Add Application" button and fill in the required details, such as company and position.
Optionally, you can specify if a cover letter was added and add any additional information relating to the application.
To view an application's history and notes, click on the application from the list, and an accordion will open with a detailed view of that application.
The application dashboard, coming soon, will provide visual data and statistics about your job applications, such as the effectiveness of using cover letters, the percentage of applications without responses, and more.

## Known Issues and Future Enhancements
Currently, the dashboard functionality is under development and will be added in future updates.
Please refer to the "Issues" tab in the repository for a list of known issues.

Feel free to reach out to [Nathaniel](https://github.com/nathanielbelen) with any questions, feedback, or suggestions for improvements.