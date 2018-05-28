import { Users } from "./users.api";
import { Invites } from "./invites.api";
import { Files } from "./files.api";
import { Courses } from './courses.api';
import { Specialties } from './specialties.api';
import { Students } from './students.api';
import { Positions } from './positions.api';
import { Lectors } from './lectors.api';
import { Subjects } from './subjects.api';
import { LessonTypes } from './lessonTypes.api';
import { Threads } from './threads.api';
import { Groups } from './groups.api';

export const AdminApi = {
    Users,
    Invites,
    Files,
    Courses,
    Specialties,
    Students: new Students(),
    Positions,
    Lectors,
    Subjects,
    LessonTypes,
    Threads,
    Groups
};