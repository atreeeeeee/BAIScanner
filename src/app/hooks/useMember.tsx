import { Member } from "@/structs/ApiData";
import { getApiToken } from "./useApiToken";
import { useEffect, useState } from "react";

/**
 * Returns member data when given ID number.
 * 
 * @param {string} studentId ID number of member
 * @returns Member if ID number is valid, else undefined
 */
export default function useMember(studentId: string): Member | undefined {
  const [member, setMember] = useState<Member | undefined>(undefined);

  useEffect(() => {
    const getMember = async (studentId: string) => {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getApiToken()}` },
      };

      const response = await fetch(`https://techhounds.club/api/students/${studentId}`, requestOptions);

      setMember(response.ok ? await response.json() : undefined);
    }

    getMember(studentId);
  }, [studentId]);

  return member;
}