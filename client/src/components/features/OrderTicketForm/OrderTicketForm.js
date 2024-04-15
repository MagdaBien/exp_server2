import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert,
  Progress,
} from "reactstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSeatRequest,
  getRequests,
  loadSeatsRequest,
} from "../../../redux/seatsRedux";

import "./OrderTicketForm.scss";
import SeatChooser from "./../SeatChooser/SeatChooser";

const OrderTicketForm = () => {
  const dispatch = useDispatch();
  const requests = useSelector(getRequests);
  //console.log(requests);

  const [order, setOrder] = useState({
    client: "",
    email: "",
    //day: 1,
    concert: "6612ee0fb3045fc45ba32531",
    seat: "",
  });
  const [isError, setIsError] = useState(false);

  const updateSeat = (e, seatId) => {
    e.preventDefault();
    setOrder({ ...order, seat: seatId });
  };

  const updateTextField = ({ target }) => {
    const { value, name } = target;
    setOrder({ ...order, [name]: value });
  };

  const updateNumberField = ({ target }) => {
    const { value, name } = target;
    setOrder({ ...order, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (order.client && order.email && order.concert && order.seat) {
      await dispatch(addSeatRequest(order));
      dispatch(loadSeatsRequest());
      setOrder({
        client: "",
        email: "",
        //day: order.day,
        concert: order.concert,
        seat: "",
      });
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <Form className="order-ticket-form" onSubmit={submitForm}>
      <Row>
        <Col xs="12" md="6">
          {isError && (
            <Alert color="warning">
              There are some errors in you form. Have you fill all the fields?
              Maybe you forgot to choose your seat?
            </Alert>
          )}
          {requests["ADD_SEAT"] && requests["ADD_SEAT"].error && !isError && (
            <Alert color="danger">{requests["ADD_SEAT"].error}</Alert>
          )}
          {requests["ADD_SEAT"] && requests["ADD_SEAT"].success && !isError && (
            <Alert color="success">
              You've booked your ticket! Check you email in order to make a
              payment.
            </Alert>
          )}
          {requests["ADD_SEAT"] && requests["ADD_SEAT"].pending && (
            <Progress animated className="mb-5" color="primary" value={75} />
          )}
          <FormGroup>
            <Label for="clientEmail">Name</Label>
            <Input
              type="text"
              value={order.client}
              name="client"
              onChange={updateTextField}
              id="clientName"
              placeholder="John Doe"
            />
          </FormGroup>
          <FormGroup>
            <Label for="clientEmail">Email</Label>
            <Input
              type="email"
              value={order.email}
              name="email"
              onChange={updateTextField}
              id="clientEmail"
              placeholder="johndoe@example.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="clientDay">
              Select which concert are you interested in:
            </Label>
            <Input
              type="select"
              value={order.concert}
              name="concert"
              onChange={updateNumberField}
              id="exampleSelect"
            >
              <option value="6612ee0fb3045fc45ba32531">John Doe</option>
              <option value="6612ee0fb3045fc45ba32532">Rebekah Parker</option>
              <option value="6612ee0fb3045fc45ba32533">Maybell Haley</option>
            </Input>
            <small id="dayHelp" className="form-text text-muted">
              Every day of the festival uses individual ticket. You can book
              only one ticket at the time.
            </small>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input required type="checkbox" /> I agree with{" "}
              <a href="/terms-and-conditions">Terms and conditions</a> and{" "}
              <a href="/privacy-policy">Privacy Policy</a>.
            </Label>
          </FormGroup>
          <Button color="primary" className="mt-3">
            Submit
          </Button>
        </Col>
        <Col xs="12" md="6">
          <SeatChooser
            chosenConcert={order.concert}
            chosenSeat={order.seat}
            updateSeat={updateSeat}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default OrderTicketForm;
