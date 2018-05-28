import Users from '../components/admin/Users';
import Subjects from '../components/admin/Subjects';
import Books from '../components/admin/Books';
import Specialties from '../components/admin/Specialties';
import Courses from '../components/admin/Courses';
import Students from '../components/admin/Students';
import Lectors from '../components/admin/Lectors';
import Invites from '../components/admin/Invites';
import Files from '../components/admin/Files';
import Positions from '../components/admin/Positions';
import Calendar from '../components/admin/Calendar/Calendar.vue';
import LessonTypes from '../components/admin/LessonTypes';
import Groups from '../components/admin/Groups';


export const AdminRoutes = [
    //----------------------Calendar--------------
    {

        path: 'calendar',
        component: Calendar
    },


    //-----------------------Users----------------
    {

        path: 'users',
        component: Users.List
    },
    {

        path: 'users/:id',
        component: Users.Info
    },

    //----------------------Students-----------------
    {

        path: 'students',
        component: Students.List
    },
    {

        path: 'students/create',
        component: Students.Create
    },
    {

        path: 'students/:id',
        component: Students.Info
    },
    //----------------------Lectors-----------------
    {

        path: 'lectors',
        component: Lectors.List
    },
    {

        path: 'lectors/create',
        component: Lectors.Create
    },
    {

        path: 'lectors/:id',
        component: Lectors.Info
    },
    //--------------------Subjects------------------
    {

        path: 'subjects',
        component: Subjects.List

    },
    {
        path: 'subjects/create',
        component: Subjects.Create
    },
    {

        path: 'subjects/:id',
        component: Subjects.Info
    },
    //--------------------Subjects------------------
    {

        path: 'lesson-types',
        component: LessonTypes.List

    },
    {
        path: 'lesson-types/create',
        component: LessonTypes.Create
    },
    // {

    //     path: 'lesson-types/:id',
    //     component: Subjects.Info
    // },

    //--------------------Books---------------------

    {

        path: 'books',
        component: Books.List

    },
    {
        path: 'books/create',
        component: Books.Create
    },
    {

        path: 'books/:id',
        component: Books.Info
    },

    //--------------------Specialties---------------------
    {

        path: 'specialties',
        component: Specialties.List

    },
    {
        path: 'specialties/create',
        component: Specialties.Create
    },
    {

        path: 'specialties/:id',
        component: Specialties.Info
    },
    //-------------------Courses-------------------------------
    {

        path: 'courses',
        component: Courses.List

    },
    {
        path: 'courses/create',
        component: Courses.Create
    },
    {
        path: 'courses/:id',
        component: Courses.Info
    },
    //-------------------Invites-------------------------------
    {

        path: 'invites',
        component: Invites.List

    },
    {
        path: 'invites/create',
        component: Invites.Create
    },
    // {
    //     path: 'invites/:id',
    //     component: Courses.Info
    // }
    //-------------------Files-------------------------------
    {
        path: 'files',
        component: Files.List
    },
    //-------------------Positions-------------------------------
    {

        path: 'positions',
        component: Positions.List

    },
    {
        path: 'positions/create',
        component: Positions.Create
    },
    //-------------------Groups-------------------------------
    {

        path: 'groups',
        component: Groups.List

    },
    {
        path: 'groups/create',
        component: Groups.Create
    }


]