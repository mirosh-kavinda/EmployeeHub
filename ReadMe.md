-----

# 🚀 Full-Stack Employee Management App

Welcome\! This is a full-stack web application featuring a **React (Vite)** frontend, a **.NET 8 Web API** backend, and a **Microsoft SQL Server** database. The entire environment is containerized with **Docker**, making setup a breeze.


* **UI mock up Link : https://www.figma.com/design/NS8IIJrGu64wfzUUqUjVIO/employeehub?node-id=0-1&p=f&t=8UTgjR53zMbaEo9d-0
* **Git project Link : https://github.com/mirosh-kavinda/EmployeeHub


This project is a full-stack application built with the following technologies:

* **Frontend**: **Vite** and **React**.
* **Backend**: **.NET 8** Web API.
* **Database**: **Microsoft SQL Server 2022+**.
* **Containerization**: **Docker**.
* **Runtime**: **Node.js 20.19.5** is required for the frontend development environment.commands.

-----

## 🛠️ Prerequisites

In this project i used docker to manage and build the whole project one go , but all you can build and added changes on local builds
Before you start, ensure you have the following tools installed on your system.

### 1\. Docker

Docker is essential for running the containerized application.

  * **Windows**: Download and install **[Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)**. Make sure to enable the **WSL 2 backend** during installation, as it's required.
  * **Linux**:
      * **Arch / Manjaro**:"My Setup"
        ```bash
        sudo pacman -S docker
        ```
      * **Ubuntu / Debian**:
        ```bash
        sudo apt-get update
        sudo apt-get install docker.io
        ```
      * After installation, add your user to the `docker` group to run commands without `sudo`:
        ```bash
        sudo usermod -aG docker $USER
        # You'll need to log out and back in for this change to take effect.
        ```

### 2\. .NET 8 SDK

Required for running the backend API manually.

  * **Download**: **[.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)**

### 3\. Node.js

Required for running the frontend application manually.

  * **Download**: **[Node.js](https://nodejs.org/en)** (Version 20.x or later is recommended)

-----

## ⚙️ Environment Configuration

Before launching the application, you need to create configuration files for the backend and frontend. These files tell the services how to connect to each other and the database.

### 1\. Backend Connection String

In the `backend` directory, create or edit the `appsettings.Development.json` file and add your database connection string.

**File:** `backend/appsettings.Development.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection":  "Server=sqlserver;Database=DeptEmpDB;User Id=sa;Password=Mssql_7442_er;TrustServerCertificate=True;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

> **Note**: If you run using Docker Compose, the `Server` name should be the service name defined in `docker-compose.yml` (e.g., `Server=sqlserver`), not `localhost`.

### 2\. Frontend API URL

In the `frontend` directory, create a file named `.env` and add the URL for the backend API.

**File:** `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

-----

## 3\.Docker Composer env build

 make a local .env (copy example) if edit .env if you want to change passwords/ports
   ```bash 
   cp .env.example .env
   ```

 

## 🚀 Running the Application

You have two options for running the project: using Docker Compose (recommended for simplicity) or running each service manually.

### Option 1: Run with Docker Compose (Recommended)

This is the easiest way to get the entire application stack—frontend, backend, and database—up and running with a single command. This method will automatically set up the database using the `init.sql` script.

1.  **Build and Start Containers:**
    Open your terminal in the project's root directory (where the `docker-compose.yml` file is located) and run:

    ```bash
    docker-compose up --build
    ```

    To run in the background (detached mode), add the `-d` flag:

    ```bash
    docker-compose up --build -d
    ```
2.  **Initialize DB:**

      ``` bash
       docker compose logs -f db-init
     ```

3.  **Check Logs:**

      ``` bash
       docker compose logs -f db-init
                  docker compose logs -f sqlserver
      
         docker compose logs -f backend
         docker compose logs -f frontend

     ```
3.  **Access the Application:**

      * **Frontend**: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
      * **Backend API**: [http://localhost:5000](https://www.google.com/search?q=http://localhost:5000)

3.  **Stopping the Application:**
    To stop all containers, press `Ctrl + C` in the terminal or run:

    ```bash
    docker-compose down
    ```
    To remove containers
     ```bash
    docker-compose down -v
    ```

### Option 2: Run Each Service Manually

Use this method if you want to run the frontend, backend, and database as separate processes for development or debugging purposes.

#### Step 1: Start the SQL Server Container // you can use Server manager for

First, start the SQL Server database using Docker.

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Mssql@7442er" \
           -p 1433:1433 \
           --name sql1 \
           -d mcr.microsoft.com/mssql/server:2022-latest
```

Check if the container is running with `docker ps`.

update backend/appsetting.json
```text
"DefaultConnection": "Server=localhost,1433;Database=DeptEmpDB;User Id=sa;Password=Mssql@7442er;TrustServerCertificate=True;"
```
if go with the Local Servers (windows/ssms) connection string goes like this (backend)

```text
"DefaultConnection" :Server=localhost;Database=DeptEmpDB;User Id=sa;Password=Mssql@7442er;TrustServerCertificate=True;"


#### Step 2: Set Up the Database

Connect to the database using a tool like **DBeaver**, **SSMS**, or the command-line tool `sqlcmd`. Then, run the following SQL script to create the database and tables.

-- db/init/init.sql // this is the init DB Script

#### Step 3: Run the .NET Backend

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies and run the API:
    ```bash
    dotnet restore
    dotnet run
    ```
    The API will be available at `http://localhost:5000`.

#### Step 4: Run the React Frontend

1.  In a **new terminal**, navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies and start the development server:
    ```bash
    npm install
    npm start
    ```
    The frontend will be available at `http://localhost:3000`.

-----

## 🧰 Useful Docker Commands

Here are some helpful commands for managing the standalone SQL Server container (`sql1`).

  * **Stop the container:**
    ```bash
    docker stop sql1
    ```
  * **Start the container again:**
    ```bash
    docker start sql1
    ```
  * **View container logs:**
    ```bash
    docker logs sql1
    ```
  * **Remove the container (⚠️ this deletes all data):**
    ```bash
    docker rm -f sql1
    ```