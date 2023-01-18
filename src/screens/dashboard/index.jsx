import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { TbRefresh } from "react-icons/tb";
import TablePagination from "@mui/material/TablePagination";
import LocationTableRow from "../../components/locationTableRow";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { LOAD_LOCATION } from "../../graphQL/Queries";
import AddLocationModal from "../../components/addLocationModal";
import EditLocationModal from "../../components/editLocationModal";
import { TENANT } from "../../util";

function Dashboard() {
  const [filterIndex, setFilterIndex] = useState(1);

  const [refreshLocationList, { data, loading, error }] = useLazyQuery(LOAD_LOCATION, {
    variables: {
      tenant: TENANT,
    },
  });  

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalIsLocation, setModalIsLocation] = useState(false);
  const [modalIsEditLocation, setModalIsEditLocation] = useState(false);
  const [locationReadId, setLocationReadId] = useState(null);

  useEffect(() => {
    refreshLocationList();
  }, [refreshLocationList])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onPressFilter = (index) => {
    setFilterIndex(index);
  };

  const refreshLocation = () => {
    window.location.reload(false);
  }
  
  const openAddLocationModal = () => {
    setModalIsLocation(true);

  };

  const closeAddLocationModal = () => {
    setModalIsLocation(false);
  };

  const openEditLocationModal = (item) => {
    setModalIsEditLocation(true);
    setLocationReadId(item.id)
  };

  const closeEditLocationModal = () => {
    setModalIsEditLocation(false);
  };

  if (loading) return(
    <div class="flex w-[800px] mx-auto p-4 justify-center">
      <p>Loading...</p>
    </div>  
  )

  return (
    <div class="flex w-[800px] mx-auto p-4 justify-center">
      <div class="flex flex-col ml-4">
        <div class="flex flex-row p-2 items-center justify-between">
          <button class="flex flex-row border border-gray-500 rounded-md items-center justify-center w-[100px] h-[30px] cursor-pointer" onClick={refreshLocation}>
            <TbRefresh color={"rgba(0,0,0,0.8)"} class="w-4 h-4" />
          </button>
          <span class="flex text-[24px] items-center">Locations</span>
          <button class="flex flex-row border border-gray-500 rounded-md items-center justify-center w-[100px] h-[30px] cursor-pointer" onClick={openAddLocationModal}>
            <span>Add</span>
          </button>
        </div>

        <div class="flex flex-col mt-6 w-[600px]">
          <div class="flex justify-between px-2">
            <div class="flex flex-row items-center w-full">
              <div class="flex border rounded border-gray-400 h-[40px] items-center w-full px-2">
                <GoSearch color={"rgba(0,0,0,0.54)"} class="w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  class="bg-transparent ml-2 w-full text-[16px] text-[#000]/50 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-row mt-6 px-2 justify-between">
            <button
              class={`flex flex-row border border-gray-500 rounded-md items-center justify-center w-[100px] h-[30px] cursor-pointer ${
                filterIndex === 1 ? "bg-gray-300" : "transparent"
              }`}
              onClick={() => onPressFilter(1)}
            >
              <span class="flex text-[14px] items-center">Filter 1</span>
            </button>
            <button
              class={`flex flex-row border border-gray-500 rounded-md items-center justify-center w-[100px] h-[30px] cursor-pointer ${
                filterIndex === 2 ? "bg-gray-300" : "transparent"
              }`}
              onClick={() => onPressFilter(2)}
            >
              <span class="flex text-[14px] items-center">Filter 2</span>
            </button>
            <button
              class={`flex flex-row border border-gray-500 rounded-md items-center justify-center w-[100px] h-[30px] cursor-pointer ${
                filterIndex === 3 ? "bg-gray-300" : "transparent"
              }`}
              onClick={() => onPressFilter(3)}
            >
              <span class="flex text-[14px] items-center">Filter 3</span>
            </button>
            <button
              class={`flex flex-row border border-gray-500 rounded-md items-center justify-center w-[100px] h-[30px] cursor-pointer ${
                filterIndex === 4 ? "bg-gray-300" : "transparent"
              }`}
              onClick={() => onPressFilter(4)}
            >
              <span class="flex text-[14px] items-center">Filter 4</span>
            </button>
          </div>

          <div class="flex flex-col mt-4  pb-2 ">
            {data &&
        data.locationList.resources &&
        data.locationList.resources.map((item) => (
              <LocationTableRow item={item} onClickEdit = {() => openEditLocationModal(item)}/>
            ))}

            <TablePagination
              class="justify-end mt-2"
              component="div"
              count={500}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
      <AddLocationModal
        isOpen={modalIsLocation}
        closeModal={closeAddLocationModal}
      />
      <EditLocationModal
        isOpen={modalIsEditLocation}
        closeModal={closeEditLocationModal}
        locationReadId={locationReadId}
      />
    </div>
  );
}

export default Dashboard;
