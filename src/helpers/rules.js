export const Rules = {
    nameRules: [
        (v) => !v || v.length <= 20 || 'Name must be less than 20 characters'
    ],
    requiredNameRules: [
        (v) => !!v || 'Name is required',
        (v) => v !== null && v.length <= 20 || 'Name must be less than 20 characters'
    ],
    codeRules: [
        (v) => !v || v.length <= 20 || 'Code must be less than 20 characters'
    ],
    requiredCodeRules: [
        (v) => !!v || 'Code is required',
        (v) => v !== null && v.length <= 20 || 'Code must be less than 20 characters'
    ],
    titleRules: [
        (v) => !v || v.length <= 20 || 'Title must be less than 20 characters'
    ],
    requiredTitleRules: [
        (v) => !!v || 'Title is required',
    ],
    ageRules: [
        (v) => !!v || 'Age is required'
    ],
    yearRules: [
        (v) => !!v || 'Year is required',
        (v) => v !== null && v.length === 4 && parseInt(v[0] + v[1]) >= 19 && new RegExp('^[0-9]+$').test(v) || 'Year mus contains only 4 numbers and must be more than 1900'
    ],
    DescriptionRules: [
        (v) => !!v || 'Description is required',
        (v) => v !== null && v.length <= 100 || 'Description must be less than 100 characters'
    ],
    emailRules: [
        (v) => (!v || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) || 'E-mail must be valid'
    ],
    requiredEmailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    requiredPhoneRules: [
        (v) => !!v || 'Phone Number is required',
        (v) => /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(v) || 'Phone number must be valid'
    ],
    phoneRules: [
        (v) => (!v || /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(v)) || 'Phone number must be valid'
    ],
    levelRules: [
        (v) => (!v || /^[0-9]+$/.test(v)) || 'Level must be valid'
    ],
    requiredLevelRules: [
        (v) => !!v || 'Level is required',
        (v) => (!v || /^[0-9]+$/.test(v)) || 'Level must be valid'
    ],
    requiredSpecialtyRules: [
        (v) => !!v || 'Specialty is required',
    ],
    requiredPositiontyRules: [
        (v) => !!v || 'Position is required',
    ],
    requiredCoursetyRules: [
        (v) => !!v || 'Course is required',
    ],
    requiredPasswordRules: [
        (v) => !!v || 'Password is required',
        // (v) => v !== null && v.length <= 20 || 'Password must be less than 20 characters'
    ],
    requiredRepeatPasswordRules: (pass) => ([
        (v) => !!v || 'Password is required',
        (v) => pass === v || 'Both Passworts must matched'
        // (v) => v !== null && v.length <= 20 || 'Password must be less than 20 characters'
    ]),
    requiredDateRules: [
        (v) => !!v || 'Date is required'
    ],
    requiredRolesRules: [
        (v) => !!v || 'Role is required'
    ],
    levelNumber: [
        (v) => (!v || /^[0-9]+$/.test(v)) || 'Value must be valid'
    ],
    requiredNumberRules: [
        (v) => !!v || 'Field is required',
        (v) => (!v || /^[0-9]+$/.test(v)) || 'Value must be valid'
    ]
}