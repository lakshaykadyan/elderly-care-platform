import ServiceCard from "./ServiceCard";

export default function ServiceList({
  services,
  notes,
  setNotes,
  badgeColor,
  getPriority,
  getStep,
  updateStatus,
  openDetails,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          notes={notes}
          setNotes={setNotes}
          badgeColor={badgeColor}
          getPriority={getPriority}
          getStep={getStep}
          updateStatus={updateStatus}
          openDetails={openDetails}
        />
      ))}
    </div>
  );
}