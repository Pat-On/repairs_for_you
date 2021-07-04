import React from "react";

export default function TableRows({ oneList, handleChange }) {
  return (
    <tbody>
      <tr>
        <th scope="row">{oneList.id}</th>
        <td>{oneList.first_name}</td>
        <td>{oneList.last_name}</td>
        <td>{oneList.email}</td>
        <td>{oneList.phone_number}</td>
        <td>{oneList.postcode}</td>
        <td>{oneList.address.addressLineTwo}</td>
        <td>day/month/year</td>
        <td>{oneList.visible ? "Visible" : "Hidden"}</td>
        <td>
          <select
            id={oneList.id}
            onChange={(e) => {
              handleChange(e, oneList);
            }}
          >
            <option>action</option>
            <option>Update</option>
            <option>Delete</option>
            <option>Deactivate</option>
            <option>Activate</option>
          </select>
        </td>
      </tr>
    </tbody>
  );
}
