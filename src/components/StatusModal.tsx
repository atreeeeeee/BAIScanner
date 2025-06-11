import useMember from "@/app/hooks/useMember";
import { AttendanceEvent } from "@/structs/ApiData";
import { Modal } from "react-bootstrap";
import { MoonLoader } from "react-spinners";

interface Props {
  show: boolean;
  loading: boolean;
  studentId: string;
  attendanceEvent?: AttendanceEvent;
}

/**
 * Modal that displays member name, whether member is signing in or out, and timestamp.
 * Displays error message if error occured in sign in or out process.
 */
export default function StatusModal({ show, loading, studentId, attendanceEvent }: Props) {
  // Only request member data if the input form has been submitted and we need to show the modal.
  // Without this, the modal would request member data for every digit typed into the input form, since each digit typed rerenders the main page, which includes this modal.
  const member = show ? useMember(studentId) : undefined;

  return (
    <Modal
      centered
      backdrop="static"
      show={show}
      size="lg"
      contentClassName={
        loading ? "" : ((attendanceEvent && member) ? "modal-green" : "modal-red")
      }
    >
      <Modal.Body
        className="text-black d-flex mx-auto flex-column justify-content-center align-items-center"
        style={{ minHeight: "500px" }}
      >
        <MoonLoader loading={loading} size={100} />
        {!loading &&
          ((attendanceEvent && member) ? (
            <>
              <h1 style={{ fontSize: "60pt" }}>
                {member.firstName} {member.lastName}
              </h1>
              <p style={{ fontSize: "25pt" }}>
                {attendanceEvent.signIn ? "Signed In" : "Signed Out"}
              </p>
              <p className="fs-5 fw-bolder font-monospace">
                {new Date().toLocaleTimeString("en-US")}
              </p>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: "60pt" }}>Error!</h1>
              <p style={{ fontSize: "25pt" }}>Please try again.</p>
            </>
          ))}
      </Modal.Body>
    </Modal>
  );
}
