import { apiRequest } from "./api";

export function getDashboardRequest() {
  return apiRequest("/api/dashboard");
}

export function getTasksRequest() {
  return apiRequest("/api/dashboard/tasks");
}

export function getUsersRequest() {
  return apiRequest("/api/dashboard/users");
}
