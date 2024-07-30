# Exercise 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: This post request includes the "content" and "date" info of the new note as JSON data in payload

    server-->>browser: Status: code 201 Created
    deactivate server


    Note right of browser: With this the javascript file reiterates the notes list and shows it in the HTML
```
