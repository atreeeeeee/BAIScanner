"use client";

import { useEffect, useState } from "react";
import StatusModal from "@/components/StatusModal";
import InputForm from "@/components/InputForm";
import { AttendanceEvent } from "@/structs/ApiData";
import useApiToken, { getApiToken } from "@/app/hooks/useApiToken";
import { signIn, useSession } from "next-auth/react";
import { Button } from "react-bootstrap";

/**
 * Main page of app. Contains input form and attendance status model.
 */
export default function MainPage() {
  const { data: session } = useSession();

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [studentId, setStudentId] = useState("");
  const [attendanceData, setAttendanceData] = useState<AttendanceEvent>();
  const [loading, setLoading] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  useApiToken();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  /**
   * Normalize the student ID number scanned by barcode scanner. 
   * Student ID barcodes are Code 39 barcodes, which have a check digit which our scanners append along with an underscore with the format IDNUMBER_CHECKSUM. This function strips that checksum along with the underscore and returns only the ID number itself.
   * 
   * @param studentId Student ID number from input form
   * @returns Normalized student ID number
   */
  const normalizeStudentId = (studentId: string) => studentId.split("_")[0];

  const postAttendance = async (studentId: string) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getApiToken()}` },
      body: JSON.stringify({ studentId: normalizeStudentId(studentId) })
    };

    const response = await fetch("https://techhounds.club/api/attendance", requestOptions);

    return response.ok ? await response.json() : undefined;
  };

  const processSubmission = async () => {
    setShowNameModal(true);
    setLoading(true);

    const attendanceData = await postAttendance(studentId);
    setAttendanceData(attendanceData);

    const timeout = 2000;
    setLoading(false);

    setTimeout(reset, timeout);
  };

  const reset = async () => {
    setStudentId("");
    setShowNameModal(false);
    await new Promise((r) => setTimeout(r, 500));
    setAttendanceData(undefined);
  };

  if (!session)
    return (
      <>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Button size="lg" href="#" onClick={() => signIn()}>
            Sign in
          </Button>
        </div>
      </>
    );

  return (
    <div>
      <div className="d-flex flex-column vh-100 justify-content-center">
        <InputForm
          studentId={studentId}
          setStudentId={setStudentId}
          currentDate={currentDate}
          processSubmission={processSubmission}
        />

        <StatusModal show={showNameModal} loading={loading} studentId={normalizeStudentId(studentId)} attendanceEvent={attendanceData} />
      </div>
    </div>
  );
}