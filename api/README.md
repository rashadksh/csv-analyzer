## API documentation

- **Process csv file**

  - Request
    ```text
    POST /api/csv
    {
      file: File
    }
    ```
  - Response
    ```json
    {
      "id": "fileid",
      "name": "products",
      "state": "uploaded",
      "header": [],
      "charts": [],
      "createdAt": "2020-01-01",
      "updatedAt": "2020-01-01"
    }
    ```

- **Get all csv files**

  - Request
    ```text
    GET /api/csv
    ```
  - Response
    ```json
    [
      {
        "id": "fileid",
        "name": "products",
        "state": "uploaded",
        "header": ["name", "price", "category"],
        "charts": [
          {
            "title": "Average price per category",
            "type": "bar",
            "values": [
              {
                "name": "Kitchen",
                "value": 10
              }
            ]
          }
        ],
        "createdAt": "2020-01-01",
        "updatedAt": "2020-01-01"
      }
    ]
    ```

- **Get single csv file by id**

  - Request
    ```text
    GET /api/csv/:id
    ```
  - Response

    ```json
    {
      "file": {
        "id": "fileid",
        "name": "products",
        "state": "uploaded",
        "header": ["name", "price", "category"],
        "charts": [
          {
            "title": "Average price per category",
            "type": "bar",
            "values": [
              {
                "name": "Kitchen",
                "value": 10
              }
            ]
          }
        ],
        "createdAt": "2020-01-01",
        "updatedAt": "2020-01-01"
      },
      "rows": [
        {
          // ...shape of the uploaded csv
        }
      ]
    }
    ```

- **Ask csv file by id**
  - Request
    ```json
    POST /api/csv/:id/ask
    {
      "question": "what is the highest price?"
    }
    ```
  - Response
    ```json
    {
      "answer": "The highest price is 5"
    }
    ```
