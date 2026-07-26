import ContactCard from "./ContactCard";

export default function ContactList({ contacts, handleEdit, handleDelete }) {
  return (
    <>
      {contacts.map((contact) => (
        <ContactCard
          key={contact._id}
          contact={contact}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
}