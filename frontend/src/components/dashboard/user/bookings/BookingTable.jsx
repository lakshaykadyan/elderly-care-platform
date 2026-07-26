import BookingRow from "./BookingRow";

export default function BookingTable({ services, ...props }) {
  return (
    <>
      {services.map((service) => (
        <BookingRow key={service._id} service={service} {...props} />
      ))}
    </>
  );
}