/* eslint-disable react/prop-types */
import "./Card.css";

const Card = ({ imageUrl, title, subtitle, text, buttons }) => {
  return (
    <div className="card">
      <div className="card-body">
        {imageUrl && <img alt="" src={imageUrl} className="card-img" />}
        <div>
          {title && <h2 className="card-title">{title}</h2>}
          {subtitle && <h3 className="card-subtitle">{subtitle}</h3>}
          {text && <p className="card-text">{text}</p>}
        </div>
        <div className="card-buttons">
          {buttons && (
            <div className="buttons-container">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className="primary-btn-sm"
                  onClick={button.onClick}
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
