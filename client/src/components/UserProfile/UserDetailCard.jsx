import React from "react";
import UserDetailListItem from "./UserDetailListItem";

function UserDetailCard({ heading, data }) {
  return (
    <div className="p-3">
      <div className="p-3 flex flex-col bg-white border-0 shadow-lg rounded-2xl">
        <h1 className="font-bold mb-3 text-xl">{heading}</h1>
        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
          {data &&
            data.map((item, index) => (
              <React.Fragment key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <UserDetailListItem
                    key={key}
                    lable={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                  />
                ))}
                {index < data.length - 1 && <br />}
              </React.Fragment>
            )
          )
            }
        </ul>
      </div>
    </div>
  );
}

export default UserDetailCard;
