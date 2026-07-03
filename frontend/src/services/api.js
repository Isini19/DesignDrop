import axios from 'axios';

// Base URL for all API calls to Spring Boot backend
const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Auth API calls
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Listings API calls
export const getListings = () => API.get('/listings');
export const createListing = (data, sellerEmail) => 
  API.post(`/listings/create?sellerEmail=${sellerEmail}`, data);
export const getPendingListings = () => API.get('/listings/pending');
export const approveListing = (id) => API.put(`/listings/${id}/approve`);
export const rejectListing = (id) => API.put(`/listings/${id}/reject`);