import React from "react";
import { FaFax, FaPhoneAlt } from "react-icons/fa";
const moment = require('moment');

function LocationTableRow(props) {

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div class="flex w-full flex-col p-4 border border-gray-200 rounded-md items-center mt-3 shadow-md cursor-pointer" onClick={props.onClickEdit}>
      <div class="flex flex-row w-full items-center justify-between">
        <span class="text-[20px] text-[#000]">{props.item.name}</span>
        <span class="flex bg-yellow-200 px-4 rounded-full">
          {props.item.status? capitalizeFirstLetter(props.item.status) : ""}
        </span>
      </div>
      <div class="flex w-full">
        <span class="text-[14px] text-[#333]">{props.item.address}</span>
      </div>
      <div class="flex flex-row w-full items-center justify-between mt-2">
        <div class="flex flex-row">
          <button class="flex flex-row items-center cursor-pointer">
            <FaPhoneAlt class="w-3 h-3" />
            <span class="text-[16px] text-[#333] ml-1">{props.item.telecom[0] ? props.item.telecom[0].value : ""}</span>
          </button>
          <button class="flex flex-row items-center ml-3 cursor-pointer">
            <FaFax class="w-3 h-3" />
            <span class="text-[16px] text-[#333] ml-1">{props.item.telecom[1] > 0 ? props.item.telecom[1].value : ""}</span>
          </button>
        </div>
        <span>{moment(props.item.updatedAt).format('L')}</span>
      </div>
    </div>
  );
}

export default LocationTableRow;
