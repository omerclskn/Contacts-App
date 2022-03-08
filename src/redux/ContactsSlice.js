import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const contactsAdapter = createEntityAdapter();

export const contactsSelectors = contactsAdapter.getSelectors(
  (state) => state.contacts
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsAdapter.getInitialState(),
  reducers: {
    addContact: contactsAdapter.addOne,
    deleteContact: contactsAdapter.removeOne,
    deleteAllContacts: contactsAdapter.removeAll,
    updateContact: contactsAdapter.updateOne,
  },
});

export default contactsSlice.reducer;
export const { addContact, deleteContact, deleteAllContacts, updateContact } =
  contactsSlice.actions;
