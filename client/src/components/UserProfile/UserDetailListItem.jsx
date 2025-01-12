import React from "react";

function UserDetailListItem({ lable, value }) {
  return (
    <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
      <strong className="text-slate-700">{lable} :</strong> &nbsp; {value}
    </li>
  );
}

export default UserDetailListItem;
