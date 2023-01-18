import React, { useState } from "react";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import InputField from "../inputField";
import { FaChevronDown } from "react-icons/fa";
import Button from "../button";
import { CREATE_LOCATION } from "../../graphQL/Mutations";
import { useMutation } from "@apollo/client";
import { TENANT } from "../../util";

function AddLocationModal(props) {
  const [input, setInput] = useState({
    id: "",
    name: "",
    phoneNumber: '',
    faxNumber: '',
    address: "",
    alias: "",
    description: "",
    managingOrganization: "",
    npi: "",
    partOf: "",
    status: "",
    tag: "",
    taxId: "",
    tenant: "",
    type: "",
    updatedAt: "",
  });
  const [error, setError] = useState({
    id: "",
    name: "",
    phoneNumber: '',
    faxNumber: '',
    address: "",
    alias: "",
    description: "",
    managingOrganization: "",
    npi: "",
    partOf: "",
    status: "",
    tag: "",
    taxId: "",
    tenant: "",
    type: "",
    updatedAt: "",
  });


  const [addTodo] = useMutation(CREATE_LOCATION);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: !value,
    }));
  };

  const addLocationHandler = async () => {
    if (input.id !== "" && input.name !== "") {
      const userFormData = {
        id: input.id,
        name: input.name,
        address: input.address,
        alias: input.alias,
        description: input.description,
        managingOrganization: input.managingOrganization,
        npi: input.npi,
        partOf: input.partOf,
        status: input.status,
        tag: input.tag,
        taxId: input.taxId,
        type: input.type,
        telecom: [
          {
            "rank": 1,
            "system": "phone",
            "use": "work",
            "value": input.phoneNumber
          },
          {
            "rank": 1,
            "system": "fax",
            "use": "clinicals",
            "value": input.faxNumber
          }
        ]
      };

      addTodo({
        variables: {
          tenant: TENANT,
          locationInput: userFormData,
        },
      });
      props.closeModal();
    } else {
      Object.keys(input).forEach((item) => {
        const isError = input[item].trim() === "";
        return setError((prev) => ({
          ...prev,
          [item]: isError,
        }));
      });
      alert("Please input ID and Name");
    }
  };

  const closeLocationModal = () => {
    clearFields();
    props.closeModal();
  };

  const clearFields = () => {
    setInput({
      id: "",
      name: "",
      phoneNumber: '',
      faxNumber: '',
      address: "",
      alias: "",
      description: "",
      managingOrganization: "",
      npi: "",
      partOf: "",
      status: "",
      tag: "",
      taxId: "",
      tenant: "",
      type: "",
      updatedAt: "",
    });
    setError({
      id: "",
      name: "",
      phoneNumber: '',
      faxNumber: '',
      address: "",
      alias: "",
      description: "",
      managingOrganization: "",
      npi: "",
      partOf: "",
      status: "",
      tag: "",
      taxId: "",
      tenant: "",
      type: "",
      updatedAt: "",
    });
  };

  return (
    <Modal
      isOpen={props.isOpen}
      ariaHideApp={false}
      onRequestClose={closeLocationModal}
      style={{
        overlay: { background: "rgba(18, 31, 62, 0.6)" },
        content: { transform: "translate(0%, 5%)" },
      }}
      className="flex w-[712px] h-[780px] bg-white m-auto  rounded-2xl"
    >
      <div class="flex flex-col w-full">
        <div class="flex h-[83px] w-full bg-white rounded-2xl absolute left-0 top-0">
          <div class="flex flex-row w-full px-10 justify-between items-center">
            <span class="text-[24px] text-[#121F3E] font-medium font-plex">
              Add Location
            </span>
            <button onClick={closeLocationModal}>
              <GrClose />
            </button>
          </div>
          <hr class="w-full bg-[#E5EBF0] absolute bottom-0 left-0" />
        </div>

        <div class="flex w-full flex-col p-4 pb-[70px] mt-[83px] overflow-y-scroll">
          <div class="flex flex-col w-full px-6 py-4">
            <div class="flex flex-col w-full">
              <div class="flex flex-row w-full items-center">
                <span class="text-[18px] text-[#121F3E] font-medium font-plex mr-2">
                  General Information
                </span>
                <FaChevronDown class="w-4 h-4" fill="#121F3E" />
              </div>
            </div>

            <div class="flex flex-row w-full my-5">
              <div class="w-full flex">
                <InputField
                  label="id"
                  type="text"
                  placeholder="Enter id"
                  value={input.id}
                  onChange={onInputChange}
                  name="id"
                  isError={error.id}
                />
              </div>
              <div class="w-full flex ml-4">
                <InputField
                  label="name"
                  placeholder="Enter name"
                  value={input.name}
                  onChange={onInputChange}
                  name="name"
                  isError={error.name}
                />
              </div>
            </div>
            <div class="flex flex-row w-full mb-5">
              <div class="w-full flex">
                <InputField
                  label="address"
                  type="text"
                  placeholder="Enter an address"
                  value={input.address}
                  onChange={onInputChange}
                  name="address"
                  isError={error.address}
                />
              </div>
            </div>
            <div class="flex flex-row w-full mb-5">
              <div class="w-full flex">
                <InputField
                  label="description"
                  type="text"
                  placeholder="Enter description"
                  value={input.description}
                  onChange={onInputChange}
                  name="description"
                  isError={error.address}
                />
              </div>
            </div>
            <div class="flex flex-row w-full mb-5">
              <div class="w-full flex flex-row">
                <InputField
                  label="alias"
                  type="text"
                  placeholder="Enter alias"
                  value={input.alias}
                  onChange={onInputChange}
                  name="alias"
                  isError={error.alias}
                />
              </div>
              <div class="w-full flex ml-4">
                <InputField
                  label="type"
                  type="text"
                  placeholder="Enter type"
                  value={input.type}
                  onChange={onInputChange}
                  name="type"
                  isError={error.type}
                />
              </div>
            </div>
            <div class="flex flex-row w-full mb-5">
              <div class="w-full flex flex-row">
                <InputField
                  label="npi"
                  type="text"
                  placeholder="Enter npi"
                  value={input.npi}
                  onChange={onInputChange}
                  name="npi"
                  isError={error.npi}
                />
              </div>
              <div class="w-full flex ml-4">
                <InputField
                  label="partOf"
                  type="text"
                  placeholder="Enter partOf"
                  value={input.partOf}
                  onChange={onInputChange}
                  name="partOf"
                  isError={error.partOf}
                />
              </div>
            </div>
            <div class="flex flex-row w-full mb-5">
              <div class="w-full flex flex-row">
                <InputField
                  label="status"
                  type="text"
                  placeholder="Enter status"
                  value={input.status}
                  onChange={onInputChange}
                  name="status"
                  isError={error.status}
                />
              </div>
              <div class="w-full flex ml-4">
                <InputField
                  label="taxId"
                  type="text"
                  placeholder="Enter taxId"
                  value={input.taxId}
                  onChange={onInputChange}
                  name="taxId"
                  isError={error.taxId}
                />
              </div>
            </div>
            <div class="flex flex-row w-full mb-5">
              <div class="w-full flex flex-row">
                <InputField
                  label="managingOrganization"
                  type="text"
                  placeholder="Enter managingOrganization"
                  value={input.managingOrganization}
                  onChange={onInputChange}
                  name="managingOrganization"
                  isError={error.managingOrganization}
                />
              </div>
            </div>
            <div class="flex flex-row w-full mb-5">
              <div class="w-full flex flex-row">
                <InputField
                  label="phoneNumber"
                  type="text"
                  placeholder="Enter phoneNumber"
                  value={input.phoneNumber}
                  onChange={onInputChange}
                  name="phoneNumber"
                  isError={error.phoneNumber}
                />
              </div>
              <div class="w-full flex ml-4">
                <InputField
                  label="faxNumber"
                  type="text"
                  placeholder="Enter faxNumber"
                  value={input.faxNumber}
                  onChange={onInputChange}
                  name="faxNumber"
                  isError={error.faxNumber}
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col h-[85px] w-full bg-white rounded-2xl absolute left-0 bottom-0">
          <hr class="w-full bg-[#E5EBF0] mb-6" />
          <div class="flex flex-row w-full justify-end px-8">
            <Button
              name="Discard"
              class="bg-[#1E86FF]/10 text-[#1E86FF] h-[37px] w-[88px] text-[14px] border-none mr-2"
              onClick={closeLocationModal}
            />
            <Button
              name="Submit"
              class="bg-[#1E86FF] text-white h-[37px] w-[88px] text-[14px] border-none"
              onClick={addLocationHandler}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddLocationModal;
