import { text } from "express";
import { CollectionConfig } from "payload/types";

const Courses: CollectionConfig = {
    slug: "courses",
    fields: [
        {
            name: "courses",
            type: "text",
            label: "Courses",
            required: true
        },
        {
            name: "lecturers",
            type: "text",
            label: "Lecturers",
            required: true
        },
    ],
};

export default Courses;