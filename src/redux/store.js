import { configureStore } from "@reduxjs/toolkit";
import contactsSlice from "./ContactsSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
  },
});
