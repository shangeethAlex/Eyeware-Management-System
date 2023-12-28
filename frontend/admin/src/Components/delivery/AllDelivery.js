import React, { useState, useEffect } from "react";
import DeleteModal from "./DeleteModal";
import { fetchDeliveries } from "../Api/deliveryApi";
import EditModal from "./EditModal";
import { Button, Dropdown, Search, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import AdminDashBoard from "../Employee/AdminDashBoard";
import { debounce, get, isEmpty } from "lodash";
import jsPDF from "jspdf";
import "jspdf-autotable";

const stateOptions = [
  {
    key: "all",
    text: "All",
    value: "all",
  },
  {
    key: "1",
    text: "PENDING",
    value: "pending",
  },
  {
    key: "2",
    text: "IN PROGRESS",
    value: "inProgress",
  },
  {
    key: "3",
    text: "COMPLETED",
    value: "completed",
  },
];
const AllDelivery = () => {
  const [editDone, setEditDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const [search, setSearchValue] = useState("");
  const [status, setStatusValue] = useState("all");

  const getDelivery = async (searchValue = "", statusVal = "") => {
    const data = await fetchDeliveries(searchValue, statusVal);
    setDeliveries(data);
  };
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    getDelivery();
  }, []);

  const handleEditDone = () => {
    setEditDone(true);
  };

  const handleDeleteDone = () => {
    setEditDone(true);
  };

  const SearchOnchange = async (e, { value }) => {
    setSearchValue(value);
    await getDelivery(value, status);
  };
  const onDropDownChange = async (e, { value }) => {
    await getDelivery(search, value);
    setStatusValue(value);
  };

  useEffect(() => {
    setLoading(true);
    if (editDone) {
      getDelivery();
    }
    setEditDone(false);
    setLoading(false);
  }, [editDone]);
  //generate pdf
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      startY: 40, // Adjust the vertical position of the table
      head: [["#", "Address", "Reference Number", "Status"]],
      body: deliveries.map((delivery, index) => [
        index + 1,
        // delivery._id,
        delivery.address,
        delivery.referenceNumber,
        delivery.status.toUpperCase(),
      ]),
    });

    // Add company name  above the table
    doc.setFontSize(20);
    doc.text("Lanka Opticals", 105, 25, "center"); // Adjust the Y-coordinate
    doc.setLineWidth(0.5);
    doc.setFontSize(14);
    doc.text("Delivery Deatils", 105, 35, "center"); // Adjust the Y-coordinate

    // Reset font to normal
    doc.setFont("helvetica", "normal");

    doc.save("Delivery_Report.pdf");
  }; //end of pdf

  return (
    <div className="mt-6">
      <AdminDashBoard />
      {!isEmpty(deliveries) ? (
        <div className="table-format middle-range">
          <div className="search-function">
            <Search
              className="search-bar-custom"
              placeholder="Search"
              showNoResults={false}
              onSearchChange={debounce(SearchOnchange, 500)}
            />
            <label className="status-label">Status : </label>
            <Dropdown
              placeholder="Status"
              search
              selection
              options={stateOptions}
              onChange={(e, data) => onDropDownChange(e, data)}
              value={status}
            />
            <Button className="generate-pdf" onClick={generatePDF}>
              Download Report
            </Button>
          </div>

          <Table celled>
            <Table.Header>
              <Table.Row>
                {/* <Table.HeaderCell>Delivery Id</Table.HeaderCell> */}
                <Table.HeaderCell>Order Id</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Reference Number</Table.HeaderCell>
                <Table.HeaderCell>ACTION</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {deliveries.map((delivery) => (
                <>
                  <Table.Row key={delivery._id}></Table.Row>
                  {/* <Table.Cell>{delivery._id}</Table.Cell> */}
                  <Table.Cell>{delivery.orderId}</Table.Cell>
                  <Table.Cell>{delivery.address}</Table.Cell>
                  <Table.Cell>{delivery.status.toUpperCase()}</Table.Cell>
                  <Table.Cell>
                    {get(delivery, "referenceNumber", "-")}
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <div className="action-button">
                      <EditModal
                        data={delivery}
                        handleEditDone={handleEditDone}
                      />
                      <DeleteModal
                        deliveryId={delivery._id}
                        handleDeleteDone={handleDeleteDone}
                      />
                    </div>
                    {/* <ModalExampleModal/> */}
                  </Table.Cell>
                  <Table.Row />
                </>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : null}
    </div>
  );
};

export default AllDelivery;
