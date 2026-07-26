import ComplaintCard from "./ComplaintCard";

export default function ComplaintList({ complaints }) {
  return (
    <>
      {complaints.map((complaint) => (
        <ComplaintCard key={complaint._id} complaint={complaint} />
      ))}
    </>
  );
}