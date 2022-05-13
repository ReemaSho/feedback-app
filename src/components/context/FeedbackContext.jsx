import { v4 as uuidv4 } from "uuid";
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    fetchFeedback();
  }, []);
  // get feedbacks
  const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id&_order=desc");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };
  const [feedbackToEdit, setFeedbackToEdit] = useState({
    item: {},
    editMode: false,
  });
  // post feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback?_sort=id&_order=desc", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newFeedback),
    });
    if (response.ok) {
      const data = await response.json();
      setFeedback([data, ...feedback]);
    } else {
    }
  };
  // delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await fetch(`/feedback/${id}`, { method: "DELETE" });
      if (response.ok) {
        setFeedback(feedback.filter((item) => item.id !== id));
      }
    }
  };
  const editFeedback = (item) => {
    setFeedbackToEdit({
      item,
      editMode: true,
    });
  };

  const updateFeedback = (id, newFeedback) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...newFeedback } : item
      )
    );
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackToEdit,
        isLoading,
        errorMessage,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        setErrorMessage,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
