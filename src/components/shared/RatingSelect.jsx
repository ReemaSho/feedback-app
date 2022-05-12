import PropTypes from "prop-types";
import FeedbackContext from "../context/FeedbackContext";
import { useEffect, useContext } from "react";
const RatingSelect = ({ rating, setRating }) => {
  const { feedbackToEdit } = useContext(FeedbackContext);
  const handleChange = (e) => {
    setRating(+e.currentTarget.value);
  };
  useEffect(() => {
    if (feedbackToEdit.editMode === true) {
      setRating(feedbackToEdit.item.rating);
    }
  }, [feedbackToEdit, setRating]);
  return (
    <ul className="rating">
      {Array.from({ length: 10 }, (_, i) => {
        return (
          <li key={`rating${i + 1}`}>
            <input
              type="radio"
              name="rating"
              id={`num${i + 1}`}
              value={`${i + 1}`}
              onChange={handleChange}
              checked={rating === Number(`${i + 1}`)}
            />
            <label htmlFor={`num${i + 1}`}>{`${i + 1}`}</label>
          </li>
        );
      })}
    </ul>
  );
};
RatingSelect.propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func.isRequired,
};
export default RatingSelect;
