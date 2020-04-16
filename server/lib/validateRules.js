module.exports = {
    CustomUser: {
        id: { type: "number" },
        realm: {
            type: "string",
            format: {
                pattern: '^[\u0590-\u05fe \' \" ]+ [\u0590-\u05fe \' \" ]+$',
                message: "invalid realm"
            }
        },
        username: {
            type: "string"
        },
        password: {
            type: "string",
            format: {
                pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*().~`\[\]{}\|\\-_=+<>:"?]{6,}$/',
                message: "invalid password",
                flags: ""
            }
        },
        credentials: {
            type: "string"
        },
        email: { type: "string" },
        emailVerified: {
            type: "number",
            numericality: { greaterThan: -1, lessThanOrEqualTo: 1 }
        },
        mainImageId: { type: "number", },
        verificationToken: { type: "string", },
    },

    meetings: {
        id: { type: "number" },
        name: {
            type: "string",
            // format: { pattern: "[a-z0-9א-ת `,\":\n.!)'(_\-]*" },
            length: { maximum: 100 }
        },
        description: {
            type: "string",
            // format: { pattern: "[a-z0-9א-ת `,\":\n.!)'(_\-]*" },
            length: { maximum: 1500 }
        },
        owner: {
            type: "number",
            numericality: { greaterThan: 0 }
        },
        language: {
            type: "string",
            format: {
                pattern: '^(עברית|English|français|العربية|русский|አማርኛ|español)',
                message: 'משהו השתבש, הכנסת שפה שלא קיימת'
            }
        }, //enum     
        isOpen: {
            type: "boolean"
        },
        time: {
            type: "string",
            length: { maximum: 7 }
        },
        zoomId: {
            type: "string",
            length: { maximum: 20 }
        },
        participants_num: {
            type: "number",
            numericality: { greaterThan: 0 }
        },
        max_participants: {
            type: "number",
            numericality: { greaterThan: 9, lessThanOrEqualTo: 500 }
        },
        code: {
            type: "number",
            numericality: { greaterThan: 100000, lessThanOrEqualTo: 1000000 }
        },
        date: {
            type: "string",
            format: {
                pattern: "^(יום ראשון, ב באייר, 26.04|יום שני, ג באייר, 27.04|יום שלישי, ד באייר, 28.04|יום רביעי, ה באייר, 29.04)",
                message: 'משהו השתבש, הכנסת ,תאריך שלא קיים'
            }
        }, //enum  
    },
    people: {
        name: {
            type: "string",
            format: {
                message: "invalid realm"
            },
            length: { maximum: 100 }

        },
        email: {
            type: "string",
            format: {
                pattern: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/',
                message: "invalid email",
                flags: ""
            }
        },

        phone: {
            type: "string",
            format: {
                pattern: '^(0|\\+972)[0-9]{8,9}$',
                message: "invalid phone"
            }
        },
    },

    people_meetings: {
        person: {
            type: "number",
            numericality: { greaterThan: 0 }
        },
        meeting: {
            type: "number",
            numericality: { greaterThan: 0 }
        },
    },

    fallens_meetings: {
        fallen: {
            type: "number",
            numericality: { greaterThan: 0 }
        },
        meeting: {
            type: "number",
            numericality: { greaterThan: 0 }
        },
        relationship: {
            type: "string",
            length: { maximum: 100 }
        },
    },

    // RecordsPermissions: {
    //     id: { type: "number" },
    //     model: {
    //         type: "string",
    //         format: { pattern: '^(images|files)' }
    //     }, // string, files or images
    //     recordId: {
    //         type: "number",
    //         numericality: {
    //             greaterThan: 0, lessThanOrEqualTo: 4294967295
    //         }
    //     }, // number, unsigned int size/null
    //     principalType: {
    //         type: "string",
    //         format: { pattern: '^($OWNER|ROLE|USER)' }
    //     }, // enum
    //     principalId: {
    //         type: "string",
    //         format: { pattern: '^[a-zA-Z0-9$]+$' }
    //     },
    //     permission: {
    //         type: "string",
    //         format: { pattern: '^(ALLOW|DENY)' }
    //     } // enum
    // },

    // Audio: {
    //     id: { type: "number" },
    //     title: {
    //         type: "string",
    //         length: { maximum: 200 }
    //     },
    //     description: { type: "string" },
    //     format: {
    //         type: "string",
    //         format: { pattern: '^(mp3|webm|wav)$' }
    //     },
    //     category: {
    //         type: "string",
    //         length: { maximum: 100 }
    //     },
    //     owner: { type: "number" },
    // },

    // Images: {
    //     id: { type: "number" },
    //     title: {
    //         type: "string",
    //         length: { maximum: 200 }
    //     },
    //     description: { type: "string" },
    //     format: {
    //         type: "string",
    //         format: { pattern: '^(png|jpg|jpeg|gif|svg)$' }
    //     },
    //     category: {
    //         type: "string",
    //         length: { maximum: 100 }
    //     },
    //     owner: {
    //         type: "number",
    //         numericality: { greaterThan: 0 }
    //     },
    //     placeId: {
    //         type: "number",
    //         numericality: { greaterThan: 0 }
    //     },
    //     subPlaceId: {
    //         type: "number",
    //         numericality: { greaterThan: 0 }
    //     },
    //     width: {
    //         type: "number",
    //         numericality: { greaterThan: 0 }
    //     }
    // },

    // Notifications: {
    //     htmlmsg: { type: "string" },
    //     user_id: { type: "number" },
    //     user_details: {
    //         type: "string",
    //         format: { pattern: '^{.+}$' },
    //         length: { maximum: 512 }
    //     },
    //     msg: {
    //         type: "string",
    //         format: { pattern: '(^([\'\"] {\|[{])[a-zA-Zא-ת0-9.,$\'\";\n:+ @!{} ]+(} [\'\"]\|[}])$)' },
    //         length: { maximum: 512 }
    //     },
    //     type: {
    //         type: "string",
    //         format: { pattern: '^(EMAIL|SMS|WEB)$' }
    //     },
    //     web_received: {
    //         type: "number",
    //         numericality: { greaterThan: -1, lessThanOrEqualTo: 1 }
    //     },
    //     web_clicked: {
    //         type: "number",
    //         numericality: { greaterThan: -1, lessThanOrEqualTo: 1 }
    //     },
    //     status: {
    //         type: "string",
    //         format: { pattern: '^(status_success|status_failed)$' }
    //     }
    // },

    RoleMapping: {
        principalType: {
            type: "string",
            format: { pattern: '^USER$' }
        },
        principalId: {
            type: "string",
            format: { pattern: '^[0-9]*$' }
        },
        roleId: { type: "number" },
    }
}