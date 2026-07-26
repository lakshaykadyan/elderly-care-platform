import axios from "axios";

const API = "http://localhost:5000/api/services";

export const submitReview = async (id, rating, review) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/${id}/review`,
    {
      rating,
      review,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};