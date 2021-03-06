import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import RatingSelect from "./shared/RatingSelect";
import Button from "./shared/Button";
import FeedbackContext from "./context/FeedbackContext";
const FeedbackForm = () => {
  const {
    addFeedback,
    feedbackToEdit,
    updateFeedback,
    errorMessage,
    setErrorMessage,
  } = useContext(FeedbackContext);
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [rating, setRating] = useState(10);
  useEffect(() => {
    if (feedbackToEdit.editMode === true) {
      setText(feedbackToEdit.item.text);
      setRating(feedbackToEdit.item.rating);
      setBtnDisabled(false);
    }
  }, [feedbackToEdit]);
  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setErrorMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setErrorMessage("Text must be at least 10 characters");
    } else {
      setErrorMessage(null);
      setBtnDisabled(false);
    }

    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      if (feedbackToEdit.editMode === true) {
        updateFeedback(feedbackToEdit.item.id, newFeedback);
        setText("");
      } else {
        addFeedback(newFeedback);
        setText("");
      }
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect rating={rating} setRating={setRating} />
        <div className="input-group">
          <input
            type="text"
            onChange={handleTextChange}
            value={text}
            placeholder="type a review"
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {errorMessage && <div className="message">{errorMessage}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
