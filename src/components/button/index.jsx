import React from "react";

function Button(props) {
  return (
    <button
      class={`w-full font-medium text-[16px] font-plex border rounded-lg  ${props.class}`}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
      name={props.name}
    >
      {props.name}
    </button>
  );
}

export default Button;
