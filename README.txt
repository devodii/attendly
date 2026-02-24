Attendly is a web app created to track the attendance of students offering a certain course.
It is set to be operated by the course lecturer and not the students.
Attendly provides two fields whose input are required to be able to identify each student: Name and Matriculation number.
When the cursor focuses on an input field, the border highlights. 
Attendly raises an error when either or both fields is left empty and the 'add' button is clicked.
IF a person was wrongly added (impersonation by a friend as a coverup for the student's lateness or absence), there is an option to switch a student's status from present to absent.
IF a person failed to provide the accurate matriculation number or name, the list can be updated by simply adding the correct ones, as this action automatically strikes out the the first instance of either input.
At the end of each day/week/month, the lecturer may decide to clear the list using the clear button.
Until then, the list remains stored in the browser's local storage such that it is always available across refresh until it is cleared.