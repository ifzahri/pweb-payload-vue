import { text } from "express";
import { CollectionConfig } from "payload/types";

const Students: CollectionConfig = {
    slug: "students",
    auth: false,
    fields: [
        {
            name: "full_name",
            type: "text",
            label: "Full Name",
            required: true
        },
        {
            name: "date_of_birth",
            type: "date",
            label: "Date of Birth",
            required: true
        },
        {
            name: "majors",
            type: "text",
            label: "Major",
            required: true
        },
        {
            name: "courses",
            type: "text",
            label: "Courses",
            required: true
        }
    ],
};

export default Students;