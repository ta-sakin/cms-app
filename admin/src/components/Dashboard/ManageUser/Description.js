import { useState } from "react";

const TEXTS_LIMIT = 160;

const Description = ({ description }) => {
  const [expanded, setExpanded] = useState(description?.length > TEXTS_LIMIT);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  let displayedText = description;
  if (expanded) {
    displayedText = description.substring(0, TEXTS_LIMIT);
  }

  return (
    <div>
      <p className="text-sm mb-5">
        {displayedText}{" "}
        {expanded && (
          <span
            onClick={toggleExpanded}
            className="lowercase hover:text-blue-600 cursor-pointer font-semibold"
          >
            ...see more
          </span>
        )}
      </p>
    </div>
  );
};

export default Description;
