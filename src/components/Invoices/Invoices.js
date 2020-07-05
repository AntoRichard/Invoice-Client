import React, { useState, useEffect, useContext, Fragment } from "react";
import InvoiceService from "../../services/Invoice";
import UserService from "../../services/User";
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

const Invoice = (props) => {
  const { setAmount } = props;
  const [invoices, setInvoices] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("Sort by");
  const [sortType, setSortType] = useState({});
  const [startDate, setStartDate] = useState("0");
  const [endDate, setEndDate] = useState("0");
  const { state } = useContext(AuthContext);

  const getInvoiceData = () => {
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
        // props.history.push("/");
      },
      () => {
        setLoading(false);
      }
    );
  };

  const getUserData = () => {
    UserService.getAllUsersService(
      () => {
        setLoading(true);
      },
      (res) => {
        const { users } = res.data;
        console.log({ users });
        setUsers(users);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        props.history.push("/");
      },
      () => {}
    );
  };

  useEffect(() => {
    getInvoiceData();
    {
      state.user.admin && getUserData();
    }
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
      setStartDate("0");
      setEndDate("0");
      return setSort("Sort by");
    }
    if (type) {
      setSortType({ aesc: 1, desc: 0 });
      filterInvoice(InvoiceService.filterAndSortInvoice, {
        start: startDate,
        end: endDate,
        desc: 0,
        aesc: 1,
      });
      setSort("Older");
    } else {
      setSortType({ aesc: 0, desc: 1 });
      filterInvoice(InvoiceService.filterAndSortInvoice, {
        start: startDate,
        end: endDate,
        desc: 1,
        aesc: 0,
      });
      setSort("Newer");
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <p onClick={() => Sort(null)}>Default</p>
      </Menu.Item>
      <Menu.Item>
        <p onClick={() => Sort(true)}>Older</p>
      </Menu.Item>
      <Menu.Item>
        <p onClick={() => Sort(false)}>Newer</p>
      </Menu.Item>
    </Menu>
  );

  const { RangePicker } = DatePicker;

  const onChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
    filterInvoice(InvoiceService.filterAndSortInvoice, {
      start: dateStrings[0],
      end: dateStrings[1],
      ...sortType,
    });
  };

  const checkDate = (date) =>
    date === "0" ? null : moment(new Date(date), "DD-MM-YYYY");

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
                value={[checkDate(startDate), checkDate(endDate)]}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="invoice-table">
          <Table dataSource={invoices} pagination={{ defaultPageSize: 5 }}>
            {state.user.admin && users.length ? (
              <Column
                title="User Name"
                dataIndex="userid"
                key="userid"
                render={(userid) =>
                  users.filter((user) => user._id === userid)[0].username
                }
              />
            ) : (
              <p></p>
            )}
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
