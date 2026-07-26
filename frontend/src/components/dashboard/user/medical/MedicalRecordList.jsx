import MedicalRecordCard from "./MedicalRecordCard";

export default function MedicalRecordList({ records, handleDelete }) {
  return (
    <>
      {records.map((record) => (
        <MedicalRecordCard
          key={record._id}
          record={record}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
}