# Risks Manager Project

This is a Flask project for managing risks. It includes both the backend API and a frontend application.

## Requirements

- Python 3.x
- MongoDB
- Node.js (for frontend development)

## Installation and Run Backend

1. Clone the repository:

```bash
git clone https://github.com/alejomjc/risks-manager.git
```

2. Navigate to the project directory:
```bash
cd risks-manager
```

3. Create a virtual environment and activate it:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

4. Install the required Python packages:
```bash
pip install -r requirements.txt
```

5. Set up MongoDB:

Make sure you have MongoDB installed locally.
Create a new database named risksmanagerdb.

6. Run the Flask application:
```bash
python app.py
```

## Installation and Run Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install frontend dependencies and start the frontend server:
```bash
npm install
npm start
```

## First Access
For access to first time, login in the app with the following credentials. When you in, change the password immediately for more security.
```bash
username: admin
password: admin
```
This action must be done twice, the first creates the administrator user and generates the example data for risks. and the second, log in.

## Usage
- Access the API at http://localhost:5000
- Access the frontend application at http://localhost:3000
- Access the Swagger documentation at http://localhost:5000/apidocs

## Contributing
1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature/new-feature.
3. Commit your changes: git commit -m 'Add new feature'.
4. Push to the branch: git push origin feature/new-feature.
5. Submit a pull request.

## License
This project is licensed under the MIT License.

