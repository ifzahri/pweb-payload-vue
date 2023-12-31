import { text } from "express";
import { CollectionConfig } from "payload/types";

const Customers: CollectionConfig = {
    slug: "customers",
    auth: {
        cookies: {
            sameSite: "strict",
            secure: true,
        },
    },
    access: {
        create: ()=> true
    },
    admin: {
        useAsTitle: "email",
    },
    fields: [
        {
            name: "full_name",
            type: "text",
            label: "Full Name",
            required: true
        },
        {
            name: "birthday",
            type: "date",
            label: "Birthday",
            required: true
        },
    ],
};

export default Customers;