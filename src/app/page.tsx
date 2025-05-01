"use client"
import Contact from "@/components/Contact";
import { contactsList as initialContactsList } from "@/data/contactsList";
import { useState } from "react";

const Page = () => {
  const [contacts, setContacts] = useState(initialContactsList);
  const [currentPage, setCurrentPage] = useState(0);
  const [editingContact, setEditingContact] = useState<null | { id: number; name: string; telephone: string }>(null);
  const itemsPerPage = 5;

  const handleNextBtn = () => {
    if ((currentPage + 1) * itemsPerPage < contacts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleExclude = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleEdit = (id: number) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    if (contactToEdit) {
      setEditingContact(contactToEdit);
    }
  };

  const handleSaveEdit = (updatedContact: { id: number; name: string; telephone: string }) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? { ...contact, ...updatedContact } : contact
      )
    );
    setEditingContact(null); // Fechar o modo de edição
  };

  const displayedContacts = contacts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="w-screen h-screen flex justify-center bg-gray-900 text-white">
      <div className="mt-8 w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Contact List</h1>
        <div className="border-1 border-gray-300 w-full max-w-xl rounded-lg py-5 flex flex-col justify-center items-center">
          {editingContact ? (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold mb-2">Edit Contact</h2>
              <input
                type="text"
                value={editingContact.name}
                onChange={(e) =>
                  setEditingContact({ ...editingContact, name: e.target.value })
                }
                className="border p-2 mb-2"
              />
              <input
                type="text"
                value={editingContact.telephone}
                onChange={(e) =>
                  setEditingContact({ ...editingContact, telephone: e.target.value })
                }
                className="border p-2 mb-2"
              />
              <button
                onClick={() => handleSaveEdit(editingContact)}
                className="bg-green-500 p-2 rounded text-white"
              >
                Save
              </button>
            </div>
          ) : (
            displayedContacts.map((item) => (
              <Contact
                key={item.id}
                id={item.id}
                photo={item.photo}
                name={item.name}
                telephone={item.telephone}
                onEdit={handleEdit}
                onExclude={handleExclude}
              />
            ))
          )}
          {!editingContact && (
            <button
              onClick={currentPage > 0 ? handlePreviousBtn : handleNextBtn}
              className="bg-indigo-400 p-3 rounded-lg text-white mt-2 border-1 border-gray-400 shadow-sm"
              disabled={
                currentPage === 0 && (currentPage + 1) * itemsPerPage >= contacts.length
              }
            >
              {currentPage > 0 ? "Previous Page" : "Next Page"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;