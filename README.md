packages required by environment:
- python 3.5
- pip
- django
- djangorestframework
____________________________________________________________________

REST api framework requests:

- CREATE (POST):
    - add new item: http://localhost:8000/restlist/users/ with params:
        - first_name
        - last_name
        - email
        - birth_date
     
- RETRIEVE (GET):
    - get whole list: http://localhost:8000/restlist/users/
    - get single element: http://localhost:8000/restlist/users/{{element_id}}/   

- UPDATE (PATCH):
    - update single item: http://localhost:8000/restlist/users/{{element_id}}/  with params:
        - first_name
        - last_name
        - email
        - birth_date
        
- DELETE (DELETE):
    - remove single item by item id: http://localhost:8000/restlist/users/{{element_id}}/
_____________________________________________________________________

Run react dev server:

- "cd restModule/frontend"
- "npm start"
_____________________________________________________________________

Build changes of react frontend into python:

- "cd restModule/frontend"
- "npm run build"
- "cd .."
- "mv index.html templates/restlist/"
_____________________________________________________________________

Build python for production:

- run your python environment
- "python manage.py collectstatic"