import API from "../services/api";

export const submitReview = async (id, rating, review) => {
  const response = await API.put(`/services/${id}/review`, {
    rating,
    review,
  });
  return response.data;
};