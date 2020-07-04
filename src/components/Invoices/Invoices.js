import React, { useState, useEffect, useContext, Fragment } from "react";
import InvoiceService from "../../services/Invoice";
import Loader from "../Loader/Loader";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import Notification from "../Notification/NotificationService";
import { AuthContext } from "../../Context/AuthContext";
import moment from "moment";
import { withRouter } from "react-router-dom";
import "./Invoices.css";
const { Column } = Table;

const Invoice = ({ setAmount }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("Sort by");
  const { state } = useContext(AuthContext);

  const getInvoiceData = (props) => {
    InvoiceService.getInvoices(
      () => {
        setLoading(true);
      },
      (res) => {
        setInvoices(res.data.data);
        const totalAmount = res.data.data.reduce(
          (total, invoice) => total + invoice.amount,
          0
        );
        setAmount(totalAmount);
      },
      (err) => {
        props.history.push("/");
      },
      () => {
        setLoading(false);
      }
    );
  };

  const filterInvoice = (service, data) => {
    service(
      data,
      () => {
        setLoading(true);
      },
      (res) => {
        setInvoices(res.data.data);
        const totalAmount = res.data.data.reduce(
          (total, invoice) => total + invoice.amount,
          0
        );
        setAmount(totalAmount);
      },
      (err) => {
        console.error(err);
      },
      () => {
        setLoading(false);
      }
    );
  };
  useEffect(() => {
    getInvoiceData();
  }, []);

  const deleteHandler = (invoice) => {
    const id = invoice._id;
    InvoiceService.deleteInvoice(
      id,
      () => {},
      (res) => {
        if (res) {
          setInvoices((invoices) => invoices.filter((inv) => inv._id !== id));
          Notification("success", "Invoice", "Invoice deleted successfully.");
        }
      },
      (err) => {
        console.log(err);
        Notification("error", "Invoice", "Issue while deleting the invoice.");
      },
      () => {}
    );
  };

  if (loading) {
    return <Loader show={loading} />;
  }

  const Sort = (type) => {
    if (type === null) {
      getInvoiceData();
      return setSort("Sort by");
    }
    if (type) {
      filterInvoice(InvoiceService.sortInvoice, { desc: 0, aesc: 1 });
      setSort("Sorted by ascending");
    } else {
      filterInvoice(InvoiceService.sortInvoice, { desc: 1, aesc: 0 });
      setSort("Sorted by descending");
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <p onClick={() => Sort(null)}>None</p>
      </Menu.Item>
      <Menu.Item>
        <p onClick={() => Sort(true)}>Ascending</p>
      </Menu.Item>
      <Menu.Item>
        <p onClick={() => Sort(false)}>Desending</p>
      </Menu.Item>
    </Menu>
  );

  const { RangePicker } = DatePicker;

  const onChange = (dates, dateStrings) => {
    filterInvoice(InvoiceService.filterInvoice, {
      start: dateStrings[0],
      end: dateStrings[1],
    });
  };

  return (
    <div className="invoice-container">
      <div className="invoice-inner-container">
        <div>
          <h2>Invoices</h2>
          <div>
            <div
              style={{ margin: "10px 20px", position: "absolute", right: 200 }}
            >
              <Dropdown overlay={menu}>
                <Button>
                  {sort}
                  <DownOutlined />
                </Button>
              </Dropdown>{" "}
              <RangePicker
                ranges={{
                  Today: [moment(), moment()],
                  "This Month": [
                    moment().startOf("month"),
                    moment().endOf("month"),
                  ],
                }}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="invoice-table">
          <Table dataSource={invoices} pagination={{ defaultPageSize: 5 }}>
            <Column title="Invoice Name" dataIndex="name" key="name" />
            <Column
              title="Invoice Date"
              dataIndex="date"
              key="date"
              render={(date) => (
                <p key={date}>{moment(date).format("DD-MM-YYYY")}</p>
              )}
            />
            <Column title="Invoice Amount" dataIndex="amount" key="amount" />
            {!state.user.admin && (
              <Fragment>
                <Column
                  title="Edit"
                  render={(props) => {
                    let path = `/dashboard/update/${props._id}`;
                    return (
                      <Link to={path} key={props._id}>
                        <EditOutlined
                          style={{ color: "orange", fontSize: 18 }}
                        />
                      </Link>
                    );
                  }}
                >
                  {" "}
                </Column>
                <Column
                  title="Delete"
                  render={(props) => (
                    <DeleteOutlined
                      style={{ color: "tomato", fontSize: 18 }}
                      onClick={() => deleteHandler(props)}
                    />
                  )}
                >
                  {" "}
                </Column>
              </Fragment>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Invoice);
