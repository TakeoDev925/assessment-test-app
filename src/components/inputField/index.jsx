import React from "react";

function InputField(props) {
  return (
    <div class="flex w-full flex-col bg-white">
      <div
        class={`flex w-full align-middle items-center border border-gray-200 rounded-lg text-[#96A0B5] focus-within:text-[#4285F4] py-2 px-5 h-[55px] focus-within:outline-none focus-within:bg-white focus-within:border-2 focus-within:border-[#4285F4] ${props.class}`}
      >
        {props.icon ? props.icon : null}

        <input
          defaultValue={props.defaultValue}
          class={`flex w-full placeholder-[#96A0B5] focus:text-[#121F3E] text-[#121F3E] text-[14px] font-medium font-plex focus:outline-none focus:bg-white focus:border-0 focus:border-blue`}
          type={"text"}
          required={props.required}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          inputMode={props.inputMode}
        />
      </div>
    </div>
  );
}

export default InputField;
