import React, { useContext } from "react";
import { AppContext } from "../app-context";

const LinkCard = ({ link }) => {
  const refreshLinks = useContext(AppContext);

  const archiveLink = async () => {
    link.archived = true;
    try {
      await fetch("/api/updateLink", {
        method: "PUT",
        body: JSON.stringify(link),
      });
      refreshLinks();
    } catch (error) {
      console.error("AHHH", error);
    }
  };

  const deleteLink = async () => {
    const id = link._id;
    try {
      await fetch("/api/deleteLink", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      refreshLinks();
    } catch (error) {
      console.error("AHHH", error);
    }
  };
  return (
    <div className="card mb-3">
      <div className="card-header">{link.name}</div>
      <div className="card-body">
        <a href={link.url}>{link.url}</a>
        <p>{link.description}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-warning me-2" onClick={archiveLink}>
          Archive
        </button>
        <button className="btn btn-danger" onClick={deleteLink}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default LinkCard;
