packages required by environment:
- python 3.5
- pip
- django
- djangorestframework
____________________________________________________________________

REST api framework requests:

- CREATE (POST):
    - add new item: http://localhost:8000/restlist/ with params:
        - first_name
        - last_name
        - email
        - birth_date
     
- RETRIEVE (GET):
    - get whole list: http://localhost:8000/restlist/
    - get single element: http://localhost:8000/restlist/{{element_id}}/   

- UPDATE (PATCH):
    - update single item: http://localhost:8000/restlist/{{element_id}}/  with params:
        - first_name
        - last_name
        - email
        - birth_date
        
- DELETE (DELETE):
    - remove single item by item id: http://localhost:8000/restlist/{{element_id}}/
