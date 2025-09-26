# 🚀 Project Setup Guide

This project consists of two main parts:

1. **Frontend (Vite(React Based) )**
2. **Backend (.NET API with SQL Server)**

Both work together to provide a full-stack application.
---

## 🛠️ Prerequisites

Before you begin, make sure you have installed:

* [Docker](https://docs.docker.com/get-docker/)
* [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download)
* [Node 20.19.5 ]  + Vite (for frontend)



  ```bash
  sudo pacman -S docker unixodbc
  ```

---

## 🪟 Windows Users – Docker & SQL Server Setup

If you are using a **Windows PC**, follow these steps to set up SQL Server with Docker:

### 1️⃣ Install Docker Desktop

* Download from: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
* Install and ensure **WSL 2** is enabled (Docker requires it on Windows).

### 2️⃣ Pull SQL Server Docker Image

Open **PowerShell** or **Command Prompt**:

```powershell
docker pull mcr.microsoft.com/mssql/server:2022-latest
```

### 3️⃣ Run SQL Server Container

```powershell
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Mssql@7442er" `
           -p 1433:1433 `
           --name sql1 `
           -d mcr.microsoft.com/mssql/server:2022-latest
```

> Make sure the password meets SQL Server complexity rules.

### 4️⃣ Connect Using Tools

You can use any of the following to manage your database:

* **SQL Server Management Studio (SSMS)** – Windows native GUI:
  [Download SSMS](https://aka.ms/ssmsfullsetup)

* **DBeaver** (cross-platform):

  * Host: `localhost`
  * Port: `1433`
  * Username: `sa`
  * Password: `Mssql@7442er`
  * Enable **Trust server certificate** if prompted.

### 5️⃣ Verify Connection

* Open SSMS or DBeaver and connect to `localhost:1433`.
* Run:

```sql
SELECT name FROM sys.databases;
GO
```

You should see the `master` database. Later, you can create `DeptEmpDB` as described in the setup.

💡 **Tip for Windows Users:**

* Docker Desktop must be **running** before starting the container.
* Make sure **port 1433** is not blocked by firewall.
* Password must be strong (at least 8 characters, uppercase, lowercase, digit, symbol).

---

## 🐳 Running SQL Server with Docker (Linux / Manjaro)

Start SQL Server 2022 inside Docker:

```bash
docker run -e 'ACCEPT_EULA=Y' \
           -e 'SA_PASSWORD=Mssql@7442er' \
           -p 1433:1433 \
           --name sql1 \
           -d mcr.microsoft.com/mssql/server:2022-latest
```

Check container status:

```bash
docker ps
```

---

## 🗄️ Database Setup

1. Connect using `sqlcmd` (or DBeaver):

   ```bash
   sqlcmd -S localhost -U sa -P 'Mssql@7442er' -C
   ```

2. Create the database:

   ```sql
   CREATE DATABASE DeptEmpDB;
   GO
   ```

3. (Optional) Add sample tables:

   ```sql
   USE DeptEmpDB;
   CREATE TABLE Departments (
       DeptId INT PRIMARY KEY IDENTITY,
       DeptName NVARCHAR(100) NOT NULL
   );

   CREATE TABLE Employees (
       EmpId INT PRIMARY KEY IDENTITY,
       EmpName NVARCHAR(100) NOT NULL,
       DeptId INT FOREIGN KEY REFERENCES Departments(DeptId)
   );
   GO
   ```

---

## ⚙️ Backend Setup (.NET)

1. Navigate to backend project folder:

   ```bash
   cd backend
   ```

2. Restore packages:

   ```bash
   dotnet restore
   ```

3. Update `appsettings.json` with your connection string:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost,1433;Database=DeptEmpDB;User Id=sa;Password=Mssql@7442er;TrustServerCertificate=True;"
   }
   ```

4. Run the backend API:

   ```bash
   dotnet run
   ```

Backend should now be available at:
👉 [http://localhost:5000](http://localhost:5000) (or the port defined in your launch settings)

---

## 💻 Frontend Setup

1. Navigate to frontend project:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

Frontend should now be available at:
👉 [http://localhost:3000](http://localhost:3000) (or the configured port)

---

## 🔗 Connecting Frontend to Backend

* Update your frontend `.env` file (or config file) with the backend API URL:

  ```env
  REACT_APP_API_URL=http://localhost:5000
  ```

* Frontend will call backend API, which communicates with the SQL Server DB.

---

## ✅ Quick Test

1. Insert data into SQL Server (via DBeaver or `sqlcmd`).
2. Start backend → it should expose endpoints like `/api/employees`.
3. Start frontend → it should fetch data from backend API.

---

## 🧰 Useful Commands

Stop SQL Server container:

```bash
docker stop sql1
```

Start again:

```bash
docker start sql1
```

Remove container (⚠️ deletes DB):

```bash
docker rm -f sql1
```

---

## 📌 Notes

* Default SQL user → **sa**
* Default password → **Mssql@7442er**
* Default database → **DeptEmpDB**
* If you run into SSL/TLS issues on Linux, use `TrustServerCertificate
