# backend/Dockerfile

# build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy csproj first (adjust name if different!)
COPY *.csproj ./
RUN dotnet restore

# copy everything and publish
COPY . .
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

# 👇 Change EmpHub.dll to match your project name (same as .csproj filename)
ENTRYPOINT ["dotnet", "EmpHub.dll"]
