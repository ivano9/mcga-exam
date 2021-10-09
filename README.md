# MCGA First Exam
This is a proyect that solve the exam

## Running the api rest
This steps are compatibles over OS Unix based

### Minimun requirements

* nodejs 15 or above
* npm 7 or above

### Execute
1. Copy and paste on the terminal the next command:
  ```bash
  git clone https://github.com/ivano9/mcga-exam.git && \
  cd mcga-exam && \
  npm install
  ```
2. Configure the `.env` file
3. Run npm `run start` or on mode development `npm run dev`
4. The api are running on `http://localhost:3000`

## Seeding

Collections to populate at the momment:

* Orders

Run `npm run seed` to populate the DB:

## API Resources

* Prefix: `/api/v1.0`

| Method | URI               |
| ------ | ----------------- |
| GET    | /orders           |
| GET    | /orders/:id       |
| GET    | /orders?:query    |
| POST   | /orders           |
| PATCH  | /orders/:id       |
| DELETE | /orders/:id       |

## API Documentation
* [Api Docs](https://documenter.getpostman.com/view/7036154/UV5RkKoD)

## Dployed on Heroku

* [API BASE URL](https://mcga-exam.herokuapp.com/)

## Author
[Iván Giovanazzi](https://linkedin.com/in/ivanog)
