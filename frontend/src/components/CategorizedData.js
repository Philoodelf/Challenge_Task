

import React, { useEffect, useState } from "react";
import { fetchData } from "../api";


const CategorizedData = ({ endpoint }) => {
  const [data, setData] = useState([]); // All fetched data
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const rowsPerPage = 5; // Number of rows per page

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData(endpoint);
        if (Array.isArray(result)) {
          setData(result);
        } else if (result && typeof result === "object") {
          const values = Object.values(result);
          if (endpoint === "candle") {
            setData(values);
          } else {
            setData(values);
          }

        } else {
          setData([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, [endpoint]);

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  if (error) {
    return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 font-semibold">loading.....</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
        {endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Data
      </h2>

      {/* Data Table */}
      <DataTable endpoint={endpoint} data={paginatedData} />

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalRows={data.length}
        rowsPerPage={rowsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

const DataTable = ({ data, endpoint }) => {
  console.log(data)
  function handleShow(e) {
    const desiredElement = e.target.parentElement.nextSibling;
    if (desiredElement.classList.contains("!hidden")) {
      [...desiredElement.children].forEach(element => {
        element.classList.add("!hidden")
      });
      document.querySelectorAll(".hiddenTr").forEach((el) => {
        el.classList.add("!hidden");
      });
      desiredElement.classList.remove("!hidden");
      desiredElement.querySelector(`[data-id='${e.target.getAttribute("data-id")}']`).classList.remove("!hidden")
      desiredElement.querySelector(`[data-id='${e.target.getAttribute("data-id")}']`).scrollIntoView({ behavior: "smooth" })
      if (!desiredElement.querySelector(`[data-id='${e.target.getAttribute("data-id")}']`).textContent) {
        desiredElement.querySelector(`[data-id='${e.target.getAttribute("data-id")}']`).textContent = "Empty Cell"
      }
    } else {
      if (desiredElement.querySelector(`[data-id='${e.target.getAttribute("data-id")}']`).classList.contains("!hidden")) {
        [...desiredElement.children].forEach(element => {
          element.classList.add("!hidden")
        });
        desiredElement.querySelector(`[data-id='${e.target.getAttribute("data-id")}']`).classList.remove("!hidden")
        desiredElement.querySelector(`[data-id='${e.target.getAttribute("data-id")}']`).scrollIntoView({ behavior: "smooth" })
        if (!desiredElement.querySelector(`[data-id='${e.target.getAttribute("data-id")}']`).textContent) {
          desiredElement.querySelector(`[data-id='${e.target.getAttribute("data-id")}']`).textContent = "Empty Cell"
        }
      } else {
        desiredElement.classList.add("!hidden");
        desiredElement.querySelector(`[data-id='${e.target.getAttribute("data-id")}']`).classList.add("!hidden")
      }
    }
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-gray-500">No records to display.</p>;
  }
  const dataObj = (typeof data[0][0] === "object" && !Array.isArray(data[0][0])) ? data[0][0] : data[0]
  let headers = Object.keys(dataObj);

  headers.forEach(ele => {
    if(typeof dataObj[ele] === "object"){
      headers = headers.filter(element => element !== ele);
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-black">
            {headers.map((header) => {
              return <th className="px-4 py-2">{header}</th>;
            })
            }
          </tr>
        </thead>
        <tbody>
          {endpoint === "candle" ? (data[0].map((row, rowIndex) => {
            return (
              <>
                <tr
                  key={rowIndex}
                  className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-200`}
                >
                  {
                    Object.values(row).map((header, colIndex) => (
                      typeof header != "object" && (


                        <td key={colIndex} data-id={colIndex} className="py-2 px-4 border border-gray-300 minimiz-text relative" onClick={(e) => handleShow(e)}>
                            {(header !== null || header !== "") ? header : "no value"}
                        </td>)
                    ))}

                </tr>
                <tr
                  key={rowIndex}
                  className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }  hover:bg-gray-200 !hidden hiddenTr`}
                >
                  {
                    Object.values(row).map((header, colIndex) => (
                      typeof header != "object" && (


                        <td key={colIndex} data-id={colIndex} colspan="6" className="py-2 px-4 tablePopUp relative !hidden">
                            {(header !== null || header !== "") ? header : "no value"}
                        </td>)
                    ))}

                </tr>

              </>
            )
          })) : (data.map((rowsArray, dataIndex) => {
            return (
              rowsArray.map((row,rowIndex) => {
                console.log(Object.values(row))
                return (
                  <>
                    <tr
                      key={rowIndex}
                      className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-200`}
                    >
                      {Object.values(row).map((header, colIndex) => (
                        typeof header != "object" && (


                          <td key={`${colIndex} ${rowIndex}`} data-id={colIndex} className="py-2 px-4 border border-gray-300 minimiz-text relative" onClick={(e) => handleShow(e)}>
                            {(header !== null || header !== "") ? header : "no value"}
                          </td>)
                      ))}
                    </tr>
                    <tr
                      key={`${rowIndex}-55`}
                      className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }  hover:bg-gray-200 !hidden hiddenTr`}
                    >
                      {Object.values(row).map((header, colIndex) => (
                        typeof header != "object" && (
                          <td key={`${colIndex} ${rowIndex}`} colspan="6" data-id={colIndex} className="py-2 px-4 tablePopUp relative !hidden">
                            {(header !== null || header !== "") ? header : "no value"}
                            </td>)
                      ))}
                    </tr>
                  </>

                )
              })
            )
          }))
          }
        </tbody>
      </table>
    </div>
  );
};

const Pagination = ({ currentPage, totalRows, rowsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  if (totalPages <= 1) {
    return null; // Hide pagination for single-page data
  }

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-3 py-1 border border-gray-300 rounded-l-lg bg-gray-100 hover:bg-gray-200"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border border-gray-300 ${currentPage === page + 1 ? "bg-blue-600 text-white" : "bg-gray-100"
            } hover:bg-gray-200`}
          onClick={() => onPageChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 border border-gray-300 rounded-r-lg bg-gray-100 hover:bg-gray-200"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default CategorizedData;






