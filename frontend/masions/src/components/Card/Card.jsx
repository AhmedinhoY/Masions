/* eslint-disable react/prop-types */
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ imageUrl, title, subtitle, text, buttons, Links, agent }) => {
  return (
    <div className="card">
      <div className="card-body">
        {imageUrl && <img alt="" src={imageUrl} className="card-img" />}
        {agent && imageUrl && <img alt="" src={imageUrl} className="card-img size-4" />}
        <div>
          {title && <h2 className="card-title">{title}</h2>}
          {subtitle && <h3 className="card-subtitle">{subtitle}</h3>}
          {text && <p className="card-text">{text}</p>}
        </div>
        <div className="w-full flex flex-col justify-center items-center my-6">
          {buttons &&
            buttons.map((button, index) => (
              <button
                key={index}
                className="primary-btn-sm !w-[80%] !px-0"
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
          {Links &&
            Links.map((link, index) => (
              <Link
                key={index}
                className="primary-btn-sm !w-[80%] !px-0"
                to={link.url}
              >
                {link.label}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
