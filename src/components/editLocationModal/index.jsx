import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import InputField from "../inputField";
import Button from "../button";
import { READ_LOCATION } from "../../graphQL/Queries";
import { UPDATE_LOCATION, REMOVE_LOCATION } from "../../graphQL/Mutations";
import { useQuery, gql, useMutation } from "@apollo/client";
import { TENANT } from "../../util";

function EditLocationModal(props) {

  const [input, setInput] = useState({
    id: "",
    name: '',
    phoneNumber: '',
    faxNumber: '',
    address: '',
    alias: '',
    description: '',
    managingOrganization: '',
    npi: '',
    partOf: '',
    status: '',
    tag: '',
    taxId: '',
    tenant: '',
    type: '',
    updatedAt: '',
  });
  const [error, setError] = useState({
    id: "",
    name: '',
    phoneNumber: '',
    faxNumber: '',
    address: '',
    alias: '',
    description: '',
    managingOrganization: '',
    npi: '',
    partOf: '',
    status: '',
    tag: '',
    taxId: '',
    tenant: '',
    type: '',
    updatedAt: '',
  });

  const [addTodo, {  }] = useMutation(UPDATE_LOCATION);

  const [removeTodo, {  }] = useMutation(REMOVE_LOCATION);

  const { loading, data } = useQuery(READ_LOCATION, {
    variables: {
      tenant: TENANT,
      locationReadId: props.locationReadId,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setInput((prev) => ({
        ...prev,
        id: data.locationRead.resource.id,
        name: data.locationRead.resource.name,
        phoneNumber: data.locationRead.resource.telecom[0] ? data.locationRead.resource.telecom[0].value : "",
        faxNumber: data.locationRead.resource.telecom[1] ? data.locationRead.resource.telecom[1].value : "",
        address: data.locationRead.resource.address,
        alias: data.locationRead.resource.alias,
        description: data.locationRead.resource.description,
        managingOrganization: data.locationRead.resource.managingOrganization,
        npi: data.locationRead.resource.npi,
        partOf: data.locationRead.resource.partOf,
        status: data.locationRead.resource.status,
        tag: data.locationRead.resource.tag,
        taxId: data.locationRead.resource.taxId,
        tenant: data.locationRead.resource.tenant,
        type: data.locationRead.resource.type,
        updatedAt: data.locationRead.resource.updatedAt,
      }));
    }
  }, [data, loading]);

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
          locationUpdateId: props.locationReadId,
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
    }
  };

  const closeLocationModal = () => {
    clearFields();
    props.closeModal();
  };

  const clearFields = () => {
    setInput({
      id: "",
      name: '',
      phoneNumber: '',
      faxNumber: '',
      address: '',
      alias: '',
      description: '',
      managingOrganization: '',
      npi: '',
      partOf: '',
      status: '',
      tag: '',
      taxId: '',
      tenant: '',
      type: '',
      updatedAt: '',
    });
  };

  const deleteLocationHandler = () => {
    removeTodo({
      variables: {
        tenant: TENANT,
        locationRemoveId: props.locationReadId,
      },
    });
    props.closeModal();
  }

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
              Edit Location
            </span>
            <button onClick={closeLocationModal}>
              <GrClose />
            </button>
          </div>
          <hr class="w-full bg-[#E5EBF0] absolute bottom-0 left-0" />
        </div>

        <div class="flex w-full flex-col p-4 pb-[70px] mt-[83px] overflow-y-scroll">
          <div class="flex flex-col w-full px-6 py-4">
            <div class="flex flex-row w-full mb-5 items-center">
              <span>Name:</span>
              <div class="w-full flex ml-2">
                <InputField
                  label="name"
                  type="text"
                  placeholder="Enter name"
                  value={input.name}
                  onChange={onInputChange}
                  name="name"
                  isError={error.name}
                />
              </div>
            </div>
            <div class="flex flex-row w-full mb-5 items-center">
              <span>Address:</span>
              <div class="w-full flex ml-2">
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
            <div class="flex flex-row w-full mb-5 items-center">
              <span>Alias:</span>
              <div class="w-full flex ml-2">
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
            </div>
            <div class="flex flex-row w-full mb-5 items-center">
              <span>Description:</span>
              <div class="w-full flex ml-2">
                <InputField
                  label="description"
                  type="text"
                  placeholder="Enter description"
                  value={input.description}
                  onChange={onInputChange}
                  name="description"
                  isError={error.description}
                />
              </div>
            </div>
            <div class="flex flex-row w-full mb-5 items-center">
              <span>managingOrganization:</span>
              <div class="w-full flex ml-2">
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
            <div class="flex flex-row w-full mb-5 items-center">
              <span>npi:</span>
              <div class="w-full flex ml-2">
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
            </div>
            <div class="flex flex-row w-full mb-5 items-center">
              <span>partOf:</span>
              <div class="w-full flex ml-2">
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
            <div class="flex flex-row w-full mb-5 items-center">
              <span>tag:</span>
              <div class="w-full flex ml-2">
                <InputField
                  label="tag"
                  type="text"
                  placeholder="Enter tag"
                  value={input.tag}
                  onChange={onInputChange}
                  name="tag"
                  isError={error.tag}
                />
              </div>
            </div>
            <div class="flex flex-row w-full mb-5 items-center">
              <span>type:</span>
              <div class="w-full flex ml-2">
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
            <div class="flex flex-row w-full mb-5 items-center">
              <span>Phone Number:</span>
              <div class="w-full flex ml-2">
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
            </div>
            <div class="flex flex-row w-full mb-5 items-center">
              <span>Fax Number:</span>
              <div class="w-full flex ml-2">
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
              class="bg-[#1E86FF] text-white h-[37px] w-[88px] text-[14px] border-none mr-2"
              onClick={addLocationHandler}
            />
            <Button
              name="Delete"
              class="bg-[#FE1666] text-white h-[37px] w-[88px] text-[14px] border-none"
              onClick={deleteLocationHandler}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditLocationModal;
