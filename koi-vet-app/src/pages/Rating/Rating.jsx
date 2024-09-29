import React from "react";
import "./Rating.css";

function Rating() {
  return (
    <div className="container">
      <div className=" row justify-content-center">
        <h1 className="text-center">Rating & Feedbacks</h1>
        <div className="session-card card p-4">
          <h3 className="text-center">Session feedback</h3>
          <h5 className="text-center">Please rate your experience below</h5>
          <div className="rating text-center">
            <input type="radio" id="star5" name="rating" value="5" />
            <label htmlFor="star5" title="5 sao"></label>

            <input type="radio" id="star4" name="rating" value="4" />
            <label htmlFor="star4" title="4 sao"></label>

            <input type="radio" id="star3" name="rating" value="3" />
            <label htmlFor="star3" title="3 sao"></label>

            <input type="radio" id="star2" name="rating" value="2" />
            <label htmlFor="star2" title="2 sao"></label>

            <input type="radio" id="star1" name="rating" value="1" />
            <label htmlFor="star1" title="1 sao"></label>
            <div className="feedback-section text-center mt-3">
              <p>Additional Feedback</p>
              <textarea
                className="session-input form-control"
                placeholder="My feedback"
              ></textarea>
            </div>
            <div className="text-center mt-3">
              <button className="btn btn-primary submit">Submit</button>
              <p className="mt-2">OR</p>
              <button type="button" className="btn btn-primary button">
                Rejoin Session
              </button>
              <button type="button" className="btn btn-primary button">
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
