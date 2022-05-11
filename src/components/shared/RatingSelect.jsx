import PropTypes from "prop-types";
const RatingSelect = ({ rating, setRating }) => {
  const handleChange = (e) => {
    setRating(+e.currentTarget.value);
  };
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
