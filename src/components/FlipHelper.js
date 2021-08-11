import ReactCardFlip from "react-card-flip";
import React from "react";

const FlipHelper = ({cardFront, cardBack}) => {
    const [isFlipped, setIsFlipped] = React.useState(false);

      return (
          <div>
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                  <div
                      onMouseEnter={() => setIsFlipped((prev) => !prev)}
                      className="CardFront">
                      {cardFront}
                  </div>
                  <div
                      onMouseLeave={() => setIsFlipped((prev) => !prev)}
                      className="CardBack">
                      {cardBack}
                  </div>
              </ReactCardFlip>
          </div>
      )
};

export default FlipHelper;