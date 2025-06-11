import { Container, Row, Form } from "react-bootstrap";

interface Props {
  studentId: string,
  setStudentId: (studentId: string) => void;
  currentDate: Date;
  processSubmission: () => void;
}

/**
 * Form for inputting member ID number.
 */
export default function InputForm({
  studentId,
  setStudentId,
  currentDate,
  processSubmission
}: Props) {
  return (
    <div className="d-flex align-items-center">
      <Container>
        <Row className="text-center mb-5">
          <h1 className="display-2">HoundAttendance</h1>
          <h4>{currentDate.toLocaleDateString("en-US")}</h4>
          <h4>{currentDate.toLocaleTimeString("en-US")}</h4>
        </Row>
        <Row className="d-flex mx-auto my-3 w-25">
          <Form
            onSubmit={event => {
              event.preventDefault();
              processSubmission();
            }}
          >
            <Form.Group controlId="form.idInput">
              <Form.Label>Scan or Enter Your Student ID</Form.Label>
              <Form.Control
                autoFocus
                value={studentId}
                onChange={event => { setStudentId(event.target.value); }}
              />
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
