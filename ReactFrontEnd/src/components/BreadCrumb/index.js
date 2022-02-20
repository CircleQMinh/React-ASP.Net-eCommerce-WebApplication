import { Link, NavLink, useParams } from "react-router-dom";

export const Breadcrumb = ({ list, title }) => {
  return (
    <>
      <nav aria-label="breadcrumb" className="my-2 mx-2 breadcrumb_nav">
        <ol className="breadcrumb my-2 mx-2">
          {list &&
            list.map((item) => (
              <li className="breadcrumb-item">
                <NavLink to={item.path}>{item.name}</NavLink>
              </li>
            ))}

          {title && (
            <li className="breadcrumb-item active" aria-current="page">
              <p>{title}</p>
            </li>
          )}
        </ol>
      </nav>
    </>
  );
};
