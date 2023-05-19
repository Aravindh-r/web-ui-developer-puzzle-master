1. Noted Problems
   a. Updated action in reducer and effect for add book to reading list and remove book from reading list to update th state upon confirmation Backend
   b. To Avoid spam of remove book API call updated the operator to handle it.
   c. Updated the type of the variables and args in the class and methods
   d. Updated the date pipe to format the date on runtime.
   e. Should use BEM Standard for SCSS for Better understanding
   f. To get better Accessibility we should use Semantic tag which best describe use of it
2. Added Clear Search functionality to the app . For removing the search term in one click
3. Ran the lighthouse test , below issue detected and fixed
    a. Search Icon for book search
    b. Low-contrast text in the Page on load in the empty content
4. Mannually verified the accessibility and fixed identified accesibility issue
    a. Added accessibilty to newly added clear button
    b. Added accessibilty to Search button
    c. Added accessibilty to want to read button in book list
    d. Added alt attr to the img tag of both book list and reading list
    e. Added accessibilty to remove book in reading list
    f. Added accessibility to Reading list drawer close icon
5. Resolved two test case failure in reading-list-reducer.spec.ts file
6. Resolved lint issue detected
